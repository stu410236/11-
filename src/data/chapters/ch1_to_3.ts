import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';

/**
 * 產生第 1~3 章（Fields 1～30）之高品質、多樣化題庫
 * 涵蓋：入門與輸出、變數與資料型別、輸入與基本運算
 * 題型：fill_blank, debug, application, predict_output, complete_code, code_reading
 */
export function getCh1To3Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const id = `f${fieldId}_${cardIndex}`;
  const chapter = getChapterForField(fieldId);
  const subLevel = fieldId - chapter.startId + 1; // 1 to 10 within chapter
  const prefix = `[第${chapter.chapter}章 ${chapter.topic}] #${fieldId}`;

  // =========================================================================
  // CHAPTER 1: 🌱 C++ 入門與輸出 (Fields 1 ～ 10) [高中核心]
  // =========================================================================
  if (fieldId >= 1 && fieldId <= 10) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 引入標準輸入輸出標頭檔`,
          chineseDescription: '在 C++ 程式最頂端，我們必須使用 #include 預處理指令引入標準函式庫。<iostream> 能提供標準輸出入串流支援。請填入標頭檔名稱。',
          codeTemplate: '#include <__________>\nusing namespace std;\nint main() {\n  cout << "良田啟動";\n  return 0;\n}',
          expectedAnswer: 'iostream',
          acceptedAnswers: ['iostream'],
          hint: '輸入輸出串流（Input/Output Stream）的縮寫。',
          explanation: '#include <iostream> 是 C++ 專案最關鍵的起點，提供 std::cout 與 std::cin 等物件宣告。',
          difficulty: 1
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 cout 輸出少分號錯誤`,
          chineseDescription: '這段程式碼在編譯時會發生語法錯誤（syntax error）。請找出並補上行尾遺漏的關鍵標點符號。',
          buggyCode: 'int main() {\n  cout << "歡迎來到第 ' + fieldId + ' 區良田"\n  return 0;\n}',
          originalBug: 'cout << "歡迎來到第 ' + fieldId + ' 區良田"',
          fixedLine: 'cout << "歡迎來到第 ' + fieldId + ' 區良田";',
          codeTemplate: 'int main() {\n  cout << "歡迎來到第 ' + fieldId + ' 區良田"______\n  return 0;\n}',
          expectedAnswer: ';',
          acceptedAnswers: [';'],
          hint: 'C++ 每個獨立敘述句的結尾都必須加上分號。',
          explanation: '【錯誤原因剖析】C++ 編譯器使用分號 ; 作為陳述句的結束標誌，遺漏分號會導致語法解析失敗。',
          difficulty: 1
        };
      }
      case 3: {
        const farmName = `綠意第${fieldId}號`;
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 印出農莊歡迎標語`,
          chineseDescription: `【情境】為新開拓的農場印製歡迎布條。請使用 cout 輸出文字「${farmName}」。`,
          scenario: `在螢幕上印出指定農莊名稱：${farmName}`,
          codeTemplate: `cout << "______";`,
          expectedAnswer: farmName,
          acceptedAnswers: [farmName],
          hint: `直接填入雙引號內的農莊文字：${farmName}`,
          explanation: 'cout 搭配雙引號 "" 可以輸出字串常面值（String Literal）。',
          difficulty: 1
        };
      }
      case 4: {
        const water = fieldId * 10;
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 追蹤連續輸出結果`,
          chineseDescription: '閱讀以下 C++ 程式碼，預測終端機最終會印出什麼內容？',
          codeTemplate: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "水量:" << ${water};\n  return 0;\n}`,
          expectedAnswer: `水量:${water}`,
          acceptedAnswers: [`水量:${water}`],
          hint: `將字串與數字直接無縫串接：水量:${water}`,
          explanation: 'cout << 可以串接多個資料項目，依序輸出至螢幕而不會自動換行。',
          difficulty: 1
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 換行控制 endl 語法`,
          chineseDescription: '請填入 C++ 用來輸出換行並清空緩衝區的標準串流操控器 endl。',
          codeTemplate: 'cout << "第 1 行" << ______ << "第 2 行";',
          expectedAnswer: 'endl',
          acceptedAnswers: ['endl', 'std::endl', '"\\n"', "'\\n'"],
          hint: 'End of line 的縮寫。',
          explanation: 'endl (End Line) 會在輸出中加入換行字元，並立即 flush 輸出緩衝區。',
          difficulty: 1
        };
      }
      case 6: {
        const item = subLevel % 2 === 1 ? '高麗菜' : '胡蘿蔔';
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 格式化告示牌換行`,
          chineseDescription: `【情境】製作貨物清單，要求第一行印出「品名: ${item}」，第二行換行印出「狀態: 完好」。請填寫換行轉義字元。`,
          scenario: `使用 \\n 換行符號格式化輸出`,
          codeTemplate: `cout << "品名: ${item}" << "______" << "狀態: 完好";`,
          expectedAnswer: '\\n',
          acceptedAnswers: ['\\n', 'endl', '"\\n"'],
          hint: '正斜線還是反斜線？是反斜線 n。',
          explanation: '\\n 是換行逸出字元（Escape Character），佔用空間小且效率高於 endl。',
          difficulty: 1
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正字串引號使用錯誤`,
          chineseDescription: '這段程式碼在印出多字元字串時誤用了單引號造成編譯失敗。請改用雙引號修復。',
          buggyCode: `cout << 'Hello C++' << endl; // 錯誤：單引號只能包單一字元`,
          originalBug: `'Hello C++'`,
          fixedLine: `"Hello C++"`,
          codeTemplate: `cout << ______Hello C++______ << endl;`,
          expectedAnswer: '"',
          acceptedAnswers: ['"', '""', '"Hello C++"'],
          hint: '多個字元的字串字面值必須使用雙引號 ""。',
          explanation: '【錯誤原因剖析】單引號 \'\' 僅能用於單一字元 char（如 \'A\'），字串必須使用雙引號 ""。',
          difficulty: 1
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：命名空間的作用`,
          chineseDescription: '請閱讀以下程式碼，選出 using namespace std; 的主要用途：',
          codeTemplate: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hi";\n  return 0;\n}`,
          options: [
            'A. 加快程式執行速度 10 倍',
            'B. 讓程式碼可直接使用 cout 與 endl 而不需每次前綴 std::',
            'C. 自動幫所有變數初始化為 0',
            'D. 引入所有數學三角函數函式庫'
          ],
          correctOption: 1,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b', '1', 'B. 讓程式碼可直接使用 cout 與 endl 而不需每次前綴 std::'],
          hint: '標準庫命名空間簡化呼叫。選 B。',
          explanation: 'using namespace std; 將 std 命名空間展開，免除每次撰寫 std::cout 的繁瑣。',
          difficulty: 1
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} main 函式正常終止回傳`,
          chineseDescription: '請補齊 main 函式結尾處向作業系統回傳成功結束代碼的關鍵敘述。',
          codeTemplate: `int main() {\n  cout << "運行成功";\n  ______ 0;\n}`,
          expectedAnswer: 'return',
          acceptedAnswers: ['return', 'return '],
          hint: '函式回傳關鍵字。',
          explanation: 'return 0; 表示 main 函式正常結束並將 Exit Status 0 回傳給作業系統。',
          difficulty: 1
        };
      }
      case 10: {
        const harvestCount = fieldId * 15;
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 綜合輸出農場收穫報表`,
          chineseDescription: `【情境】第 ${fieldId} 區收成完畢，需向農會系統回報「收穫: ${harvestCount} 箱」。請完成串流輸出。`,
          scenario: `將文字與數字變數無縫串流印出`,
          codeTemplate: `cout << "收穫: " ______ ${harvestCount} << " 箱" << endl;`,
          expectedAnswer: '<<',
          acceptedAnswers: ['<<'],
          hint: '輸出串流插入運算子（向左雙角括號）。',
          explanation: 'cout 透過多個 << 串接，可將字串與數值漂亮地拼接成一段報表。',
          difficulty: 1
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 2: 📦 變數與資料型別 (Fields 11 ～ 20) [高中核心]
  // =========================================================================
  if (fieldId >= 11 && fieldId <= 20) {
    switch (cardIndex) {
      case 1: {
        const seedCount = subLevel * 25;
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 整數型別 int 宣告`,
          chineseDescription: `請使用 C++ 最常用的 32 位元整數型態關鍵字，宣告變數 seeds 並初始化為 ${seedCount}。`,
          codeTemplate: `______ seeds = ${seedCount};`,
          expectedAnswer: 'int',
          acceptedAnswers: ['int'],
          hint: 'Integer 的英文縮寫（3 個字母）。',
          explanation: 'int 是 C++ 最基礎的整數型態，在現代環境通常佔用 4 位元組（約 -21 億 ~ +21 億）。',
          difficulty: 1
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正變數未宣告就直接使用`,
          chineseDescription: '這段程式碼編譯時報錯「error: total was not declared in this scope」。請在指派前加上整數型別宣告。',
          buggyCode: `total = 100; // 錯誤：未先宣告型態`,
          originalBug: `total = 100;`,
          fixedLine: `int total = 100;`,
          codeTemplate: `______ total = 100;\ncout << total;`,
          expectedAnswer: 'int',
          acceptedAnswers: ['int'],
          hint: '宣告整數型別 int。',
          explanation: '【錯誤原因剖析】C++ 是強型別靜態語言，所有變數在第一次使用前必須明確宣告資料型別。',
          difficulty: 1
        };
      }
      case 3: {
        const price = (subLevel * 12.5).toFixed(1);
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 計算小數單價：double 宣告`,
          chineseDescription: `【情境】良田每公斤蔬果收購單價為 ${price} 元。請宣告雙精度浮點數變數 price。`,
          scenario: `儲存含小數點的精確金額`,
          codeTemplate: `______ price = ${price};`,
          expectedAnswer: 'double',
          acceptedAnswers: ['double', 'float'],
          hint: '雙精度浮點數關鍵字。',
          explanation: 'double 提供 64 位元小數儲存，具備約 15 位有效數字，非常適合儲存金額與物理測量值。',
          difficulty: 1
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測整數除法小數截斷`,
          chineseDescription: '預測以下程式輸出的數字：兩個整數相除時，小數點會發生什麼事？',
          codeTemplate: `int a = 7;\nint b = 2;\ncout << a / b;`,
          expectedAnswer: '3',
          acceptedAnswers: ['3'],
          hint: '7 除以 2 在整數運算下會無條件捨去小數！',
          explanation: '在 C++ 中，整數 / 整數 的結果依然是整數，小數部分會直接被截斷（7/2 = 3）。',
          difficulty: 2
        };
      }
      case 5: {
        const letter = String.fromCharCode(65 + (subLevel % 5));
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 字元型別 char 宣告`,
          chineseDescription: `請宣告字元型態變數 grade，用來儲存品質評級 '${letter}'。`,
          codeTemplate: `______ grade = '${letter}';`,
          expectedAnswer: 'char',
          acceptedAnswers: ['char'],
          hint: 'Character 的縮寫。',
          explanation: 'char 用來儲存單一 ASCII 字元，大小為 1 個位元組，賦值需使用單引號 \'\'。',
          difficulty: 1
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 倉庫常數保護 const`,
          chineseDescription: '【情境】農莊倉庫容量上限為 500，且設定後絕不可被程式意外竄改。請填寫常數保護修飾字。',
          scenario: `宣告唯讀保護常數`,
          codeTemplate: `______ int MAX_CAPACITY = 500;`,
          expectedAnswer: 'const',
          acceptedAnswers: ['const'],
          hint: 'Constant 的縮寫。',
          explanation: 'const 修飾的變數為唯讀常數，一旦初始化後任何修改企圖都會在編譯期被阻止。',
          difficulty: 1
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正常數被修改的編譯錯誤`,
          chineseDescription: 'const 常數不可被重新賦值。如果想要讓變數在後續能自由累加，請將錯誤的 const 關鍵字移除。若要在一般可變變數宣告整數 x，應直接使用什麼型別？',
          buggyCode: `const int x = 10;\nx = 20; // 錯誤：嘗試修改 const 常數`,
          originalBug: `const int x = 10;`,
          fixedLine: `int x = 10;`,
          codeTemplate: `// 移除 const，改為普通整數變數宣告：\n______ x = 10;\nx = 20;`,
          expectedAnswer: 'int',
          acceptedAnswers: ['int'],
          hint: '普通整數型別 int。',
          explanation: '【錯誤原因剖析】const 常數具備唯讀屬性，若變數需要在運行中改變值，不可加上 const。',
          difficulty: 2
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：布林變數值判斷`,
          chineseDescription: '閱讀以下程式，請問螢幕會輸出什麼？（提示：在 C++ 中 cout 輸出 bool 預設為數字）',
          codeTemplate: `bool isWatered = true;\ncout << isWatered;`,
          options: [
            'A. true',
            'B. 1',
            'C. false',
            'D. 0'
          ],
          correctOption: 1,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b', '1', 'B. 1'],
          hint: 'cout 預設將 true 印為數字 1，false 印為 0。選 B。',
          explanation: '在 C++ 中，cout 預設將布林值 true 輸出為 1，false 輸出為 0。',
          difficulty: 2
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 測量型別記憶體大小 sizeof`,
          chineseDescription: '請使用 C++ 內建運算子測量 double 型別在記憶體中所佔的位元組數（Bytes）。',
          codeTemplate: `int byteSize = ______(double);\ncout << "double 佔用 " << byteSize << " Bytes";`,
          expectedAnswer: 'sizeof',
          acceptedAnswers: ['sizeof'],
          hint: '尺寸大小運算子（6 個字母）。',
          explanation: 'sizeof 是編譯期運算子，回傳資料型態或變數在記憶體中佔用的位元組數量。',
          difficulty: 2
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 64 位元大數儲存 long long`,
          chineseDescription: '【情境】記錄全台灣農作物的總收穫數量（超過 50 億，超出一般 int 的 21 億上限）。請宣告 64 位元長整數。',
          scenario: `防止 32 位元整數溢位（Integer Overflow）`,
          codeTemplate: `______ totalHarvest = 5000000000LL;`,
          expectedAnswer: 'long long',
          acceptedAnswers: ['long long', 'long long int'],
          hint: '兩個 long 組合。',
          explanation: '32 位元 int 上限約 21.4 億，超過時會發生溢位，必須使用 64 位元的 long long（上限約 9x10^18）。',
          difficulty: 2
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 3: ⌨️ 輸入與基本運算 (Fields 21 ～ 30) [高中核心]
  // =========================================================================
  if (fieldId >= 21 && fieldId <= 30) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 標準鍵盤輸入 cin 語法`,
          chineseDescription: '請填寫 C++ 用來從鍵盤讀取使用者輸入的標準輸入串流物件名稱（Console Input）。',
          codeTemplate: `int n;\n______ >> n;`,
          expectedAnswer: 'cin',
          acceptedAnswers: ['cin', 'std::cin'],
          hint: 'Console Input 的簡寫。',
          explanation: 'cin 是標準輸入串流物件，搭配串流提取運算子 >> 可從鍵盤讀取資料存入變數。',
          difficulty: 1
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 cin 運算子方向錯誤`,
          chineseDescription: '這段程式碼在讀取鍵盤輸入時編譯報錯。初學者常把 cin 的 >> 誤打成 cout 的 <<。請修正運算子。',
          buggyCode: `int age;\ncin << age; // 錯誤：cin 應搭配 >>`,
          originalBug: `cin << age;`,
          fixedLine: `cin >> age;`,
          codeTemplate: `int age;\ncin ______ age;`,
          expectedAnswer: '>>',
          acceptedAnswers: ['>>'],
          hint: '向右的雙角括弧 >>（資料流入變數）。',
          explanation: '【錯誤原因剖析】cin 必須搭配串流提取運算子 >>（資料從鍵盤流向右側變數）；cout 搭配 <<。',
          difficulty: 1
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 矩形農田面積計算`,
          chineseDescription: '【情境】給定長方形農田的長度 width 與寬度 height，請完成計算面積 area 的表達式。',
          scenario: `計算面積 = 長 * 寬`,
          codeTemplate: `int width = 8;\nint height = 5;\nint area = ______;\ncout << "面積: " << area;`,
          expectedAnswer: 'width * height',
          acceptedAnswers: ['width * height', 'width*height', 'height * width', 'height*width'],
          hint: '長乘以寬。使用乘法符號 *。',
          explanation: 'C++ 乘法運算子為星號 *，計算面積即為 width * height。',
          difficulty: 1
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測取餘數運算子 % 結果`,
          chineseDescription: '請計算並預測以下取餘數（Modulo）程式碼的輸出結果：',
          codeTemplate: `int seeds = 17;\nint pots = 5;\ncout << seeds % pots;`,
          expectedAnswer: '2',
          acceptedAnswers: ['2'],
          hint: '17 除以 5 的餘數是多少？（17 = 5 * 3 + 2）',
          explanation: '% 是取餘數運算子（Modulo），17 % 5 = 2。',
          difficulty: 1
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 三次考試平均成績計算（避免整數除法）`,
          chineseDescription: '【情境】小明三次段考分數為 a=80, b=90, c=95。請完成計算精確平均值的 double 表達式（除以 3.0）。',
          scenario: `計算平均值避免小數點被截斷`,
          codeTemplate: `int a = 80, b = 90, c = 95;\ndouble avg = ______;\ncout << avg;`,
          expectedAnswer: '(a + b + c) / 3.0',
          acceptedAnswers: ['(a + b + c) / 3.0', '(a+b+c)/3.0', '(a + b + c) / 3.0f', '(double)(a + b + c) / 3'],
          hint: '三數相加括號後除以 3.0：(a + b + c) / 3.0',
          explanation: '使用 3.0 浮點常數除法，可促使編譯器自動將分子提升為 double 運算，保留精確小數位。',
          difficulty: 2
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 複合指定運算子 += 累加`,
          chineseDescription: '若要將變數 coins 增加 50（等同於 coins = coins + 50），可使用簡潔的複合指定運算子：',
          codeTemplate: `int coins = 100;\ncoins ______ 50; // coins 變為 150`,
          expectedAnswer: '+=',
          acceptedAnswers: ['+='],
          hint: '加號接等號。',
          explanation: '+= 是複合加法指定運算子，coins += 50 比 coins = coins + 50 更簡潔俐落。',
          difficulty: 1
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正遞增運算子拼寫錯誤`,
          chineseDescription: '想要讓計數器 count 加 1，程式碼誤寫成 +++。請修正為標準後置遞增運算子。',
          buggyCode: `int count = 0;\ncount+++; // 語法錯誤`,
          originalBug: `count+++;`,
          fixedLine: `count++;`,
          codeTemplate: `int count = 0;\ncount______;`,
          expectedAnswer: '++',
          acceptedAnswers: ['++'],
          hint: '遞增運算子為兩個加號 ++。',
          explanation: '【錯誤原因剖析】C++ 的遞增運算子為 ++（等同於 + 1），沒有三個加號的語法。',
          difficulty: 1
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 追蹤前置與後置遞增差異`,
          chineseDescription: '預測以下程式碼最終印出的值（注意：後置遞增是在本行敘述運算完後才加 1）：',
          codeTemplate: `int x = 5;\nint y = x++;\ncout << y << " " << x;`,
          expectedAnswer: '5 6',
          acceptedAnswers: ['5 6', '5  6'],
          hint: 'y 先得到 x 原本的值 5，接著 x 自增為 6。',
          explanation: '後置遞增 x++ 先回傳當前值（5）給 y，隨後 x 本身遞增為 6，因此輸出 "5 6"。',
          difficulty: 3
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 攝氏溫度轉華氏溫度計算`,
          chineseDescription: '【情境】氣象監測站測得攝氏溫度 C。華氏溫度公式為 F = C * 9.0 / 5.0 + 32。請補齊計算表達式。',
          scenario: `生活物理單位換算`,
          codeTemplate: `double c = 25.0;\ndouble f = ______;\ncout << "華氏: " << f;`,
          expectedAnswer: 'c * 9.0 / 5.0 + 32',
          acceptedAnswers: ['c * 9.0 / 5.0 + 32', 'c*9.0/5.0+32', 'c * 9 / 5.0 + 32', 'c * 1.8 + 32', '1.8 * c + 32'],
          hint: 'c 乘以 9.0 除以 5.0 加上 32。',
          explanation: '溫度轉換公式：F = C * 9/5 + 32。使用浮點數除法確保溫度轉換計算精準無誤。',
          difficulty: 2
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：強制型別轉換 static_cast`,
          chineseDescription: '閱讀以下程式碼，選出 static_cast<double>(a) 的主要目的：',
          codeTemplate: `int a = 5, b = 2;\ndouble res = static_cast<double>(a) / b;\ncout << res;`,
          options: [
            'A. 將 a 永久改為小數型態變數',
            'B. 暫時將 a 轉為 double，使除法成為浮點數運算得到 2.5 而非 2',
            'C. 清空變數 a 的記憶體',
            'D. 檢查 a 是否小於 b'
          ],
          correctOption: 1,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b', '1', 'B. 暫時將 a 轉為 double，使除法成為浮點數運算得到 2.5 而非 2'],
          hint: '避免整數截斷，獲得精確 2.5。選 B。',
          explanation: 'static_cast<double>(a) 進行明確型別轉換，讓除法在浮點數領域進行，輸出 2.5。',
          difficulty: 2
        };
      }
    }
  }

  // Fallback card
  return {
    id, fieldId,
    type: 'fill_blank',
    title: `${prefix} 基礎 C++ 題目`,
    chineseDescription: '請填入 C++ main 函式整數回傳型別。',
    codeTemplate: '______ main() {\n  return 0;\n}',
    expectedAnswer: 'int',
    hint: '整數型別 int。',
    explanation: 'main 固定回傳 int 型別。',
    difficulty: 1
  };
}
