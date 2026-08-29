import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';
import { getQuestion121To150 } from '../questions';

/**
 * 取得第 13~15 章（Fields 121～150）之全新高品質 300 題正式題庫
 * 涵蓋：
 * - 結構體 struct：定義、結尾分號、成員存取、struct 陣列/vector、struct 指標與 ->
 * - 引用 Reference：別名宣告、傳參考參數、原地修改、const 引用
 * - 指標 Pointer：宣告、位址 &、解引用 *、指標算術、指標走訪、nullptr 安全除錯
 * - 綜合演算法與 APCS 專題：自訂排序、雙指針、二分搜尋前置、Grand Final 大滿貫
 * 每題皆為獨立精心設計之學習單元，無套版重複題目。
 */
export function getCh13To15Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const newQuestion = getQuestion121To150(fieldId, cardIndex);
  if (newQuestion) {
    return newQuestion;
  }

  // 備用防禦性預設
  const id = `f${fieldId}_${cardIndex}`;
  const chapter = getChapterForField(fieldId);
  return {
    id,
    fieldId,
    type: 'fill_blank',
    title: `[第${chapter.chapter}章 ${chapter.topic}] #${fieldId} 基礎題目`,
    chineseDescription: '請完成基礎 C++ 指標、結構體或容器程式碼。',
    codeTemplate: 'int main() { return 0; }',
    expectedAnswer: '0',
    acceptedAnswers: ['0'],
    hint: '請檢查程式回傳。',
    explanation: '標準 C++ 語法。',
    difficulty: 1
  };
}
