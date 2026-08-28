import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';

/**
 * 產生第 13~15 章（Fields 121～150）之高品質、多樣化題庫
 * 涵蓋：結構體 Struct、STL Vector 與常用容器、基礎演算法與 APCS 專題
 * 題型：fill_blank, debug, application, predict_output, complete_code, code_reading
 */
export function getCh13To15Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const id = `f${fieldId}_${cardIndex}`;
  const chapter = getChapterForField(fieldId);
  const subLevel = fieldId - chapter.startId + 1; // 1 to 10 within chapter
  const prefix = `[第${chapter.chapter}章 ${chapter.topic}] #${fieldId}`;

  // =========================================================================
  // CHAPTER 13: 📦 結構體 Struct (Fields 121 ～ 130) [高中 APCS 核心]
  // =========================================================================
  if (fieldId >= 121 && fieldId <= 130) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} struct 結構體自訂資料型別定義`,
          chineseDescription: '用來將多個不同型別的相關變數封裝為自訂複合型別的關鍵字是？',
          codeTemplate: `______ Crop {\n  string name;\n  int growDays;\n  int price;\n};`,
          expectedAnswer: 'struct',
          acceptedAnswers: ['struct'],
          hint: '結構體關鍵字（6 個字母）。',
          explanation: 'struct 能將名稱、生長天數、價格等異質資料封裝成單一獨立的自訂物件型態。',
          difficulty: 3
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 struct 定義結尾大括號忘記加分號的致命語法 Bug`,
          chineseDescription: 'C++ 中定義 struct 時，結尾的大括號後方必須加上分號 ;，否則會引發全域編譯連鎖錯誤。請補上分號。',
          buggyCode: `struct Player {\n  string name;\n  int score;\n} // 錯誤：結尾缺少分號！`,
          originalBug: `}\nint main()`,
          fixedLine: `};\nint main()`,
          codeTemplate: `struct Player {\n  string name;\n  int score;\n}______`,
          expectedAnswer: ';',
          acceptedAnswers: [';'],
          hint: '加上分號 ;',
          explanation: '【錯誤原因剖析】C++ struct 宣告屬於型別陳述句，末尾大括號後必須以分號 ; 結尾。',
          difficulty: 2
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 點運算子（Dot Operator）存取結構體成員`,
          chineseDescription: '【情境】建立 Crop 物件 c，並將其價格 price 設定為 50。請完成結構成員賦值。',
          scenario: `結構體成員存取：object.member`,
          codeTemplate: `Crop c;\nc.name = "高麗菜";\nc.______ = 50;\ncout << c.name << " 價格: " << c.price;`,
          expectedAnswer: 'price',
          acceptedAnswers: ['price'],
          hint: '價格成員變數名稱 price。',
          explanation: '使用點運算子（c.price）可直接讀寫結構體實例的內部成員變數。',
          difficulty: 2
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測結構體陣列結算結果`,
          chineseDescription: '請閱讀以下結構體陣列程式碼，預測輸出之總金額：',
          codeTemplate: `struct Item { int price, qty; };\nItem cart[2] = {{10, 3}, {20, 2}};\nint total = cart[0].price * cart[0].qty + cart[1].price * cart[1].qty;\ncout << total;`,
          expectedAnswer: '70',
          acceptedAnswers: ['70'],
          hint: '10*3 + 20*2 = 30 + 40 = 70。',
          explanation: 'cart[0] 金額為 30，cart[1] 金額為 40，兩者合計 70。',
          difficulty: 3
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 結構體陣列走訪計算最高分`,
          chineseDescription: '【情境】走訪學生結構體陣列，找出成績最高者的姓名。請補齊比較成績大小的條件。',
          scenario: `結構體陣列線性走訪比對`,
          codeTemplate: `struct Student { string name; int score; };\nStudent list[3] = {{"Alice", 85}, {"Bob", 95}, {"Charlie", 90}};\nStudent topStudent = list[0];\nfor (int i = 1; i < 3; i++) {\n  if (______) {\n    topStudent = list[i];\n  }\n}\ncout << topStudent.name; // 輸出 Bob`,
          expectedAnswer: 'list[i].score > topStudent.score',
          acceptedAnswers: ['list[i].score > topStudent.score', 'list[i].score>topStudent.score', 'topStudent.score < list[i].score'],
          hint: '比較 list[i].score 是否大於 topStudent.score。',
          explanation: '透過 list[i].score 能精確比對結構體陣列中每個元素的成績成員。',
          difficulty: 3
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 結構體指標與箭頭運算子 ->`,
          chineseDescription: '當使用指標 ptr 指向結構體物件時，存取成員應使用哪個簡潔的箭頭運算子？',
          codeTemplate: `Crop c = {"南瓜", 7, 100};\nCrop* ptr = &c;\ncout << ptr______name; // 印出 南瓜`,
          expectedAnswer: '->',
          acceptedAnswers: ['->'],
          hint: '減號加右箭頭：->',
          explanation: 'ptr->name 是 (*ptr).name 的語法糖，專門用於結構體指標存取成員。',
          difficulty: 3
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 struct 變數未初始化的垃圾值風險`,
          chineseDescription: '在局部範圍宣告 struct Point p; 時若未初始化，其成員 x, y 會是記憶體殘留的垃圾值。請使用大括號清單將其初始化為 (0, 0)。',
          buggyCode: `struct Point { int x, y; };\nPoint p; // 內含未定義垃圾值！`,
          originalBug: `Point p;`,
          fixedLine: `Point p = {0, 0};`,
          codeTemplate: `Point p = ______;`,
          expectedAnswer: '{0, 0}',
          acceptedAnswers: ['{0, 0}', '{0,0}', '{ 0, 0 }'],
          hint: '大括號包住 0, 0：{0, 0}',
          explanation: '【錯誤原因剖析】C++ 原生 struct 在區域變數中不會自動歸零，顯式以 {0, 0} 初始化可杜絕未定義行為。',
          difficulty: 3
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：平面兩點曼哈頓距離計算`,
          chineseDescription: '閱讀以下程式碼，若 p1=(1, 2) 且 p2=(4, 6)，abs(dx)+abs(dy) 印出的曼哈頓距離是多少？',
          codeTemplate: `struct Point { int x, y; };\nPoint p1 = {1, 2}, p2 = {4, 6};\nint dist = abs(p1.x - p2.x) + abs(p1.y - p2.y);\ncout << dist;`,
          options: [
            'A. 7 (|1-4| + |2-6| = 3 + 4 = 7)',
            'B. 5',
            'C. 1',
            'D. 12'
          ],
          correctOption: 0,
          expectedAnswer: '7',
          acceptedAnswers: ['7', 'A', 'a', '0', 'A. 7 (|1-4| + |2-6| = 3 + 4 = 7)'],
          hint: '|1-4| + |2-6| = 3 + 4 = 7。選 A。',
          explanation: '曼哈頓距離公式 |x1 - x2| + |y1 - y2| = |1 - 4| + |2 - 6| = 3 + 4 = 7。',
          difficulty: 3
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 結構體自訂排序比較運算子 operator<`,
          chineseDescription: '【情境】為結構體定義小於運算子以支援 std::sort 依照分數由高至低排。請填寫小於運算子名稱 operator<。',
          codeTemplate: `struct Player {\n  string name;\n  int score;\n  bool ______(const Player &other) const {\n    return score > other.score; // 由大到小排序\n  }\n};`,
          expectedAnswer: 'operator<',
          acceptedAnswers: ['operator<', 'operator <'],
          hint: '運算子多載關鍵字 operator<',
          explanation: '多載 operator< 是 APCS 與 C++ 競賽中使用 std::sort 進行自訂排序最標準的做法。',
          difficulty: 4
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 封裝農場地塊狀態結構體`,
          chineseDescription: '【情境】結構體 Tile 包含 status (int) 與 moisture (double)。請補齊印出濕度的成員存取。',
          scenario: `多型態資料封裝管理`,
          codeTemplate: `struct Tile {\n  int status;\n  double moisture;\n};\nTile plot1 = {1, 85.5};\ncout << "土壤濕度: " << plot1.______ << "%";`,
          expectedAnswer: 'moisture',
          acceptedAnswers: ['moisture'],
          hint: '濕度成員變數名 moisture。',
          explanation: 'plot1.moisture 存取浮點數成員 85.5。',
          difficulty: 2
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 14: ⚡ STL Vector 與常用容器 (Fields 131 ～ 140) [高中 APCS 核心]
  // =========================================================================
  if (fieldId >= 131 && fieldId <= 140) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} std::vector 動態陣列宣告`,
          chineseDescription: '宣告一個元素皆為整數的動態陣列 v。請填寫 vector 型別關鍵字。',
          codeTemplate: `#include <vector>\nusing namespace std;\n______<int> v;`,
          expectedAnswer: 'vector',
          acceptedAnswers: ['vector', 'std::vector'],
          hint: '向量/動態陣列英文單字（6 個字母）。',
          explanation: 'std::vector 是 C++ 最強大且最常用的連續記憶體動態大小序列容器。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 vector 尾端加入元素成員函式名稱`,
          chineseDescription: '在 vector 尾端新增元素時應呼叫 push_back 而非 append。請修正為正確的 STL 成員函式名稱。',
          buggyCode: `vector<int> v;\nv.append(10); // 錯誤：vector 沒有 append 成員函式！`,
          originalBug: `v.append(10);`,
          fixedLine: `v.push_back(10);`,
          codeTemplate: `vector<int> v;\nv.______(10);`,
          expectedAnswer: 'push_back',
          acceptedAnswers: ['push_back'],
          hint: '推入尾端：push_back',
          explanation: '【錯誤原因剖析】C++ STL 命名為 push_back()，負責將新元素安插至容器末端並自動動態擴容。',
          difficulty: 2
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 使用 std::sort 進行陣列由小到大排序`,
          chineseDescription: '【情境】將 vector 中的元素進行升序排序。請填入 sort 所需的開頭迭代器 v.begin()。',
          scenario: `STL 高效排序演算法 O(N log N)`,
          codeTemplate: `#include <algorithm>\n// ...\nvector<int> v = {5, 2, 8, 1};\nsort(v.______(), v.end());\n// 排序後 v 為 1, 2, 5, 8`,
          expectedAnswer: 'begin',
          acceptedAnswers: ['begin'],
          hint: '開始迭代器：begin',
          explanation: 'std::sort(v.begin(), v.end()) 採用內省排序（Introsort），以 O(N log N) 極速完成全陣列排序。',
          difficulty: 3
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測 push_back 與 pop_back 最終元素`,
          chineseDescription: '請閱讀以下 vector 增刪操作，預測最終印出的尾端元素：',
          codeTemplate: `vector<int> v;\nv.push_back(10);\nv.push_back(20);\nv.push_back(30);\nv.pop_back(); // 移除 30\ncout << v.back();`,
          expectedAnswer: '20',
          acceptedAnswers: ['20'],
          hint: '先後加入 10, 20, 30；移除最尾端的 30 後，當前最後一個元素為 20。',
          explanation: 'pop_back() 移除了最末端的 30，因此呼叫 v.back() 回傳當前尾端元素 20。',
          difficulty: 2
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} C++11 Range-based for 現代範圍迴圈走訪`,
          chineseDescription: '【情境】使用優雅的範圍 for 迴圈逐一加總 vector 內的所有數字。請補齊 auto 宣告型別。',
          scenario: `現代 C++ 走訪慣用語法`,
          codeTemplate: `vector<int> numbers = {10, 20, 30};\nint total = 0;\nfor (______ x : numbers) {\n  total += x;\n}\ncout << total; // 輸出 60`,
          expectedAnswer: 'int',
          acceptedAnswers: ['int', 'auto', 'const int&', 'const auto&'],
          hint: 'int 或 auto 自動推導型別。',
          explanation: 'for (int x : numbers) 簡潔走訪容器中每個元素，無須手動管理索引或迭代器。',
          difficulty: 2
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} vector 容量清空與動態大小查詢`,
          chineseDescription: '若要檢查 vector 目前是否為空（大小為 0），應呼叫哪一個回傳 bool 的成員函式？',
          codeTemplate: `if (v.______()) {\n  cout << "作物籃目前為空！";\n}`,
          expectedAnswer: 'empty',
          acceptedAnswers: ['empty'],
          hint: '空的英文單字 empty。',
          explanation: 'v.empty() 判斷容器是否無任何元素，比寫 v.size() == 0 更具語意與執行效率。',
          difficulty: 2
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正 vector 呼叫 sort 忘記引入標頭檔的編譯錯誤`,
          chineseDescription: '呼叫 std::sort 演算法時，程式報錯找不到 sort。請補上正確的標準庫標頭檔名 <algorithm>。',
          buggyCode: `#include <vector>\n// 缺少 <algorithm> 導致 sort 無法識別\nsort(v.begin(), v.end());`,
          originalBug: `// 缺少 <algorithm>`,
          fixedLine: `#include <algorithm>`,
          codeTemplate: `#include <______>\n#include <vector>`,
          expectedAnswer: 'algorithm',
          acceptedAnswers: ['algorithm'],
          hint: '演算法英文單字：algorithm',
          explanation: '【錯誤原因剖析】std::sort、std::min、std::max 等通用演算法皆定義於 <algorithm> 標頭檔中。',
          difficulty: 2
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：std::reverse 顛倒容器元素`,
          chineseDescription: '閱讀以下程式碼，預測輸出結果：',
          codeTemplate: `vector<int> v = {1, 2, 3, 4};\nreverse(v.begin(), v.end());\ncout << v[0] << " " << v[1];`,
          options: [
            'A. 4 3',
            'B. 1 2',
            'C. 3 4',
            'D. 2 1'
          ],
          correctOption: 0,
          expectedAnswer: '4 3',
          acceptedAnswers: ['4 3', '4  3', 'A', 'a', '0', 'A. 4 3'],
          hint: '顛倒後 v 為 {4, 3, 2, 1}，前兩個元素為 4 與 3。選 A。',
          explanation: 'std::reverse 將容器內元素前後原地對調，輸出 "4 3"。',
          difficulty: 2
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 初始化指定大小與預設值的 vector`,
          chineseDescription: '【情境】建立一個大小為 5 且每個初始值皆為 100 的 vector。請補齊括號建構參數。',
          codeTemplate: `vector<int> v(______); // 建立 5 個 100`,
          expectedAnswer: '5, 100',
          acceptedAnswers: ['5, 100', '5,100'],
          hint: '大小 5 搭配初值 100：5, 100',
          explanation: 'vector<T> v(n, val) 建構子能預先配置 n 個元素並均填入初始值 val。',
          difficulty: 3
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} vector 二維動態矩陣（動態表格）`,
          chineseDescription: '【情境】宣告一個儲存整數的二維動態矩陣 grid（vector of vectors）。請填寫外層型態。',
          scenario: `高階 STL 巢狀容器宣告`,
          codeTemplate: `vector<______<int>> grid(3, vector<int>(4, 0)); // 3x4 全為 0 的矩陣`,
          expectedAnswer: 'vector',
          acceptedAnswers: ['vector', 'std::vector'],
          hint: '內層也是 vector。',
          explanation: 'vector<vector<int>> 能宣告出可動態變更行列大小的 2D 矩陣，是 APCS 解題必備武器。',
          difficulty: 4
        };
      }
    }
  }

  // =========================================================================
  // CHAPTER 15: 🎓 基礎演算法與 APCS 專題 (Fields 141 ～ 150) [高中 APCS 壓軸]
  // =========================================================================
  if (fieldId >= 141 && fieldId <= 150) {
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 線性搜尋（Linear Search）核心判斷`,
          chineseDescription: '在陣列中逐一比對是否存在目標 target。請填寫比較相等的運算子 ==。',
          codeTemplate: `for (int i = 0; i < n; i++) {\n  if (arr[i] ______ target) {\n    cout << "找到索引: " << i;\n    break;\n  }\n}`,
          expectedAnswer: '==',
          acceptedAnswers: ['=='],
          hint: '比較相等雙等號 ==。',
          explanation: '線性搜尋（Linear Search）以 O(N) 時間走訪陣列比對每個元素。',
          difficulty: 2
        };
      }
      case 2: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正二分搜尋（Binary Search）中點未縮減範圍導致無窮死循環`,
          chineseDescription: '當 target 比 mid 小時，搜尋上限 high 應縮減至 mid - 1；若寫成 high = mid 會導致只剩兩元素時陷入死循環。請修正為 mid - 1。',
          buggyCode: `if (arr[mid] > target) {\n  high = mid; // 錯誤：會造成死循環\n}`,
          originalBug: `high = mid;`,
          fixedLine: `high = mid - 1;`,
          codeTemplate: `if (arr[mid] > target) {\n  high = ______;\n}`,
          expectedAnswer: 'mid - 1',
          acceptedAnswers: ['mid - 1', 'mid-1'],
          hint: '中點減 1：mid - 1',
          explanation: '【錯誤原因剖析】二分搜尋在 arr[mid] > target 時，目標必定在左半部，因此上限必須嚴格設定為 high = mid - 1 才能保證搜尋範圍持續收斂。',
          difficulty: 4
        };
      }
      case 3: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 二分搜尋中點（Midpoint）防溢位計算`,
          chineseDescription: '【情境】計算二分搜尋區間 [low, high] 的中點 mid。請補齊標準中點計算公式。',
          scenario: `二分搜尋（Binary Search）O(log N) 核心`,
          codeTemplate: `int low = 0, high = n - 1;\nwhile (low <= high) {\n  int mid = ______;\n  if (arr[mid] == target) return mid;\n  else if (arr[mid] < target) low = mid + 1;\n  else high = mid - 1;\n}`,
          expectedAnswer: '(low + high) / 2',
          acceptedAnswers: ['(low + high) / 2', '(low+high)/2', 'low + (high - low) / 2', 'low+(high-low)/2'],
          hint: '(low + high) / 2 或 low + (high - low) / 2',
          explanation: '中點計算 mid = (low + high) / 2 能在每次比對後將搜尋範圍減半，達成 O(log N) 極速查詢。',
          difficulty: 4
        };
      }
      case 4: {
        return {
          id, fieldId,
          type: 'predict_output',
          title: `${prefix} 預測輾轉相除法 GCD 最大公因數`,
          chineseDescription: '請閱讀以下計算 gcd(24, 18) 的遞迴程式碼，預測輸出結果：',
          codeTemplate: `int gcd(int a, int b) {\n  if (b == 0) return a;\n  return gcd(b, a % b);\n}\nint main() {\n  cout << gcd(24, 18);\n  return 0;\n}`,
          expectedAnswer: '6',
          acceptedAnswers: ['6'],
          hint: 'gcd(24, 18) -> gcd(18, 6) -> gcd(6, 0) 回傳 6。',
          explanation: '輾轉相除法流程：24 % 18 = 6，接著 18 % 6 = 0，當 b=0 時回傳 a=6。',
          difficulty: 3
        };
      }
      case 5: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 前綴和陣列（Prefix Sum）O(1) 區間查詢`,
          chineseDescription: '【情境】前綴和能以 O(1) 快速計算陣列索引 L 到 R 的區間總和（公式：prefix[R] - prefix[L-1]）。請完成前綴和建構式。',
          scenario: `前綴和陣列建表：prefix[i] = prefix[i-1] + arr[i]`,
          codeTemplate: `int arr[5] = {1, 3, 5, 7, 9};\nint prefix[5];\nprefix[0] = arr[0];\nfor (int i = 1; i < 5; i++) {\n  prefix[i] = ______ + arr[i];\n}`,
          expectedAnswer: 'prefix[i - 1]',
          acceptedAnswers: ['prefix[i - 1]', 'prefix[i-1]', 'prefix[ i - 1 ]'],
          hint: '前一個位置的前綴和：prefix[i - 1]',
          explanation: 'prefix[i] = prefix[i-1] + arr[i] 建表僅需 O(N)，之後查詢任意區間和僅需 prefix[R] - prefix[L-1]。',
          difficulty: 4
        };
      }
      case 6: {
        return {
          id, fieldId,
          type: 'fill_blank',
          title: `${prefix} 泡沫排序法（Bubble Sort）相鄰元素交換`,
          chineseDescription: '泡沫排序中，當前一個數字大於後一個數字時呼叫 STL 的哪一個函式進行兩數對調？',
          codeTemplate: `if (arr[j] > arr[j + 1]) {\n  ______(arr[j], arr[j + 1]);\n}`,
          expectedAnswer: 'swap',
          acceptedAnswers: ['swap', 'std::swap'],
          hint: '交換函式：swap',
          explanation: 'std::swap(a, b) 高效互換兩個變數的數值，是各類手寫排序與重排演算法的基石。',
          difficulty: 3
        };
      }
      case 7: {
        return {
          id, fieldId,
          type: 'debug',
          title: `${prefix} 修正泡沫排序外層輪數過多的 Off-by-one 邊界 Bug`,
          chineseDescription: '大小為 N 的陣列進行泡沫排序只需進行 N-1 輪即可完全排好。請修正外層迴圈邊界。',
          buggyCode: `for (int i = 0; i < n; i++) { // 多跑了一輪無謂的比較\n  for (int j = 0; j < n - 1 - i; j++) { ... }\n}`,
          originalBug: `i < n`,
          fixedLine: `i < n - 1`,
          codeTemplate: `for (int i = 0; i < ______; i++) {\n  for (int j = 0; j < n - 1 - i; j++) {\n    if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);\n  }\n}`,
          expectedAnswer: 'n - 1',
          acceptedAnswers: ['n - 1', 'n-1'],
          hint: 'n 減 1：n - 1',
          explanation: '【錯誤原因剖析】N 個元素的陣列沉澱出 N-1 個最大值後，剩下的第一個元素自然就位，因此外層只需執行 N-1 輪。',
          difficulty: 3
        };
      }
      case 8: {
        return {
          id, fieldId,
          type: 'code_reading',
          title: `${prefix} 程式閱讀：APCS 經典時間複雜度分析`,
          chineseDescription: '閱讀以下二分搜尋演算法，若資料筆數 N = 1000000（一百萬），最多大約只需幾次比對即可找到目標？',
          codeTemplate: `// 二分搜尋 Binary Search\nwhile (low <= high) {\n  int mid = (low + high) / 2;\n  // 每輪將搜尋空間減半\n}`,
          options: [
            'A. 約 20 次 (2^20 約等於 100 萬，時間複雜度為 O(log N))',
            'B. 約 100 萬次',
            'C. 約 50 萬次',
            'D. 必須比對所有資料'
          ],
          correctOption: 0,
          expectedAnswer: 'A',
          acceptedAnswers: ['A', 'a', '0', 'A. 約 20 次 (2^20 約等於 100 萬，時間複雜度為 O(log N))'],
          hint: 'log2(1,000,000) 約等於 20。選 A。',
          explanation: '二分搜尋每次排除一半的可能範圍，對 100 萬筆資料僅需約 20 次比對，展現 O(log N) 的極致效率。',
          difficulty: 4
        };
      }
      case 9: {
        return {
          id, fieldId,
          type: 'complete_code',
          title: `${prefix} 雙指針（Two Pointers）求兩數之和`,
          chineseDescription: '【情境】在已排序陣列中，若目前兩數和 sum < target，應將左指針 left 往右移。請填寫 left 遞增。',
          codeTemplate: `int left = 0, right = n - 1;\nwhile (left < right) {\n  int currentSum = arr[left] + arr[right];\n  if (currentSum == target) return true;\n  else if (currentSum < target) ______;\n  else right--;\n}`,
          expectedAnswer: 'left++',
          acceptedAnswers: ['left++', 'left += 1', '++left'],
          hint: '左指針右移：left++',
          explanation: '在排序好的陣列中，當合小於目標時，遞增 left++ 能增大總和，是 APCS 常考的雙指針技巧。',
          difficulty: 4
        };
      }
      case 10: {
        return {
          id, fieldId,
          type: 'application',
          title: `${prefix} 終極畢業考：農場大師演算法全流程整合`,
          chineseDescription: '【情境】恭喜抵達第 150 關！請填入標準程式進入點 main 的回傳成功代碼 0。',
          scenario: `良田圓滿收成：C++ 語法大師`,
          codeTemplate: `int main() {\n  cout << "🎉 恭喜通關 150 畦 C++ 語法良田！" << endl;\n  return ______;\n}`,
          expectedAnswer: '0',
          acceptedAnswers: ['0', 'EXIT_SUCCESS'],
          hint: '正常結束回傳 0。',
          explanation: 'return 0; 表示程式無異常、順利圓滿執行結束。恭喜完成全部 150 關 C++ 核心語法與演算法挑戰！',
          difficulty: 1
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
