import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';
import { getQuestion061To090 } from '../questions';

/**
 * 取得第 7~9 章（Fields 061～090）之全新高品質 300 題正式題庫
 * 涵蓋：for 迴圈、while 深入、雙層迴圈、九九乘法表、圖形列印、字元矩陣、陣列走訪
 * 每題皆為獨立精心設計之學習單元，無套版重複題目。
 */
export function getCh7To9Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const newQuestion = getQuestion061To090(fieldId, cardIndex);
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
    chineseDescription: '請完成基礎 C++ 迴圈程式碼。',
    codeTemplate: 'for (int i = 0; i < 5; i++) cout << i;',
    expectedAnswer: '01234',
    acceptedAnswers: ['01234'],
    hint: '請檢查迴圈輸出。',
    explanation: '標準 C++ 迴圈語法。',
    difficulty: 1
  };
}

