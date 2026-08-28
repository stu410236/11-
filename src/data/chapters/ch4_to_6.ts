import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';

/**
 * 產生第 4~6 章（Fields 31～60）之高品質、多樣化題庫
 * 涵蓋：條件判斷、多重選擇、while 迴圈
 * 題型：fill_blank, debug, application, predict_output, complete_code, code_reading
 */
export function getCh4To6Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const id = `f${fieldId}_${cardIndex}`;
  const chapter = getChapterForField(fieldId);
  const subLevel = fieldId - chapter.startId + 1; // 1 to 10 within chapter
  const prefix = `[第${chapter.chapter}章 ${chapter.topic}] #${fieldId}`;

  // =========================================================================
  // CHAPTER 4: 🚦 條件判斷 (Fields 31 ～ 40) [高中核心]
  // =========================================================================
  if (fieldId >= 31 && fieldId <= 40) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 基本 if 單一分支決策`,
          chineseDescription: '當條件判斷為 true 時執行特定程式區塊。請填入 C++ 條件分支關鍵字。',
          codeTemplate: `int water = ${subLevel * 10};\n______(water > 50) {\n  cout << "水量充足";\n}`,
          expectedAnswer: 'if',
          acceptedAnswers: ['if'],
          hint: '條件關鍵字「如果」。',
          explanation: 'if 是 C++ 最核心的分支語法，當括號內的布林條件成立時便執行後方大括號區塊。',
          difficulty: 1
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 if 判斷中賦值 = 與比較 == 混淆`,
          chineseDescription: '這段程式碼可以編譯，但條件判斷存在致命邏輯 Bug（將賦值 = 誤用為比較運算）。請修正 if 括號內的比較運算子。',
          buggyCode: `int age = 18;\nif (age = 18) { // 錯誤：這是賦值，永遠為 true\n  cout << "剛好成年";\n}`,
          originalBug: `if (age = 18)`,
          fixedLine: `if (age == 18)`,
          codeTemplate: `int age = 18;\nif (age ______ 18) {\n  cout << "剛好成年";\n}`,
          expectedAnswer: '==',
          acceptedAnswers: ['=='],
          hint: '比較相等必須使用雙等號 ==。',
          explanation: '【錯誤原因剖析】單等號 = 是賦值指定運算子；雙等號 == 才是比較兩者是否相等的關係運算子。',
          difficulty: 2
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 奇數與偶數判斷`,
          chineseDescription: '【情境】給定整數 n，若 n 除以 2 的餘數為 0 則為偶數。請完成判斷偶數的 if 條件表達式。',
          scenario: `利用取餘數運算子 % 判斷數字奇偶性`,
          codeTemplate: `int n = 42;\nif (______) {\n  cout << "偶數";\n} else {\n  cout << "奇數";\n}`,
          expectedAnswer: 'n % 2 == 0',
          acceptedAnswers: ['n % 2 == 0', 'n%2==0', 'n % 2 != 1', '0 == n % 2'],
          hint: 'n 對 2 取餘數等於 0：n % 2 == 0',
          explanation: 'n % 2 計算除以 2 的餘數，餘數為 0 代表整除（偶數），餘數為 1 代表奇數。',
          difficulty: 2
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測 if-else 分支執行結果`,
          chineseDescription: '請閱讀以下程式碼，預測終端機最終印出的文字：',
          codeTemplate: `int score = 75;\nif (score >= 90) {\n  cout << "A";\n} else if (score >= 60) {\n  cout << "B";\n} else {\n  cout << "C";\n}`,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b'],
          hint: '75 分小於 90 但大於等於 60，會進入哪一個分支？',
          explanation: '75 不符合 score >= 90，進入下一個 else if 判斷 75 >= 60 成立，因此印出 "B"。',
          difficulty: 2
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 兩數找較大值 Max`,
          chineseDescription: '【情境】給定兩個數 a 與 b，請完成判斷邏輯：若 a 大於 b 則輸出 a，否則輸出 b。',
          scenario: `找出兩數中的極大值`,
          codeTemplate: `int a = 15, b = 28;\nif (______) {\n  cout << a;\n} else {\n  cout << b;\n}`,
          expectedAnswer: 'a > b',
          acceptedAnswers: ['a > b', 'a>b', 'b < a', 'b<a', 'a >= b'],
          hint: '判斷 a 大於 b：a > b',
          explanation: 'a > b 比較兩數大小，若 a 較大則進入 true 分支印出 a，否則印出 b。',
          difficulty: 2
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 複合邏輯且 AND 運算子 &&`,
          chineseDescription: '若要同時滿足「分數大於等於 60」且「缺課次數小於 3」，應使用哪種邏輯 AND 運算子？',
          codeTemplate: `if (score >= 60 ______ absent < 3) {\n  cout << "及格通過";\n}`,
          expectedAnswer: '&&',
          acceptedAnswers: ['&&', 'and'],
          hint: '兩個 Ampersand 符號。',
          explanation: '&& 是邏輯 AND 運算子，只有當左右兩側條件皆為 true 時，整體才判定為 true。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 if 後方誤加分號的空敘述陷阱`,
          chineseDescription: '這段程式無論 temperature 是多少都會印出警告，因為 if 條件括號後方誤加了分號形成空敘述。請指出原本錯誤的那行少了什麼才能正確控制區塊，或直接將分號移除。',
          buggyCode: `int temp = 10;\nif (temp > 35); { // 致命錯誤：if 後多加了分號\n  cout << "高溫警告";\n}`,
          originalBug: `if (temp > 35);`,
          fixedLine: `if (temp > 35)`,
          codeTemplate: `int temp = 10;\nif (temp > 35)______ {\n  cout << "高溫警告";\n}`,
          expectedAnswer: '',
          acceptedAnswers: ['', ' '],
          hint: 'if 條件括號後方絕對不能直接加分號！本題保留空格即可。',
          explanation: '【錯誤原因剖析】if (cond); 後加分號會讓 if 成為一條空敘述，後續大括號內的程式碼將無條件執行！',
          difficulty: 3
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：邏輯短路求值 Short-Circuit`,
          chineseDescription: '閱讀以下程式碼，預測輸出結果（提示：邏輯 OR 運算子 || 左邊為 true 時，右邊會被短路不執行）：',
          codeTemplate: `int x = 5;\nif (true || (++x > 10)) {\n  cout << x;\n}`,
          options: [
            'A. 5 (因為短路求值，++x 根本沒有被執行)',
            'B. 6 (++x 依然會執行)',
            'C. 0',
            'D. 編譯錯誤'
          ],
          correctOption: 0,
          expectedAnswer: 'A',
          acceptedAnswers: ['A', 'a', '0', 'A. 5 (因為短路求值，++x 根本沒有被執行)'],
          hint: '短路運算：左邊已確定為 true，右邊跳過不跑。選 A。',
          explanation: 'C++ 的 || 運算子具備短路特性（Short-circuit evaluation），左側為 true 時右側表達式不被計算，x 維持 5。',
          difficulty: 3
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 區間範圍判斷（介於 18 到 65 歲之間）`,
          chineseDescription: '【情境】請補齊檢查 age 是否同時「大於等於 18」且「小於等於 65」的完整條件。',
          codeTemplate: `int age = 25;\nif (______) {\n  cout << "青年至中年青壯年農民";\n}`,
          expectedAnswer: 'age >= 18 && age <= 65',
          acceptedAnswers: ['age >= 18 && age <= 65', 'age>=18&&age<=65', '18 <= age && age <= 65', 'age <= 65 && age >= 18'],
          hint: 'age >= 18 搭配 && 運算子與 age <= 65。',
          explanation: '在 C++ 中不能寫 18 <= age <= 65，必須拆解為兩個條件並以邏輯 AND (&&) 連接。',
          difficulty: 2
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 百分制成績等第轉換等級判斷`,
          chineseDescription: '【情境】考試滿分 100 分。若 score >= 90 評為 A 等，否則若 score >= 80 評為 B 等。請完成 else if 條件。',
          scenario: `多分支條件決策`,
          codeTemplate: `int score = 85;\nif (score >= 90) {\n  cout << "A";\n} else if (______) {\n  cout << "B";\n}`,
          expectedAnswer: 'score >= 80',
          acceptedAnswers: ['score >= 80', 'score>=80', 'score > 79'],
          hint: '大於等於 80 分：score >= 80',
          explanation: '當第一個 if 不成立時，控制權進入 else if 檢查是否滿足 score >= 80。',
          difficulty: 2
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 5: 🔀 多重選擇 (Fields 41 ～ 50) [高中核心]
  // =========================================================================
  if (fieldId >= 41 && fieldId <= 50) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} switch 多分支語法關鍵字`,
          chineseDescription: '請填入 C++ 用來根據單一整數或字元表達式進行多路分支跳躍的 switch 關鍵字。',
          codeTemplate: `int choice = 2;\n______(choice) {\n  case 1: cout << "灌溉"; break;\n  case 2: cout << "施肥"; break;\n}`,
          expectedAnswer: 'switch',
          acceptedAnswers: ['switch'],
          hint: '開關/切換英文單字。',
          explanation: 'switch 語法能針對整數或字元變數進行高效的跳轉表分流。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 switch 忘記 break 造成貫穿（Fall-Through）`,
          chineseDescription: '執行這段程式當 choice=1 時竟然印出「收成施肥」，因為 case 1 漏掉了跳出分支的語句。請補齊跳出語句。',
          buggyCode: `switch(choice) {\n  case 1: cout << "收成"; // 忘記 break 會繼續往下執行\n  case 2: cout << "施肥"; break;\n}`,
          originalBug: `case 1: cout << "收成";`,
          fixedLine: `case 1: cout << "收成"; break;`,
          codeTemplate: `switch(choice) {\n  case 1:\n    cout << "收成";\n    ______;\n  case 2:\n    cout << "施肥";\n    break;\n}`,
          expectedAnswer: 'break',
          acceptedAnswers: ['break'],
          hint: '跳出 switch 的關鍵字。',
          explanation: '【錯誤原因剖析】switch 內的 case 若沒有 break，程式會繼續順流執行下一個 case（稱為貫穿 Fall-through）。',
          difficulty: 2
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 簡易四則運算機符號分支`,
          chineseDescription: '【情境】讀取運算字元 op。當 op 為 \'+\' 時印出兩數相加 a + b。請完成 case 標籤。',
          scenario: `字元分流計算機`,
          codeTemplate: `char op = '+';\nint a = 10, b = 5;\nswitch(op) {\n  case ______:\n    cout << a + b;\n    break;\n}`,
          expectedAnswer: "'+'",
          acceptedAnswers: ["'+'", "'+' ", "'+'"],
          hint: '單引號包住加號字元：\'+\'',
          explanation: 'switch 支援 char 字元常數分支，如 case \'+\':。',
          difficulty: 2
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測 switch 貫穿輸出結果`,
          chineseDescription: '請仔細觀察以下未加 break 的 switch 程式碼，預測輸出結果：',
          codeTemplate: `int x = 2;\nswitch(x) {\n  case 1: cout << "1";\n  case 2: cout << "2";\n  case 3: cout << "3";\n  default: cout << "D";\n}`,
          expectedAnswer: '23D',
          acceptedAnswers: ['23D', '23d'],
          hint: '從 case 2 進入後，由於都沒有 break，會一路往下執行直到結尾！',
          explanation: '因為 case 2、case 3 及 default 皆無 break，程式從 case 2 進入後連續輸出 "2"、"3"、"D"，結合成 "23D"。',
          difficulty: 3
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} switch 預設兜底分支 default`,
          chineseDescription: '當所有 case 皆無法匹配時，switch 會跳至哪一個預設標籤執行？',
          codeTemplate: `switch(mode) {\n  case 1: cout << "手動"; break;\n  ______:\n    cout << "未知模式"; break;\n}`,
          expectedAnswer: 'default',
          acceptedAnswers: ['default'],
          hint: '預設英文關鍵字。',
          explanation: 'default 是 switch 的預設分支，當傳入的值未匹配任何特定 case 時即由 default 處理。',
          difficulty: 2
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 三元條件運算子精簡求最大值`,
          chineseDescription: '【情境】使用 C++ 簡潔的三元運算子 (cond ? val1 : val2) 計算 a 與 b 的較大者。請補齊表達式。',
          scenario: `三元條件運算子 ?:`,
          codeTemplate: `int a = 20, b = 35;\nint maxVal = (______) ? a : b;\ncout << maxVal;`,
          expectedAnswer: 'a > b',
          acceptedAnswers: ['a > b', 'a>b', 'b < a', 'a >= b'],
          hint: '若 a 大於 b：a > b',
          explanation: '三元運算子 (a > b ? a : b) 當條件為 true 取左值 a，否則取右值 b，是極為實用的一行表達式。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 switch 不支援 double 浮點數的編譯錯誤`,
          chineseDescription: 'C++ 標準規定 switch 括號內只能放整數或字元型別（整數提升型別）。若要判斷浮點數必須改用 if-else。請將錯誤的 double 宣告改為合法的整數型別。',
          buggyCode: `double code = 1.0;\nswitch(code) { // 錯誤：switch 不支援浮點數！\n  case 1: cout << "OK"; break;\n}`,
          originalBug: `double code = 1.0;`,
          fixedLine: `int code = 1;`,
          codeTemplate: `______ code = 1;\nswitch(code) {\n  case 1: cout << "OK"; break;\n}`,
          expectedAnswer: 'int',
          acceptedAnswers: ['int'],
          hint: '宣告為標準整數型別 int。',
          explanation: '【錯誤原因剖析】switch 的跳轉機制需要確定的整數離散值，不支援 double 與 float 等浮點型態。',
          difficulty: 2
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：巢狀條件結構分析`,
          chineseDescription: '閱讀以下程式碼，若 x=10 且 y=5，程式會輸出什麼？',
          codeTemplate: `int x = 10, y = 5;\nif (x > 5) {\n  if (y > 10) {\n    cout << "A";\n  } else {\n    cout << "B";\n  }\n} else {\n  cout << "C";\n}`,
          options: [
            'A. A',
            'B. B',
            'C. C',
            'D. 什麼都不輸出'
          ],
          correctOption: 1,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b', '1', 'B. B'],
          hint: 'x=10 > 5 進入外層，但 y=5 不大於 10 進入內層 else。選 B。',
          explanation: '外層條件 10 > 5 為 true 進入，內層條件 5 > 10 為 false 進入內層 else，輸出 "B"。',
          difficulty: 2
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 農場等級星級評定`,
          chineseDescription: '【情境】根據星級 starCount (1~3) 輸出對應讚許。請完成 case 3 的標籤宣告。',
          codeTemplate: `int starCount = 3;\nswitch(starCount) {\n  case 1: cout << "銅牌"; break;\n  case 2: cout << "銀牌"; break;\n  ______:\n    cout << "金牌"; break;\n}`,
          expectedAnswer: 'case 3',
          acceptedAnswers: ['case 3', 'case 3:'],
          hint: 'case 加上數字 3。',
          explanation: 'case 3: 匹配 starCount 等於 3 的情況並執行金牌分支。',
          difficulty: 2
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 三元運算子判斷正負數標籤`,
          chineseDescription: '【情境】若溫度 temp 大於 0 輸出 "+" 號，否則輸出 "-" 號。請補齊三元運算表達式。',
          scenario: `三元運算輸出正負字串`,
          codeTemplate: `int temp = -5;\nstring sign = (temp > 0) ? "______" : "-";\ncout << sign;`,
          expectedAnswer: '+',
          acceptedAnswers: ['+', '"+"'],
          hint: '雙引號內的正號 +。',
          explanation: '三元運算子簡化了二選一的文字指派。',
          difficulty: 2
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 6: 🔄 while 迴圈 (Fields 51 ～ 60) [高中核心]
  // =========================================================================
  if (fieldId >= 51 && fieldId <= 60) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} while 迴圈基礎語法`,
          chineseDescription: '當條件為 true 時不斷重複執行區塊的迴圈關鍵字是？',
          codeTemplate: `int count = 0;\n______(count < 5) {\n  cout << count << " ";\n  count++;\n}`,
          expectedAnswer: 'while',
          acceptedAnswers: ['while'],
          hint: '當...的時候（5 個英文字母）。',
          explanation: 'while (condition) 是前測試迴圈，每次進入迴圈前皆會先檢查條件是否成立。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 while 忘記遞增導致的無窮迴圈（Infinite Loop）`,
          chineseDescription: '這段程式碼會陷入無窮迴圈當機，因為在迴圈內部忘記將計數器 i 遞增。請補上讓 i 每次加 1 的語句。',
          buggyCode: `int i = 0;\nwhile (i < 5) {\n  cout << i;\n  // 忘記 i++ 導致 i 永遠為 0，無限印出！\n}`,
          originalBug: `while (i < 5) { cout << i; }`,
          fixedLine: `while (i < 5) { cout << i; i++; }`,
          codeTemplate: `int i = 0;\nwhile (i < 5) {\n  cout << i;\n  ______;\n}`,
          expectedAnswer: 'i++',
          acceptedAnswers: ['i++', 'i += 1', 'i = i + 1', '++i'],
          hint: '讓 i 遞增：i++',
          explanation: '【錯誤原因剖析】while 迴圈必須具備推進終止條件的更新敘述（如 i++），否則條件永真造成無限迴圈。',
          difficulty: 2
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 計算 1 加到 10 的累加總和`,
          chineseDescription: '【情境】使用 while 迴圈將 1 到 10 的所有整數加總存入 sum。請完成加總累加表達式。',
          scenario: `迴圈累加器 Pattern`,
          codeTemplate: `int i = 1, sum = 0;\nwhile (i <= 10) {\n  ______;\n  i++;\n}\ncout << "總和: " << sum;`,
          expectedAnswer: 'sum += i',
          acceptedAnswers: ['sum += i', 'sum+=i', 'sum = sum + i', 'sum=sum+i'],
          hint: 'sum 加上當前的 i：sum += i',
          explanation: 'sum += i 是經典的累加器寫法，每次迭代將當前的 i 併入總和 sum 中。',
          difficulty: 2
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測 while 迴圈最終計數`,
          chineseDescription: '請追蹤以下 while 迴圈，預測迴圈結束後最終印出的 x 值：',
          codeTemplate: `int x = 1;\nwhile (x < 10) {\n  x *= 2;\n}\ncout << x;`,
          expectedAnswer: '16',
          acceptedAnswers: ['16'],
          hint: '追蹤 x 變化：1 -> 2 -> 4 -> 8 -> 16（此時 16 < 10 為 false 跳出）。',
          explanation: 'x 依序倍增：1 -> 2 -> 4 -> 8 -> 16。當 x 變為 16 時，16 < 10 條件不成立，跳出迴圈印出 16。',
          difficulty: 2
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 數字位數拆解（計算整數的個位數）`,
          chineseDescription: '【情境】在演算法中，我們常使用 n % 10 取得數字的最後一位數（個位數）。請填寫取餘數運算。',
          scenario: `位數拆解核心：digit = n % 10`,
          codeTemplate: `int n = 1234;\nint lastDigit = ______;\ncout << "個位數: " << lastDigit; // 輸出 4`,
          expectedAnswer: 'n % 10',
          acceptedAnswers: ['n % 10', 'n%10'],
          hint: 'n 取 10 的餘數：n % 10',
          explanation: '任何正整數對 10 取餘數（n % 10）即可萃取出最末位數；而 n /= 10 則能削去最末位數。',
          difficulty: 2
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 削去整數個位數進行位數縮減`,
          chineseDescription: '配合 while 迴圈走訪數字的每一位時，每次迴圈結束應使用 n /= 10 將數字縮小十倍。請補齊除法指定運算子。',
          codeTemplate: `int n = 567;\nwhile (n > 0) {\n  int d = n % 10;\n  n ______ 10;\n}`,
          expectedAnswer: '/=',
          acceptedAnswers: ['/='],
          hint: '除法複合指定運算子。',
          explanation: 'n /= 10 等同於 n = n / 10，將整數右移一位（無條件捨去小數），是數位走訪標準步驟。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 while 條件反向寫錯`,
          chineseDescription: '希望倒數計時從 5 印到 1，但程式一開始就直接跳出沒有印出任何東西。請修正 while 的條件讓計時器正常運行。',
          buggyCode: `int timer = 5;\nwhile (timer <= 0) { // 錯誤：條件寫反，一開始 5 <= 0 為 false 根本不進迴圈\n  cout << timer;\n  timer--;\n}`,
          originalBug: `while (timer <= 0)`,
          fixedLine: `while (timer > 0)`,
          codeTemplate: `int timer = 5;\nwhile (timer ______ 0) {\n  cout << timer << " ";\n  timer--;\n}`,
          expectedAnswer: '>',
          acceptedAnswers: ['>', '>= 1', '!= 0'],
          hint: '大於 0 的符號：>',
          explanation: '【錯誤原因剖析】倒數計時條件應為 timer > 0，寫成 <= 0 會導致初值 5 直接被擋在迴圈門外。',
          difficulty: 2
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：計算整數的位數（Digit Count）`,
          chineseDescription: '閱讀以下程式碼，請問這段程式的具體功能是什麼？',
          codeTemplate: `int n = 98765, digits = 0;\nwhile (n > 0) {\n  digits++;\n  n /= 10;\n}\ncout << digits;`,
          options: [
            'A. 計算數字 n 的所有位數總和',
            'B. 計算數字 n 是幾位數（此處印出 5）',
            'C. 將數字 n 反轉印出',
            'D. 找出數字中的最大數字'
          ],
          correctOption: 1,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b', '1', 'B. 計算數字 n 是幾位數（此處印出 5）'],
          hint: '每次 n 縮減 10 倍，digits 計數加 1，統計共有幾位數。選 B。',
          explanation: '迴圈每次將 n 除以 10 並遞增計數器，能精確計算出一個正整數的十進位總位數。',
          difficulty: 2
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 哨兵值迴圈（Sentinel Loop）終止條件`,
          chineseDescription: '【情境】使用者不斷輸入整數，直到輸入 -1 時結束。請補齊 while 迴圈繼續運行的條件。',
          codeTemplate: `int inputVal = 0;\ncin >> inputVal;\nwhile (______) {\n  // 處理農場數據\n  cin >> inputVal;\n}`,
          expectedAnswer: 'inputVal != -1',
          acceptedAnswers: ['inputVal != -1', 'inputVal!=-1', '-1 != inputVal'],
          hint: 'inputVal 不等於 -1：inputVal != -1',
          explanation: '哨兵值（Sentinel Value）是一種特殊的標誌資料，當輸入特定值（如 -1）時終止迴圈。',
          difficulty: 2
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 存錢達到目標金額的月數模擬`,
          chineseDescription: '【情境】目標存款 target = 1000 元，每個月存 savings = 150 元。請完成判斷存款尚未達標的 while 條件。',
          scenario: `財務目標模擬計算`,
          codeTemplate: `int money = 0, target = 1000, months = 0;\nwhile (______) {\n  money += 150;\n  months++;\n}\ncout << "需花費 " << months << " 個月";`,
          expectedAnswer: 'money < target',
          acceptedAnswers: ['money < target', 'money<target', 'target > money'],
          hint: '當目前金額小於目標時繼續存：money < target',
          explanation: 'while (money < target) 會持續迭代直到 money 達到或超過 target。',
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
