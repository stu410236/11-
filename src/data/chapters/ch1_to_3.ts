import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';
import { getQuestion001To030 } from '../questions';

/**
 * 取得第 1~3 章（Fields 001～030）之全新高品質 300 題正式題庫
 * 涵蓋：C++ 入門與輸出、變數與資料型別、輸入與基本運算
 * 每題皆為獨立精心設計之學習單元，無套版重複題目。
 */
export function getCh1To3Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const newQuestion = getQuestion001To030(fieldId, cardIndex);
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
    chineseDescription: '請完成基礎 C++ 程式碼。',
    codeTemplate: 'cout << "Hello C++";',
    expectedAnswer: 'Hello C++',
    acceptedAnswers: ['Hello C++'],
    hint: '請檢查輸出文字。',
    explanation: '標準 C++ 輸出語法。',
    difficulty: 1
  };
}
