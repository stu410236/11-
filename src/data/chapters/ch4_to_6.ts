import { CPlusPlusCard } from '../../types';
import { getChapterForField } from '../cppCards';
import { getQuestion031To060 } from '../questions';

/**
 * 取得第 4~6 章（Fields 031～060）之全新高品質 300 題正式題庫
 * 涵蓋：條件判斷、多重選擇、邏輯運算、switch、極值比對、綜合驗收
 * 每題皆為獨立精心設計之學習單元，無套版重複題目。
 */
export function getCh4To6Card(fieldId: number, cardIndex: number): CPlusPlusCard {
  const newQuestion = getQuestion031To060(fieldId, cardIndex);
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
    chineseDescription: '請完成基礎 C++ 條件式程式碼。',
    codeTemplate: 'if (x > 0) cout << "Positive";',
    expectedAnswer: 'Positive',
    acceptedAnswers: ['Positive'],
    hint: '請檢查條件判斷。',
    explanation: '標準 C++ 條件判斷語法。',
    difficulty: 1
  };
}

