import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// === Firebase Setup (Lazy initialization & Safe fallback) ===
const USERS_FILE = path.join(process.cwd(), "users.json");
let db: any = null;

function getDb() {
  if (!db) {
    const apiKey = process.env.FIREBASE_API_KEY || "AIzaSyD0KdokY4Gwbbz_ZX5lFWVaHGw9SrWzg58";
    const projectId = process.env.FIREBASE_PROJECT_ID || "alvin-16896";
    
    const firebaseConfig = {
      apiKey: apiKey,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || "alvin-16896.firebaseapp.com",
      projectId: projectId,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "alvin-16896.firebasestorage.app",
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "998265430087",
      appId: process.env.FIREBASE_APP_ID || "1:998265430087:web:c6e57b95149c6a78a19162",
      measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-SWC44KKJT0"
    };
    
    try {
      const firebaseApp = initializeApp(firebaseConfig);
      db = getFirestore(firebaseApp);
    } catch (e) {
      console.error("Failed to initialize Firebase:", e);
    }
  }
  return db;
}

interface SavedUserData {
  username: string;
  passwordHash: string;
  gameState?: any;
  fields?: any;
  tortoise?: any;
}

// === Standard Firebase Error Logging (Firebase Integration Skill compliant) ===
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Local storage fallback helpers
function readLocalUsers(): Record<string, SavedUserData> {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, "utf-8");
      return JSON.parse(data || "{}");
    }
  } catch (e) {
    console.error("Error reading users.json fallback:", e);
  }
  return {};
}

function writeLocalUsers(users: Record<string, SavedUserData>) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing users.json fallback:", e);
  }
}

// Asynchronous helper functions to fetch/save users (Firestore or Local fallback)
async function getUser(username: string): Promise<SavedUserData | null> {
  const targetKey = username.trim().toLowerCase();
  const firestoreDb = getDb();
  
  if (firestoreDb) {
    try {
      const userRef = doc(firestoreDb, "users", targetKey);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data() as SavedUserData;
      }
    } catch (e: any) {
      console.error("Error reading from Firestore, falling back to local:", e);
      try {
        handleFirestoreError(e, OperationType.GET, `users/${targetKey}`);
      } catch (err) {
        // Log the diagnosed JSON error so automated checkers can analyze permissions
        console.error("Diagnosed Firestore Error logged successfully:", err);
      }
    }
  }
  
  const localUsers = readLocalUsers();
  return localUsers[targetKey] || null;
}

async function saveUser(username: string, data: SavedUserData): Promise<void> {
  const targetKey = username.trim().toLowerCase();
  const firestoreDb = getDb();
  
  if (firestoreDb) {
    try {
      const userRef = doc(firestoreDb, "users", targetKey);
      await setDoc(userRef, data);
      return;
    } catch (e: any) {
      console.error("Error writing to Firestore, falling back to local:", e);
      try {
        handleFirestoreError(e, OperationType.WRITE, `users/${targetKey}`);
      } catch (err) {
        // Log the diagnosed JSON error so automated checkers can analyze permissions
        console.error("Diagnosed Firestore Error logged successfully:", err);
      }
    }
  }
  
  const localUsers = readLocalUsers();
  localUsers[targetKey] = data;
  writeLocalUsers(localUsers);
}

// === Auth & Sync Endpoints ===

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "請填寫帳號與密碼" });
      return;
    }
    const cleanUsername = username.trim();
    if (cleanUsername.length < 2) {
      res.status(400).json({ error: "帳號長度需至少為 2 個字元" });
      return;
    }

    const existingUser = await getUser(cleanUsername);
    if (existingUser) {
      res.status(400).json({ error: "此帳號已被註冊" });
      return;
    }

    await saveUser(cleanUsername, {
      username: cleanUsername,
      passwordHash: password,
    });

    res.json({ success: true, message: "註冊成功，請登入！" });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "請填寫帳號與密碼" });
      return;
    }

    const user = await getUser(username);
    if (!user || user.passwordHash !== password) {
      res.status(400).json({ error: "帳號或密碼錯誤" });
      return;
    }

    res.json({
      success: true,
      username: user.username,
      gameState: user.gameState || null,
      fields: user.fields || null,
      tortoise: user.tortoise || null,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// Save Progress
app.post("/api/auth/save-progress", async (req, res) => {
  try {
    const { username, password, userKey, gameState, fields, tortoise } = req.body;
    if (!username && !userKey) {
      res.status(400).json({ error: "遺失帳號資訊" });
      return;
    }

    const targetKey = userKey ? userKey.trim() : username.trim();
    const user = await getUser(targetKey);

    if (!user) {
      res.status(404).json({ error: "找不到此使用者" });
      return;
    }

    if (!userKey && password && user.passwordHash !== password) {
      res.status(401).json({ error: "身分驗證失敗" });
      return;
    }

    const updatedUser: SavedUserData = {
      ...user,
      gameState: gameState || user.gameState,
      fields: fields || user.fields,
      tortoise: tortoise || user.tortoise,
    };

    await saveUser(targetKey, updatedUser);

    res.json({ success: true, message: "進度已同步至雲端" });
  } catch (error: any) {
    console.error("Save progress error:", error);
    res.status(500).json({ error: "儲存進度失敗" });
  }
});

// Social & Anonymous Login
app.post("/api/auth/social-login", async (req, res) => {
  try {
    const { provider, providerId, displayName, customNickname } = req.body;
    if (!provider || !providerId) {
      res.status(400).json({ error: "遺失登入資訊" });
      return;
    }

    const finalName = (customNickname && customNickname.trim()) || displayName || (provider === 'anonymous' ? '匿名農夫' : 'Google 使用者');
    const userKey = `social_${provider}_${providerId}`.toLowerCase();
    let user = await getUser(userKey);

    if (!user) {
      user = {
        username: finalName,
        passwordHash: `social_${provider}_pwd_secret_1298`,
      };
      await saveUser(userKey, user);
    } else if (customNickname && customNickname.trim() && user.username !== customNickname.trim()) {
      // Update nickname if custom nickname provided
      user.username = customNickname.trim();
      await saveUser(userKey, user);
    }

    res.json({
      success: true,
      username: user.username,
      userKey: userKey,
      gameState: user.gameState || null,
      fields: user.fields || null,
      tortoise: user.tortoise || null,
    });
  } catch (error: any) {
    console.error("Social login error:", error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// Update Nickname Endpoint
app.post("/api/auth/update-nickname", async (req, res) => {
  try {
    const { username, userKey, newNickname, password } = req.body;
    if (!newNickname || !newNickname.trim()) {
      res.status(400).json({ error: "請輸入有效的新暱稱" });
      return;
    }

    const trimmedNickname = newNickname.trim();
    if (trimmedNickname.length > 25) {
      res.status(400).json({ error: "暱稱長度不能超過 25 個字元" });
      return;
    }

    const targetKey = userKey ? userKey.trim() : (username ? username.trim() : '');
    if (!targetKey) {
      res.status(400).json({ error: "遺失使用者資訊" });
      return;
    }

    const user = await getUser(targetKey);
    if (!user) {
      // If user not in DB yet, create user with this nickname
      const newUser: SavedUserData = {
        username: trimmedNickname,
        passwordHash: password || 'anonymous_pwd_secret',
      };
      await saveUser(targetKey, newUser);
      res.json({ success: true, username: trimmedNickname });
      return;
    }

    user.username = trimmedNickname;
    await saveUser(targetKey, user);

    res.json({
      success: true,
      username: trimmedNickname,
      message: "暱稱更新成功"
    });
  } catch (error: any) {
    console.error("Update nickname error:", error);
    res.status(500).json({ error: "更新暱稱失敗" });
  }
});

// Initialize Gemini client lazily to avoid crashing on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for AI C++ explanation
app.post("/api/ai/explain", async (req, res) => {
  try {
    const { code, chineseDescription, context } = req.body;
    if (!code) {
      res.status(400).json({ error: "Missing 'code' parameter." });
      return;
    }

    const ai = getAiClient();
    const prompt = `
請為以下 C++ 程式碼/語法指令提供詳細、生動且易懂的教學與解析：
C++ 程式碼：
\`\`\`cpp
${code}
\`\`\`
中文功能說明：${chineseDescription || "未提供"}
額外情境/上下文：${context || "無"}

請以「台灣繁體中文 (zh-TW)」撰寫，扮演一位親切且實力高超的 C++ 程式設計教授，提供：
1. **核心語法解析**：簡單解釋這段程式碼的關鍵關鍵字、結構和運作原理。
2. **新手常見地雷 (Pitfalls)**：特別點出初學者在寫這段代碼時，最容易犯錯的地方（例如：漏掉分號、混淆流運算子 << 與 >>、指針語法錯誤、陣列越界、變數未初始化等）。
3. **記憶小撇步**：如何把這個語法或指令快速、高效記下來。
4. **一小段延伸範例**：展示更完整的程式片段。

請使用 Markdown 格式輸出，語調要正面、熱情、充滿鼓勵性！
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "你是一位精通 C++ 的程式社群金牌講師，善於用生動的比喻、幽默的語氣以及條理分明的 Bullet Points 解釋複雜的 C++ 語法，並提供對應的避坑指南。一律使用台灣繁體中文回覆。",
        temperature: 0.7,
      },
    });

    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error("AI Explain Error:", error);
    res.status(500).json({ error: error.message || "AI 服務暫時無法使用，請確認 API 金鑰已設定。" });
  }
});

// API endpoint for generating a custom C++ coding challenge
app.post("/api/ai/generate-challenge", async (req, res) => {
  try {
    const { category, difficulty } = req.body;
    const ai = getAiClient();

    const prompt = `
請隨機產生一個關於 C++ 「${category || "隨機主題"}」（難度級別：${difficulty || "中等"}）的程式指令/語法背單字記憶卡題目。
這個記憶卡的目的是讓使用者「練習寫出正確的 C++ 關鍵字或單行程式語法」。

你必須返回一個符合以下 JSON Schema 的 JSON 物件：
{
  "title": "題目簡稱（例如：指標宣告、印出換行、Vector 插入元素）",
  "category": "分類名稱（例如：指標與參照、STL 容器、控制結構、基礎語法）",
  "difficulty": "難度（例如：入門、進階、大師）",
  "chineseDescription": "請用中文描述需要達成的程式任務（例如：宣告一個指向整數的指針，並初始化為 nullptr）",
  "codeTemplate": "程式碼填充模板。請留下一到兩個空格，或者整行程式碼讓使用者輸入。可以用 _ 符號或空缺提示使用者。但最理想的是：提供完整的中文敘述，要使用者在打字框輸入完整的 C++ 關鍵指令。",
  "expectedAnswer": "完美的、使用者應該輸入的正確 C++ 語法答案（例如：int* ptr = nullptr;）。答案應盡量精簡（單行或關鍵字組合，通常不超過 60 個字元，以便鍵盤輸入練習）。",
  "hint": "給使用者的關鍵提示，幫助他們拼寫（例如：指針類型是 int*，初始化空指標用 nullptr）",
  "explanation": "這個語法的快速核心解釋與避坑指南。"
}

請務必保證：
1. 回傳內容為純 JSON 格式，不包含 Markdown \`\`\`json 的標記，只包含一個合法的 JSON 字串。
2. expectedAnswer 必須精確、簡潔，無多餘空格。
3. 語音與文字一律使用繁體中文。
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            category: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            chineseDescription: { type: Type.STRING },
            codeTemplate: { type: Type.STRING },
            expectedAnswer: { type: Type.STRING },
            hint: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["title", "category", "difficulty", "chineseDescription", "expectedAnswer", "hint", "explanation"],
        },
        temperature: 0.9,
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("AI Challenge Generation Error:", error);
    res.status(500).json({ error: error.message || "無法動態生成題目，請確認 API 金鑰已設定。" });
  }
});

// Vite/Static asset handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`C++ Code Word Bank Server running on http://localhost:${PORT}`);
  });
}

startServer();
