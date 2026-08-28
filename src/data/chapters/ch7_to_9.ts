import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';

/**
 * 產生第 7~9 章（Fields 61～90）之高品質、多樣化題庫
 * 涵蓋：for 迴圈、迴圈進階與巢狀結構、一維陣列
 * 題型：fill_blank, debug, application, predict_output, complete_code, code_reading
 */
export function getCh7To9Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const id = `f${fieldId}_${cardIndex}`;
  const chapter = getChapterForField(fieldId);
  const subLevel = fieldId - chapter.startId + 1; // 1 to 10 within chapter
  const prefix = `[第${chapter.chapter}章 ${chapter.topic}] #${fieldId}`;

  // =========================================================================
  // CHAPTER 7: 🚜 for 迴圈 (Fields 61 ～ 70) [高中核心]
  // =========================================================================
  if (fieldId >= 61 && fieldId <= 70) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} for 迴圈標準三段式標頭`,
          chineseDescription: 'for 迴圈由「初始化; 終止條件; 步進更新」三個表達式組成。請填寫計數器每次加 1 的步進更新式。',
          codeTemplate: `for (int i = 0; i < 10; ______) {\n  cout << i << " ";\n}`,
          expectedAnswer: 'i++',
          acceptedAnswers: ['i++', 'i += 1', '++i', 'i = i + 1'],
          hint: '變數 i 遞增：i++',
          explanation: 'for (初始化; 條件; 更新) 中，更新式（如 i++）在每次迴圈本體執行完畢後觸發。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 for 迴圈反向遞減打成遞增的 Bug`,
          chineseDescription: '本題希望從 10 倒數計時到 1，但更新式誤寫成 i++ 導致 i 越變越大永遠停不下來。請修正更新式為遞減。',
          buggyCode: `for (int i = 10; i >= 1; i++) { // 錯誤：倒數應該用 i--\n  cout << i << " ";\n}`,
          originalBug: `i++`,
          fixedLine: `i--`,
          codeTemplate: `for (int i = 10; i >= 1; ______) {\n  cout << i << " ";\n}`,
          expectedAnswer: 'i--',
          acceptedAnswers: ['i--', 'i -= 1', '--i', 'i = i - 1'],
          hint: '遞減運算子：i--',
          explanation: '【錯誤原因剖析】倒數迴圈需將計數器逐步減少（i--），若寫成 i++ 會導致條件 i >= 1 永真形成無窮迴圈。',
          difficulty: 2
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 計算階乘 Factorial（5! = 1*2*3*4*5）`,
          chineseDescription: '【情境】計算正整數 n=5 的階乘（1 乘到 5 的乘積）。請完成迴圈內的乘積累乘式。',
          scenario: `階乘累乘計算：fact *= i`,
          codeTemplate: `int n = 5, fact = 1;\nfor (int i = 1; i <= n; i++) {\n  ______;\n}\ncout << "5! = " << fact; // 輸出 120`,
          expectedAnswer: 'fact *= i',
          acceptedAnswers: ['fact *= i', 'fact*=i', 'fact = fact * i', 'fact=fact*i'],
          hint: 'fact 乘以當前整數 i：fact *= i',
          explanation: '階乘累乘模式中，初始化 fact = 1（不可為 0），迴圈每次 fact *= i 完成相乘。',
          difficulty: 3
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測步進 for 迴圈輸出`,
          chineseDescription: '請閱讀以下程式碼，預測終端機最終印出的數列：',
          codeTemplate: `for (int i = 1; i <= 7; i += 2) {\n  cout << i;\n}`,
          expectedAnswer: '1357',
          acceptedAnswers: ['1357', '1 3 5 7'],
          hint: 'i 每次加 2：1, 3, 5, 7 連續印出。',
          explanation: 'i 從 1 開始，每次步進 +2：分別印出 1, 3, 5, 7，當 i 變為 9 時大於 7 結束迴圈。',
          difficulty: 2
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 統計 1 到 100 中所有 3 的倍數之和`,
          chineseDescription: '【情境】請完成判斷數字 i 是否為 3 的倍數之 if 條件表達式。',
          scenario: `倍數過濾篩選：i % 3 == 0`,
          codeTemplate: `int sum = 0;\nfor (int i = 1; i <= 100; i++) {\n  if (______) {\n    sum += i;\n  }\n}\ncout << sum;`,
          expectedAnswer: 'i % 3 == 0',
          acceptedAnswers: ['i % 3 == 0', 'i%3==0', '0 == i % 3'],
          hint: 'i 取 3 的餘數等於 0：i % 3 == 0',
          explanation: 'i % 3 == 0 能精準篩選出 3, 6, 9, 12 等所有 3 的倍數。',
          difficulty: 2
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} for 迴圈宣告區域變數範圍`,
          chineseDescription: '在現代 C++ 中，迴圈計數器 i 通常直接宣告於 for 的第一個區塊中。請填寫型別 int。',
          codeTemplate: `for (______ i = 0; i < 5; i++) {\n  cout << "灌溉第 " << i << " 畦良田\\n";\n}`,
          expectedAnswer: 'int',
          acceptedAnswers: ['int', 'auto'],
          hint: '整數型別 int。',
          explanation: '在 for 標頭內宣告 int i 會使變數 i 的生命週期限制在迴圈內部，避免污染外層命名空間。',
          difficulty: 1
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 for 括號後誤加分號導致迴圈空跑`,
          chineseDescription: '這段程式預期印出 5 次「田園日誌」，但實際上只印出 1 次，因為 for 括號後誤加了分號。請修正 for 標頭。',
          buggyCode: `for (int i = 0; i < 5; i++); {\n  cout << "田園日誌\\n";\n}`,
          originalBug: `for (int i = 0; i < 5; i++);`,
          fixedLine: `for (int i = 0; i < 5; i++)`,
          codeTemplate: `for (int i = 0; i < 5; i++)______ {\n  cout << "田園日誌\\n";\n}`,
          expectedAnswer: '',
          acceptedAnswers: ['', ' '],
          hint: '移除分號，留空即可。',
          explanation: '【錯誤原因剖析】for 條件括號後加分號會讓迴圈重複執行「空指令」，大括號變成只跑一次的普通程式區塊。',
          difficulty: 3
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：計算迴圈執行總次數`,
          chineseDescription: '閱讀以下迴圈，請問迴圈內部的 cout 總共會被執行幾次？',
          codeTemplate: `for (int i = 0; i < 8; i++) {\n  cout << "*";\n}`,
          options: [
            'A. 7 次',
            'B. 8 次 (從 i=0 到 i=7 共 8 次)',
            'C. 9 次',
            'D. 0 次'
          ],
          correctOption: 1,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b', '1', 'B. 8 次 (從 i=0 到 i=7 共 8 次)'],
          hint: 'i 從 0 到 7，總共 8 個數字。選 B。',
          explanation: '標準從 0 開始、i < N 的 for 迴圈，迴圈本體恰好執行 N 次（0,1,2,3,4,5,6,7）。',
          difficulty: 2
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 偶數連續累加邏輯`,
          chineseDescription: '【情境】將 2 到 20 之間的所有偶數加總。請完成 for 迴圈每次跳 2 格的步進表達式。',
          codeTemplate: `int evenSum = 0;\nfor (int i = 2; i <= 20; ______) {\n  evenSum += i;\n}\ncout << evenSum;`,
          expectedAnswer: 'i += 2',
          acceptedAnswers: ['i += 2', 'i+=2', 'i = i + 2', 'i=i+2'],
          hint: 'i 每次加 2：i += 2',
          explanation: 'i += 2 每次直接跨步 2，免去在迴圈內多寫 if (i % 2 == 0) 判斷。',
          difficulty: 2
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 尋找質數基礎：檢查是否有因數`,
          chineseDescription: '【情境】判斷整數 num=7 是否有因數。從 2 跑到 6，若 num % i == 0 代表可被整除。請完成因數整除條件。',
          scenario: `質數因數檢查演算法`,
          codeTemplate: `int num = 7;\nbool isPrime = true;\nfor (int i = 2; i < num; i++) {\n  if (______) {\n    isPrime = false;\n    break;\n  }\n}`,
          expectedAnswer: 'num % i == 0',
          acceptedAnswers: ['num % i == 0', 'num%i==0', '0 == num % i'],
          hint: 'num 取 i 餘數等於 0：num % i == 0',
          explanation: '若在 2 到 num-1 之間存在任何整數 i 能將 num 整除（num % i == 0），則 num 非質數。',
          difficulty: 3
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 8: ♻️ 迴圈進階與巢狀結構 (Fields 71 ～ 80) [高中核心]
  // =========================================================================
  if (fieldId >= 71 && fieldId <= 80) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} do-while 後測試迴圈關鍵字`,
          chineseDescription: '保證程式本體「至少會被執行一次」的後測試迴圈開頭關鍵字是？',
          codeTemplate: `int x = 0;\n______ {\n  cout << "至少執行一次\\n";\n} while(x != 0);`,
          expectedAnswer: 'do',
          acceptedAnswers: ['do'],
          hint: '做的英文單字。',
          explanation: 'do-while 是後測試迴圈，無論條件是否滿足，區塊內的程式碼保證至少先執行一次。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 do-while 結尾缺少分號的語法錯誤`,
          chineseDescription: 'do-while 迴圈不同於一般 while，其結尾括號後必須加上分號。請補上結尾分號。',
          buggyCode: `do {\n  cout << "測試";\n} while (x < 5) // 錯誤：結尾缺少分號！`,
          originalBug: `} while (x < 5)`,
          fixedLine: `} while (x < 5);`,
          codeTemplate: `do {\n  cout << "測試";\n} while (x < 5)______`,
          expectedAnswer: ';',
          acceptedAnswers: [';'],
          hint: '加上分號 ;',
          explanation: '【錯誤原因剖析】do-while 結構以 while (cond); 結尾，分號不可省略。',
          difficulty: 2
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 九九乘法表雙重迴圈計算`,
          chineseDescription: '【情境】使用雙層迴圈輸出九九乘法表。請完成計算單元格乘積 i * j 的表達式。',
          scenario: `雙層巢狀迴圈：行與列的笛卡兒乘積`,
          codeTemplate: `for (int i = 1; i <= 9; i++) {\n  for (int j = 1; j <= 9; j++) {\n    cout << i << "*" << j << "=" << ______ << "\\t";\n  }\n  cout << "\\n";\n}`,
          expectedAnswer: 'i * j',
          acceptedAnswers: ['i * j', 'i*j', 'j * i', 'j*i'],
          hint: 'i 乘以 j：i * j',
          explanation: '外層迴圈 i 代表被乘數，內層迴圈 j 代表乘數，i * j 計算每個格子的乘積。',
          difficulty: 3
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測 continue 跳過本輪迭代`,
          chineseDescription: '請追蹤以下含有 continue 的程式碼，預測輸出結果（遇到 3 時跳過）：',
          codeTemplate: `for (int i = 1; i <= 5; i++) {\n  if (i == 3) continue;\n  cout << i;\n}`,
          expectedAnswer: '1245',
          acceptedAnswers: ['1245', '1 2 4 5'],
          hint: '1, 2 會印出；當 i=3 時觸發 continue 直接跳至下一輪，不印 3；接著印 4, 5。',
          explanation: 'continue 會立即跳過當前迭代剩餘的程式碼，直接進入迴圈的下一輪步進更新。',
          difficulty: 3
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 輸出 N 層直角三角形星號`,
          chineseDescription: '【情境】印出高度為 4 的星號直角三角形。第 r 行需要印出 r 顆星號。請完成內層迴圈邊界。',
          scenario: `圖形列印：內層上限綁定外層行號`,
          codeTemplate: `for (int r = 1; r <= 4; r++) {\n  for (int c = 1; ______; c++) {\n    cout << "*";\n  }\n  cout << "\\n";\n}`,
          expectedAnswer: 'c <= r',
          acceptedAnswers: ['c <= r', 'c<=r', 'c < r + 1', 'r >= c'],
          hint: '第 r 行印 r 顆星：c <= r',
          explanation: '內層迴圈條件設為 c <= r，讓第 1 行跑 1 次、第 2 行跑 2 次……形成階梯三角形。',
          difficulty: 3
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 提前強制終止迴圈 break`,
          chineseDescription: '當在陣列或數據中找到目標數值時，使用哪個關鍵字可立即中斷並跳出最內層迴圈？',
          codeTemplate: `for (int i = 0; i < 1000; i++) {\n  if (data[i] == target) {\n    cout << "找到了！";\n    ______;\n  }\n}`,
          expectedAnswer: 'break',
          acceptedAnswers: ['break'],
          hint: '中斷英文單字。',
          explanation: 'break 關鍵字會強制跳出當前所在的最內層迴圈，終止後續的所有迭代。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正內層迴圈計數器打成外層變數的嚴重死循環 Bug`,
          chineseDescription: '這段印出 3x3 矩陣的程式卡死當機，因為內層迴圈誤寫成了 i++ 而非 j++，導致 i 被干擾永遠無法結束。請修正內層迴圈更新式。',
          buggyCode: `for (int i = 0; i < 3; i++) {\n  for (int j = 0; j < 3; i++) { // 錯誤：內層誤打成 i++！\n    cout << "#";\n  }\n}`,
          originalBug: `for (int j = 0; j < 3; i++)`,
          fixedLine: `for (int j = 0; j < 3; j++)`,
          codeTemplate: `for (int i = 0; i < 3; i++) {\n  for (int j = 0; j < 3; ______) {\n    cout << "#";\n  }\n}`,
          expectedAnswer: 'j++',
          acceptedAnswers: ['j++', 'j += 1', '++j'],
          hint: '內層迴圈計數器是 j：j++',
          explanation: '【錯誤原因剖析】巢狀迴圈中內層更新必須對應內層變數 j++，誤寫為 i++ 是極具破壞力的經典 Bug。',
          difficulty: 3
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：雙重迴圈總執行次數`,
          chineseDescription: '閱讀以下程式碼，請問 cout << "*" 總共被執行了幾次？',
          codeTemplate: `int count = 0;\nfor (int i = 0; i < 3; i++) {\n  for (int j = 0; j < 4; j++) {\n    count++;\n  }\n}\ncout << count;`,
          options: [
            'A. 7 次 (3 + 4)',
            'B. 12 次 (3 * 4)',
            'C. 16 次',
            'D. 0 次'
          ],
          correctOption: 1,
          expectedAnswer: 'B',
          acceptedAnswers: ['B', 'b', '1', 'B. 12 次 (3 * 4)'],
          hint: '外層跑 3 次，每次內層跑 4 次，總共 3 * 4 = 12 次。選 B。',
          explanation: '獨立的雙重巢狀迴圈總迭代次數為外層次數乘以內層次數（3 x 4 = 12）。',
          difficulty: 2
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 矩形星號方陣換行處理`,
          chineseDescription: '【情境】輸出 3 行 5 列的星號矩陣。請補齊外層迴圈每印完一行後的換行敘述。',
          codeTemplate: `for (int i = 0; i < 3; i++) {\n  for (int j = 0; j < 5; j++) {\n    cout << "*";\n  }\n  ______ << endl;\n}`,
          expectedAnswer: 'cout',
          acceptedAnswers: ['cout', 'std::cout'],
          hint: '輸出串流物件 cout。',
          explanation: '內層迴圈印滿該行的星號後，外層迴圈負責執行 cout << endl 進行換行。',
          difficulty: 2
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 尋找第一組滿足條件的解並提早退出`,
          chineseDescription: '【情境】在 1 到 100 中尋找第一個同時能被 7 與 11 整除的數字。找到後輸出並使用 break 跳出。請填寫整除條件。',
          scenario: `公倍數尋找與提早終止`,
          codeTemplate: `for (int i = 1; i <= 100; i++) {\n  if (______) {\n    cout << "找到: " << i;\n    break;\n  }\n}`,
          expectedAnswer: 'i % 7 == 0 && i % 11 == 0',
          acceptedAnswers: ['i % 7 == 0 && i % 11 == 0', 'i%7==0&&i%11==0', 'i % 77 == 0', 'i%77==0'],
          hint: 'i % 7 == 0 && i % 11 == 0 或直接 i % 77 == 0。',
          explanation: '7 與 11 的最小公倍數為 77，當 i=77 時條件成立，輸出並以 break 終止後續無謂搜尋。',
          difficulty: 3
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 9: 📊 一維陣列 (Fields 81 ～ 90) [高中核心]
  // =========================================================================
  if (fieldId >= 81 && fieldId <= 90) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 一維陣列宣告與容量配置`,
          chineseDescription: '宣告一個能儲存 5 個整數的靜態陣列 scores。請填入陣列容量中括號 [5]。',
          codeTemplate: `int scores______;`,
          expectedAnswer: '[5]',
          acceptedAnswers: ['[5]', '[ 5 ]'],
          hint: '中括號內填入 5：[5]',
          explanation: 'int scores[5]; 在記憶體中連續配置 5 個 int 空間，合法索引為 scores[0] 到 scores[4]。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正陣列越界訪問（Out of Bounds）Off-by-one 錯誤`,
          chineseDescription: '大小為 5 的陣列有效索引是 0~4。這段走訪程式寫成 i <= 5，導致訪問 arr[5] 發生未定義行為（Undefined Behavior）。請修正迴圈終止條件。',
          buggyCode: `int arr[5] = {1, 2, 3, 4, 5};\nfor (int i = 0; i <= 5; i++) { // 錯誤：arr[5] 越界！\n  cout << arr[i];\n}`,
          originalBug: `i <= 5`,
          fixedLine: `i < 5`,
          codeTemplate: `int arr[5] = {1, 2, 3, 4, 5};\nfor (int i = 0; ______; i++) {\n  cout << arr[i] << " ";\n}`,
          expectedAnswer: 'i < 5',
          acceptedAnswers: ['i < 5', 'i<5', 'i <= 4', 'i<=4'],
          hint: '小於 5：i < 5',
          explanation: '【錯誤原因剖析】C++ 陣列為 0-indexed，大小為 N 的陣列最後一個有效索引是 N-1，因此條件應為 i < N。',
          difficulty: 3
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 陣列元素走訪求總和`,
          chineseDescription: '【情境】陣列儲存了 5 天的收穫量。請完成走訪累加表達式。',
          scenario: `陣列累積走訪加總`,
          codeTemplate: `int harvest[5] = {10, 20, 15, 30, 25};\nint total = 0;\nfor (int i = 0; i < 5; i++) {\n  ______;\n}\ncout << "總收穫: " << total;`,
          expectedAnswer: 'total += harvest[i]',
          acceptedAnswers: ['total += harvest[i]', 'total+=harvest[i]', 'total = total + harvest[i]', 'total=total+harvest[i]'],
          hint: 'total 加上 harvest[i]：total += harvest[i]',
          explanation: '透過迴圈索引 i 逐一存取 harvest[i]，累加至 total 變數中。',
          difficulty: 2
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測陣列索引存取結果`,
          chineseDescription: '請閱讀以下程式碼，預測輸出結果：',
          codeTemplate: `int arr[4] = {100, 200, 300, 400};\narr[1] = 999;\ncout << arr[0] << " " << arr[1];`,
          expectedAnswer: '100 999',
          acceptedAnswers: ['100 999', '100  999'],
          hint: 'arr[0] 依舊是 100，而 arr[1] 被修改為 999。',
          explanation: '陣列元素為可變左值，arr[1] = 999 將第二個元素更新為 999，輸出 "100 999"。',
          difficulty: 2
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 尋找陣列中的最大值（Max Element）`,
          chineseDescription: '【情境】給定成績陣列，若目前走訪的元素 arr[i] 大於當前的 maxScore，則更新最大值。請完成更新條件。',
          scenario: `極值尋找演算法`,
          codeTemplate: `int arr[5] = {65, 88, 92, 70, 85};\nint maxScore = arr[0];\nfor (int i = 1; i < 5; i++) {\n  if (______) {\n    maxScore = arr[i];\n  }\n}\ncout << "最高分: " << maxScore;`,
          expectedAnswer: 'arr[i] > maxScore',
          acceptedAnswers: ['arr[i] > maxScore', 'arr[i]>maxScore', 'maxScore < arr[i]'],
          hint: '若 arr[i] 大於 maxScore：arr[i] > maxScore',
          explanation: '極值演算法初始假定 arr[0] 為最大值，隨後走訪若發現更大者即更新 maxScore。',
          difficulty: 3
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 陣列大括號初始化清單`,
          chineseDescription: '在宣告陣列的同時指派初始值，應使用大括號清單。請填入大括號符號。',
          codeTemplate: `int data[3] = ______ 10, 20, 30 ______;`,
          expectedAnswer: '{}',
          acceptedAnswers: ['{}', '{ }'],
          hint: '大括號。',
          explanation: 'int arr[] = {1, 2, 3}; 是 C++ 陣列初始化清單（Initializer List）標準語法。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正尋找最小值時初始值設定錯誤的 Bug`,
          chineseDescription: '尋找陣列中的最小值時，若將 minVal 錯誤初始化為 0，當陣列元素皆大於 0 時（如 10, 20, 30），程式將永遠錯誤回傳 0！請將 minVal 正確初始化為陣列第一個元素。',
          buggyCode: `int arr[3] = {10, 20, 30};\nint minVal = 0; // 錯誤：初始為 0 會導致比所有正數都小！`,
          originalBug: `int minVal = 0;`,
          fixedLine: `int minVal = arr[0];`,
          codeTemplate: `int arr[3] = {10, 20, 30};\nint minVal = ______;`,
          expectedAnswer: 'arr[0]',
          acceptedAnswers: ['arr[0]', 'arr[ 0 ]'],
          hint: '陣列第一個元素：arr[0]',
          explanation: '【錯誤原因剖析】極值搜尋的初值必須設為陣列中的實際元素（arr[0]）或極限常數（INT_MAX），避免人為假設失真。',
          difficulty: 3
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：計算陣列平均值`,
          chineseDescription: '閱讀以下程式碼，選出該段程式的用途：',
          codeTemplate: `int a[4] = {80, 90, 70, 100};\nint s = 0;\nfor (int i = 0; i < 4; i++) s += a[i];\ndouble avg = (double)s / 4;\ncout << avg;`,
          options: [
            'A. 計算 4 筆分數的總分與精確平均分（85.0）',
            'B. 找出 4 筆分數中的最高分',
            'C. 將分數由小到大排序',
            'D. 計算及格人數'
          ],
          correctOption: 0,
          expectedAnswer: 'A',
          acceptedAnswers: ['A', 'a', '0', 'A. 計算 4 筆分數的總分與精確平均分（85.0）'],
          hint: '累加後除以 4 得到平均值。選 A。',
          explanation: '先走訪求得總分 s=340，再強制轉型為 double 除以 4 得到正確平均值 85.0。',
          difficulty: 2
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 統計陣列中及格（>=60）的及格人數`,
          chineseDescription: '【情境】走訪學生成績陣列，統計及格人數 passCount。請補齊 if 判斷條件。',
          codeTemplate: `int scores[5] = {55, 80, 92, 45, 60};\nint passCount = 0;\nfor (int i = 0; i < 5; i++) {\n  if (______) {\n    passCount++;\n  }\n}\ncout << "及格人數: " << passCount;`,
          expectedAnswer: 'scores[i] >= 60',
          acceptedAnswers: ['scores[i] >= 60', 'scores[i]>=60', '60 <= scores[i]'],
          hint: '第 i 個分數大於等於 60：scores[i] >= 60',
          explanation: 'scores[i] >= 60 篩選出 80、92、60 三個及格分數，passCount 最終為 3。',
          difficulty: 2
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 反向印出陣列元素（Reverse Traversal）`,
          chineseDescription: '【情境】長度為 4 的陣列，從最後一個元素（索引 3）倒著印回第一個（索引 0）。請完成 for 迴圈起始與邊界。',
          scenario: `逆向走訪陣列：從 N-1 遞減到 0`,
          codeTemplate: `int arr[4] = {1, 2, 3, 4};\nfor (int i = 3; ______; i--) {\n  cout << arr[i] << " ";\n}`,
          expectedAnswer: 'i >= 0',
          acceptedAnswers: ['i >= 0', 'i>=0', 'i > -1', '0 <= i'],
          hint: 'i 大於等於 0：i >= 0',
          explanation: '逆向走訪的終止條件為 i >= 0，依序存取 arr[3], arr[2], arr[1], arr[0]，輸出 "4 3 2 1"。',
          difficulty: 3
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
