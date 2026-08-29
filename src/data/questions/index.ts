import { CPlusPlusCard } from '../../types';
import { QUESTIONS_001_010 } from './questions_001_010';
import { QUESTIONS_011_020 } from './questions_011_020';
import { QUESTIONS_021_030 } from './questions_021_030';
import { QUESTIONS_031_040 } from './questions_031_040';
import { QUESTIONS_041_050 } from './questions_041_050';
import { QUESTIONS_051_060 } from './questions_051_060';
import { QUESTIONS_061_070 } from './questions_061_070';
import { QUESTIONS_071_080 } from './questions_071_080';
import { QUESTIONS_081_090 } from './questions_081_090';
import { QUESTIONS_091_100 } from './questions_091_100';
import { QUESTIONS_101_110 } from './questions_101_110';
import { QUESTIONS_111_120 } from './questions_111_120';
import { QUESTIONS_121_130 } from './questions_121_130';
import { QUESTIONS_131_140 } from './questions_131_140';
import { QUESTIONS_141_150 } from './questions_141_150';

export { QUESTIONS_001_010 } from './questions_001_010';
export { QUESTIONS_011_020 } from './questions_011_020';
export { QUESTIONS_021_030 } from './questions_021_030';
export { QUESTIONS_031_040 } from './questions_031_040';
export { QUESTIONS_041_050 } from './questions_041_050';
export { QUESTIONS_051_060 } from './questions_051_060';
export { QUESTIONS_061_070 } from './questions_061_070';
export { QUESTIONS_071_080 } from './questions_071_080';
export { QUESTIONS_081_090 } from './questions_081_090';
export { QUESTIONS_091_100 } from './questions_091_100';
export { QUESTIONS_101_110 } from './questions_101_110';
export { QUESTIONS_111_120 } from './questions_111_120';
export { QUESTIONS_121_130 } from './questions_121_130';
export { QUESTIONS_131_140 } from './questions_131_140';
export { QUESTIONS_141_150 } from './questions_141_150';

/**
 * 第一批正式題庫：Field 001 ～ Field 030 (300 題)
 */
export const QUESTIONS_001_030: CPlusPlusCard[] = [
  ...QUESTIONS_001_010,
  ...QUESTIONS_011_020,
  ...QUESTIONS_021_030,
];

/**
 * 第二批正式題庫：Field 031 ～ Field 060 (300 題)
 */
export const QUESTIONS_031_060: CPlusPlusCard[] = [
  ...QUESTIONS_031_040,
  ...QUESTIONS_041_050,
  ...QUESTIONS_051_060,
];

/**
 * 第三批正式題庫：Field 061 ～ Field 090 (300 題)
 */
export const QUESTIONS_061_090: CPlusPlusCard[] = [
  ...QUESTIONS_061_070,
  ...QUESTIONS_071_080,
  ...QUESTIONS_081_090,
];

/**
 * 第四批正式題庫：Field 091 ～ Field 120 (300 題)
 */
export const QUESTIONS_091_120: CPlusPlusCard[] = [
  ...QUESTIONS_091_100,
  ...QUESTIONS_101_110,
  ...QUESTIONS_111_120,
];

/**
 * 第五批正式題庫：Field 121 ～ Field 150 (300 題)
 */
export const QUESTIONS_121_150: CPlusPlusCard[] = [
  ...QUESTIONS_121_130,
  ...QUESTIONS_131_140,
  ...QUESTIONS_141_150,
];

/**
 * 全部已完成的正式題庫：Field 001 ～ Field 150 (1500 題大滿貫)
 */
export const ALL_OFFICIAL_QUESTIONS: CPlusPlusCard[] = [
  ...QUESTIONS_001_030,
  ...QUESTIONS_031_060,
  ...QUESTIONS_061_090,
  ...QUESTIONS_091_120,
  ...QUESTIONS_121_150,
];

/**
 * 建立快速查詢 Map
 */
const questionsMap = new Map<string, CPlusPlusCard>();

ALL_OFFICIAL_QUESTIONS.forEach((card, idx) => {
  // 依 fieldId_cardIndex 儲存
  const cardIndex = (idx % 10) + 1;
  const key = `${card.fieldId}_${cardIndex}`;
  questionsMap.set(key, card);
  // 也支援直接用 card.id 查詢
  questionsMap.set(card.id, card);
});

export function getQuestion001To030(fieldId: number, cardIndex: number): CPlusPlusCard | undefined {
  return questionsMap.get(`${fieldId}_${cardIndex}`);
}

export function getQuestion031To060(fieldId: number, cardIndex: number): CPlusPlusCard | undefined {
  return questionsMap.get(`${fieldId}_${cardIndex}`);
}

export function getQuestion061To090(fieldId: number, cardIndex: number): CPlusPlusCard | undefined {
  return questionsMap.get(`${fieldId}_${cardIndex}`);
}

export function getQuestion091To120(fieldId: number, cardIndex: number): CPlusPlusCard | undefined {
  return questionsMap.get(`${fieldId}_${cardIndex}`);
}

export function getQuestion121To150(fieldId: number, cardIndex: number): CPlusPlusCard | undefined {
  return questionsMap.get(`${fieldId}_${cardIndex}`);
}

export interface ValidationReport {
  isValid: boolean;
  totalQuestions: number;
  uniqueIds: number;
  uniqueTitles: number;
  errors: string[];
  warnings: string[];
  fieldsSummary: { fieldId: number; count: number }[];
}

/**
 * 驗證 Field 001～150 共 1500 題的完整性與唯一性
 */
export function validateQuestionBank(): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const idSet = new Set<string>();
  const titleSet = new Set<string>();
  const fieldCounts: { [key: number]: number } = {};

  for (let f = 1; f <= 150; f++) {
    fieldCounts[f] = 0;
  }

  ALL_OFFICIAL_QUESTIONS.forEach((q, index) => {
    // 檢查欄位完整性
    if (!q.id) errors.push(`題目 #${index + 1} 缺少 id`);
    if (!q.fieldId) errors.push(`題目 #${index + 1} 缺少 fieldId`);
    if (!q.title) errors.push(`題目 #${index + 1} (${q.id}) 缺少 title`);
    if (!q.chineseDescription) errors.push(`題目 #${index + 1} (${q.id}) 缺少 chineseDescription`);
    if (!q.expectedAnswer && q.expectedAnswer !== '0' && q.expectedAnswer !== '') {
      errors.push(`題目 #${index + 1} (${q.id}) 缺少 expectedAnswer`);
    }
    if (!q.hint) warnings.push(`題目 #${index + 1} (${q.id}) 缺少 hint`);
    if (!q.explanation) warnings.push(`題目 #${index + 1} (${q.id}) 缺少 explanation`);

    // 檢查 ID 唯一性
    if (idSet.has(q.id)) {
      errors.push(`發現重複的 ID: ${q.id}`);
    }
    idSet.add(q.id);

    // 檢查 Title 唯一性
    if (titleSet.has(q.title)) {
      warnings.push(`發現可能重複的標題: "${q.title}" (${q.id})`);
    }
    titleSet.add(q.title);

    // 累計各農田題數
    if (fieldCounts[q.fieldId] !== undefined) {
      fieldCounts[q.fieldId]++;
    } else {
      errors.push(`題目 ID ${q.id} 的 fieldId ${q.fieldId} 超出 1~150 範圍`);
    }
  });

  // 檢查每塊農田是否皆為 10 題
  for (let f = 1; f <= 150; f++) {
    if (fieldCounts[f] !== 10) {
      errors.push(`Field ${f} 題數異常: 應為 10 題，實際有 ${fieldCounts[f]} 題`);
    }
  }

  const totalQuestions = ALL_OFFICIAL_QUESTIONS.length;
  if (totalQuestions !== 1500) {
    errors.push(`總題數異常: 應為 1500 題，實際有 ${totalQuestions} 題`);
  }

  const fieldsSummary = Object.keys(fieldCounts).map(f => ({
    fieldId: Number(f),
    count: fieldCounts[Number(f)]
  }));

  return {
    isValid: errors.length === 0,
    totalQuestions,
    uniqueIds: idSet.size,
    uniqueTitles: titleSet.size,
    errors,
    warnings,
    fieldsSummary
  };
}
