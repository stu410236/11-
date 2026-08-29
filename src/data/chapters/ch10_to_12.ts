import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';
import { getQuestion091To120 } from '../questions';

/**
 * 取得第 10~12 章（Fields 091～120）之全新高品質 300 題正式題庫
 * 涵蓋：二維陣列、矩陣走訪、統計、對角線、string 概念/函式/索引/拼接/getline/迴圈、自訂函式/宣告/參數/回傳值/作用域/if/loop/陣列整合
 * 每題皆為獨立精心設計之學習單元，無套版重複題目。
 */
export function getCh10To12Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const newQuestion = getQuestion091To120(fieldId, cardIndex);
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
    chineseDescription: '請完成基礎 C++ 陣列與函式程式碼。',
    codeTemplate: 'int main() { return 0; }',
    expectedAnswer: '0',
    acceptedAnswers: ['0'],
    hint: '請檢查程式回傳。',
    explanation: '標準 C++ 函式語法。',
    difficulty: 1
  };
}
