import { CPlusPlusCard } from '../types';

/**
 * 程式碼字串標準化：去除多餘空格但保留關鍵詞區隔，並標準化常見運算子兩側空白
 */
export function normalizeCodeAnswer(str: string): string {
  if (!str) return '';
  let normalized = str.trim();

  // 將連續多個空白縮減為單一空白
  normalized = normalized.replace(/\s+/g, ' ');

  // 移除常見運算子前後的多餘空格以提升比對容錯率
  // 例如 "width * height" 與 "width*height"、"( a + b + c ) / 3.0" 與 "(a+b+c)/3.0"
  normalized = normalized
    .replace(/\s*([+\-*\/%<>=!&|?:,;()[\]{}])\s*/g, '$1')
    .replace(/<</g, '<<')
    .replace(/>>/g, '>>')
    .replace(/==/g, '==')
    .replace(/!=/g, '!=')
    .replace(/<=/g, '<=')
    .replace(/>=/g, '>=')
    .replace(/&&/g, '&&')
    .replace(/\|\|/g, '||')
    .replace(/\+\+/g, '++')
    .replace(/--/g, '--')
    .replace(/\+=/g, '+=')
    .replace(/-=/g, '-=')
    .replace(/\*=/g, '*=')
    .replace(/\/=/g, '/=')
    .replace(/%=/g, '%=');

  return normalized.toLowerCase();
}

/**
 * 預測輸出文字標準化：保留數字與文字，移除多餘空行與頭尾空白
 */
export function normalizeOutputAnswer(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * 驗證玩家輸入的答案是否正確 (支援 6 種題型與多重容錯標準)
 */
export function verifyQuestionAnswer(rawTypedAnswer: string, question: CPlusPlusCard): boolean {
  if (!rawTypedAnswer || !question) return false;
  const typed = rawTypedAnswer.trim();
  if (!typed) return false;

  const type = question.type || 'fill_blank';

  // 1. 程式閱讀題 (code_reading / Multiple Choice)
  if (type === 'code_reading' && question.options && question.correctOption !== undefined) {
    const correctIdx = question.correctOption; // 0, 1, 2, 3
    const correctLetter = String.fromCharCode(65 + correctIdx); // 'A', 'B', 'C', 'D'
    const correctOptionText = question.options[correctIdx] || '';

    const cleanedTyped = typed.toUpperCase();
    
    // 玩家輸入 'A', 'B', 'C', 'D'
    if (cleanedTyped === correctLetter) return true;

    // 玩家輸入數字索引 '0', '1', '2', '3' 或 '1', '2', '3', '4'
    if (typed === String(correctIdx) || typed === String(correctIdx + 1)) return true;

    // 玩家點擊或輸入完整選項文字
    if (typed.toLowerCase() === correctOptionText.toLowerCase()) return true;
    if (typed.toLowerCase() === correctOptionText.replace(/^[A-D]\.\s*/i, '').trim().toLowerCase()) return true;
  }

  // 2. 預測輸出題 (predict_output)
  if (type === 'predict_output') {
    const normTyped = normalizeOutputAnswer(typed);
    const normExpected = normalizeOutputAnswer(question.expectedAnswer);
    if (normTyped === normExpected) return true;

    if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
      return question.acceptedAnswers.some(ans => normalizeOutputAnswer(ans) === normTyped);
    }
    return false;
  }

  // 3. 常規程式題 (fill_blank, debug, application, complete_code)
  // 首先進行精準比對 (不分大小寫)
  if (typed.toLowerCase() === question.expectedAnswer.trim().toLowerCase()) {
    return true;
  }

  // 檢查 acceptedAnswers 列表
  if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
    for (const alt of question.acceptedAnswers) {
      if (typed.toLowerCase() === alt.trim().toLowerCase()) {
        return true;
      }
    }
  }

  // 代碼語意標準化比對 (移除運算子空白等)
  const normTyped = normalizeCodeAnswer(typed);
  const normExpected = normalizeCodeAnswer(question.expectedAnswer);
  if (normTyped === normExpected) return true;

  if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
    for (const alt of question.acceptedAnswers) {
      if (normTyped === normalizeCodeAnswer(alt)) {
        return true;
      }
    }
  }

  return false;
}
