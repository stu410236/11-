import { CPlusPlusCard, DailyChallengeState } from '../types';
import { getChapterForField } from '../data/cppCards';

/**
 * 每日限定挑戰獎勵數值常數
 */
export const DAILY_CHALLENGE_REWARD = {
  coins: 30,
  cabbages: 1,
  waterBuckets: 1,
  tortoiseXp: 20
};

/**
 * 取得台灣時間（Asia/Taipei UTC+8）的標準日期字串 (YYYY-MM-DD)
 */
export function getTaiwanDateKey(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(date); // 格式固定為 YYYY-MM-DD
  } catch (e) {
    // Fallback: 手動加 8 小時
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const twDate = new Date(utc + (3600000 * 8));
    const year = twDate.getFullYear();
    const month = String(twDate.getMonth() + 1).padStart(2, '0');
    const day = String(twDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

/**
 * 取得格式化顯示日期 (例如 "2026/08/28" 或 "08/28")
 */
export function getTaiwanDisplayDate(dateKey: string): string {
  if (!dateKey) return '';
  return dateKey.replace(/-/g, '/');
}

/**
 * 判斷 lastDateKey 是否恰好為 todayDateKey 的前一天 (昨天)
 */
export function isYesterday(lastDateKey: string, todayDateKey: string): boolean {
  if (!lastDateKey || !todayDateKey) return false;
  try {
    const [y1, m1, d1] = lastDateKey.split('-').map(Number);
    const [y2, m2, d2] = todayDateKey.split('-').map(Number);
    const date1 = new Date(Date.UTC(y1, m1 - 1, d1));
    const date2 = new Date(Date.UTC(y2, m2 - 1, d2));
    const diffTime = date2.getTime() - date1.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  } catch (e) {
    return false;
  }
}

/**
 * 計算完成今日挑戰後的連續天數 (Streak)
 */
export function calculateDailyChallengeStreak(
  lastCompletedDate: string | undefined,
  todayDateKey: string,
  currentStreak: number = 0,
  bestStreak: number = 0
): { newStreak: number; newBestStreak: number } {
  // 如果今天已經完成過
  if (lastCompletedDate === todayDateKey) {
    return {
      newStreak: Math.max(1, currentStreak),
      newBestStreak: Math.max(bestStreak, currentStreak)
    };
  }

  // 判斷前一次完成是否為昨天
  let newStreak = 1;
  if (lastCompletedDate && isYesterday(lastCompletedDate, todayDateKey)) {
    newStreak = (currentStreak || 0) + 1;
  } else {
    // 若中斷多日或首次挑戰，從 1 開始起算
    newStreak = 1;
  }

  const newBestStreak = Math.max(bestStreak || 0, newStreak);
  return { newStreak, newBestStreak };
}

/**
 * 依據 dateKey 生成確定性 (Deterministic) 的每日挑戰題目
 * 同一天所有玩家保證看到完全同一道題目，且重新整理、換帳號不變
 */
export function getDailyChallengeQuestion(
  dateKey: string,
  cards: CPlusPlusCard[]
): { question: CPlusPlusCard; chapterInfo: ReturnType<typeof getChapterForField>; questionIndex: number } {
  if (!cards || cards.length === 0) {
    throw new Error('題庫資料為空');
  }

  // 篩選適合學校課程與實用核心的 C++ 題目 (涵蓋 I/O、變數、運算子、if/switch、迴圈、陣列、字串、函式、結構、vector、STL 等)
  // 排除過於偏門的串流底層 API
  const eligibleCards = cards.filter(c => {
    const combined = `${c.title} ${c.chineseDescription} ${c.codeTemplate}`.toLowerCase();
    if (combined.includes('clog') || combined.includes('rdbuf') || combined.includes('tie(')) {
      return false;
    }
    return true;
  });

  const pool = eligibleCards.length > 0 ? eligibleCards : cards;

  // 32-bit Integer Hash 演算法 (Murmur / DJB2 變體)
  let hash = 5381;
  for (let i = 0; i < dateKey.length; i++) {
    const char = dateKey.charCodeAt(i);
    hash = ((hash << 5) + hash) + char;
    hash = hash & hash; // 保持 32-bit 整數
  }

  // 加上第二層混淆以確保日期連續時題目具備良好跳躍度與均勻度
  const [yearStr, monthStr, dayStr] = dateKey.split('-');
  const y = parseInt(yearStr || '2026', 10);
  const m = parseInt(monthStr || '1', 10);
  const d = parseInt(dayStr || '1', 10);
  const dateSalt = (y * 371) + (m * 43) + (d * 107);
  
  const finalHash = Math.abs(hash ^ dateSalt);
  const questionIndex = finalHash % pool.length;
  const question = pool[questionIndex];
  const chapterInfo = getChapterForField(question.fieldId);

  return {
    question,
    chapterInfo,
    questionIndex
  };
}

/**
 * 檢驗答案邏輯 (支援空格彈性處理)
 */
export function verifyDailyChallengeAnswer(input: string, expected: string): boolean {
  if (!input || !expected) return false;
  const cleanInput = input.trim();
  const cleanExpected = expected.trim();
  
  // 完全相同
  if (cleanInput === cleanExpected) return true;

  // 移除多餘連續空格後比對
  const normalizedInput = cleanInput.replace(/\s+/g, ' ');
  const normalizedExpected = cleanExpected.replace(/\s+/g, ' ');
  if (normalizedInput === normalizedExpected) return true;

  // 去除運算子周圍空格的比對 (例如 `i++` vs `i ++`, `a+b` vs `a + b`)
  const removeOpSpaces = (s: string) => s.replace(/\s*([+\-*/%=><!&|;,{}()[\]])\s*/g, '$1');
  if (removeOpSpaces(cleanInput) === removeOpSpaces(cleanExpected)) return true;

  return false;
}
