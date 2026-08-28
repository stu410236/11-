import { CPlusPlusCard, FieldPlot } from '../types';

export interface ChapterMeta {
  chapter: number;
  startId: number;
  endId: number;
  topic: string;
  subTitle: string;
  stage: '高中核心' | '高中進階' | '延伸／競賽入門' | '自學延伸';
  emoji: string;
  keyConcepts: string;
}

export const CHAPTERS_DATA: ChapterMeta[] = [
  {
    chapter: 1,
    startId: 1,
    endId: 10,
    topic: 'C++ 入門與輸出',
    subTitle: '認識 C++ 核心架構、標頭檔與標準輸出串流',
    stage: '高中核心',
    emoji: '🌱',
    keyConcepts: '#include <iostream>、main()、cout、endl、;、基本程式結構'
  },
  {
    chapter: 2,
    startId: 11,
    endId: 20,
    topic: '變數與資料型別',
    subTitle: '變數宣告、記憶體空間、基本型別與常數保護',
    stage: '高中核心',
    emoji: '📦',
    keyConcepts: 'int、double、float、char、bool、變數宣告、初始化、const'
  },
  {
    chapter: 3,
    startId: 21,
    endId: 30,
    topic: '輸入與基本運算',
    subTitle: '標準鍵盤輸入、四則運算、取餘數、遞增遞減與型別轉換',
    stage: '高中核心',
    emoji: '⌨️',
    keyConcepts: 'cin、+ - * / %、指定運算、遞增遞減、型別轉換基礎'
  },
  {
    chapter: 4,
    startId: 31,
    endId: 40,
    topic: '條件判斷',
    subTitle: '單雙分支決策、關係比較與複合邏輯運算子',
    stage: '高中核心',
    emoji: '🚦',
    keyConcepts: 'if、else、else if、== != > < >= <=、&& || !'
  },
  {
    chapter: 5,
    startId: 41,
    endId: 50,
    topic: '多重選擇',
    subTitle: '巢狀條件判斷、switch 分支、break 防穿透與三元運算',
    stage: '高中核心',
    emoji: '🔀',
    keyConcepts: '巢狀 if、switch、case、break、條件綜合題'
  },
  {
    chapter: 6,
    startId: 51,
    endId: 60,
    topic: 'while 迴圈',
    subTitle: '前測試重複結構、計數器累加、哨兵結束條件與位數拆解',
    stage: '高中核心',
    emoji: '🔄',
    keyConcepts: 'while、計數器、累加、輸入直到條件成立'
  },
  {
    chapter: 7,
    startId: 61,
    endId: 70,
    topic: 'for 迴圈',
    subTitle: '固定次數走訪、正反向計數、階乘計算、倍數統計與極值',
    stage: '高中核心',
    emoji: '🚜',
    keyConcepts: 'for、正向／反向迴圈、累加、階乘、倍數'
  },
  {
    chapter: 8,
    startId: 71,
    endId: 80,
    topic: '迴圈進階',
    subTitle: 'do-while 後測試、break/continue 控制、雙重迴圈與幾何圖形',
    stage: '高中核心',
    emoji: '♻️',
    keyConcepts: 'do while、巢狀迴圈、break、continue、九九乘法表、圖形輸出'
  },
  {
    chapter: 9,
    startId: 81,
    endId: 90,
    topic: '一維陣列',
    subTitle: '靜態陣列宣告、下標存取、走訪加總、極值定位與陣列反轉',
    stage: '高中核心',
    emoji: '🌾',
    keyConcepts: '宣告陣列、索引、走訪、總和、最大最小、平均值'
  },
  {
    chapter: 10,
    startId: 91,
    endId: 100,
    topic: '二維陣列',
    subTitle: '矩陣維度配置、行列走訪、對角線處理與相鄰地塊檢測',
    stage: '高中核心',
    emoji: '🗺️',
    keyConcepts: '矩陣、列／欄走訪、巢狀迴圈與陣列綜合'
  },
  {
    chapter: 11,
    startId: 101,
    endId: 110,
    topic: '字串',
    subTitle: 'std::string 類別、長度檢索、字元處理、字串比較與子字串',
    stage: '高中進階',
    emoji: '🔤',
    keyConcepts: 'string、length() / size()、索引、字元處理、字串比較、拼接'
  },
  {
    chapter: 12,
    startId: 111,
    endId: 120,
    topic: '函式',
    subTitle: '自訂副程式宣告、參數傳遞、return 回傳值、作用域與模組化',
    stage: '高中進階',
    emoji: '🧩',
    keyConcepts: '函式宣告、參數、return、區域變數、傳值、函式拆解問題'
  },
  {
    chapter: 13,
    startId: 121,
    endId: 130,
    topic: '演算法入門',
    subTitle: '線性搜尋、兩數交換、排序概念、std::sort、極值與統計',
    stage: '延伸／競賽入門',
    emoji: '🧠',
    keyConcepts: '線性搜尋、交換、排序概念、sort()、最大最小、計數統計'
  },
  {
    chapter: 14,
    startId: 131,
    endId: 140,
    topic: 'STL 與資料結構',
    subTitle: '動態陣列 vector、push_back、range-for、sort 與 pair 容器',
    stage: '自學延伸',
    emoji: '📚',
    keyConcepts: 'vector、range-based for、push_back()、size()、sort()、pair'
  },
  {
    chapter: 15,
    startId: 141,
    endId: 150,
    topic: '真正的 C++ 延伸',
    subTitle: '參照 reference、指標基礎、結構體 struct、類別 class、auto 與 lambda',
    stage: '自學延伸',
    emoji: '🚀',
    keyConcepts: 'reference、pointer 基礎、struct、class、auto、lambda、map / set 等精選'
  }
];

const CROPS = [
  { name: '大豆', emoji: '🫛' },
  { name: '高麗菜', emoji: '🥬' },
  { name: '玉米', emoji: '🌽' },
  { name: '胡蘿蔔', emoji: '🥕' },
  { name: '西瓜', emoji: '🍉' },
  { name: '草莓', emoji: '🍓' },
  { name: '松露', emoji: '🍄' },
  { name: '仙人掌', emoji: '🌵' },
  { name: '黃金稻穗', emoji: '🌾' },
  { name: '番茄', emoji: '🍅' },
  { name: '茄子', emoji: '🍆' },
  { name: '南瓜', emoji: '🎃' },
  { name: '洋蔥', emoji: '🧅' },
  { name: '花椰菜', emoji: '🥦' },
  { name: '向日葵', emoji: '🌻' },
  { name: '蘋果', emoji: '🍎' },
  { name: '檸檬', emoji: '🍋' },
  { name: '葡萄', emoji: '🍇' }
];

export const getChapterForField = (fieldId: number): ChapterMeta => {
  const found = CHAPTERS_DATA.find(c => fieldId >= c.startId && fieldId <= c.endId);
  return found || CHAPTERS_DATA[0];
};

export const FIELD_PLOTS_DATA: FieldPlot[] = Array.from({ length: 150 }, (_, i) => {
  const id = i + 1;
  const crop = CROPS[i % CROPS.length];
  const chapter = getChapterForField(id);

  return {
    id,
    name: `第 ${id} 區良田 (${chapter.emoji} ${chapter.topic})`,
    description: `【${chapter.stage}】第 ${chapter.chapter} 章《${chapter.topic}》第 ${id - chapter.startId + 1}/10 關。灌溉收成【${crop.name}】。`,
    cropName: crop.name,
    isIrrigated: false,
    bestStreak: 0,
    lastAttemptDate: null
  };
});

// Helper to generate a unique question for a given fieldId and cardIndex
const getCardForFieldAndIndex = (fieldId: number, cardIndex: number): CPlusPlusCard => {
  const id = `f${fieldId}_${cardIndex}`;
  const chapter = getChapterForField(fieldId);
  const subLevel = fieldId - chapter.startId + 1; // 1 to 10 within the chapter
  const prefix = `[第${chapter.chapter}章 ${chapter.topic}] #${fieldId}`;

  // =========================================================================
  // CHAPTER 1: 🌱 C++ 入門與輸出 (Levels 1 ～ 10) [高中核心]
  // =========================================================================
  if (fieldId >= 1 && fieldId <= 10) {
    switch (cardIndex) {
      case 1: {
        const streamHeader = subLevel % 2 === 1 ? 'iostream' : 'iomanip';
        return {
          id, fieldId,
          title: `${prefix} 引入標準輸入輸出標頭檔`,
          chineseDescription: `在 C++ 程式最頂端，我們必須使用 #include 預處理指令引入標準函式庫。<${streamHeader}> 能提供標準輸出入與格式化支援。請填入標頭檔名稱。`,
          codeTemplate: `#include <__________>`,
          expectedAnswer: streamHeader,
          hint: `標準串流為 iostream，格式化控制為 iomanip。本題請填：${streamHeader}`,
          explanation: `#include <${streamHeader}> 是 C++ 專案最關鍵的起點，提供 std::cout 等物件宣告。`
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 主函式進入點 main 回傳型別`,
          chineseDescription: `所有 C++ 程式執行時皆由 main 函式開始。標準 C++ 規範 main 函式必須回傳什麼整數型態？`,
          codeTemplate: `______ main() {\n  // 良田程式啟動\n  return 0;\n}`,
          expectedAnswer: 'int',
          hint: '整數型態關鍵字（3 個英文字母）。',
          explanation: 'main 函式在 C++ 標準中固定回傳 int 型態，回傳 0 代表正常執行完畢退出。'
        };
      }
      case 3: {
        const useStream = subLevel > 5 ? 'std::cout' : 'cout';
        return {
          id, fieldId,
          title: `${prefix} 標準輸出串流物件`,
          chineseDescription: `請填寫 C++ 用來將訊息文字輸出至終端機螢幕的標準輸出串流物件名稱（Console Output）。`,
          codeTemplate: `${subLevel > 5 ? 'std::' : ''}______ << "歡迎來到第 ${fieldId} 區良田！";`,
          expectedAnswer: 'cout',
          hint: 'Console Output 的簡寫。',
          explanation: 'cout 是 C++ 最常用的標準輸出串流，搭配 << 運算子可輸出字串與數值。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 串流插入運算子`,
          chineseDescription: `請填入正確的串流插入運算子（Stream Insertion Operator），將右側字串送入 cout 輸出。`,
          codeTemplate: `std::cout ______ "C++ 程式設計啟航\\n";`,
          expectedAnswer: '<<',
          hint: '向左的雙角括弧。',
          explanation: '<< 是串流插入運算子，代表資料流向左側的輸出串流。'
        };
      }
      case 5: {
        const useEndl = subLevel % 2 === 1;
        return {
          id, fieldId,
          title: `${prefix} 換行控制與串流輸出`,
          chineseDescription: useEndl 
            ? `請填寫標準命名空間中代表換行並刷新緩衝區的操縱子 endl。`
            : `請填寫跳脫字元代表換行符號（Newline）。`,
          codeTemplate: useEndl 
            ? `std::cout << "土壤編號: ${fieldId}" << std::______;`
            : `std::cout << "種植紀錄" << '______';`,
          expectedAnswer: useEndl ? 'endl' : '\\n',
          hint: useEndl ? 'End Line 的縮寫。' : '反斜線加上 n。',
          explanation: useEndl 
            ? 'std::endl 會輸出換行並強制執行 flush 刷新輸出緩衝區。'
            : '\\n 是換行跳脫字元，比 endl 更具執行效能。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 結尾分號終止符`,
          chineseDescription: `每一個完整的 C++ 執行敘述句結尾，都必須加上什麼標點符號作為語句結束？`,
          codeTemplate: `std::cout << "作物狀態良好"______`,
          expectedAnswer: ';',
          hint: '英文分號。',
          explanation: '分號 ; 在 C++ 中代表一條敘述句的終止，遺漏會導致語法編譯錯誤。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 引入 std 命名空間`,
          chineseDescription: `為了在程式中直接使用 cout、endl 而不需每次前綴 std::，我們可以在開頭宣告使用哪個命名空間？`,
          codeTemplate: `using namespace ______;`,
          expectedAnswer: 'std',
          hint: '標準（Standard）庫縮寫。',
          explanation: 'using namespace std; 將標準庫的名稱匯入全域範疇，適合初學者學習使用。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 程式正常結束傳回碼`,
          chineseDescription: `main 函式執行完畢時，標準慣例應回傳哪一個數字給作業系統表示無錯誤順利結束？`,
          codeTemplate: `int main() {\n  std::cout << "執行完畢";\n  return ______;\n}`,
          expectedAnswer: '0',
          hint: '數字零。',
          explanation: 'return 0; 代表程式回傳 exit code 0，向作業系統回報程式成功運行。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 單行註解符號`,
          chineseDescription: `C++ 中用來撰寫單行說明註解、不會被編譯器執行的符號是什麼？`,
          codeTemplate: `______ 這是第 ${fieldId} 區良田的系統設定說明\nstd::cout << "OK";`,
          expectedAnswer: '//',
          hint: '連續兩個正斜線。',
          explanation: '// 為 C++ 單行註解符號，從該符號到該行行尾的文字皆會被編譯器忽略。'
        };
      }
      case 10: {
        const num = fieldId * 5;
        return {
          id, fieldId,
          title: `${prefix} 連續串流輸出數字`,
          chineseDescription: `cout 可以使用多個 << 串流運算子連續輸出字串與計算結果。請補齊第二個串流連接運算子。`,
          codeTemplate: `std::cout << "灌溉水量: " ______ ${num} << " 升\\n";`,
          expectedAnswer: '<<',
          hint: '串流插入運算子。',
          explanation: '多個 << 可以串連在一起，依序將多個不同型態的資料輸出至終端機。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 2: 📦 變數與資料型別 (Levels 11 ～ 20) [高中核心]
  // =========================================================================
  if (fieldId >= 11 && fieldId <= 20) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 整數型別 int 宣告`,
          chineseDescription: `請使用 C++ 最常用的 32 位元整數型態關鍵字，宣告變數 crops 並賦值為 ${subLevel * 10}。`,
          codeTemplate: `______ crops = ${subLevel * 10};`,
          expectedAnswer: 'int',
          hint: 'Integer 的縮寫。',
          explanation: 'int 是 C++ 最常用的整數型態，在現代 32/64 位元系統中通常佔用 4 位元組。'
        };
      }
      case 2: {
        const val = (subLevel * 1.5).toFixed(2);
        return {
          id, fieldId,
          title: `${prefix} 雙精度浮點數 double 宣告`,
          chineseDescription: `宣告一個雙精度浮點數變數 water_level，精確儲存小數值 ${val}。`,
          codeTemplate: `______ water_level = ${val};`,
          expectedAnswer: 'double',
          hint: '雙倍精度的英文關鍵字。',
          explanation: 'double 提供 64 位元雙精度浮點數儲存，能表示約 15~17 位有效小數位。'
        };
      }
      case 3: {
        const ch = String.fromCharCode(65 + (subLevel % 26));
        return {
          id, fieldId,
          title: `${prefix} 字元型別 char 宣告`,
          chineseDescription: `請宣告一個存放單一 ASCII 字元的變數 grade，並指派字元 '${ch}'。`,
          codeTemplate: `______ grade = '${ch}';`,
          expectedAnswer: 'char',
          hint: 'Character 的縮寫。',
          explanation: 'char 用於儲存單一字元，佔用 1 個位元組，字面值必須使用單引號包覆。'
        };
      }
      case 4: {
        const state = subLevel % 2 === 1;
        return {
          id, fieldId,
          title: `${prefix} 布林型別 bool 宣告`,
          chineseDescription: `請使用布林型態關鍵字宣告變數 is_harvested，紀錄是否已收成（值為 ${state ? 'true' : 'false'}）。`,
          codeTemplate: `______ is_harvested = ${state ? 'true' : 'false'};`,
          expectedAnswer: 'bool',
          hint: 'Boolean 的縮寫。',
          explanation: 'bool 是 C++ 的布林邏輯型態，值只能為 true (1) 或 false (0)。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 常數保護關鍵字 const`,
          chineseDescription: `若希望變數 MAX_SEEDS 在初始化後數值不可被修改，應在型態前加上什麼修飾關鍵字？`,
          codeTemplate: `______ int MAX_SEEDS = ${subLevel * 100};`,
          expectedAnswer: 'const',
          hint: 'Constant 的縮寫。',
          explanation: 'const 修飾的變數為唯讀常數，若後續程式試圖修改它，編譯器將會報錯。'
        };
      }
      case 6: {
        const val = `${subLevel}500000000`;
        return {
          id, fieldId,
          title: `${prefix} 64 位元長整數 long long`,
          chineseDescription: `當整數數值超過 21 億（超過 32 位元 int 上限）時，應使用哪種 64 位元長整數型態？`,
          codeTemplate: `______ large_inventory = ${val}LL;`,
          expectedAnswer: 'long long',
          hint: '兩個 long 組合。',
          explanation: 'long long 提供至少 64 位元整數空間，上限可達約 9x10^18，能避免數值溢位。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 單精度浮點數 float`,
          chineseDescription: `宣告一個 32 位元單精度浮點數變數 ph_value。`,
          codeTemplate: `______ ph_value = 6.5f;`,
          expectedAnswer: 'float',
          hint: '浮點數英文關鍵字。',
          explanation: 'float 佔用 4 位元組（32 位元），常數後綴 f 表示單精度字面值。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 記憶體大小測量 sizeof`,
          chineseDescription: `請使用 C++ 內建運算子測量 int 型別在目前電腦環境所佔用的位元組（Bytes）大小。`,
          codeTemplate: `int bytes = ______(int);`,
          expectedAnswer: 'sizeof',
          hint: '尺寸大小運算子。',
          explanation: 'sizeof(type) 或 sizeof(var) 是編譯期運算子，返回該型態所佔用的位元組數量。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 布林真假常數 true/false`,
          chineseDescription: `在 C++ 中，布林值「真」的關鍵字是？`,
          codeTemplate: `bool can_water = ______;`,
          expectedAnswer: 'true',
          hint: '英文的「正確/真實」。',
          explanation: 'C++ 內建布林字面值關鍵字 true (1) 與 false (0)。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 變數賦值指定運算子`,
          chineseDescription: `將數值 ${subLevel * 25} 指定（賦值）給已宣告的變數 total_yield。請填寫指定運算子。`,
          codeTemplate: `int total_yield ______ ${subLevel * 25};`,
          expectedAnswer: '=',
          hint: '單個等號。',
          explanation: '單個等號 = 是賦值運算子，將右側表達式的值存入左側變數中。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 3: ⌨️ 輸入與基本運算 (Levels 21 ～ 30) [高中核心]
  // =========================================================================
  if (fieldId >= 21 && fieldId <= 30) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 標準鍵盤輸入串流 cin`,
          chineseDescription: `請填寫 C++ 用於由鍵盤讀取使用者輸入的標準輸入串流物件名稱（Console Input）。`,
          codeTemplate: `int count;\nstd::______ >> count;`,
          expectedAnswer: 'cin',
          hint: 'Console Input 縮寫。',
          explanation: 'std::cin 是標準輸入串流，配合 >> 運算子可將輸入數據存入指定變數中。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 串流提取運算子 >>`,
          chineseDescription: `請填寫串流提取運算子（Stream Extraction Operator），將 cin 中的輸入值送入變數 moisture。`,
          codeTemplate: `int moisture;\nstd::cin ______ moisture;`,
          expectedAnswer: '>>',
          hint: '向右的雙角括弧。',
          explanation: '>> 是串流提取運算子，將輸入緩衝區的資料解析後存入右側變數。'
        };
      }
      case 3: {
        const num1 = subLevel * 4;
        const num2 = 3;
        return {
          id, fieldId,
          title: `${prefix} 取餘數運算子 %`,
          chineseDescription: `請利用取餘數運算子（Modulo）求出 ${num1} 除以 ${num2} 的餘數。`,
          codeTemplate: `int remainder = ${num1} ______ ${num2};`,
          expectedAnswer: '%',
          hint: '百分比符號。',
          explanation: '% 運算子用於計算兩整數相除後的餘數，例如 10 % 3 = 1。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 複合加法指定運算子 +=`,
          chineseDescription: `請使用複合指定運算子，將變數 total_score 增加 ${subLevel * 5}（等同於 total_score = total_score + ${subLevel * 5}）。`,
          codeTemplate: `total_score ______ ${subLevel * 5};`,
          expectedAnswer: '+=',
          hint: '加號接等號。',
          explanation: '+= 是複合指定運算子，能精簡且高效地對自身變數進行累加操作。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 變數自增 1 運算子 ++`,
          chineseDescription: `請使用遞增運算子，將變數 harvest_day 的數值增加 1。`,
          codeTemplate: `harvest_day______;`,
          expectedAnswer: '++',
          hint: '兩個加號。',
          explanation: '++ 運算子使變數自增 1，有前置 (++x) 與後置 (x++) 兩種形式。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 變數自減 1 運算子 --`,
          chineseDescription: `請使用遞減運算子，將變數 water_buckets 的數值減少 1。`,
          codeTemplate: `water_buckets______;`,
          expectedAnswer: '--',
          hint: '兩個減號。',
          explanation: '-- 運算子使變數自減 1，相當於 x = x - 1。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 連續讀取多個變數`,
          chineseDescription: `使用 cin 連續讀取兩個由空白隔開的整數 a 與 b。請補齊串流運算子。`,
          codeTemplate: `int a, b;\nstd::cin >> a ______ b;`,
          expectedAnswer: '>>',
          hint: '提取運算子。',
          explanation: 'cin >> a >> b 可以連續自輸入串流讀取多個變數，中間自動以空白或換行分隔。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 明確型別轉換 static_cast`,
          chineseDescription: `將整數變數 seeds 轉換為浮點數 double 進行精確小數除法。請填入 C++ 標準轉換語法 static_cast。`,
          codeTemplate: `double avg = ______<double>(seeds) / 4.0;`,
          expectedAnswer: 'static_cast',
          hint: '靜態轉換關鍵字。',
          explanation: 'static_cast<Type>(var) 是 C++ 標準的安全編譯期型別轉換運算子。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 複合乘法指定運算子 *=`,
          chineseDescription: `將變數 multiplier 乘以 2，請使用複合乘法指定運算子。`,
          codeTemplate: `multiplier ______ 2;`,
          expectedAnswer: '*=',
          hint: '星號接等號。',
          explanation: '*= 是複合乘法指定運算子，即 x = x * 2。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 乘法算術運算子 *`,
          chineseDescription: `請填入 C++ 乘法算術運算子，計算單價 price 與數量 quantity 的乘積。`,
          codeTemplate: `int total_price = price ______ quantity;`,
          expectedAnswer: '*',
          hint: '星號。',
          explanation: '在 C++ 中，* 是乘法運算子。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 4: 🚦 條件判斷 (Levels 31 ～ 40) [高中核心]
  // =========================================================================
  if (fieldId >= 31 && fieldId <= 40) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 單一條件分支 if`,
          chineseDescription: `請填入條件判斷關鍵字 if，當水分 water 小於 30 時觸發灌溉提醒。`,
          codeTemplate: `______(water < 30) {\n  std::cout << "土壤過乾，需要灌溉！\\n";\n}`,
          expectedAnswer: 'if',
          hint: '英文的「如果」。',
          explanation: 'if 語句根據小括號內的布林條件真假，決定是否執行大括號內的程式區塊。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 二分條件分支 else`,
          chineseDescription: `當 if 條件不成立時，程式會執行哪一個關鍵字引導的分支區塊？`,
          codeTemplate: `if (sunlight >= 50) {\n  std::cout << "日照充足";\n} ______ {\n  std::cout << "日照不足";\n}`,
          expectedAnswer: 'else',
          hint: '英文的「否則」。',
          explanation: 'else 搭配 if 使用，當 if 條件為 false 時會自動執行 else 區塊。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 多重路徑條件 else if`,
          chineseDescription: `在多重條件判斷中，介於 if 與 else 之間的額外路徑檢查應使用什麼關鍵字組合？`,
          codeTemplate: `if (temp > 35) {\n  cool_down();\n} ______ (temp < 10) {\n  warm_up();\n}`,
          expectedAnswer: 'else if',
          hint: '否則如果。',
          explanation: 'else if 可以串接多個互斥的條件檢驗，直到其中一個為 true 才會執行。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 相等比較運算子 ==`,
          chineseDescription: `請寫出判斷變數 level 是否「等於」100 的關係運算子（注意不要與指定運算子混淆）。`,
          codeTemplate: `if (level ______ 100) {\n  std::cout << "滿級大師！";\n}`,
          expectedAnswer: '==',
          hint: '連續兩個等號。',
          explanation: '== 是相等比較運算子，若左右相等則回傳 true；單個 = 是賦值，千萬不可混淆。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 不等於比較運算子 !=`,
          chineseDescription: `請寫出判斷作物種類 crop_type 是否「不等於」0 的關係運算子。`,
          codeTemplate: `if (crop_type ______ 0) {\n  std::cout << "已選定作物品種";\n}`,
          expectedAnswer: '!=',
          hint: '驚嘆號接等號。',
          explanation: '!= 是不等於比較運算子，當兩側數值不相同時回傳 true。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 邏輯且 AND 運算子 &&`,
          chineseDescription: `當「土壤濕度 wet > 40」而且「溫度 temp > 20」兩條件同時成立時才生長。請填寫邏輯且運算子。`,
          codeTemplate: `if (wet > 40 ______ temp > 20) {\n  grow_crop();\n}`,
          expectedAnswer: '&&',
          hint: '兩個 And 符號。',
          explanation: '&& 是邏輯 AND 運算子，只有在兩端條件皆為 true 時，整體才為 true。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 邏輯或 OR 運算子 ||`,
          chineseDescription: `當「遭遇蟲害 is_pest == true」或者「遭遇乾旱 is_drought == true」任一情況發生時報警。請填寫邏輯或運算子。`,
          codeTemplate: `if (is_pest ______ is_drought) {\n  alarm_system();\n}`,
          expectedAnswer: '||',
          hint: '兩條垂直管線。',
          explanation: '|| 是邏輯 OR 運算子，只要兩端條件中有任一個為 true，整體即為 true。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 邏輯非 NOT 運算子 !`,
          chineseDescription: `請使用邏輯反向（NOT）運算子，將布林變數 is_locked 的值反轉（若為 false 則變為 true）。`,
          codeTemplate: `if (______is_locked) {\n  enter_farm();\n}`,
          expectedAnswer: '!',
          hint: '單個驚嘆號。',
          explanation: '! 是邏輯 NOT 運算子，用於將布林值反向，!false 為 true，!true 為 false。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 大於或等於運算子 >=`,
          chineseDescription: `判斷儲存金幣 coins 是否「大於或等於」升級所需花費 ${subLevel * 50}。`,
          codeTemplate: `if (coins ______ ${subLevel * 50}) {\n  upgrade_farm();\n}`,
          expectedAnswer: '>=',
          hint: '大於號接等號。',
          explanation: '>= 是大於等於比較運算子。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 小於或等於運算子 <=`,
          chineseDescription: `判斷目前庫存 storage 是否「小於或等於」警戒線 5。`,
          codeTemplate: `if (storage ______ 5) {\n  restock();\n}`,
          expectedAnswer: '<=',
          hint: '小於號接等號。',
          explanation: '<= 是小於等於比較運算子。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 5: 🔀 多重選擇 (Levels 41 ～ 50) [高中核心]
  // =========================================================================
  if (fieldId >= 41 && fieldId <= 50) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} switch 語句核心`,
          chineseDescription: `請填寫用於多值分支比對的關鍵字 switch。`,
          codeTemplate: `______(tool_id) {\n  case 1: use_hoe(); break;\n  case 2: use_water(); break;\n}`,
          expectedAnswer: 'switch',
          hint: '開關/切換關鍵字。',
          explanation: 'switch 語句能針對整數或字元型態的變數進行多重等值匹配。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 分支標籤 case`,
          chineseDescription: `在 switch 內部，用來標示各個特定匹配值的標籤關鍵字是什麼？`,
          codeTemplate: `switch (season) {\n  ______ 1: std::cout << "春耕"; break;\n  ______ 2: std::cout << "夏耘"; break;\n}`,
          expectedAnswer: 'case',
          hint: '情況/案例關鍵字。',
          explanation: 'case 後接常數表達式與冒號 :，作為 switch 跳轉的目標標籤。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 跳離分支關鍵字 break`,
          chineseDescription: `在 case 處理區塊末尾，必須加上什麼關鍵字以防止程式向下「貫穿 (Fall-through)」執行其他分支？`,
          codeTemplate: `case 1:\n  plant_corn();\n  ______;\ncase 2:`,
          expectedAnswer: 'break',
          hint: '打斷/中斷關鍵字。',
          explanation: 'break 會強制跳出當前 switch 或迴圈區塊，避免繼續執行下一個 case。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 預設例外分支 default`,
          chineseDescription: `在 switch 語句中，當所有 case 皆不匹配時，會執行哪一個預設標籤？`,
          codeTemplate: `switch (code) {\n  case 1: execute(); break;\n  ______:\n    std::cout << "未知指令"; break;\n}`,
          expectedAnswer: 'default',
          hint: '預設關鍵字。',
          explanation: 'default 是 switch 的預設分支，相當於 if-else 架構中的最後一個 else。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 三元條件運算子 ? :`,
          chineseDescription: `請填寫三元條件運算子的問號 ?，語法為 (條件 ? 表達式A : 表達式B)。`,
          codeTemplate: `int bonus = (streak > 5) ______ 50 : 10;`,
          expectedAnswer: '?',
          hint: '英文問號。',
          explanation: '三元運算子是 C++ 唯一的三目運算子，條件為真時返回冒號左側，否則返回右側。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 三元運算子冒號隔開`,
          chineseDescription: `請補齊三元運算子中區隔「為真」與「為假」兩選項的冒號 :。`,
          codeTemplate: `std::string status = (is_ready) ? "Ready" ______ "Waiting";`,
          expectedAnswer: ':',
          hint: '英文冒號。',
          explanation: '三元運算子以問號 ? 和冒號 : 構成簡潔的條件賦值敘述。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 巢狀 if 深度過濾`,
          chineseDescription: `在外部 if 條件成立後，內部進一步使用第二層 if 檢查。請填入關鍵字 if。`,
          codeTemplate: `if (has_key) {\n  ______(level >= ${subLevel * 2}) {\n    open_chest();\n  }\n}`,
          expectedAnswer: 'if',
          hint: '條件關鍵字。',
          explanation: '巢狀 if (Nested if) 是在一個 if 區塊內再嵌入另一個 if，進行更細緻的多重門檻篩選。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} switch 處理字元選項`,
          chineseDescription: `switch 亦能處理 char 字元型別。請填入代表 'A' 選項的 case 關鍵字。`,
          codeTemplate: `switch (command) {\n  ______ 'A': auto_water(); break;\n}`,
          expectedAnswer: 'case',
          hint: '情況關鍵字。',
          explanation: '字元在底層即為整數 ASCII 碼，完全支援在 switch case 中比對。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} case 後綴標點符號`,
          chineseDescription: `在 case 數值之後，必須接上什麼標點符號引導後續執行的敘述句？`,
          codeTemplate: `case 3______\n  harvest_all();\n  break;`,
          expectedAnswer: ':',
          hint: '英文冒號。',
          explanation: '每個 case 常數後面必須緊跟一個冒號 : 作為標籤宣告。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} switch 多值共用分支`,
          chineseDescription: `當 case 1 與 case 2 執行相同動作時，可以省略 case 1 的 break 讓其自然穿透。請補齊 case 關鍵字。`,
          codeTemplate: `switch (mode) {\n  ______ 1:\n  case 2:\n    enable_fast_mode();\n    break;\n}`,
          expectedAnswer: 'case',
          hint: '情況關鍵字。',
          explanation: '利用 switch 的穿透特性，可以讓多個 case 標籤共享同一段處理邏輯。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 6: 🔄 while 迴圈 (Levels 51 ～ 60) [高中核心]
  // =========================================================================
  if (fieldId >= 51 && fieldId <= 60) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} while 迴圈語法結構`,
          chineseDescription: `請填入前測試迴圈關鍵字 while，只要條件 (water < 100) 成立就重複執行大括號內的動作。`,
          codeTemplate: `______(water < 100) {\n  water += 10;\n}`,
          expectedAnswer: 'while',
          hint: '英文的「當...時」。',
          explanation: 'while 迴圈在每次進入迴圈體之前先檢查條件，為 true 時重複執行，直到為 false 為止。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 迴圈計數器條件遞增`,
          chineseDescription: `在 while 迴圈內，必須遞增計數器以防死迴圈。請使用 ++ 運算子。`,
          codeTemplate: `int i = 0;\nwhile (i < ${subLevel * 5}) {\n  work();\n  i______;\n}`,
          expectedAnswer: '++',
          hint: '遞增符號。',
          explanation: '迴圈內部通常需要適當更新條件變數（如計數器 i++），確保迴圈最終會終止。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 累加器演算法 (Sum Accumulation)`,
          chineseDescription: `使用 while 迴圈將數字累加到 total 變數中。請填入複合加法指定運算子。`,
          codeTemplate: `int total = 0, n = 1;\nwhile (n <= 10) {\n  total ______ n;\n  n++;\n}`,
          expectedAnswer: '+=',
          hint: '加號接等號。',
          explanation: 'total += n 是經典的累加模式，將每次迴圈的 n 值加進總和變數中。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 倒數計時 while 迴圈`,
          chineseDescription: `從 10 倒數至 1，每次迴圈將計數器 count 遞減 1。請使用 -- 運算子。`,
          codeTemplate: `int count = 10;\nwhile (count > 0) {\n  std::cout << count << " ";\n  count______;\n}`,
          expectedAnswer: '--',
          hint: '遞減運算子。',
          explanation: '倒數迴圈透過 count-- 讓計數器逐漸靠近終止門檻 count > 0。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 哨兵終止值 (Sentinel) 迴圈`,
          chineseDescription: `讀取使用者輸入，直到輸入 -1 才結束。請填入「不等於」運算子。`,
          codeTemplate: `int input = 0;\nwhile (input ______ -1) {\n  std::cin >> input;\n}`,
          expectedAnswer: '!=',
          hint: '不等於符號。',
          explanation: '以特定值（如 -1）作為結束訊號的輸入迴圈稱為哨兵迴圈 (Sentinel Loop)。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} cin 狀態作為 while 條件`,
          chineseDescription: `持續讀取標準輸入直到遇到檔案結尾 (EOF)。請填寫 cin 物件。`,
          codeTemplate: `int x;\nwhile (std::______ >> x) {\n  process(x);\n}`,
          expectedAnswer: 'cin',
          hint: '標準輸入串流。',
          explanation: 'while (cin >> x) 會在成功讀入時回傳真，輸入結束或型態錯誤時回傳假並結束迴圈。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 數字位數拆解 (Digit Extraction)`,
          chineseDescription: `取得正整數 num 的個位數，請使用取餘數運算子除以 10。`,
          codeTemplate: `while (num > 0) {\n  int digit = num ______ 10;\n  num /= 10;\n}`,
          expectedAnswer: '%',
          hint: '取餘數運算子。',
          explanation: 'num % 10 可以取出整數最後一位，num /= 10 則去掉最後一位，是位數拆解的經典技巧。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 累乘運算 (Product Accumulation)`,
          chineseDescription: `計算階乘或連乘積時，使用累乘指定運算子 *=。`,
          codeTemplate: `long long prod = 1, k = 1;\nwhile (k <= ${subLevel}) {\n  prod ______ k;\n  k++;\n}`,
          expectedAnswer: '*=',
          hint: '乘號接等號。',
          explanation: 'prod *= k 代表 prod = prod * k，初始值必須為 1 而不能是 0。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 迴圈內強制跳出 break`,
          chineseDescription: `當水位達到超標警戒線 100 時，強制立即跳離 while 迴圈。請填寫 break 關鍵字。`,
          codeTemplate: `while (true) {\n  water += 5;\n  if (water >= 100) ______;\n}`,
          expectedAnswer: 'break',
          hint: '跳離關鍵字。',
          explanation: '在無限迴圈 while(true) 中搭配 break 是常見的事件驅動迴圈設計模式。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} while 括號內布林條件`,
          chineseDescription: `請填寫大於運算子 >，當存糧 stock 大於 0 時持續發放種子。`,
          codeTemplate: `while (stock ______ 0) {\n  distribute_seed();\n  stock--;\n}`,
          expectedAnswer: '>',
          hint: '大於符號。',
          explanation: 'while 條件式為真時執行迴圈，為假時立即終止。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 7: 🚜 for 迴圈 (Levels 61 ～ 70) [高中核心]
  // =========================================================================
  if (fieldId >= 61 && fieldId <= 70) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} for 迴圈標準關鍵字`,
          chineseDescription: `請填寫 C++ 用於三段式計數迴圈的關鍵字 for。`,
          codeTemplate: `______(int i = 0; i < 10; i++) {\n  std::cout << i << " ";\n}`,
          expectedAnswer: 'for',
          hint: '固定次數迴圈關鍵字。',
          explanation: 'for (初始化; 條件; 更新) 是最清晰、最常使用的固定次數迴圈語法。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} for 迴圈表頭宣告計數器型別`,
          chineseDescription: `在 for 表頭宣告局部整數計數變數 i 的型態 int。`,
          codeTemplate: `for (______ i = 1; i <= ${subLevel * 10}; i++) {\n  work();\n}`,
          expectedAnswer: 'int',
          hint: '整數型態。',
          explanation: '在 for 迴圈初始化區塊宣告的變數，其生命週期只存在於該 for 迴圈內。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} for 迴圈正向走訪終止條件`,
          chineseDescription: `欲執行剛好 ${subLevel * 5} 次（i 從 0 到 ${subLevel * 5 - 1}），請填寫小於關係運算子 <。`,
          codeTemplate: `for (int i = 0; i ______ ${subLevel * 5}; i++) {\n  irrigate_plot(i);\n}`,
          expectedAnswer: '<',
          hint: '小於號。',
          explanation: 'i 從 0 開始且 i < N 是程式設計中最標準的 0-based N 次走訪習慣。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} for 迴圈表頭計數器更新遞增`,
          chineseDescription: `在 for 迴圈第三個區塊，每次迭代結束後將 i 遞增 1。請使用 ++ 運算子。`,
          codeTemplate: `for (int i = 0; i < 20; i______) {\n  spray();\n}`,
          expectedAnswer: '++',
          hint: '遞增運算子。',
          explanation: 'for 迴圈第三段為每次迴圈體執行完畢後觸發的更新語句。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 反向遞減 for 迴圈`,
          chineseDescription: `從 100 倒數遞減到 0，每次減 1。請在更新段填寫遞減運算子 --。`,
          codeTemplate: `for (int i = 100; i >= 0; i______) {\n  std::cout << i << "\\n";\n}`,
          expectedAnswer: '--',
          hint: '遞減運算子。',
          explanation: '反向 for 迴圈將初始值設為最大值，條件設為 >= 下限，更新段使用 i--。'
        };
      }
      case 6: {
        const step = 2;
        return {
          id, fieldId,
          title: `${prefix} 自訂步長跳躍走訪 +=`,
          chineseDescription: `走訪所有偶數（i 每次增加 2），請填寫複合指定運算子 +=。`,
          codeTemplate: `for (int i = 0; i <= 20; i ______ ${step}) {\n  std::cout << i << " ";\n}`,
          expectedAnswer: '+=',
          hint: '加號接等號。',
          explanation: 'for 迴圈第三段不限於 i++，可使用 i += 2 等任意步長。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 等差級數 1 到 N 累加`,
          chineseDescription: `在 for 迴圈內使用 sum 累加所有 i 值。請填入複合加法運算子。`,
          codeTemplate: `int sum = 0;\nfor (int i = 1; i <= ${subLevel * 10}; i++) {\n  sum ______ i;\n}`,
          expectedAnswer: '+=',
          hint: '累加運算子。',
          explanation: '透過 for 迴圈走訪 1~N 並執行 sum += i 即可計算出等差級數總和。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 階乘運算 n! 累乘`,
          chineseDescription: `使用 for 迴圈計算階乘，請填入累乘運算子 *=。`,
          codeTemplate: `long long fact = 1;\nfor (int i = 1; i <= ${subLevel}; i++) {\n  fact ______ i;\n}`,
          expectedAnswer: '*=',
          hint: '累乘運算子。',
          explanation: '階乘運算以 1 為基底，每次迴圈將當前的 i 乘入累積變數中。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 偶數篩選取餘數檢查`,
          chineseDescription: `在 for 迴圈內篩選偶數，請使用取餘數運算子 % 檢查 (i % 2 == 0)。`,
          codeTemplate: `for (int i = 1; i <= 50; i++) {\n  if (i ______ 2 == 0) {\n    std::cout << i << " ";\n  }\n}`,
          expectedAnswer: '%',
          hint: '取餘數運算子。',
          explanation: 'i % 2 == 0 是判斷整數是否為偶數的標準方法。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} for 表頭內分號分隔符`,
          chineseDescription: `for 迴圈表頭的三個區段（初始化、條件、更新）之間，必須使用什麼標點符號分隔？`,
          codeTemplate: `for (int i = 0______ i < 10; i++)`,
          expectedAnswer: ';',
          hint: '分號。',
          explanation: 'for 迴圈的小括號內必須剛好有兩個分號 ; 用以區隔三個部分。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 8: ♻️ 迴圈進階 (Levels 71 ～ 80) [高中核心]
  // =========================================================================
  if (fieldId >= 71 && fieldId <= 80) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} do-while 後測試迴圈關鍵字 do`,
          chineseDescription: `請填寫先執行一次迴圈體、後檢查條件的後測試迴圈起始關鍵字 do。`,
          codeTemplate: `______ {\n  input_command();\n} while (is_invalid);`,
          expectedAnswer: 'do',
          hint: '英文「做」。',
          explanation: 'do-while 迴圈保證迴圈體至少會被執行一次，非常適合用於輸入驗證或遊戲主選單。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} do-while 結尾條件 while`,
          chineseDescription: `請填寫 do-while 迴圈在結尾檢查條件的關鍵字 while。`,
          codeTemplate: `do {\n  render_frame();\n} ______(is_running);`,
          expectedAnswer: 'while',
          hint: '條件檢查關鍵字。',
          explanation: 'do { ... } while (條件); 注意結尾必須有一個分號 ;。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 跳過當次迭代 continue`,
          chineseDescription: `若遇壞果 (is_bad == true)，希望立即「跳過本次迴圈剩餘程式」直接進入下一輪，應使用什麼關鍵字？`,
          codeTemplate: `for (int i = 0; i < total; i++) {\n  if (is_bad(i)) ______;\n  pack_fruit(i);\n}`,
          expectedAnswer: 'continue',
          hint: '繼續關鍵字。',
          explanation: 'continue 會忽略當前迴圈體後續未執行的指令，直接跳往下一輪迭代。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 提早強制終止迴圈 break`,
          chineseDescription: `若在庫存中找到目標種子，立即「強制跳離整個迴圈」，應使用什麼關鍵字？`,
          codeTemplate: `for (int i = 0; i < n; i++) {\n  if (items[i] == target) {\n    found = true;\n    ______;\n  }\n}`,
          expectedAnswer: 'break',
          hint: '打斷關鍵字。',
          explanation: 'break 會直接跳出最近一層的迴圈結構，不再執行後續任何迭代。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 雙重巢狀 for 迴圈外層`,
          chineseDescription: `輸出二維幾何圖形時需要雙重迴圈。請在內層迴圈上方填入外層 for 關鍵字。`,
          codeTemplate: `______(int r = 0; r < 5; r++) {\n  for (int c = 0; c < 5; c++) {\n    std::cout << "* ";\n  }\n  std::cout << "\\n";\n}`,
          expectedAnswer: 'for',
          hint: '迴圈關鍵字。',
          explanation: '外層迴圈控制列 (Row)，內層迴圈控制行/欄 (Column)。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 九九乘法表雙迴圈矩陣`,
          chineseDescription: `在九九乘法表內層迴圈中計算乘積 i * j。請填入乘法運算子。`,
          codeTemplate: `for (int i = 1; i <= 9; i++) {\n  for (int j = 1; j <= 9; j++) {\n    std::cout << i << "x" << j << "=" << (i ______ j) << "\\t";\n  }\n  std::cout << "\\n";\n}`,
          expectedAnswer: '*',
          hint: '乘號。',
          explanation: '九九乘法表是雙重迴圈的經典範例，外層代表被乘數，內層代表乘數。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 直角三角形幾何星星圖`,
          chineseDescription: `印出高度為 5 的直角三角形時，第 r 列（從 1 到 5）應輸出 r 顆星星。請填寫內層條件運算子 <=。`,
          codeTemplate: `for (int r = 1; r <= 5; r++) {\n  for (int c = 1; c ______ r; c++) {\n    std::cout << "*";\n  }\n  std::cout << "\\n";\n}`,
          expectedAnswer: '<=',
          hint: '小於等於號。',
          explanation: '讓內層迴圈的上限相依於外層變數 r，即可輸出漸增長度的直角三角形。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} do-while 結尾分號`,
          chineseDescription: `do-while 迴圈在小括號 while (條件) 之後，必須加上什麼符號作為語句結尾？`,
          codeTemplate: `do {\n  work();\n} while (has_work)______`,
          expectedAnswer: ';',
          hint: '英文分號。',
          explanation: '不同於一般 while，do-while 結構的最後必須以分號 ; 結尾。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 巢狀迴圈換行輸出`,
          chineseDescription: `在內層迴圈每印完一列星星後，在外層迴圈輸出換行符號 '\\n'。`,
          codeTemplate: `for (int i = 0; i < n; i++) {\n  for (int j = 0; j < n; j++) {\n    std::cout << "#";\n  }\n  std::cout << '______';\n}`,
          expectedAnswer: '\\n',
          hint: '換行字元。',
          explanation: '每印完一整列 (Row) 後輸出換行符號，才能呈現出二維圖形排版。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 複合雙重迴圈矩陣走訪`,
          chineseDescription: `宣告內層整數計數變數 j。請填入型態關鍵字 int。`,
          codeTemplate: `for (int i = 0; i < 3; i++) {\n  for (______ j = 0; j < 3; j++) {\n    std::cout << "[" << i << "," << j << "] ";\n  }\n}`,
          expectedAnswer: 'int',
          hint: '整數型態。',
          explanation: '雙重迴圈通常習慣以外層 i、內層 j 作為獨立的計數變數。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 9: 🌾 一維陣列 (Levels 81 ～ 90) [高中核心]
  // =========================================================================
  if (fieldId >= 81 && fieldId <= 90) {
    switch (cardIndex) {
      case 1: {
        const size = subLevel * 5 + 5;
        return {
          id, fieldId,
          title: `${prefix} 一維靜態陣列宣告`,
          chineseDescription: `宣告一個可存放 ${size} 個整數的靜態一維陣列 scores。請在方括號中填入陣列大小。`,
          codeTemplate: `int scores[______];`,
          expectedAnswer: `${size}`,
          hint: `本題要求的大小為 ${size}。`,
          explanation: 'C++ 靜態陣列宣告語法為 型別 陣列名[大小];，大小必須為常數整數。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 陣列 0-based 索引首元素`,
          chineseDescription: `C++ 陣列索引（Index）由 0 開始。存取陣列 farm_plots 的第一個元素應傳入哪個索引？`,
          codeTemplate: `int first_plot = farm_plots[______];`,
          expectedAnswer: '0',
          hint: '數字零。',
          explanation: 'C++ 陣列的第一個元素下標為 0，最後一個元素下標為 N-1。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 陣列大括號初始化清單`,
          chineseDescription: `在宣告陣列時同時賦予初值，應使用大括號清單。請補齊起始大括號 {。`,
          codeTemplate: `int yields[5] = ______10, 20, 30, 40, 50};`,
          expectedAnswer: '{',
          hint: '左大括號。',
          explanation: '陣列初始化使用大括號清單 {v1, v2, ...}，未填寫的元素會自動補零。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} for 迴圈走訪陣列`,
          chineseDescription: `使用 for 迴圈走訪長度為 N 的陣列，存取當前第 i 個元素。請在方括號中填入索引變數 i。`,
          codeTemplate: `for (int i = 0; i < N; i++) {\n  std::cout << data[______] << " ";\n}`,
          expectedAnswer: 'i',
          hint: '計數器變數名稱。',
          explanation: 'data[i] 代表陣列中第 i 個元素，配合 for 迴圈能逐一處理每個數據。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 陣列元素總和累加`,
          chineseDescription: `將陣列元素 values[i] 累加至 sum。請填寫複合加法指定運算子。`,
          codeTemplate: `int sum = 0;\nfor (int i = 0; i < N; i++) {\n  sum ______ values[i];\n}`,
          expectedAnswer: '+=',
          hint: '累加運算子。',
          explanation: '走訪陣列並透過 sum += values[i] 是計算陣列總和與平均值的基本公式。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 尋找陣列最大值`,
          chineseDescription: `若當前元素 arr[i] 大於目前紀錄的最大值 max_val，則更新 max_val。請填入大於運算子 >。`,
          codeTemplate: `int max_val = arr[0];\nfor (int i = 1; i < N; i++) {\n  if (arr[i] ______ max_val) {\n    max_val = arr[i];\n  }\n}`,
          expectedAnswer: '>',
          hint: '大於號。',
          explanation: '將最大值初始值設為首元素 arr[0]，逐一比較更新即可找到全域最大值。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 尋找陣列最小值`,
          chineseDescription: `若當前元素 arr[i] 小於目前紀錄的最小值 min_val，則更新 min_val。請填入小於運算子 <。`,
          codeTemplate: `int min_val = arr[0];\nfor (int i = 1; i < N; i++) {\n  if (arr[i] ______ min_val) {\n    min_val = arr[i];\n  }\n}`,
          expectedAnswer: '<',
          hint: '小於號。',
          explanation: '同理，若 arr[i] < min_val 則覆寫 min_val 為更小的新數值。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 陣列索引下標方括號`,
          chineseDescription: `存取陣列元素使用的運算子符號是一對什麼括號？`,
          codeTemplate: `int val = array______3];`,
          expectedAnswer: '[',
          hint: '左中括號/方括號。',
          explanation: 'C++ 使用方括號 [] 作為陣列下標存取運算子（Subscript Operator）。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 陣列元素前後對調 (Swap)`,
          chineseDescription: `反轉陣列時，將索引 i 與 j 的兩元素交換，可使用標準庫的哪個函式？`,
          codeTemplate: `std::______(arr[i], arr[j]);`,
          expectedAnswer: 'swap',
          hint: '交換英文單字。',
          explanation: 'std::swap(a, b) 能快速且安全地交換兩個變數或陣列元素的值。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 陣列末元素索引 N-1`,
          chineseDescription: `長度為 10 的陣列，最後一個合法元素的索引是幾？`,
          codeTemplate: `int last_item = arr[______];`,
          expectedAnswer: '9',
          hint: '10 減 1。',
          explanation: '長度為 N 的陣列，索引範圍固定為 0 ~ N-1。存取 arr[N] 會造成越界錯誤 (Out of Bounds)。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 10: 🗺️ 二維陣列 (Levels 91 ～ 100) [高中核心]
  // =========================================================================
  if (fieldId >= 91 && fieldId <= 100) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 二維陣列宣告與維度`,
          chineseDescription: `宣告一個 4 列（Rows）5 欄（Columns）的二維整數陣列 farm_grid。請在第一個方括號填入列數 4。`,
          codeTemplate: `int farm_grid[______][5];`,
          expectedAnswer: '4',
          hint: '列數 4。',
          explanation: '二維陣列宣告格式為 型別 名稱[列數][欄數];。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 二維陣列雙下標存取`,
          chineseDescription: `存取第 r 列、第 c 欄的格子，第二個維度方括號內應填入哪個變數？`,
          codeTemplate: `int cell = matrix[r][______];`,
          expectedAnswer: 'c',
          hint: '欄變數 c。',
          explanation: 'matrix[r][c] 分別定位列與欄，依序解構二維平面座標。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 二維陣列巢狀初始化`,
          chineseDescription: `二維陣列在定義時可使用巢狀大括號。請補齊起始大括號 {。`,
          codeTemplate: `int grid[2][2] = ______\n  {1, 2},\n  {3, 4}\n};`,
          expectedAnswer: '{',
          hint: '左大括號。',
          explanation: '二維陣列使用外層大括號包覆各列的內層大括號進行初始化。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 雙迴圈走訪全矩陣`,
          chineseDescription: `使用外層 r、內層 c 兩重 for 迴圈走訪整張地圖。請填入內層 for 關鍵字。`,
          codeTemplate: `for (int r = 0; r < R; r++) {\n  ______(int c = 0; c < C; c++) {\n    process(grid[r][c]);\n  }\n}`,
          expectedAnswer: 'for',
          hint: '迴圈關鍵字。',
          explanation: '外層遍歷所有列，內層遍歷該列中的每一欄，完成全矩陣遍歷。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 計算單一列總和 Row Sum`,
          chineseDescription: `計算固定第 r 列的所有元素總和，累加 grid[r][c]。請填寫累加運算子 +=。`,
          codeTemplate: `int row_sum = 0;\nfor (int c = 0; c < C; c++) {\n  row_sum ______ grid[r][c];\n}`,
          expectedAnswer: '+=',
          hint: '累加運算子。',
          explanation: '固定第一個下標 r 並迭代第二個下標 c，即可算出特定橫列的加總。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 計算單一欄總和 Column Sum`,
          chineseDescription: `計算固定第 c 欄的所有元素總和，迭代列變數 r。請補齊列下標 r。`,
          codeTemplate: `int col_sum = 0;\nfor (int r = 0; r < R; r++) {\n  col_sum += grid[______][c];\n}`,
          expectedAnswer: 'r',
          hint: '列索引 r。',
          explanation: '固定第二個下標 c 並迭代第一個下標 r，即可算出特定直欄的垂直加總。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 正方形矩陣主對角線走訪`,
          chineseDescription: `在 N×N 方陣中，主對角線上的元素列索引與欄索引相等 (r == c)。請在第二個下標填入 i。`,
          codeTemplate: `for (int i = 0; i < N; i++) {\n  std::cout << matrix[i][______] << " ";\n}`,
          expectedAnswer: 'i',
          hint: '下標變數 i。',
          explanation: 'matrix[i][i] 即為方陣的主對角線 (Main Diagonal) 元素。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 矩陣轉置 (Transpose) 賦值`,
          chineseDescription: `轉置矩陣會將 (r, c) 的元素放置於新矩陣的 (c, r) 位置。請填寫原矩陣欄下標 c。`,
          codeTemplate: `transposed[c][r] = original[r][______];`,
          expectedAnswer: 'c',
          hint: '原欄下標 c。',
          explanation: '矩陣轉置即為列與欄互換，即 B[j][i] = A[i][j]。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 4-方向相鄰格子偏移量陣列`,
          chineseDescription: `上下左右 4 方向偏移量常用 dx 與 dy 陣列表示。請在宣告時填入型態 int。`,
          codeTemplate: `______ dx[4] = {-1, 1, 0, 0};\nint dy[4] = {0, 0, -1, 1};`,
          expectedAnswer: 'int',
          hint: '整數型態。',
          explanation: '使用 dx/dy 陣列配合迴圈可優雅走訪相鄰的上下左右相鄰格子。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 二維邊界安全檢查`,
          chineseDescription: `檢查列座標 nr 是否在合法範圍 (nr >= 0 且 nr < R)。請填寫邏輯且運算子 &&。`,
          codeTemplate: `if (nr >= 0 ______ nr < R && nc >= 0 && nc < C) {\n  visit(grid[nr][nc]);\n}`,
          expectedAnswer: '&&',
          hint: '邏輯且運算子。',
          explanation: '二維陣列座標計算後務必進行邊界安全檢查，避免記憶體越界當機。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 11: 🔤 字串 (Levels 101 ～ 110) [高中進階]
  // =========================================================================
  if (fieldId >= 101 && fieldId <= 110) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 引入標準字串標頭檔`,
          chineseDescription: `使用 C++ 標準字串 std::string 類別時，必須在開頭引入哪個標頭檔？`,
          codeTemplate: `#include <______>`,
          expectedAnswer: 'string',
          hint: '字串英文單字。',
          explanation: '#include <string> 提供 std::string 類別與豐富的字串操作方法。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 取得字串長度 length()`,
          chineseDescription: `請呼叫字串物件 s 的長度成員函式 length()。`,
          codeTemplate: `std::string s = "OrganicCrop";\nint len = s.______();`,
          expectedAnswer: 'length',
          hint: '長度英文單字。',
          explanation: 's.length() 或 s.size() 能返回該字串包含的字元總數。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 字串字元索引下標存取`,
          chineseDescription: `存取字串 s 的第一個字元，請在方括號內填入首字元索引 0。`,
          codeTemplate: `char first_char = s[______];`,
          expectedAnswer: '0',
          hint: '數字零。',
          explanation: 'std::string 支援如陣列般的下標存取運算子 []，索引從 0 開始。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 字串直接串接拼接運算子 +`,
          chineseDescription: `在 C++ 中，直接使用哪個算術運算子即可將兩個字串快速串接（Concatenate）？`,
          codeTemplate: `std::string full_name = first_name ______ " " + last_name;`,
          expectedAnswer: '+',
          hint: '加號。',
          explanation: 'std::string 多載了 + 與 += 運算子，能直覺地將兩個字串連接在一起。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 數字字元檢查 isdigit()`,
          chineseDescription: `判斷單一字元 ch 是否為 '0'~'9' 的數字字元，應呼叫哪個標準函式？`,
          codeTemplate: `if (______(ch)) {\n  std::cout << "是數字字元";\n}`,
          expectedAnswer: 'isdigit',
          hint: 'Is Digit 縮寫。',
          explanation: 'isdigit(ch) 檢查字元是否為數字，若真返回非零值，若偽返回 0。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 轉大寫函式 toupper()`,
          chineseDescription: `將小寫英文字元轉換為大寫，應使用哪個標準函式？`,
          codeTemplate: `char upper_ch = ______(ch);`,
          expectedAnswer: 'toupper',
          hint: 'To Upper 縮寫。',
          explanation: 'toupper(ch) 會將英文字元轉為對應的大寫形式。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 擷取子字串 substr()`,
          chineseDescription: `從字串 s 的位置 0 開始擷取長度為 4 的子字串。請填寫成員函式名稱 substr。`,
          codeTemplate: `std::string sub = s.______(0, 4);`,
          expectedAnswer: 'substr',
          hint: 'Sub-string 縮寫。',
          explanation: 's.substr(pos, count) 自指定索引開始擷取指定長度的子字串。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 搜尋子字串 find()`,
          chineseDescription: `搜尋字串中是否存在子字串 "C++"，請呼叫成員函式 find。`,
          codeTemplate: `size_t pos = s.______("C++");`,
          expectedAnswer: 'find',
          hint: '尋找英文單字。',
          explanation: 's.find(target) 回傳目標首次出現的下標索引；若找不到則回傳 string::npos。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 未找到常數 string::npos`,
          chineseDescription: `當 find() 找不到目標時會回傳特殊常數 string::npos。請補齊常數名稱 npos。`,
          codeTemplate: `if (s.find("pest") == std::string::______) {\n  std::cout << "安全，無蟲害";\n}`,
          expectedAnswer: 'npos',
          hint: 'No Position 縮寫。',
          explanation: 'std::string::npos 代表找不到相符字元的最大無號整數值。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 字串相等字典序比較`,
          chineseDescription: `比較兩個字串內容是否完全相等，直接使用相等運算子 ==。`,
          codeTemplate: `if (password ______ "admin123") {\n  grant_access();\n}`,
          expectedAnswer: '==',
          hint: '連續兩個等號。',
          explanation: 'std::string 多載了 ==, !=, <, > 運算子，可以直接以字典序進行比較。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 12: 🧩 函式 (Levels 111 ～ 120) [高中進階]
  // =========================================================================
  if (fieldId >= 111 && fieldId <= 120) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 自訂函式回傳型別宣告`,
          chineseDescription: `定義一個計算兩整數總和並回傳整數的函式 add。請填入回傳型別 int。`,
          codeTemplate: `______ add(int a, int b) {\n  return a + b;\n}`,
          expectedAnswer: 'int',
          hint: '整數型態。',
          explanation: '自訂函式必須在函式名稱前方明確標明其計算結果的回傳值型別。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 無回傳值副程式 void`,
          chineseDescription: `定義一個只負責在螢幕印出訊息、不需回傳任何數值的函式 print_welcome。請填寫型別 void。`,
          codeTemplate: `______ print_welcome() {\n  std::cout << "歡迎光臨 C++ 良田！\\n";\n}`,
          expectedAnswer: 'void',
          hint: '虛無/空型態。',
          explanation: 'void 代表空型態，表示此函式不回傳任何數據。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 函式數值回傳關鍵字 return`,
          chineseDescription: `在函式計算完成後，使用什麼關鍵字將數值回傳給呼叫端？`,
          codeTemplate: `double calc_area(double r) {\n  ______ 3.14159 * r * r;\n}`,
          expectedAnswer: 'return',
          hint: '回傳英文關鍵字。',
          explanation: 'return 語句結束函式的執行，並將右側表達式的值傳回呼叫點。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 函式呼叫與引數傳遞`,
          chineseDescription: `呼叫函式 calculate_yield 並傳入參數 10 與 20。請填入函式名稱。`,
          codeTemplate: `int result = ______________(10, 20);`,
          expectedAnswer: 'calculate_yield',
          hint: '函式名稱 calculate_yield。',
          explanation: '函式呼叫語法為 函式名(引數1, 引數2, ...);。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 判斷質數之布林回傳函式`,
          chineseDescription: `宣告一個檢查某數是否為質數的函式 is_prime。其回傳型別應為布林型態 bool。`,
          codeTemplate: `______ is_prime(int n) {\n  if (n <= 1) return false;\n  return true;\n}`,
          expectedAnswer: 'bool',
          hint: '布林型態。',
          explanation: '作為條件檢查的輔助函式，通常宣告為 bool 回傳型態（回傳 true 或 false）。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 傳值呼叫 (Pass by Value) 特性`,
          chineseDescription: `C++ 預設為傳值呼叫，形參只是實參的複本。宣告一般整數參數 x 的型態 int。`,
          codeTemplate: `void modify(______ x) {\n  x += 10; // 不會影響呼叫端的外部變數\n}`,
          expectedAnswer: 'int',
          hint: '一般整數型態。',
          explanation: 'Pass by value 會複製一份數據傳入函式內部，函式內的修改不會干擾外部實參。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 函式原型宣告 (Prototype)`,
          chineseDescription: `若函式定義於 main 之後，需在 main 之前撰寫原型宣告並以什麼標點符號結尾？`,
          codeTemplate: `int multiply(int x, int y)______`,
          expectedAnswer: ';',
          hint: '英文分號。',
          explanation: '函式原型宣告通知編譯器函式的簽名，必須以分號 ; 結尾。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} void 函式提早中斷`,
          chineseDescription: `在 void 函式中，若遇到錯誤想提早結束執行，可單獨使用 return 關鍵字。`,
          codeTemplate: `void process_order(int stock) {\n  if (stock <= 0) ______;\n  ship_item();\n}`,
          expectedAnswer: 'return',
          hint: '返回關鍵字。',
          explanation: '在 void 函式中使用單獨的 return; 可以立即終止該函式執行並返回。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 區域變數 (Local Variable) 作用域`,
          chineseDescription: `在函式內部宣告的變數稱為區域變數。請填寫宣告型別 int。`,
          codeTemplate: `void compute() {\n  ______ local_counter = 0;\n}`,
          expectedAnswer: 'int',
          hint: '整數型態。',
          explanation: '區域變數僅在宣告它的大括號作用域 { ... } 內有效，函式結束時自動銷毀。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 函式多參數逗號分隔`,
          chineseDescription: `在函式參數列中，多個參數之間必須使用什麼標點符號分隔？`,
          codeTemplate: `void set_farm_status(int moisture______ int temperature) { }`,
          expectedAnswer: ',',
          hint: '英文逗號。',
          explanation: '函式參數清單中使用逗號 , 分隔多個輸入參數。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 13: 🧠 演算法入門 (Levels 121 ～ 130) [延伸／競賽入門]
  // =========================================================================
  if (fieldId >= 121 && fieldId <= 130) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 引入標準演算法標頭檔`,
          chineseDescription: `使用 std::sort、std::max 等常用演算法時，必須引入哪個標頭檔？`,
          codeTemplate: `#include <__________>`,
          expectedAnswer: 'algorithm',
          hint: '演算法英文單字。',
          explanation: '#include <algorithm> 是 C++ STL 中最核心的演算法函式庫。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 兩變數數值交換 std::swap`,
          chineseDescription: `請呼叫標準演算法庫中的 swap 函式交換變數 a 與 b 的數值。`,
          codeTemplate: `std::______(a, b);`,
          expectedAnswer: 'swap',
          hint: '交換英文單字。',
          explanation: 'std::swap(a, b) 能高效交換兩個變數的內容。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 陣列升冪快速排序 std::sort`,
          chineseDescription: `對一維陣列 arr（大小為 N）進行升冪排序，請填寫演算法名稱 sort。`,
          codeTemplate: `std::______(arr, arr + N);`,
          expectedAnswer: 'sort',
          hint: '排序英文單字。',
          explanation: 'std::sort(開始指標, 結束指標) 底層採用混合內省排序 (Introsort)，平均時間複雜度為 O(N log N)。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 快速求取兩者較大值 std::max`,
          chineseDescription: `比較數值 x 與 y 並回傳兩者中較大的一個，應呼叫哪個函式？`,
          codeTemplate: `int larger = std::______(x, y);`,
          expectedAnswer: 'max',
          hint: 'Maximum 縮寫。',
          explanation: 'std::max(a, b) 回傳 a 與 b 中的較大者。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 快速求取兩者較小值 std::min`,
          chineseDescription: `比較數值 x 與 y 並回傳兩者中較小的一個，應呼叫哪個函式？`,
          codeTemplate: `int smaller = std::______(x, y);`,
          expectedAnswer: 'min',
          hint: 'Minimum 縮寫。',
          explanation: 'std::min(a, b) 回傳 a 與 b 中的較小者。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 降冪排序比較子 std::greater`,
          chineseDescription: `欲使用 std::sort 進行由大到小的降冪排序，應傳入第三個比較參數 greater<int>()。`,
          codeTemplate: `std::sort(arr, arr + N, std::______<int>());`,
          expectedAnswer: 'greater',
          hint: '更大/大於英文單字。',
          explanation: 'std::greater<T>() 比較器會使 std::sort 依照降冪排列。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 線性循序搜尋法 (Linear Search)`,
          chineseDescription: `在陣列中逐一比對每個元素是否等於目標 target。請填寫相等運算子 ==。`,
          codeTemplate: `int find_index = -1;\nfor (int i = 0; i < N; i++) {\n  if (arr[i] ______ target) {\n    find_index = i;\n    break;\n  }\n}`,
          expectedAnswer: '==',
          hint: '相等運算子。',
          explanation: '線性搜尋從頭到尾遍歷陣列，時間複雜度為 O(N)。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 尋找區間最大元素指標 max_element`,
          chineseDescription: `尋找陣列中最大元素的記憶體位置，應使用演算法 max_element。`,
          codeTemplate: `int* max_ptr = std::____________(arr, arr + N);`,
          expectedAnswer: 'max_element',
          hint: '最大元素英文。',
          explanation: 'std::max_element 回傳指向範圍內最大元素的迭代器或指標。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 二分搜尋前置條件（必須已排序）`,
          chineseDescription: `在進行二分搜尋 (Binary Search, O(log N)) 之前，陣列必須先經過什麼處理？`,
          codeTemplate: `std::______(arr, arr + N);\nbool exists = std::binary_search(arr, arr + N, target);`,
          expectedAnswer: 'sort',
          hint: '排序函式。',
          explanation: '二分搜尋法要求資料必須是有序的（Monotonic / Sorted）。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 計數統計次數陣列 (Bucket Counting)`,
          chineseDescription: `利用分數作為索引統計出現次數，將 count_arr[score] 增加 1。`,
          codeTemplate: `count_arr[score]______;`,
          expectedAnswer: '++',
          hint: '遞增運算子。',
          explanation: '計數排序/桶子法以數值本身作為下標進行 O(1) 頻率累加。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 14: 📚 STL 與資料結構 (Levels 131 ～ 140) [自學延伸]
  // =========================================================================
  if (fieldId >= 131 && fieldId <= 140) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 引入動態陣列 vector 標頭檔`,
          chineseDescription: `使用 C++ 最常用的動態長度陣列容器 vector 時，應引入哪個標頭檔？`,
          codeTemplate: `#include <______>`,
          expectedAnswer: 'vector',
          hint: '向量/動態陣列英文單字。',
          explanation: '#include <vector> 提供自動管理記憶體容量的動態陣列容器。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 動態陣列 vector 宣告`,
          chineseDescription: `宣告一個存放整數的動態陣列 items。請填寫容器關鍵字 vector。`,
          codeTemplate: `std::______<int> items;`,
          expectedAnswer: 'vector',
          hint: '動態陣列容器名。',
          explanation: 'std::vector<T> 是 C++ STL 中最推薦使用的通用循序容器。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 尾端加入元素 push_back()`,
          chineseDescription: `向 vector 容器的尾端新增一個元素 ${subLevel * 10}，應呼叫哪個成員函式？`,
          codeTemplate: `items.____________(${subLevel * 10});`,
          expectedAnswer: 'push_back',
          hint: '推入尾端英文名稱。',
          explanation: 'v.push_back(val) 將元素加入 vector 尾端，並在空間不足時自動重新配置兩倍記憶體。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 取得容器元素個數 size()`,
          chineseDescription: `取得 vector 當前包含的元素總數，應呼叫成員函式 size()。`,
          codeTemplate: `int count = items.______();`,
          expectedAnswer: 'size',
          hint: '大小英文單字。',
          explanation: 'v.size() 回傳當前實際存放的元素個數。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 檢查容器是否為空 empty()`,
          chineseDescription: `檢查 vector 是否為空（元素個數是否為 0），應呼叫哪個成員函式？`,
          codeTemplate: `if (items.______()) {\n  std::cout << "背包是空的";\n}`,
          expectedAnswer: 'empty',
          hint: '空的英文單字。',
          explanation: 'v.empty() 回傳 bool 值，若容器內沒有元素則為 true。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 清空所有元素 clear()`,
          chineseDescription: `將 vector 內的所有元素全部清空移除，應呼叫哪個成員函式？`,
          codeTemplate: `items.______();`,
          expectedAnswer: 'clear',
          hint: '清除/清空英文單字。',
          explanation: 'v.clear() 會移除 vector 內的所有元素，使 size() 變為 0。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 現代 C++ 範圍迴圈 (Range-based for)`,
          chineseDescription: `使用現代 C++ 的 Range-based for 逐一取出 vector 內的每個元素 x。請填寫冒號 :。`,
          codeTemplate: `for (int x ______ items) {\n  std::cout << x << " ";\n}`,
          expectedAnswer: ':',
          hint: '英文冒號。',
          explanation: 'for (auto x : container) 是 C++11 引進的範圍迴圈，能優雅走訪任何 STL 容器。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} Vector 排序起點迭代器 begin()`,
          chineseDescription: `使用 std::sort 對 vector 進行排序時，應傳入開頭迭代器 v.begin() 與結尾迭代器 v.end()。`,
          codeTemplate: `std::sort(items.______(), items.end());`,
          expectedAnswer: 'begin',
          hint: '開始英文單字。',
          explanation: 'v.begin() 回傳指向 vector 第一個元素的迭代器 (Iterator)。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 雙元素組合容器 std::pair`,
          chineseDescription: `宣告一個同時綁定整數（編號）與字串（名稱）的雙值對 pair。`,
          codeTemplate: `std::______<int, std::string> crop_record;`,
          expectedAnswer: 'pair',
          hint: '配對/一雙英文單字。',
          explanation: 'std::pair<T1, T2> 將兩個不同型別的數據組合成單一物件。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} Pair 第一個元素存取 .first`,
          chineseDescription: `存取 pair 物件 p 的第一個資料成員，應使用哪一個成員名稱？`,
          codeTemplate: `std::cout << "作物編號: " << crop_record.______;`,
          expectedAnswer: 'first',
          hint: '第一英文單字。',
          explanation: 'std::pair 具有兩個 public 成員變數：.first 與 .second。'
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 15: 🚀 真正的 C++ 延伸 (Levels 141 ～ 150) [自學延伸]
  // =========================================================================
  if (fieldId >= 141 && fieldId <= 150) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `${prefix} 參照宣告 Reference &`,
          chineseDescription: `宣告一個變數 x 的參照（別名）ref_x。請填入參照宣告符號 &。`,
          codeTemplate: `int x = 100;\nint______ ref_x = x;`,
          expectedAnswer: '&',
          hint: 'And 符號。',
          explanation: 'int& ref = x 代表 ref 是 x 的參照別名，修改 ref_x 就等同於修改本體 x。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `${prefix} 傳參照呼叫 (Pass by Reference)`,
          chineseDescription: `在函式參數中加上 & 符號，即可直接修改外部傳入的實參（如實作交換函式）。`,
          codeTemplate: `void custom_swap(int______ a, int& b) {\n  int temp = a; a = b; b = temp;\n}`,
          expectedAnswer: '&',
          hint: '參照符號。',
          explanation: 'Pass by reference 避免了複製成本，並允許函式直接修改外部傳入的變數本體。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `${prefix} 指標變數取位址運算子 &`,
          chineseDescription: `取得變數 value 的記憶體位址並存入指標 ptr 中，應在 value 前加上什麼運算子？`,
          codeTemplate: `int value = 42;\nint* ptr = ______value;`,
          expectedAnswer: '&',
          hint: '取位址符號。',
          explanation: '& 運算子用於取出變數在記憶體中的十六進位位址 (Address-of Operator)。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `${prefix} 指標反參考取值運算子 *`,
          chineseDescription: `透過指標 ptr 取出它所指向的記憶體位置之實際數值（Dereference）。`,
          codeTemplate: `int real_value = ______ptr;`,
          expectedAnswer: '*',
          hint: '星號。',
          explanation: '*ptr 為反參考（Dereference）運算，順著指標位址讀取或寫入真正的資料。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `${prefix} 結構體自訂複合型態 struct`,
          chineseDescription: `定義一個包含名稱與價格的自訂作物資料結構。請填寫關鍵字 struct。`,
          codeTemplate: `______ CropItem {\n  std::string name;\n  int price;\n};`,
          expectedAnswer: 'struct',
          hint: '結構體英文關鍵字。',
          explanation: 'struct 允許開發者將多個不同型態的資料欄位打包成一個自訂型態。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `${prefix} 物件導向類別 class`,
          chineseDescription: `定義一個物件導向類別 FarmManager。請填寫關鍵字 class。`,
          codeTemplate: `______ FarmManager {\npublic:\n  void auto_irrigate();\n};`,
          expectedAnswer: 'class',
          hint: '類別英文關鍵字。',
          explanation: 'class 是 C++ 物件導向程式設計（OOP）的核心，預設成員權限為 private。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `${prefix} 類別公開成員權限 public`,
          chineseDescription: `在 class 內部標示外部程式碼可以直接存取的公有成員區域。請填寫權限關鍵字 public。`,
          codeTemplate: `class Garden {\n______:\n  int flower_count;\n};`,
          expectedAnswer: 'public',
          hint: '公開英文單字。',
          explanation: 'public 宣告其後的成員為公開權限，類別外部的所有程式碼皆可自由調用。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `${prefix} 自動型別推導 auto`,
          chineseDescription: `讓編譯器依據右側初始化表達式自動推導變數型態（C++11 特性）。請填寫關鍵字 auto。`,
          codeTemplate: `______ current_time = std::chrono::system_clock::now();`,
          expectedAnswer: 'auto',
          hint: '自動英文單字。',
          explanation: 'auto 關鍵字讓編譯器在編譯期自動判定並推導變數的型態，大幅簡化複雜型別撰寫。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `${prefix} 匿名函式 Lambda 表達式`,
          chineseDescription: `C++11 支援在程式碼中就地撰寫匿名函式 Lambda。請填寫 Lambda 補捉引導中括號 []。`,
          codeTemplate: `auto print_msg = ______() {\n  std::cout << "Lambda 執行完畢！\\n";\n};`,
          expectedAnswer: '[]',
          hint: '一對中括號。',
          explanation: '[] (params) { body } 是 C++11 Lambda 表達式語法，中括號為變數捕獲列表。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `${prefix} 關聯字典容器 std::map`,
          chineseDescription: `宣告一個以作物名稱（string）映射到庫存數量（int）的關聯容器 map。`,
          codeTemplate: `std::______<std::string, int> farm_inventory;`,
          expectedAnswer: 'map',
          hint: '地圖/映射英文單字。',
          explanation: 'std::map 採用紅黑樹（Red-Black Tree）實作，支援以 key-value 鍵值對在 O(log N) 時間內完成檢索。'
        };
      }
    }
  }

  // Fallback card just in case
  return {
    id, fieldId,
    title: `${prefix} C++ 科技農場學習題`,
    chineseDescription: `請宣告標準 C++ 程式進入點 main 函式的整數回傳型別。`,
    codeTemplate: `______ main() {\n  return 0;\n}`,
    expectedAnswer: 'int',
    hint: '整數型別。',
    explanation: 'C++ 標準規範 main 必須回傳 int 型態。'
  };
};

const generateCards = (): CPlusPlusCard[] => {
  const allCards: CPlusPlusCard[] = [];

  for (let fieldId = 1; fieldId <= 150; fieldId++) {
    for (let cardIndex = 1; cardIndex <= 10; cardIndex++) {
      allCards.push(getCardForFieldAndIndex(fieldId, cardIndex));
    }
  }

  return allCards;
};

export const CPP_CARDS_DATA: CPlusPlusCard[] = generateCards();
