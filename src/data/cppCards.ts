import { CPlusPlusCard, FieldPlot } from '../types';

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

export const FIELD_PLOTS_DATA: FieldPlot[] = Array.from({ length: 150 }, (_, i) => {
  const id = i + 1;
  const crop = CROPS[i % CROPS.length];
  let levelName = '基礎語法';
  if (id > 15 && id <= 30) levelName = '運算子與選擇';
  else if (id > 30 && id <= 45) levelName = '迴圈控制';
  else if (id > 45 && id <= 60) levelName = '函式與作用域';
  else if (id > 60 && id <= 75) levelName = '陣列與字串';
  else if (id > 75 && id <= 90) levelName = '指標、參照與結構';
  else if (id > 90 && id <= 105) levelName = '類別與物件導向';
  else if (id > 105 && id <= 120) levelName = '繼承與多型';
  else if (id > 120 && id <= 135) levelName = 'STL容器管理';
  else if (id > 135) levelName = '樣板與現代C++';

  return {
    id,
    name: `第 ${id} 區良田 (${levelName})`,
    description: `挑戰第 ${id} 區的 C++ 專業編譯灌溉，收成 ${crop.name}。難度隨編號遞增。`,
    cropName: crop.name,
    isIrrigated: false,
    bestStreak: 0,
    lastAttemptDate: null
  };
});

// Helper to generate a unique question for a given fieldId and cardIndex
const getCardForFieldAndIndex = (fieldId: number, cardIndex: number): CPlusPlusCard => {
  const id = `f${fieldId}_${cardIndex}`;
  
  if (fieldId <= 15) {
    // ==========================================
    // Category 1: Basics & I/O (Levels 1 - 15)
    // ==========================================
    switch (cardIndex) {
      case 1: {
        const headers = ['iostream', 'cmath', 'string', 'iomanip', 'fstream', 'vector', 'algorithm', 'chrono', 'limits', 'typeinfo', 'sstream', 'complex', 'random', 'thread', 'mutex'];
        const h = headers[(fieldId - 1) % headers.length];
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 引入核心標頭檔`,
          chineseDescription: `為了在此良田建立 C++ 程式，請引入支援本關功能（包含相關運算或串流）的標準標頭檔：<${h}>。`,
          codeTemplate: `#include <__________>`,
          expectedAnswer: h,
          hint: `直接填寫該標頭檔的名稱：${h}。`,
          explanation: `#include <${h}> 是引入標準 C++ ${h} 宣告的基本指令，用於解鎖此函式庫所提供的各項先進編譯功能。`
        };
      }
      case 2: {
        const hasArgs = fieldId >= 8;
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 程式執行進入點`,
          chineseDescription: `請宣告標準 C++ 程式執行必備的進入點 main 函式。${hasArgs ? '本關要求宣告完整的命令列引數：int main(int argc, char* argv[])。' : '本關要求標準簡易宣告。'}`,
          codeTemplate: `______ main(${hasArgs ? 'int argc, char* argv[]' : ''}) {\n  return 0;\n}`,
          expectedAnswer: 'int',
          hint: '程式入口函式 main 的回傳型態固定為整數型態。',
          explanation: 'C++ 標準規範 main 函式之回傳值必須為 int。回傳 0 指示作業系統此程式已成功、無錯誤地執行完畢。'
        };
      }
      case 3: {
        const useCerr = fieldId % 3 === 0;
        const useClog = fieldId % 3 === 1;
        const streamObj = useCerr ? 'cerr' : (useClog ? 'clog' : 'cout');
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 標準輸出流載體`,
          chineseDescription: `請填寫 C++ 用來將訊息輸出至${useCerr ? '標準錯誤設備（cerr，不具快取）' : (useClog ? '標準日誌設備（clog，具快取）' : '標準螢幕終端（cout）')}的串流物件。`,
          codeTemplate: `std::______ << "良田作物等級: ${fieldId}\\n";`,
          expectedAnswer: streamObj,
          hint: `標準輸出為 cout，標準錯誤為 cerr，日誌為 clog。本題應填入：${streamObj}。`,
          explanation: `std::${streamObj} 是標準命名空間 std 中的一個預定義輸出串流載體，藉由運算子鏈結將資料推入輸出裝置中。`
        };
      }
      case 4: {
        const spaceName = `Farm_Space_${fieldId}`;
        const isCustom = fieldId >= 9;
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 命名空間與解析`,
          chineseDescription: `宣告預設使用 C++ ${isCustom ? `自定義的空間 ${spaceName}` : '標準 std'} 空間，使程式碼可以直接調用該空間中的成員。`,
          codeTemplate: `using _________ ${isCustom ? spaceName : 'std'};`,
          expectedAnswer: 'namespace',
          hint: '命名空間的英文關鍵字（單數型態）。',
          explanation: `using namespace 關鍵字宣告可以使編譯器在當前作用域內自動比對該命名空間中的符號，避免頻繁撰寫 :: 運算子。`
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 串流方向操作符`,
          chineseDescription: `填入適當的串流插入運算子（Stream Insertion Operator），將作物灌溉百分比 ${fieldId * 5}% 送入標準輸出中。`,
          codeTemplate: `std::cout ______ "灌溉率: " << ${fieldId * 5} << "%\\n";`,
          expectedAnswer: '<<',
          hint: '向左的雙角括弧。',
          explanation: '<< 是 C++ 專屬的串流插入運算子，能將右側的資料以二進制或格式化文字形式流向左側的輸出流對象。'
        };
      }
      case 6: {
        const varName = `moisture_target_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 讀取標準輸入`,
          chineseDescription: `請利用 C++ 的標準輸入串流物件，將鍵盤輸入的土壤濕度整數值載入變數 ${varName} 中。`,
          codeTemplate: `int ${varName};\nstd::______ >> ${varName};`,
          expectedAnswer: 'cin',
          hint: 'Console Input 的縮寫。',
          explanation: 'std::cin 代表標準輸入流，通常與提取運算子 >> 配合使用，將輸入緩衝區的數據反序列化為指定的變數型態。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 串流讀取運算子`,
          chineseDescription: `請填寫 C++ 串流提取運算子（Stream Extraction Operator），將輸入資料傳送給右側變數。`,
          codeTemplate: `int flow_rate;\nstd::cin ______ flow_rate;`,
          expectedAnswer: '>>',
          hint: '向右的雙角括弧。',
          explanation: '>> 運算子將輸入串流中的內容提取、轉換，並賦予其右側指定的變數。'
        };
      }
      case 8: {
        const size = fieldId > 10 ? 'long long' : 'int';
        const val = fieldId * 10000;
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 整數型態變數宣告`,
          chineseDescription: `請宣告一個名為 seed_count_${fieldId} 的整數型態變數（${fieldId > 10 ? '為避免數值溢位，請使用 64 位元長整數 long long' : '一般 32 位元有號整數 int'}），並將初值設為 ${val}。`,
          codeTemplate: `______ seed_count_${fieldId} = ${val};`,
          expectedAnswer: size,
          hint: `本關數值為 ${val}，請使用指定的型態關鍵字：${size}。`,
          explanation: `${size} 是 C++ 常用的基礎整數型態，在 32/64 位元架構中佔用對應的記憶體空間，用以安全存放計數。`
        };
      }
      case 9: {
        const isDouble = fieldId % 2 === 0;
        const val = (fieldId * 1.33).toFixed(3);
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 浮點數型態精密指派`,
          chineseDescription: `宣告一個精確的小數變數 nutrition_index_${fieldId}，指派其初始值為 ${val}。本關要求使用：${isDouble ? '雙精度浮點數 double' : '單精度浮點數 float'}。`,
          codeTemplate: `______ nutrition_index_${fieldId} = ${val}${isDouble ? '' : 'f'};`,
          expectedAnswer: isDouble ? 'double' : 'float',
          hint: `指定使用 ${isDouble ? 'double' : 'float'} 關鍵字。`,
          explanation: `double 具有 64 位元雙精度，而 float 具有 32 位元單精度。在科學計算或農田模擬中，通常更傾向使用 double。`
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `[LV.1 基礎] #${fieldId} 串流控制與分號結尾`,
          chineseDescription: `請補齊該行程式碼，使 C++ 的敘述句能正確結束，並在終端機中正確換行（不刷新快取）。`,
          codeTemplate: `std::cout << "系統初始化完畢... #${fieldId}" << '\\n'______`,
          expectedAnswer: ';',
          hint: '每一個完整的 C++ 執行敘述句都必須以分號結尾。',
          explanation: '分號 ; 在 C++ 中代表一條獨立表達式敘述句的終止符，不可遺漏，否則會產生語法解析錯誤（Syntax Error）。'
        };
      }
    }
  }

  if (fieldId <= 30) {
    // ==========================================
    // Category 2: Operators & Decision Making (Levels 16 - 30)
    // ==========================================
    const step = fieldId - 15; // 1 to 15
    switch (cardIndex) {
      case 1: {
        const val1 = step * 10 + 7;
        const val2 = 3;
        const ans = val1 % val2;
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 取餘數算術`,
          chineseDescription: `利用取餘數（Modulo）運算子，求出整數 ${val1} 除以 ${val2} 的餘數並賦予變數 rem_${fieldId}（餘數應為 ${ans}）。`,
          codeTemplate: `int rem_${fieldId} = ${val1} ______ ${val2};`,
          expectedAnswer: '%',
          hint: '百分比符號 %。',
          explanation: '在 C++ 中，% 為取餘數（modulo）運算子，僅能用於兩整數之間，返回除法後的整數餘值。'
        };
      }
      case 2: {
        const isPrefix = step % 2 === 0;
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 變數高效遞增`,
          chineseDescription: `請使用 ${isPrefix ? '前置遞增（Prefix）' : '後置遞增（Postfix）'} 運算子，將變數 current_turn_${fieldId} 增加 1。`,
          codeTemplate: isPrefix ? `______current_turn_${fieldId};` : `current_turn_${fieldId}______;`,
          expectedAnswer: '++',
          hint: '連續兩個加號。',
          explanation: '++ 運算子用於將變數值加 1。前置 ++ 會先加 1 再回傳，後置 ++ 會先回傳原值再加 1。'
        };
      }
      case 3: {
        const valLimit = step * 5;
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 關係邏輯比較`,
          chineseDescription: `寫出邏輯關係運算子，用以判斷目前的田地蓄水量 water_${fieldId} 是否「小於或等於」安全線 ${valLimit}。`,
          codeTemplate: `bool is_danger = (water_${fieldId} ______ ${valLimit});`,
          expectedAnswer: '<=',
          hint: '小於號後面緊接等號。',
          explanation: '<= 關係運算子在左側值小於或等於右側值時，會回傳 bool 常數 true，否則回傳 false。'
        };
      }
      case 4: {
        const valLimit = step * 15;
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 邏輯與 AND 串接`,
          chineseDescription: `當目前的日光強度 sun 大於 ${valLimit}，「並且」土壤濕度 wet 也大於 50 時，系統才判定為良好。`,
          codeTemplate: `bool optimal = (sun > ${valLimit}) ______ (wet > 50);`,
          expectedAnswer: '&&',
          hint: '兩個 And 符號串連。',
          explanation: '&& 是邏輯與（Logical AND）運算子。唯有當兩端條件皆評估為 true 時，整條表達式才成立。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 邏輯或 OR 串接`,
          chineseDescription: `當作物面臨害蟲威脅 insect == true，「或者」缺水狀態 dry == true 時，啟動警告提示。`,
          codeTemplate: `bool warning = (insect) ______ (dry);`,
          expectedAnswer: '||',
          hint: '兩條垂直管線符號。',
          explanation: '|| 是邏輯或（Logical OR）運算子。只要左右任一條件為 true，整體表達式即為 true。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 邏輯非否定句`,
          chineseDescription: `使用「邏輯非（Logical NOT）」運算子，將 bool 變數 is_frozen_${fieldId} 的真假值反轉。`,
          codeTemplate: `bool can_sow = ______is_frozen_${fieldId};`,
          expectedAnswer: '!',
          hint: '驚嘆號。',
          explanation: '! 運算子是單目運算子，可將 true 轉換為 false，或將 false 轉換為 true。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 條件決策結構 if`,
          chineseDescription: `當變數 leaf_color_${fieldId} 的數值等於 0 時，執行施肥指令。請寫出決策控制關鍵字。`,
          codeTemplate: `______ (leaf_color_${fieldId} == 0) {\n  apply_fertilizer();\n}`,
          expectedAnswer: 'if',
          hint: '如果。',
          explanation: 'if 關鍵字引導 C++ 條件判斷主體，當括弧內部的邏輯表達式結果為 true 時，執行緊隨的花括弧代碼塊。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 雙向分支機制 else`,
          chineseDescription: `若 if 內部的濕度條件不滿足，則在預設的分支區塊內執行 wait_one_day()。`,
          codeTemplate: `if (moisture > 40) {\n  harvest();\n} ______ {\n  wait_one_day();\n}`,
          expectedAnswer: 'else',
          hint: '否則。',
          explanation: 'else 關鍵字用以界定 if 條件判定為 false 時所應執行的備用程式碼路徑。'
        };
      }
      case 9: {
        const targetType = (step % 4) + 1;
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 多重判定開關 switch`,
          chineseDescription: `以 switch 結構判斷變數 code_${fieldId}，當其數值符合 case ${targetType} 時，觸發相應的特殊灌溉演算法。`,
          codeTemplate: `______ (code_${fieldId}) {\n  case ${targetType}:\n    special_irrigate();\n    break;\n}`,
          expectedAnswer: 'switch',
          hint: '開關、切換。',
          explanation: 'switch 關鍵字會評估一個整數或列舉變數，並將程式控制權直接轉移至匹配的 case 標記標籤中，提昇多分支效率。'
        };
      }
      case 10: {
        const valA = step * 4;
        const valB = step * 2 + 1;
        return {
          id, fieldId,
          title: `[LV.2 運算子] #${fieldId} 簡潔三元條件賦值`,
          chineseDescription: `利用三元運算子（Ternary Operator），若 condition 成立則賦予 ${valA}，否則賦予 ${valB}。`,
          codeTemplate: `int result = (condition) ______ ${valA} : ${valB};`,
          expectedAnswer: '?',
          hint: '問號。',
          explanation: '三元運算子 條件 ? 值1 : 值2 是 C++ 唯一的三目運算子，能在單行中依據布林條件安全指派不同的數值。'
        };
      }
    }
  }

  if (fieldId <= 45) {
    // ==========================================
    // Category 3: Loops & Iteration (Levels 31 - 45)
    // ==========================================
    const step = fieldId - 30; // 1 to 15
    switch (cardIndex) {
      case 1: {
        const limit = step * 4 + 10;
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 基礎 for 迴圈`,
          chineseDescription: `請撰寫一個從 i = 0 執行到 i < ${limit} 且每次遞增 1 的迴圈控制項。`,
          codeTemplate: `______ (int i = 0; i < ${limit}; i++) {\n  add_water(i);\n}`,
          expectedAnswer: 'for',
          hint: '為、針對。',
          explanation: 'for 迴圈在結構中內置了「初始化」、「條件判斷」與「步進修改」，非常適用於已知迭代次數的結構性循環。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 條件 while 迴圈`,
          chineseDescription: `只要目前的 pH 值 ph_level_${fieldId} 大於 7，就持續加入酸性調和劑。`,
          codeTemplate: `______ (ph_level_${fieldId} > 7) {\n  add_acid_drop();\n}`,
          expectedAnswer: 'while',
          hint: '當...的時候。',
          explanation: 'while 迴圈在每次執行前都會評估條件，若為 true 則執行內部陳述語句，適合用於未知次數的事件驅動迴圈。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 最少執行 do-while`,
          chineseDescription: `保證至少執行一次檢測 analyze_moisture()，若 is_unstable 為真則繼續進行迴圈。`,
          codeTemplate: `______ {\n  analyze_moisture();\n} while (is_unstable);`,
          expectedAnswer: 'do',
          hint: '做。',
          explanation: 'do-while 迴圈與 while 迴圈最大的區別在於：它會先執行一次迴圈本體，然後才在結尾處評估條件。'
        };
      }
      case 4: {
        const trigger = step * 5;
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 迴圈強制中斷 break`,
          chineseDescription: `在尋找目標作物的過程中，若 index 等於 ${trigger}，請立刻中斷並跳出整層迴圈。`,
          codeTemplate: `for (int i = 0; i < 100; i++) {\n  if (i == ${trigger}) ______;\n  check_soil(i);\n}`,
          expectedAnswer: 'break',
          hint: '破壞、中斷。',
          explanation: 'break 指令能立刻無條件跳出最內層的 for, while 或 switch 結構，將程式計數器移到迴圈外第一行。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 跳過疊代 continue`,
          chineseDescription: `若作物狀態處於休眠（is_dormant_${fieldId} == true），請跳過本輪後續操作，直接進入下一輪疊代。`,
          codeTemplate: `for (int i = 0; i < 30; i++) {\n  if (is_dormant_${fieldId}) ______;\n  apply_nutrients(i);\n}`,
          expectedAnswer: 'continue',
          hint: '繼續。',
          explanation: 'continue 關鍵字用以立刻中止目前的迭代，忽略剩餘的語句，直接跳至迴圈更新表達式並準備下一輪判定。'
        };
      }
      case 6: {
        const varList = `crop_weights_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 範圍型 for 迴圈`,
          chineseDescription: `請填入 C++11 引進的範圍型 for 迴圈（Range-based for loop）符號，用以唯讀遍歷容器 ${varList} 中的每個元素。`,
          codeTemplate: `for (const int weight ______ ${varList}) {\n  sum_weights(weight);\n}`,
          expectedAnswer: ':',
          hint: '冒號。',
          explanation: '在範圍型 for 迴圈中，冒號 : 的左右兩側分別代表「取出元素的變數宣告」與「可遍歷的容器對象」，語意極為精煉。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 疊代器自增更新`,
          chineseDescription: `在標準 while 迭代中，為了避免造成農田系統當機，必須在每輪結尾處對計數器 i 進行自增更新。`,
          codeTemplate: `int i = 0;\nwhile (i < ${step * 2 + 5}) {\n  irrigate_plot(i);\n  i______;\n}`,
          expectedAnswer: '++',
          hint: '加加。',
          explanation: '若遺漏迴圈控制變數的更新操作（如 i++），迴圈條件將永遠為真，進而造成記憶體鎖死或系統無限當機的嚴重災難。'
        };
      }
      case 8: {
        const gridRows = step + 2;
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 二維矩陣巢狀迴圈`,
          chineseDescription: `請建立巢狀迴圈（Nested Loop）來拜訪 ${gridRows} x 5 的二維網格。`,
          codeTemplate: `for (int r = 0; r < ${gridRows}; r++) {\n  ______ (int c = 0; c < 5; c++) {\n    fertilize(r, c);\n  }\n}`,
          expectedAnswer: 'for',
          hint: '內層也是一個 for 迴圈。',
          explanation: '巢狀迴圈最常用於處理多維空間。內層迴圈在每次外層迴圈執行一輪時，會完整地重複執行其規定的全部次數。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 迴圈持續增益指派`,
          chineseDescription: `請使用簡寫算術指派符，將每輪收成的值 weight 累加至 total_harvest_${fieldId} 變數中。`,
          codeTemplate: `for (int weight : crops) {\n  total_harvest_${fieldId} ______ weight;\n}`,
          expectedAnswer: '+=',
          hint: '加號與等號。',
          explanation: '+= 是複合賦值運算子，x += y 等價於 x = x + y，能免去重寫變數名的繁瑣，並常獲得編譯器優化。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `[LV.3 迴圈] #${fieldId} 無限迴圈與布林控制`,
          chineseDescription: `在某些背景服務中，我們會故意使用布林常數建立一個永不終止的無限迴圈。`,
          codeTemplate: `while (______) {\n  monitor_water_temperature();\n  if (system_shutdown) break;\n}`,
          expectedAnswer: 'true',
          hint: '代表「真」的布林字面值。',
          explanation: 'while (true) 或 for (;;) 會建立一個無條件限制的無限迴圈，程式必須在內部藉由 break 或 return 主動退出。'
        };
      }
    }
  }

  if (fieldId <= 60) {
    // ==========================================
    // Category 4: Functions & Scope (Levels 46 - 60)
    // ==========================================
    const step = fieldId - 45; // 1 to 15
    switch (cardIndex) {
      case 1: {
        const funcName = `monitor_field_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 空白無回傳值型態`,
          chineseDescription: `宣告一個不需回傳任何運算結果、純粹執行列印任務的函式 ${funcName}。`,
          codeTemplate: `______ ${funcName}(int status) {\n  std::cout << "狀態: " << status;\n}`,
          expectedAnswer: 'void',
          hint: '空白、無。',
          explanation: 'void 關鍵字用於指示函式不提供任何返回值。調用該類函式時，無法將其賦值給任何變數。'
        };
      }
      case 2: {
        const val = step * 10;
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 數值回傳關鍵字`,
          chineseDescription: `在計算作物預期產量的函式中，回傳最終乘積結果 ${val}。`,
          codeTemplate: `int calculate_yield() {\n  int base = ${val};\n  ______ base;\n}`,
          expectedAnswer: 'return',
          hint: '返回、回傳。',
          explanation: 'return 語句終止當前函式的執行，並將控制權與選定的數值交還給原調用者。'
        };
      }
      case 3: {
        const varName = `moisture_ref_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 引用傳遞 (Pass by Ref)`,
          chineseDescription: `在函式參數中，使用引用傳遞（Pass by Reference），使函式內部能直接修改外部原變數的值。`,
          codeTemplate: `void adjust_water(int ______ ${varName}) {\n  ${varName} += 50;\n}`,
          expectedAnswer: '&',
          hint: '取地址 / 引用符號（And 鍵）。',
          explanation: '使用 & 符號宣告引用參數，函式便會直接獲得外部實參的記憶體別名，能省去複製開銷並允許原地修改數值。'
        };
      }
      case 4: {
        const dVal = step + 5;
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 預設參數指派`,
          chineseDescription: `在 C++ 函式原型中設定預設參數值（Default Parameter），若調用者未給定參數，則預設為 ${dVal}。`,
          codeTemplate: `void apply_chemical(int amount ______ ${dVal});`,
          expectedAnswer: '=',
          hint: '等號。',
          explanation: '在函式宣告中使用等號 = 給定預設值。若調用者調用時省略此參數，編譯器會自動為其補上預設常數。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 高效內聯 inline 宣告`,
          chineseDescription: `請填寫建議編譯器將此極短函式就地展開（Inline Expansion）的關鍵字，用以省去調用棧幀（Stack Frame）開銷。`,
          codeTemplate: `______ double get_ratio(double a) {\n  return a * 1.05;\n}`,
          expectedAnswer: 'inline',
          hint: '內聯。',
          explanation: 'inline 關鍵字請求編譯器將函式呼叫點直接替換為其代碼體，減少函數調用的壓棧、出棧額外CPU開銷。'
        };
      }
      case 6: {
        const val = step * 3;
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 靜態局部變數 static`,
          chineseDescription: `宣告一個局部靜態變數（Static Local Variable），使其在函式結束時不會消亡，能保留上一次調用的數值。`,
          codeTemplate: `int count_calls() {\n  ______ int total_count = 0;\n  total_count++;\n  return total_count;\n}`,
          expectedAnswer: 'static',
          hint: '靜態的。',
          explanation: 'static 局部變數生命週期貫穿整個程式運行，但作用域僅限於函數內部，只會初始化一次，能記錄調用歷史。'
        };
      }
      case 7: {
        const vName = `input_config_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 常數參數唯讀保護`,
          chineseDescription: `為避免大物件在引用傳遞時被惡意修改，請加上適當的修飾字，將其實施唯讀（Read-Only）保護。`,
          codeTemplate: `void log_config(______ string& ${vName}) {\n  cout << ${vName};\n}`,
          expectedAnswer: 'const',
          hint: '常數。',
          explanation: 'const 修飾引用參數保證了實參在傳遞時的安全。任何試圖對該變數進行賦值的語句，都將無法通過編譯。'
        };
      }
      case 8: {
        const tVal = step + 1;
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 基礎遞迴遞迴 base`,
          chineseDescription: `完成以下計算費氏數列（Fibonacci）的遞迴函式。填寫基本邊界條件（Base Case）的判斷語句。`,
          codeTemplate: `int fib(int n) {\n  ______ (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}`,
          expectedAnswer: 'if',
          hint: '當 n 小於等於 1 時返回 n。',
          explanation: '遞迴函式必須設置合適的邊界條件（Base Case），否則程式將在執行時發生無窮呼叫導致記憶體堆疊溢位（Stack Overflow）。'
        };
      }
      case 9: {
        const globalVal = step * 100;
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 作用域解析運算子`,
          chineseDescription: `在局部變數同名遮蔽（Shadowing）時，使用作用域解析運算子調用外部全域的變數（值為 ${globalVal}）。`,
          codeTemplate: `int global_var = ${globalVal};\nvoid show() {\n  int global_var = 5;\n  cout << "全域變數為: " << ______global_var;\n}`,
          expectedAnswer: '::',
          hint: '雙冒號。',
          explanation: '雙冒號 :: 為作用域解析運算子（Scope Resolution Operator），若其左側留空，則代表存取全域（Global Namespace）作用域。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `[LV.4 函式] #${fieldId} 多載匹配決策`,
          chineseDescription: `若我們宣告了 ` + "`void print(int)`" + ` 與 ` + "`void print(double)`" + `，調用 ` + "`print(" + (step + 0.5) + ")`" + ` 時，編譯器會自動匹配哪一種引數型態？`,
          codeTemplate: `void print(int);\nvoid print(______); // print(${(step + 0.5)}) 匹配此項`,
          expectedAnswer: 'double',
          hint: '浮點數型態名稱。',
          explanation: 'C++ 支持函式多載（Overloading），編譯器在編譯期會根據傳入實參的靜態型態（此處為 double），尋找最優的函數特化簽名。'
        };
      }
    }
  }

  if (fieldId <= 75) {
    // ==========================================
    // Category 5: Arrays & Strings (Levels 61 - 75)
    // ==========================================
    const step = fieldId - 60; // 1 to 15
    switch (cardIndex) {
      case 1: {
        const size = step + 5;
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 靜態陣列大小界定`,
          chineseDescription: `請在棧記憶體（Stack）中宣告一個大小固定為 ${size} 的整數陣列 scores_${fieldId}。`,
          codeTemplate: `int scores_${fieldId}[______];`,
          expectedAnswer: size.toString(),
          hint: `直接填入長度常數：${size}。`,
          explanation: '在 C++ 中，靜態陣列的大小必須是一個編譯期確定的常數表達式，其記憶體空間會在編譯期保留。'
        };
      }
      case 2: {
        const rows = step + 1;
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 二維矩陣網格存取`,
          chineseDescription: `請存取這個 ${rows}x3 二維農田作物高度矩陣。取得第 0 列第 2 行的元素。`,
          codeTemplate: `int height = farm_grid[0]______2];`,
          expectedAnswer: '[',
          hint: '左中括弧。',
          explanation: 'C++ 的二維陣列底層是連續的一維排列，邏輯上使用雙重中括弧 matrix[row][col] 來進行多維維度的索引存取。'
        };
      }
      case 3: {
        const varName = `farm_name_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 字串長度查詢`,
          chineseDescription: `請填寫適當的標準字串成員函式，以獲取 string 變數 ${varName} 的字元長度。`,
          codeTemplate: `std::string ${varName} = "Super_Farm";\nsize_t len = ${varName}.______();`,
          expectedAnswer: 'length',
          hint: '長度。也可以是 size，但本關優先使用 length。',
          explanation: 'std::string 提供了 .length() 與 .size() 成員函式，兩者等價，皆返回字串所含的位元組個數（不計終止符）。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} C風格字串空字元`,
          chineseDescription: `在傳統的 C 風格字元陣列（C-style string）中，用來標誌字串結尾的 Null 終止符號為何？`,
          codeTemplate: `char name[] = {'C', 'P', 'P', '______'};`,
          expectedAnswer: '\\0',
          hint: '反斜線加零。',
          explanation: '\\0（ASCII 值 0）是 C 風格字串結束的物理邊界標記。任何標準 C 函數庫操作都依據它來停止讀取。'
        };
      }
      case 5: {
        const sName = `url_str_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 子字串提取 substr`,
          chineseDescription: `請填寫 C++ 獲取部分子字串的成員函式。`,
          codeTemplate: `std::string ${sName} = "https://cpp.org";\nstd::string sub = ${sName}.______(8, 3); // 取得 "cpp"`,
          expectedAnswer: 'substr',
          hint: 'Sub-string 的簡寫。',
          explanation: '.substr(pos, len) 函式從指定下標開始拷貝長度為 len 的子字串。若省略 len 則預設拷貝至原字串的最末端。'
        };
      }
      case 6: {
        const keyword = `crop_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 字串關鍵字搜尋 find`,
          chineseDescription: `在 C++ 標準 string 中，搜尋子字串 "wheat" 首次出現的索引下標。請填寫成員函式。`,
          codeTemplate: `std::string field = "corn_wheat_rice";\nsize_t pos = field.______("wheat");`,
          expectedAnswer: 'find',
          hint: '尋找、尋獲的英文。',
          explanation: '.find() 成員函式在字串中搜尋指定的字元或字串。若尋獲則返回首字元索引，若失敗則回傳 std::string::npos。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 動態向量動態調整`,
          chineseDescription: `請填寫標準 vector 成員函式，將向量 elements 的元素數目強制重設為 ${step + 10}。`,
          codeTemplate: `std::vector<int> elements;\nelements.______(${step + 10});`,
          expectedAnswer: 'resize',
          hint: '重新調整尺寸。',
          explanation: '.resize(n) 用於變更 vector 的大小。若新大小大於原大小，則在尾部填充預設值；若小於則截斷元素。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 字串追隨串接`,
          chineseDescription: `請填寫最適當的運算子，將字元 '!' 累加追加入現有 string 變數 log_msg_${fieldId} 的尾部。`,
          codeTemplate: `std::string log_msg_${fieldId} = "Success";\nlog_msg_${fieldId} ______ '!';`,
          expectedAnswer: '+=',
          hint: '加與等。',
          explanation: 'std::string 支持運算子多載，利用 += 可以極高效率地在字串緩衝區末端追加新字元，避免不必要的臨時拷貝。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 標準字串型態類別`,
          chineseDescription: `宣告一個可進行安全字串操作、免去管理記憶體的 C++ 標準字串物件，變數名為 name_${fieldId}。`,
          codeTemplate: `std::______ name_${fieldId} = "C++ Farm Plots";`,
          expectedAnswer: 'string',
          hint: '字串的英文。',
          explanation: 'std::string 是 C++ 標準模板庫中的類別，動態管理內部字元數組，提供自動擴充、拼接等高階安全特性。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `[LV.5 陣列字串] #${fieldId} 字元判斷與轉化`,
          chineseDescription: `檢測字元是否為阿拉伯數字的標準函數為 isdigit。欲將字元 c 轉換為「大寫」應使用哪一個標準函數？`,
          codeTemplate: `#include <cctype>\nchar upper_c = std::______(c);`,
          expectedAnswer: 'toupper',
          hint: '轉大寫。',
          explanation: 'std::toupper 接收一個整數（字元 ASCII 碼），若為小寫字母則回傳其對應的大寫字母，否則按原值返回。'
        };
      }
    }
  }

  if (fieldId <= 90) {
    // ==========================================
    // Category 6: Pointers, References & Structs (Levels 76 - 90)
    // ==========================================
    const step = fieldId - 75; // 1 to 15
    switch (cardIndex) {
      case 1: {
        const varName = `soil_temp_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 尋址取地址運算子`,
          chineseDescription: `要讓指標 p 指向一般變數 ${varName} 的記憶體空間，必須使用什麼單目運算子來取得其物理記憶體地址？`,
          codeTemplate: `int ${varName} = ${step * 2 + 20};\nint* p = ______${varName};`,
          expectedAnswer: '&',
          hint: '和號（取地址符）。',
          explanation: '& 運算子是取地址運算子。它作用於一般的記憶體變數，並返回該變數在虛擬記憶體空間中的實際起始地址。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 指標反尋址解引用`,
          chineseDescription: `使用指標解引用（Dereference）運算子，讀取指標 ptr 內部儲存地址所對應的整數值並存入 val_${fieldId}。`,
          codeTemplate: `int* ptr = &moisture;\nint val_${fieldId} = ______ptr;`,
          expectedAnswer: '*',
          hint: '星號（解引用符）。',
          explanation: '* 運算子用於解引用指標。它告訴編譯器前往該指標存放的記憶體地址，直接讀取或修改該處存放的實際數據。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 安全空指標 C++11`,
          chineseDescription: `請使用 C++11 起最安全、強型別的空指標常量，來初始化整數指標 variable_ptr_${fieldId}。`,
          codeTemplate: `double* variable_ptr_${fieldId} = ______;`,
          expectedAnswer: 'nullptr',
          hint: '不要使用舊式的 NULL 或 0。',
          explanation: 'nullptr 是 C++11 引進的專屬強型別空指標字面常數，能精確對應指標型態，避免與整數 0 產生重載歧義。'
        };
      }
      case 4: {
        const originalName = `wet_value_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 別名引用宣告`,
          chineseDescription: `請宣告一個引用變數（Reference）ref，作為變數 ${originalName} 的直接記憶體別名。`,
          codeTemplate: `int ${originalName} = 88;\nint______ ref = ${originalName};`,
          expectedAnswer: '&',
          hint: '引用符號，與取地址同符。',
          explanation: '引用 & 是 C++ 獨特的語法特徵。引用在宣告時必須當場初始化，且其一經綁定便終生無法變更綁定對象。'
        };
      }
      case 5: {
        const sName = `Crop_Struct_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 自訂結構定義 struct`,
          chineseDescription: `請使用 C++ 的結構關鍵字定義一個自定義複合型態 ${sName}，打包多項欄位。`,
          codeTemplate: `______ ${sName} {\n  int id;\n  double size;\n};`,
          expectedAnswer: 'struct',
          hint: '結構體關鍵字。',
          explanation: 'struct 關鍵字用於定義結構。在 C++ 中，struct 的成員預設存取權限均為 public，是最基礎的資料包裝載體。'
        };
      }
      case 6: {
        const vName = `farm_obj_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 結構實體成員存取`,
          chineseDescription: `請使用直接成員存取符（Member Access Operator），寫入該結構實體 ${vName} 的 weight 欄位。`,
          codeTemplate: `Crop_Struct_${fieldId} ${vName};\n${vName}______weight = 4.25;`,
          expectedAnswer: '.',
          hint: '一個句點符號。',
          explanation: '點號 . 是 C++ 的成員存取運算子，用於存取一般非指標結構或類別實體的成員變數與成員函式。'
        };
      }
      case 7: {
        const ptrName = `ptr_farm_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 指標成員箭頭運算`,
          chineseDescription: `請使用間接成員存取運算子，透過結構指標 ${ptrName} 來寫入其指向實體的 status 屬性。`,
          codeTemplate: `Crop_Struct_${fieldId} target;\nCrop_Struct_${fieldId}* ${ptrName} = &target;\n${ptrName}______status = 1;`,
          expectedAnswer: '->',
          hint: '減號與大於號組成的箭頭。',
          explanation: '-> 是箭頭運算子。當我們對指標對象進行成員讀寫時，x->y 實質上是 (*x).y 的語法糖，極具可讀性。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 指標連續遞增步進`,
          chineseDescription: `在處理連續記憶體陣列時，將指標向後移動一個元素單位。請填寫最精簡的自增運算子。`,
          codeTemplate: `int arr[5] = {1, 2, 3, 4, 5};\nint* p = arr;\np______; // 現在指向 arr[1]`,
          expectedAnswer: '++',
          hint: '加加。',
          explanation: '對指標進行自增（p++），編譯器會依據指標宣告的基底型態大小（sizeof(T)），自動在底層乘上位元組步進地址。'
        };
      }
      case 9: {
        const val = step * 100;
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 唯讀資料指針 const`,
          chineseDescription: `宣告一個指向「不可修改整數」（常數）的指標 ptr，保護指向的數值 ${val}。`,
          codeTemplate: `______ int* ptr = &val_limit;`,
          expectedAnswer: 'const',
          hint: '常數。',
          explanation: 'const int* ptr 代表指向常數的指標。指標本身的儲存地址可以更換，但不能透過該指標修改其所指位置的值。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `[LV.6 指標結構] #${fieldId} 無型態通用指標 void`,
          chineseDescription: `請宣告一個可以接收任意數據地址的無型態通用指標（Raw Pointer），型態名稱為：______*。`,
          codeTemplate: `______* raw_memory_ptr = &moisture_level;`,
          expectedAnswer: 'void',
          hint: '空的、無型態。',
          explanation: 'void* 代表無型態指標，能指向任何資料類型。但在解引用前，必須先使用 static_cast 強制轉換回具體型態。'
        };
      }
    }
  }

  if (fieldId <= 105) {
    // ==========================================
    // Category 7: Classes & OOP Basics (Levels 91 - 105)
    // ==========================================
    const step = fieldId - 90; // 1 to 15
    switch (cardIndex) {
      case 1: {
        const className = `Farm_Plot_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} C++ 類別定義 class`,
          chineseDescription: `請使用 C++ 專屬關鍵字定義一個高凝聚力的 C++ 類別原型 ${className}。`,
          codeTemplate: `______ ${className} {\n  int capacity;\n};`,
          expectedAnswer: 'class',
          hint: '類別的英文。',
          explanation: 'class 關鍵字用於封裝狀態與行為。C++ 類別的成員預設權限為 private，這是實施物件導向封裝的起點。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 開放成員存取 public`,
          chineseDescription: `指定後續宣告的變數與成員函式皆具備外部可任意存取的最高權限級別。`,
          codeTemplate: `class Crop {\n______:\n  int height;\n  void water_it();\n};`,
          expectedAnswer: 'public',
          hint: '公共的、公開的。',
          explanation: 'public 存取修飾子規定的成員對外部所有實體皆開放讀取。良好的類別通常只將控制方法與介面設為 public。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 內部私有成員 private`,
          chineseDescription: `請宣告內部的隱私封裝權限，拒絕任何外部程式直接存取此敏感的財務欄位。`,
          codeTemplate: `class Wallet {\n______:\n  int coins_inside;\n};`,
          expectedAnswer: 'private',
          hint: '私有的。',
          explanation: 'private 修飾的成員僅能被類別自身的內部成員函式（或友元）拜訪，是防止狀態被非法破壞的防衛盾牌。'
        };
      }
      case 4: {
        const val = step * 10;
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 成員初始化列表`,
          chineseDescription: `在建構子建構時，使用成員初始化列表（Member Initialization List）的高效語法，將屬性 width 賦初值 ${val}。`,
          codeTemplate: `class Board {\n  int width;\npublic:\n  Board() ______ width(${val}) {}\n};`,
          expectedAnswer: ':',
          hint: '冒號符號。',
          explanation: '在建構子參數列表後加冒號 :，可觸發初始化列表。這比在建構子體內用等號賦值更高效，能免去預設建構的開銷。'
        };
      }
      case 5: {
        const cName = `Plot_Deleter_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 資源解構子析構`,
          chineseDescription: `請為類別 ${cName} 定義一個用來在物件消亡時釋放外部檔案或記憶體資源的析構/解構子。`,
          codeTemplate: `class ${cName} {\npublic:\n  ______${cName}() {\n    // 清理動態資源\n  }\n};`,
          expectedAnswer: '~',
          hint: '波浪符。按 Shift + ~ 鍵輸入。',
          explanation: '波浪號 ~ 後面跟類別名稱即為解構子（Destructor）。當物件生命週期結束時，系統會自動調用它進行就地清理。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 當前物件指標 this`,
          chineseDescription: `在成員方法中，當參數名與屬性成員變數同名時，使用什麼關鍵字指涉「當前調用此方法之物件自身地址」？`,
          codeTemplate: `class Node {\n  int id;\npublic:\n  void set_id(int id) {\n    ______->id = id;\n  }\n};`,
          expectedAnswer: 'this',
          hint: '這個、目前這一個。',
          explanation: 'this 是指向當前物件實體的隱含常數指針。它在非靜態成員方法中隱式可用，常用於消除參數命名遮蔽。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 唯讀成員方法 const`,
          chineseDescription: `請宣告此屬性讀取函式（Getter）為唯讀成員函式，防止在其中無意間修改了類別內的任何成員變數。`,
          codeTemplate: `class Sensor {\n  int value;\npublic:\n  int get_value() ______ {\n    return value;\n  }\n};`,
          expectedAnswer: 'const',
          hint: '常數關鍵字，置於參數括弧與函式體之間。',
          explanation: '成員函式尾部的 const 保證此方法不會在內部修改物件的任何狀態。唯讀物件只能調用此類 const 成員函式。'
        };
      }
      case 8: {
        const counterName = `count_fields_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 類別靜態成員 static`,
          chineseDescription: `請宣告一個不屬於任何個別單一物件實體、而是由該類別所有物件共用的全域靜態成員變數。`,
          codeTemplate: `class Field_Manager {\npublic:\n  ______ int ${counterName};\n};`,
          expectedAnswer: 'static',
          hint: '靜態的。',
          explanation: 'static 類別成員只有一份實體，儲存於全域靜態區中。它在類別外定義，可不經實體化即透過 類別名:: 進行呼叫。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 友元信任存取 friend`,
          chineseDescription: `請在內部向某外部類別或函式授予特別的存取信任權限（Friend Class），允許其直接讀寫本類別之 private 私有成員。`,
          codeTemplate: `class Private_Zone {\n  int passcode;\n  ______ class Inspector;\n};`,
          expectedAnswer: 'friend',
          hint: '朋友。',
          explanation: 'friend 關鍵字破壞了傳統的封裝屏障，允許授信的外部函數或類別在內部像成員本身一樣無限制拜訪私有成員。'
        };
      }
      case 10: {
        const val = step * 50;
        return {
          id, fieldId,
          title: `[LV.7 類別基礎] #${fieldId} 單參數防隱式轉換`,
          chineseDescription: `在單一參數的建構子前加上什麼關鍵字，以杜絕編譯器在背後偷偷進行非預期的隱式型態轉換（Implicit Conversion）？`,
          codeTemplate: `class Price {\n  int val;\npublic:\n  ______ Price(int v) : val(v) {}\n};`,
          expectedAnswer: 'explicit',
          hint: '明確的、防止隱式轉換的。',
          explanation: 'explicit 關鍵字禁止編譯器利用單參數建構子將整數隱式轉型為 Price 物件，強化了編譯期型別安全的防護。'
        };
      }
    }
  }

  if (fieldId <= 120) {
    // ==========================================
    // Category 8: Inheritance & Polymorphism (Levels 106 - 120)
    // ==========================================
    const step = fieldId - 105; // 1 to 15
    switch (cardIndex) {
      case 1: {
        const baseClass = `Irrigator_Base_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 基礎繼承派生`,
          chineseDescription: `讓新類別 Smart_Irrigator 繼承現有的基礎設施父類別 ${baseClass}。`,
          codeTemplate: `class Smart_Irrigator ______ public ${baseClass} {\n  int automation_level;\n};`,
          expectedAnswer: ':',
          hint: '單冒號。',
          explanation: 'C++ 使用單冒號 : 引導繼承。冒號右側跟隨繼承存取層級與基底類別名稱，能獲取基類的公用屬性與代碼複用。'
        };
      }
      case 2: {
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 公有派生繼承 public`,
          chineseDescription: `在多數標準 OO 繼承架構中，我們都優先採取符合「Is-A 關係」的最標準「公有繼承（Public Inheritance）」。`,
          codeTemplate: `class Derived_Plot : ______ Base_Plot {\n  // 公有繼承\n};`,
          expectedAnswer: 'public',
          hint: '公開的。',
          explanation: 'public 繼承最完整地保留了基類成員的存取屬性。基類的 public 在子類依然是 public，符合物件導向行為相容原則。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 動態繫結虛擬 virtual`,
          chineseDescription: `請填寫宣告多型核心的關鍵字，以啟動執行期動態繫結（Dynamic Binding），允許子類別重寫（Override）此方法。`,
          codeTemplate: `class Crop_Base {\npublic:\n  ______ void grow_action() {\n    cout << "一般生長";\n  }\n};`,
          expectedAnswer: 'virtual',
          hint: '虛擬的。',
          explanation: 'virtual 關鍵字建構了 C++ 虛擬函數表（Vtable）。當指針指向衍生對象時，程序會在運行期動態決定調用何者的函數。'
        };
      }
      case 4: {
        const interfaceName = `Field_Action_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 純虛擬函式抽象介面`,
          chineseDescription: `將此生長方法宣告為純虛擬函式（Pure Virtual Function），使 ${interfaceName} 成為不可實體化的「抽象類別（Abstract Class）」。`,
          codeTemplate: `class ${interfaceName} {\npublic:\n  virtual void trigger_harvest() = ______;\n};`,
          expectedAnswer: '0',
          hint: '數字零。',
          explanation: '純虛擬函數以 = 0 做結尾宣告，它完全不提供默認實作，強制任何非抽象的衍生子類必須實作此接口才能建立對象。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 重寫方法複寫 override`,
          chineseDescription: `在 C++11 中，為了避免因打字錯誤不小心重載了同名方法，建議在子類別方法後加上什麼編譯檢驗修飾字？`,
          codeTemplate: `class Auto_Sower : public Sower_Base {\npublic:\n  void do_sow() ______ {\n    custom_seed_drop();\n  }\n};`,
          expectedAnswer: 'override',
          hint: '覆蓋、重寫的英文。',
          explanation: 'override 關鍵字讓編譯器在編譯階段嚴格審核：該成員函式是否在基底類別中存在完全一致的 virtual 虛擬函數特化。'
        };
      }
      case 6: {
        const baseName = `Base_Field_${fieldId}`;
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 基底重寫方法顯式調用`,
          chineseDescription: `當衍生類別重寫了 show()，若衍生類別成員內部仍想「指名調用」父類別 ${baseName} 中的原始 show()，該如何寫？`,
          codeTemplate: `void Derived_Show() {\n  ______::show(); // 呼叫父類的 show()\n}`,
          expectedAnswer: baseName,
          hint: `直接填寫父類別的名稱：${baseName}。`,
          explanation: '利用基底類別名稱加雙冒號 BaseClassName:: 前綴，即可在程式中靜態繞過多型機制的動態查找，強行調用父類版本。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 終止繼承 final`,
          chineseDescription: `C++11 引進了什麼關鍵字，可以放在類別宣告後面，代表此類別是個完美的葉子節點，完全「禁止」任何後續類別再次繼承它？`,
          codeTemplate: `class Ultimate_Processor ______ {\n  // 拒絕衍生子類\n};`,
          expectedAnswer: 'final',
          hint: '最終的、最後的。',
          explanation: 'final 關鍵字可用於類別或特定虛擬方法。應用於類別時拒絕子類派生；應用於方法時則禁止衍生類重寫該方法。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 子類存取權限 protected`,
          chineseDescription: `請填寫介於公有與私有之間的成員防護權限，僅允許「自身內部與其衍生子類內部」進行直接拜訪，外部依然隔離。`,
          codeTemplate: `class Secret_Formula {\n______:\n  double formula_coefficient;\n};`,
          expectedAnswer: 'protected',
          hint: '受保護的。',
          explanation: 'protected 提供給子類繼承體系專屬的開放存取。它保護資料免受普通外部物件的隨意窺視，但對衍生體系提供信任。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 多型解構安全防護`,
          chineseDescription: `為了防止在 delete 指向衍生實體的父類指針時產生記憶體部分殘留（Memory Leak），父類別的解構子必須宣告為什麼型態？`,
          codeTemplate: `class Shape {\npublic:\n  ______ virtual ~Shape() {}\n};`,
          expectedAnswer: 'virtual',
          hint: '虛擬的，通常放在析構函式最前方。',
          explanation: '基底類別必須宣告虛擬解構子（Virtual Destructor）。這能確保在解構時，能順著虛擬函數指針鏈正確引導子類先解構。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `[LV.8 繼承多型] #${fieldId} 執行期多型轉型 dynamic_cast`,
          chineseDescription: `請填寫 C++ 專門在執行期（Runtime）用來安全地將基底類別指針轉型為衍生類別指針的動態轉型運算子。`,
          codeTemplate: `Derived* d = ______(base_ptr);`,
          expectedAnswer: 'dynamic_cast',
          hint: '動態轉型（包含底線與 cast）。格式為 dynamic_cast<T*>(ptr)。',
          explanation: 'dynamic_cast 利用執行期類型訊息（RTTI）進行安全向下轉型。若轉型不合法，指針類型將安全地回傳 nullptr 常數。'
        };
      }
    }
  }

  if (fieldId <= 135) {
    // ==========================================
    // Category 9: STL Containers (Levels 121 - 135)
    // ==========================================
    const step = fieldId - 120; // 1 to 15
    switch (cardIndex) {
      case 1: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 動態陣列向量 Vector`,
          chineseDescription: `宣告一個可以自動調整物理記憶體長度、連續儲存整數的 C++ 標準向量容器。`,
          codeTemplate: `std::______<int> farm_record;`,
          expectedAnswer: 'vector',
          hint: '向量、動態陣列。',
          explanation: 'std::vector 是 C++ 最核心的連續記憶體動態數組，支持 O(1) 尾端隨機插刪，以及高速隨機下標拜訪。'
        };
      }
      case 2: {
        const val = step * 10 + 5;
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 向量追加元素 push_back`,
          chineseDescription: `將整數作物編號 ${val} 以 O(1) 效率追加推入向量尾端。請填入最適當的 STL 函數方法。`,
          codeTemplate: `std::vector<int> crops;\ncrops.______(${val});`,
          expectedAnswer: 'push_back',
          hint: '向後推入，利用底線連結。',
          explanation: '.push_back(val) 會在向量的最後方配置新空間，並將傳入物件複製或搬移到該處。攤提時間複雜度為 O(1)。'
        };
      }
      case 3: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 排序關聯表 Map`,
          chineseDescription: `宣告一個以 string 為鍵、int 為值，底層基於平衡紅黑樹、會對 Key 自動升冪排序的對照關聯表。`,
          codeTemplate: `std::______<std::string, int> crop_price_index;`,
          expectedAnswer: 'map',
          hint: '地圖、關聯表。',
          explanation: 'std::map 內部使用紅黑樹維護，所有鍵值對按鍵的大小順序精確排序，每次插入、查找與刪除皆保證 O(log N) 耗時。'
        };
      }
      case 4: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 唯一鍵值集合 Set`,
          chineseDescription: `宣告一個不允許重複元素且會自動排序的 std 唯一值整數集合。`,
          codeTemplate: `std::______<int> unique_crop_ids;`,
          expectedAnswer: 'set',
          hint: '集合。',
          explanation: 'std::set 存儲不重複的元素值，底層使用平衡二元樹。當嘗試插入已存在的數值時，插入操作會被自動拒絕。'
        };
      }
      case 5: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 單向佇列推入 push`,
          chineseDescription: `在標準佇列（Queue，先進先出 FIFO）中，用來將作物實體 elements 推入佇列的函數方法。`,
          codeTemplate: `std::queue<int> q;\nq.______(${step * 10});`,
          expectedAnswer: 'push',
          hint: '推入（單音節單字）。',
          explanation: '.push(val) 在 FIFO 佇列尾端加入新元素，為佇列結構提供基本的入隊（Enqueue）能力。'
        };
      }
      case 6: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 後進先出堆疊最頂 accessor`,
          chineseDescription: `在標準 LIFO 堆疊（Stack，後進先出）中，用來讀取目前最後進去最頂端元素的函數方法。`,
          codeTemplate: `std::stack<int> s;\ns.push(${step * 3});\nint top_element = s.______();`,
          expectedAnswer: 'top',
          hint: '頂端。',
          explanation: '.top() 函式返回堆疊中最上層、最新推入的元素之引用，但呼叫它並不會將該元素從堆疊中移除。'
        };
      }
      case 7: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 高效雜湊關聯表 unordered_map`,
          chineseDescription: `宣告一個平均查詢效率可達極致 O(1) 的無序、基於雜湊表（Hash Table）底層的關聯對照表。`,
          codeTemplate: `std::______<int, std::string> fast_farm_lookup;`,
          expectedAnswer: 'unordered_map',
          hint: '無序地圖，底劃線連接。',
          explanation: 'std::unordered_map 基於雜湊表，不對鍵進行排序，但在平均情況下具有常數級別的超高速查找效能。'
        };
      }
      case 8: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 迭代器型態定義`,
          chineseDescription: `在遍歷 vector 元素時，宣告一個指向動態陣列起點的正向迭代器（Iterator）指標。`,
          codeTemplate: `std::vector<int> v = {1, 2, 3};\nstd::vector<int>::______ it = v.begin();`,
          expectedAnswer: 'iterator',
          hint: '迭代器的英文。',
          explanation: 'iterator 扮演了物件化的虛擬指針，解除了 STL 容器與普通指針的緊密耦合，統一了各類複雜容器的周遊手法。'
        };
      }
      case 9: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 鍵值對包裝 Pair`,
          chineseDescription: `宣告一個將「作物名稱（string）」與「高度（double）」組合成單一儲存單元的標準對子（Pair）。`,
          codeTemplate: `std::______<std::string, double> crop_height_pair;`,
          expectedAnswer: 'pair',
          hint: '對、雙。',
          explanation: 'std::pair 是一個極為簡約的結構模板，擁有 .first 與 .second 兩個公用屬性，常作為 map 節點或返回值。'
        };
      }
      case 10: {
        return {
          id, fieldId,
          title: `[LV.9 容器管理] #${fieldId} 雙向鏈結串列 List`,
          chineseDescription: `宣告一個不支援隨機儲存、但在任何位置插刪皆保證 O(1) 的雙向鏈結串列。`,
          codeTemplate: `std::______<double> node_list;`,
          expectedAnswer: 'list',
          hint: '串列、清單。',
          explanation: 'std::list 是一個傳統的雙向鏈結串列。它不具有連續記憶體，不支援 [] 索引，但非常適合繁雜的局部拓撲修改。'
        };
      }
    }
  }

  // ==========================================
  // Category 10: Templates & Modern C++ (Levels 136 - 150)
  // ==========================================
  const step = fieldId - 135; // 1 to 15
  switch (cardIndex) {
    case 1: {
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 泛型樣板宣告`,
        chineseDescription: `在函式或類別最上方，填寫泛型樣板宣告關鍵字，使型態 T 在編譯期得以自動特化。`,
        codeTemplate: `______ <typename T>\nT calculate_growth_power(T x) {\n  return x * 2;\n}`,
        expectedAnswer: 'template',
        hint: '模板、樣板的英文。',
        explanation: 'template 關鍵字開啟 C++ 強大的泛型編譯引擎。編譯器會在調用點依據參數類型，即時重寫產生一份實體函式。'
      };
    }
    case 2: {
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 樣板型別參數 typename`,
        chineseDescription: `在樣板參數宣告列表中，指定 T 是一個通用型別類別的關鍵字。`,
        codeTemplate: `template <______ T>\nclass Box {\n  T content;\n};`,
        expectedAnswer: 'typename',
        hint: '型態名稱（也可以用 class，但本關優先要求現代的 typename）。',
        explanation: 'typename 關鍵字在樣板列表中修飾參數，宣告 T 是一個泛型名稱。它在嵌套依賴名稱中，具有消除語法歧義的重要用途。'
      };
    }
    case 3: {
      const vLimit = step * 10;
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 匿名 Lambda 捕捉中括弧`,
        chineseDescription: `請填寫 Lambda 表達式最前方用來「捕捉外部局部變數」的專用中括弧符號（以值傳遞捕獲 variable）。`,
        codeTemplate: `int limit_${fieldId} = ${vLimit};\nauto check = ______limit_${fieldId}](int val) {\n  return val > limit_${fieldId};\n};`,
        expectedAnswer: '[',
        hint: '左中括弧。完整結構為 [limit_xx]。',
        explanation: 'Lambda 表達式以中括弧 [] 作為捕捉子開頭。可以在中括弧內指定引用的捕捉模式（如 [=] 按值捕獲，[&] 引用捕獲）。'
      };
    }
    case 4: {
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 編譯期型態自動推導 auto`,
        chineseDescription: `請使用 C++11 引進的動態編譯期型態自動推導字，讓編譯器依據等號右側表達式自動解析變數 my_it 的靜態型態。`,
        codeTemplate: `std::vector<int> vec;\n______ my_it = vec.begin();`,
        expectedAnswer: 'auto',
        hint: '自動。',
        explanation: 'auto 關鍵字能在編譯期直接提取初值的靜態型態，省去了撰寫冗長模板或複雜迭代器類型的負擔，提升程式美感。'
      };
    }
    case 5: {
      const varName = `heavy_vector_${fieldId}`;
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 移動語意資源轉移 move`,
        chineseDescription: `請使用標準函式將現有的 ${varName} 強制轉換為「右值參照」，以觸發高效的移動建構（Move Construction），避免昂貴的記憶體拷貝。`,
        codeTemplate: `std::vector<int> ${varName}(1000, 5);\nstd::vector<int> target = std::______(${varName});`,
        expectedAnswer: 'move',
        hint: '移動。',
        explanation: 'std::move 會將左值強製轉為右值。這讓接受它的物件能直接掠奪（steal）原有的指標資源，避免了高昂的深度複製。'
      };
    }
    case 6: {
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 獨佔智慧指標 unique_ptr`,
        chineseDescription: `宣告一個超載範圍即自動釋放、不可拷貝、獨佔記憶體所有權的 RAII 智慧指標。`,
        codeTemplate: `std::______<double> single_moisture_tracker(new double(99.4));`,
        expectedAnswer: 'unique_ptr',
        hint: '唯一的、單一的智慧指標。',
        explanation: 'std::unique_ptr 是獨佔智慧指標，徹底杜絕了拷貝操作。超出作用域時，它會在解構子中主動執行 delete 釋放記憶體。'
      };
    }
    case 7: {
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 共享計數智慧指標 shared_ptr`,
        chineseDescription: `宣告一個內部具備多型引用計數（Reference Counting）、允許多指針共享同一個對象所有權的智慧指標。`,
        codeTemplate: `std::______<std::string> shared_log_system;`,
        expectedAnswer: 'shared_ptr',
        hint: '分享的、共用的智慧指標。',
        explanation: 'std::shared_ptr 透過共享所有權來管理物件。每次拷貝會增加引用計數，最後一個指針釋放時，才會執行記憶體清空。'
      };
    }
    case 8: {
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 強制編譯期常數 constexpr`,
        chineseDescription: `使用 C++11 引進的關鍵字，保證變數或是函式 calculate_${fieldId}() 必須在「編譯期（Compile-time）」就計算出常數結果。`,
        codeTemplate: `______ int get_max_seeds() { return ${step * 25 + 10}; }`,
        expectedAnswer: 'constexpr',
        hint: 'Constant Expression 的縮寫組合。',
        explanation: 'constexpr 是編譯期常量修飾。被它修飾的函數如果傳入編譯期已知的值，編譯器將直接優化計算結果，零運行期成本。'
      };
    }
    case 9: {
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 異常安全 try 捕獲防線`,
        chineseDescription: `請寫出用來劃定「可能拋出異常 exception」之防護代碼區域的關鍵字。`,
        codeTemplate: `______ {\n  irrigate_or_throw();\n} catch (const std::exception& e) {\n  log_error();\n}`,
        expectedAnswer: 'try',
        hint: '嘗試。',
        explanation: 'try 關鍵字引導異常安全保護區，在該代碼體內發生的任何 throw 異常，都會順次交由其後的 catch 模組捕獲處理。'
      };
    }
    case 10: {
      const bytes = (step % 3) === 0 ? 8 : 4;
      return {
        id, fieldId,
        title: `[LV.10 現代語法] #${fieldId} 編譯期斷言檢驗`,
        chineseDescription: `C++11 引入的「編譯期靜態斷言（Static Assertion）」，用以確保當前環境指針寬度必須為 8 位元組（64位元）。`,
        codeTemplate: `______(sizeof(void*) == ${bytes}, "必須是 64 位元作業環境！");`,
        expectedAnswer: 'static_assert',
        hint: '靜態斷言，利用底線連接。',
        explanation: 'static_assert 是編譯期斷言。當條件在編譯階段判定為 false 時，編譯會立刻終止並輸出自定義的警告文本，完全不干預運行。'
      };
    }
  }

  // Fallback card just in case
  return {
    id, fieldId,
    title: `[LV.1] #${fieldId} C++ 編譯良田挑戰`,
    chineseDescription: `請在填空處補上關鍵字 int 以正確宣告主程式 main 函數的整數回傳型態。`,
    codeTemplate: `______ main() {\n  return 0;\n}`,
    expectedAnswer: 'int',
    hint: '回傳整數。',
    explanation: 'C++ 標準規範 main 必須回傳 int 型態以標示正常退出狀態。'
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
