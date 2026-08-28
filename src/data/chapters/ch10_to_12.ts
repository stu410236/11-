import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';

/**
 * 產生第 10~12 章（Fields 91～120）之高品質、多樣化題庫
 * 涵蓋：二維陣列與矩陣、字元與字串、自訂函式
 * 題型：fill_blank, debug, application, predict_output, complete_code, code_reading
 */
export function getCh10To12Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const id = `f${fieldId}_${cardIndex}`;
  const chapter = getChapterForField(fieldId);
  const subLevel = fieldId - chapter.startId + 1; // 1 to 10 within chapter
  const prefix = `[第${chapter.chapter}章 ${chapter.topic}] #${fieldId}`;

  // =========================================================================
  // CHAPTER 10: 🗺️ 二維陣列與矩陣 (Fields 91 ～ 100) [高中核心]
  // =========================================================================
  if (fieldId >= 91 && fieldId <= 100) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 二維陣列宣告（3 行 4 列）`,
          chineseDescription: '宣告一個 3 行（Row）4 列（Column）的二維整數矩陣 matrix。請填入兩個中括號維度 [3][4]。',
          codeTemplate: `int matrix______;`,
          expectedAnswer: '[3][4]',
          acceptedAnswers: ['[3][4]', '[3] [4]', '[ 3 ][ 4 ]'],
          hint: '先寫 [3] 再寫 [4]：[3][4]',
          explanation: 'int matrix[3][4]; 在記憶體中建立 3x4 = 12 個整數空間，第一維代表列數，第二維代表行數。',
          difficulty: 3
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正二維陣列行列存取順序顛倒的 Bug`,
          chineseDescription: '走訪 2 行 3 列矩陣時，內層迴圈走訪列 c 應作為第二維下標，程式碼誤寫成 grid[c][r] 造成陣列越界崩潰。請修正下標順序。',
          buggyCode: `int grid[2][3];\nfor (int r = 0; r < 2; r++) {\n  for (int c = 0; c < 3; c++) {\n    grid[c][r] = 1; // 錯誤：c 與 r 顛倒！\n  }\n}`,
          originalBug: `grid[c][r]`,
          fixedLine: `grid[r][c]`,
          codeTemplate: `int grid[2][3];\nfor (int r = 0; r < 2; r++) {\n  for (int c = 0; c < 3; c++) {\n    grid______ = 1;\n  }\n}`,
          expectedAnswer: '[r][c]',
          acceptedAnswers: ['[r][c]', '[ r ][ c ]'],
          hint: '先 r 再 c：[r][c]',
          explanation: '【錯誤原因剖析】C++ 二維陣列為 Row-major（以列為主），標準存取順序固定為 [row][col]。',
          difficulty: 3
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 2D 矩陣所有元素總和計算`,
          chineseDescription: '【情境】統計 2x3 農田上所有區塊收穫量的總和。請完成雙層迴圈內的累加表達式。',
          scenario: `二維陣列全域加總走訪`,
          codeTemplate: `int field[2][3] = {{10, 20, 30}, {40, 50, 60}};\nint sum = 0;\nfor (int i = 0; i < 2; i++) {\n  for (int j = 0; j < 3; j++) {\n    ______;\n  }\n}\ncout << "總產量: " << sum;`,
          expectedAnswer: 'sum += field[i][j]',
          acceptedAnswers: ['sum += field[i][j]', 'sum+=field[i][j]', 'sum = sum + field[i][j]', 'sum=sum+field[i][j]'],
          hint: 'sum 加上 field[i][j]：sum += field[i][j]',
          explanation: '雙層迴圈走訪每個 (i, j) 座標，依序將 field[i][j] 累加至 sum 中（總和 210）。',
          difficulty: 3
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測二維陣列特定座標值`,
          chineseDescription: '請閱讀以下二維陣列初始化與賦值，預測輸出結果：',
          codeTemplate: `int m[2][2] = {{1, 2}, {3, 4}};\ncout << m[1][0] << " " << m[0][1];`,
          expectedAnswer: '3 2',
          acceptedAnswers: ['3 2', '3  2'],
          hint: 'm[1][0] 為第 2 列第 1 個元素（3），m[0][1] 為第 1 列第 2 個元素（2）。',
          explanation: 'm[1][0] 對應數值 3，m[0][1] 對應數值 2，因此輸出 "3 2"。',
          difficulty: 3
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 正方形矩陣主對角線（Main Diagonal）元素存取`,
          chineseDescription: '【情境】在 3x3 矩陣中，主對角線上的元素座標為 (0,0), (1,1), (2,2)。請補齊單層迴圈存取對角線元素的下標。',
          scenario: `矩陣對角線優化存取（O(N) 走訪）`,
          codeTemplate: `int mat[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\nint diagSum = 0;\nfor (int i = 0; i < 3; i++) {\n  diagSum += mat______;\n}\ncout << "對角線和: " << diagSum; // 1 + 5 + 9 = 15`,
          expectedAnswer: '[i][i]',
          acceptedAnswers: ['[i][i]', '[ i ][ i ]'],
          hint: '行列座標相同：[i][i]',
          explanation: '正方形矩陣的主對角線元素其列索引與行索引必定相等，即 mat[i][i]。',
          difficulty: 3
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 巢狀大括號二維陣列初始化`,
          chineseDescription: '初始化一個 2x2 矩陣，內外皆使用大括號區隔每一列。請填寫逗號連接符號。',
          codeTemplate: `int grid[2][2] = {{1, 2}______ {3, 4}};`,
          expectedAnswer: ',',
          acceptedAnswers: [',', ', '],
          hint: '逗號符號 ,',
          explanation: '二維陣列初始化清單中，不同列（子大括號）之間必須使用逗號 , 分隔。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正函式傳遞二維陣列時缺少第二維大小的編譯錯誤`,
          chineseDescription: '在 C++ 中將二維陣列傳入函式時，第二維大小絕對不可省略（編譯器需要用它計算記憶體位移）。請補上第二維大小 [3]。',
          buggyCode: `void printMatrix(int arr[][]) { // 錯誤：缺少第二維度大小！\n}`,
          originalBug: `int arr[][]`,
          fixedLine: `int arr[][3]`,
          codeTemplate: `void printMatrix(int arr[][3]) {\n  // 合法函式原型\n}`,
          expectedAnswer: '3',
          acceptedAnswers: ['3', '[3]'],
          hint: '第二維大小填入 3。',
          explanation: '【錯誤原因剖析】C++ 二維陣列傳參必須標明第二維大小（如 int arr[][3]），使編譯器能按列寬換算記憶體位址。',
          difficulty: 4
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：計算特定一列（Row）的加總`,
          chineseDescription: '閱讀以下程式碼，請問此段程式在計算什麼？',
          codeTemplate: `int table[4][5];\n// ... 已填入數值 ...\nint rowSum = 0;\nfor (int j = 0; j < 5; j++) {\n  rowSum += table[2][j];\n}`,
          options: [
            'A. 計算整張表的全部總和',
            'B. 計算第 3 列（Row 索引為 2）所有元素的總和',
            'C. 計算第 3 行（Column 索引為 2）所有元素的總和',
            'D. 尋找矩陣中的最大值'
          ],
          correctOption: 1,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b', '1', 'B. 計算第 3 列（Row 索引為 2）所有元素的總和'],
          hint: '第一維固定為 2，第二維 j 從 0 跑到 4。選 B。',
          explanation: 'table[2][j] 固定在第 2 列（即第 3 列，0-indexed），走訪該列的 5 個元素並加總。',
          difficulty: 3
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 統計二維網格中特定作物的數量`,
          chineseDescription: '【情境】二維陣列地圖中數字 9 代表高麗菜。請補齊走訪統計中判斷是否為 9 的條件。',
          codeTemplate: `int farm[3][3] = {{9, 0, 9}, {1, 9, 0}, {0, 0, 9}};\nint cabbageCount = 0;\nfor (int r = 0; r < 3; r++) {\n  for (int c = 0; c < 3; c++) {\n    if (______) {\n      cabbageCount++;\n    }\n  }\n}\ncout << "高麗菜數量: " << cabbageCount;`,
          expectedAnswer: 'farm[r][c] == 9',
          acceptedAnswers: ['farm[r][c] == 9', 'farm[r][c]==9', '9 == farm[r][c]'],
          hint: 'farm[r][c] 等於 9：farm[r][c] == 9',
          explanation: '雙層走訪搭配 if (farm[r][c] == 9) 累計高麗菜總數（共 4 顆）。',
          difficulty: 3
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 矩陣轉置概念：列與行互換`,
          chineseDescription: '【情境】將 2x2 原矩陣 A 轉置為 B（列行互換：B[j][i] = A[i][j]）。請補齊賦值語句。',
          scenario: `矩陣轉置（Transpose Matrix）`,
          codeTemplate: `int A[2][2] = {{1, 2}, {3, 4}};\nint B[2][2];\nfor (int i = 0; i < 2; i++) {\n  for (int j = 0; j < 2; j++) {\n    B[j][i] = ______;\n  }\n}`,
          expectedAnswer: 'A[i][j]',
          acceptedAnswers: ['A[i][j]', 'A[ i ][ j ]'],
          hint: '原矩陣元素：A[i][j]',
          explanation: '矩陣轉置將座標 (i, j) 搬遷至 (j, i)，即 B[j][i] = A[i][j]。',
          difficulty: 3
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 11: 🔤 字元與字串 (Fields 101 ～ 110) [高中核心]
  // =========================================================================
  if (fieldId >= 101 && fieldId <= 110) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} C++ 標準字串類別 std::string`,
          chineseDescription: '使用 C++ 標準庫動態字串型別宣告變數 name。請填入字串型別關鍵字。',
          codeTemplate: `#include <string>\nusing namespace std;\n______ farmName = "綠意良田";`,
          expectedAnswer: 'string',
          acceptedAnswers: ['string', 'std::string'],
          hint: '字串英文單字（6 個字母）。',
          explanation: 'std::string 是 C++ 封裝的動態長度字串物件，免除 C 語言字元陣列手動管理記憶體的繁瑣。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 cin 讀取字串遇空格截斷的 Bug（改用 getline）`,
          chineseDescription: '使用 cin >> 讀取像 "Green Farm" 這種含有空格的字串時，空格後方文字會遺失。要讀取完整一行文字，應改用什麼標準函式？',
          buggyCode: `string s;\ncin >> s; // 遇空格即中斷，無法讀取完整一行`,
          originalBug: `cin >> s;`,
          fixedLine: `getline(cin, s);`,
          codeTemplate: `string s;\n______(cin, s);`,
          expectedAnswer: 'getline',
          acceptedAnswers: ['getline', 'std::getline'],
          hint: '取得一整行（Get Line）。',
          explanation: '【錯誤原因剖析】cin >> 以空白與換行作為分隔符號；getline(cin, s) 才能完整讀取包含空格的整行文字。',
          difficulty: 3
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 取得字串長度 length()`,
          chineseDescription: '【情境】測量字串 text 含有多少個字元。請完成呼叫長度成員函式。',
          scenario: `字串長度計算`,
          codeTemplate: `string text = "CyberFarm";\nint len = text.______();\ncout << "長度: " << len; // 輸出 9`,
          expectedAnswer: 'length',
          acceptedAnswers: ['length', 'size'],
          hint: 'length 或 size 成員函式。',
          explanation: 'string 具備 .length() 與 .size() 成員函式，能以 O(1) 效率回傳字串的字元數。',
          difficulty: 2
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測字串串接 + 運算子結果`,
          chineseDescription: '請閱讀以下字串拼接程式碼，預測輸出結果：',
          codeTemplate: `string a = "C++";\nstring b = "2026";\nstring c = a + "_" + b;\ncout << c;`,
          expectedAnswer: 'C++_2026',
          acceptedAnswers: ['C++_2026'],
          hint: '直接將字串 a, 底線, 字串 b 拼在一起。',
          explanation: 'string 類別多載了 + 運算子，可直接將多個字串順暢串接。',
          difficulty: 2
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 統計字串中特定字元出現次數`,
          chineseDescription: '【情境】統計字串 s 中字元 \'A\' 出現的次數。請補齊走訪判斷條件。',
          scenario: `字串字元過濾計數`,
          codeTemplate: `string s = "BANANA";\nint countA = 0;\nfor (int i = 0; i < s.length(); i++) {\n  if (______) {\n    countA++;\n  }\n}\ncout << countA; // 輸出 3`,
          expectedAnswer: "s[i] == 'A'",
          acceptedAnswers: ["s[i] == 'A'", "s[i]=='A'", "'A' == s[i]"],
          hint: "第 i 個字元等於 'A'：s[i] == 'A'",
          explanation: "透過下標 s[i] 可直接存取字串中第 i 個字元並與 'A' 做字元比較。",
          difficulty: 3
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 字串字元安全修改（透過索引更新）`,
          chineseDescription: '將字串 word="cat" 的第一個字元 \'c\' 修改為 \'b\' 變成 "bat"。請填寫第一字元下標。',
          codeTemplate: `string word = "cat";\nword[______] = 'b';\ncout << word; // 印出 bat`,
          expectedAnswer: '0',
          acceptedAnswers: ['0'],
          hint: '第一個字元索引為 0。',
          explanation: 'string 與陣列相同為 0-indexed，word[0] 即代表字串的第一個字元。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正字串拼接字元常數與數字時的型別陷阱`,
          chineseDescription: '想要在字串後面附加數字 5，直接寫 s += 5 會把 5 當作 ASCII 碼（造成不可預期亂碼）。請改用 to_string(5) 轉換。',
          buggyCode: `string s = "Level";\ns += 5; // 錯誤：5 被視為 ASCII 控制字元！`,
          originalBug: `s += 5;`,
          fixedLine: `s += to_string(5);`,
          codeTemplate: `string s = "Level";\ns += ______(5);\ncout << s; // 輸出 Level5`,
          expectedAnswer: 'to_string',
          acceptedAnswers: ['to_string', 'std::to_string'],
          hint: '轉換為字串：to_string',
          explanation: '【錯誤原因剖析】數字要拼入字串必須使用 std::to_string() 轉型，否則會被隱式轉為 ASCII 字元。',
          difficulty: 3
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：回文（Palindrome）檢查演算法`,
          chineseDescription: '閱讀以下程式碼，選出該演算法的判定目標：',
          codeTemplate: `string s = "radar";\nbool isPal = true;\nint n = s.length();\nfor (int i = 0; i < n / 2; i++) {\n  if (s[i] != s[n - 1 - i]) {\n    isPal = false;\n    break;\n  }\n}`,
          options: [
            'A. 檢查字串是否為回文（正著讀與倒著讀皆相同，如 radar）',
            'B. 計算字串中母音字母的個數',
            'C. 將字串所有字母轉為大寫',
            'D. 依字母順序排列字串'
          ],
          correctOption: 0,
          expectedAnswer: 'A',
          acceptedAnswers: ['A', 'a', '0', 'A. 檢查字串是否為回文（正著讀與倒著讀皆相同，如 radar）'],
          hint: '比對首尾對稱字元 s[i] == s[n-1-i]。選 A。',
          explanation: '從兩端向中央雙指針比對字元對稱性，是經典的回文（Palindrome）判定法。',
          difficulty: 3
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 字串子字串擷取 substr()`,
          chineseDescription: '【情境】從字串 "Farm2026" 從索引 4 開始擷取長度 4 的子字串 "2026"。請完成 substr 呼叫。',
          codeTemplate: `string s = "Farm2026";\nstring year = s.______(4, 4);\ncout << year; // 輸出 2026`,
          expectedAnswer: 'substr',
          acceptedAnswers: ['substr'],
          hint: '子字串成員函式：substr',
          explanation: 's.substr(pos, count) 從 pos 位置起擷取最多 count 個字元並回傳新字串。',
          difficulty: 3
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 字串反轉（Reverse String）`,
          chineseDescription: '【情境】將字串 s 倒序複製至 revStr。請完成逆向走訪 for 迴圈。',
          scenario: `字串逆向構建`,
          codeTemplate: `string s = "code";\nstring revStr = "";\nfor (int i = s.length() - 1; ______; i--) {\n  revStr += s[i];\n}\ncout << revStr; // 輸出 edoc`,
          expectedAnswer: 'i >= 0',
          acceptedAnswers: ['i >= 0', 'i>=0', '0 <= i', 'i > -1'],
          hint: 'i 大於等於 0：i >= 0',
          explanation: '從 s.length()-1 倒著走訪至 0，逐字元拼接即可得到反轉後的字串 "edoc"。',
          difficulty: 3
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 12: 🛠️ 自訂函式 (Fields 111 ～ 120) [高中核心]
  // =========================================================================
  if (fieldId >= 111 && fieldId <= 120) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 無回傳值函式型別 void`,
          chineseDescription: '若一個函式僅負責執行特定動作（如印出農場選單）而不回傳任何數值，其回傳型別應宣告為？',
          codeTemplate: `______ showMenu() {\n  cout << "1. 播種\\n2. 灌溉\\n";\n}`,
          expectedAnswer: 'void',
          acceptedAnswers: ['void'],
          hint: '空的/無回傳型別關鍵字（4 個英文字母）。',
          explanation: 'void 代表空型態，用於不產生任何回傳值的函式宣告。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正傳值（Pass by Value）無法修改外部變數的 Bug`,
          chineseDescription: '本題的 swapNumbers 函式試圖交換兩數，但因為參數是一般傳值（複製），外部的 a 與 b 根本沒有改變！請在參數型態加上「參照引用符號 &」改為傳參考。',
          buggyCode: `void swapNumbers(int a, int b) { // 錯誤：傳值複製，無法改變外部\n  int temp = a;\n  a = b;\n  b = temp;\n}`,
          originalBug: `int a, int b`,
          fixedLine: `int &a, int &b`,
          codeTemplate: `void swapNumbers(int ______a, int ______b) {\n  int temp = a;\n  a = b;\n  b = temp;\n}`,
          expectedAnswer: '&',
          acceptedAnswers: ['&'],
          hint: '參照引用符號 &（Ampersand）。',
          explanation: '【錯誤原因剖析】C++ 傳參考（Pass by Reference，如 int &a）能直接繫結外部變數本體，使函式內部的修改反映至外部。',
          difficulty: 3
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 封裝兩數求較大值函式 maxVal`,
          chineseDescription: '【情境】撰寫一個回傳兩整數中較大者的函式 getMax。請補齊函式內的回傳判斷。',
          scenario: `自訂回傳值工具函式`,
          codeTemplate: `int getMax(int a, int b) {\n  if (a > b) return a;\n  ______ b;\n}`,
          expectedAnswer: 'return',
          acceptedAnswers: ['return', 'else return'],
          hint: '回傳關鍵字 return。',
          explanation: '函式透過 return 表達式將計算結果交還給呼叫端。',
          difficulty: 2
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測函式呼叫與返回值`,
          chineseDescription: '請閱讀以下程式碼，預測輸出結果：',
          codeTemplate: `int square(int x) {\n  return x * x;\n}\nint main() {\n  cout << square(4) + square(3);\n  return 0;\n}`,
          expectedAnswer: '25',
          acceptedAnswers: ['25'],
          hint: '4*4 + 3*3 = 16 + 9 = 25。',
          explanation: 'square(4) 回傳 16，square(3) 回傳 9，相加得 25。',
          difficulty: 2
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 封裝質數判斷函式 isPrime`,
          chineseDescription: '【情境】封裝一個接收整數 n，若 n 為質數回傳 true、否則回傳 false 的布林函式。請填寫函式回傳型別。',
          scenario: `布林輔助函式封裝`,
          codeTemplate: `______ isPrime(int n) {\n  if (n <= 1) return false;\n  for (int i = 2; i * i <= n; i++) {\n    if (n % i == 0) return false;\n  }\n  return true;\n}`,
          expectedAnswer: 'bool',
          acceptedAnswers: ['bool'],
          hint: '布林型別 bool。',
          explanation: '回傳 true 或 false 的邏輯判斷函式，標準回傳型別為 bool。',
          difficulty: 3
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 函式原型前置宣告（Function Prototype）`,
          chineseDescription: '當函式實作寫在 main 之後時，必須在 main 之前撰寫原型宣告。請填寫原型結尾分號。',
          codeTemplate: `int calculateYield(int seeds)______\nint main() {\n  int y = calculateYield(10);\n}`,
          expectedAnswer: ';',
          acceptedAnswers: [';'],
          hint: '加上分號 ;',
          explanation: '函式原型前置宣告以分號 ; 結尾，向編譯器告知該函式的名稱、參數與回傳型別。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正具回傳型別函式缺少 return 的未定義行為`,
          chineseDescription: 'int add(int a, int b) 宣告回傳 int，但函式內部只進行了計算卻忘記 return 導致編譯警告與回傳亂數。請補上 return。',
          buggyCode: `int add(int a, int b) {\n  int sum = a + b;\n  // 忘記 return sum 導致回傳值未定義！\n}`,
          originalBug: `int sum = a + b;`,
          fixedLine: `return a + b;`,
          codeTemplate: `int add(int a, int b) {\n  ______ a + b;\n}`,
          expectedAnswer: 'return',
          acceptedAnswers: ['return'],
          hint: '回傳關鍵字 return。',
          explanation: '【錯誤原因剖析】非 void 函式必須確保所有執行路徑皆有對應的 return 語句，否則將產生未定義行為。',
          difficulty: 2
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：遞迴函式階乘計算`,
          chineseDescription: '閱讀以下遞迴函式，若呼叫 fact(4)，其回傳值為多少？',
          codeTemplate: `int fact(int n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}`,
          options: [
            'A. 24 (4 * 3 * 2 * 1)',
            'B. 10 (4 + 3 + 2 + 1)',
            'C. 4',
            'D. 1'
          ],
          correctOption: 0,
          expectedAnswer: '24',
          acceptedAnswers: ['24', 'A', 'a', '0', 'A. 24 (4 * 3 * 2 * 1)'],
          hint: '4 * fact(3) = 4 * 6 = 24。選 A。',
          explanation: '遞迴展開：4 * 3 * 2 * fact(1) = 4 * 3 * 2 * 1 = 24。',
          difficulty: 3
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 傳參考避免龐大資料複製（const Reference）`,
          chineseDescription: '【情境】傳遞大字串時，使用 const string &s 能避免複製開銷且保證唯讀。請填寫參照符號 &。',
          codeTemplate: `void printBanner(const string ______msg) {\n  cout << "=== " << msg << " ===";\n}`,
          expectedAnswer: '&',
          acceptedAnswers: ['&'],
          hint: '引用參照符號 &',
          explanation: 'const Type & 模式是 C++ 高效傳遞大型物件（如 string、vector）的黃金準則。',
          difficulty: 3
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 模組化農場日結營收計算`,
          chineseDescription: '【情境】封裝計算農場營收 revenue = crops * price - cost 的函式。請補齊計算公式。',
          scenario: `多參數商業計算函式`,
          codeTemplate: `double calcRevenue(int crops, double price, double cost) {\n  return ______;\n}`,
          expectedAnswer: 'crops * price - cost',
          acceptedAnswers: ['crops * price - cost', 'crops*price-cost', '(crops * price) - cost'],
          hint: '作物量乘單價減成本：crops * price - cost',
          explanation: '函式封裝具體計算公式，將商業邏輯與 main 主流程徹底解耦。',
          difficulty: 2
        };
      }
    }
  }

  // Fallback card
  return {
    id, fieldId,
    type: 'fill_blank',
    title: `${prefix} C++ 基礎練習題`,
    chineseDescription: '請填入 C++ main 函式整數回傳型別。',
    codeTemplate: '______ main() {\n  return 0;\n}',
    expectedAnswer: 'int',
    hint: '整數型別 int。',
    explanation: 'main 固定回傳 int 型別。',
    difficulty: 1
  };
}
