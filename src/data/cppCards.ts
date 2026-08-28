import { CPlusPlusCard, FieldPlot } from '../types';
import { getCh1To3Card } from './chapters/ch1_to_3';
import { getCh4To6Card } from './chapters/ch4_to_6';
import { getCh7To9Card } from './chapters/ch7_to_9';
import { getCh10To12Card } from './chapters/ch10_to_12';
import { getCh13To15Card } from './chapters/ch13_to_15';

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
    emoji: '📊',
    keyConcepts: '一維陣列宣告、索引存取、陣列走訪、最大／最小值、反轉'
  },
  {
    chapter: 10,
    startId: 91,
    endId: 100,
    topic: '二維陣列與矩陣',
    subTitle: '2D 陣列宣告、雙層走訪、矩陣運算、對角線與地圖尋路',
    stage: '高中進階',
    emoji: '🗺️',
    keyConcepts: '二維陣列、雙重迴圈走訪、矩陣相加、對角線、地圖與座標'
  },
  {
    chapter: 11,
    startId: 101,
    endId: 110,
    topic: '字元與字串',
    subTitle: 'ASCII 編碼、std::string、getline 整行輸入與常用字串操作',
    stage: '高中進階',
    emoji: '🔤',
    keyConcepts: 'char、string、getline()、字串長度、字串走訪、字元判斷'
  },
  {
    chapter: 12,
    startId: 111,
    endId: 120,
    topic: '自訂函式',
    subTitle: '自訂副程式宣告、參數傳遞、return 回傳值、作用域與模組化',
    stage: '高中進階',
    emoji: '🛠️',
    keyConcepts: '函式宣告、參數、return、區域變數、傳參考 &、模組化'
  },
  {
    chapter: 13,
    startId: 121,
    endId: 130,
    topic: '結構體 Struct',
    subTitle: '複合型態封裝、結構成員點運算子、struct 陣列與 APCS 考點',
    stage: '延伸／競賽入門',
    emoji: '📦',
    keyConcepts: 'struct 宣告、成員存取、struct 陣列、operator< 排序'
  },
  {
    chapter: 14,
    startId: 131,
    endId: 140,
    topic: 'STL Vector 與常用容器',
    subTitle: '動態陣列 vector、push_back、range-for、sort 與容器操作',
    stage: '自學延伸',
    emoji: '⚡',
    keyConcepts: 'vector、push_back()、pop_back()、sort()、range-based for'
  },
  {
    chapter: 15,
    startId: 141,
    endId: 150,
    topic: '基礎演算法與 APCS 專題',
    subTitle: '二分搜尋、前綴和、輾轉相除 GCD、雙指針與綜合解題',
    stage: '自學延伸',
    emoji: '🎓',
    keyConcepts: '線性搜尋、二分搜尋、前綴和、輾轉相除 GCD、雙指針、複雜度'
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

/**
 * 依據 fieldId (1~150) 與 cardIndex (1~10) 分派至對應章節模組
 */
export const getCardForFieldAndIndex = (fieldId: number, cardIndex: number): CPlusPlusCard => {
  if (fieldId >= 1 && fieldId <= 30) {
    return getCh1To3Card(fieldId, cardIndex);
  }
  if (fieldId >= 31 && fieldId <= 60) {
    return getCh4To6Card(fieldId, cardIndex);
  }
  if (fieldId >= 61 && fieldId <= 90) {
    return getCh7To9Card(fieldId, cardIndex);
  }
  if (fieldId >= 91 && fieldId <= 120) {
    return getCh10To12Card(fieldId, cardIndex);
  }
  if (fieldId >= 121 && fieldId <= 150) {
    return getCh13To15Card(fieldId, cardIndex);
  }
  return getCh1To3Card(fieldId, cardIndex);
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
