import { CPlusPlusCard, FieldPlot } from '../types';

export type PestType = 'caterpillar' | 'beetle' | 'locust' | 'snail' | 'ant';

export interface PestInfo {
  id: PestType;
  name: string;
  englishName: string;
  icon: string;
  description: string;
  threatDescription: string;
  colorClass: string;
  badgeBg: string;
}

export const PESTS: Record<PestType, PestInfo> = {
  caterpillar: {
    id: 'caterpillar',
    name: '毛毛蟲',
    englishName: 'Caterpillar',
    icon: '🐛',
    description: '喜歡啃食鮮綠嫩葉，動作看似緩慢但食量驚人！',
    threatDescription: '正在大口啃食農作物的嫩芽，若不及時驅逐將導致作物枯萎！',
    colorClass: 'text-lime-400',
    badgeBg: 'bg-lime-500/20 text-lime-300 border-lime-500/40'
  },
  beetle: {
    id: 'beetle',
    name: '甲蟲',
    englishName: 'Beetle',
    icon: '🪲',
    description: '擁有堅硬的幾丁質外殼，會在田埂間穿梭挖洞！',
    threatDescription: '正在破壞農田土壤結構與作物根系，需要精準的 C++ 邏輯防衛！',
    colorClass: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  locust: {
    id: 'locust',
    name: '蝗蟲',
    englishName: 'Locust',
    icon: '🦗',
    description: '跳躍力極強的飛行害蟲，成群結隊掠奪良田養分！',
    threatDescription: '正在農田上方盤旋狂食，請迅速施放除蟲代碼！',
    colorClass: 'text-yellow-400',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
  },
  snail: {
    id: 'snail',
    name: '蝸牛',
    englishName: 'Snail',
    icon: '🐌',
    description: '背著螺旋外殼，沿路留下黏答答的痕跡慢慢侵蝕葉片！',
    threatDescription: '正在緩步爬上作物主幹，請把握時間進行防衛！',
    colorClass: 'text-teal-400',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40'
  },
  ant: {
    id: 'ant',
    name: '螞蟻',
    englishName: 'Ant',
    icon: '🐜',
    description: '分工極度嚴密的搬運高手，會悄悄搬走良田的核心肥料！',
    threatDescription: '正在集結搬運作物精華，需要強大的演算法思維進行驅逐！',
    colorClass: 'text-red-400',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40'
  }
};

export const PEST_LIST: PestInfo[] = Object.values(PESTS);

export type PestStatus =
  | 'pending'     // 害蟲入侵中，等待玩家防衛
  | 'defending'   // 正在進行防衛挑戰
  | 'repelled'    // 成功驅逐害蟲，作物安全
  | 'withered'    // 防衛失敗，作物枯萎
  | 'recovering'  // 正在進行 5 題複習復育
  | 'recovered'   // 復育成功，作物恢復健康
  | 'no_target';  // 本週無符合條件之作物

export interface WeeklyPestEvent {
  weekKey: string;           // e.g. "2026-W35" (基於當週星期六 19:30 的穩定週鍵)
  pestId: PestType;          // 隨機害蟲種類
  fieldId: number;           // 受害農田 ID (1~150)
  status: PestStatus;
  spawnedAt: string;         // ISO timestamp
  challengeStartedAt?: string | null;
  resolvedAt?: string | null;
  recoveryProgress: number;  // 0 ~ 5
  recoveryQuestionIds?: string[]; // 固定 5 題題目 ID (deterministic)
  challengeQuestionId?: string;   // 固定防衛題題目 ID (deterministic)
}

export interface PestHistoryRecord {
  weekKey: string;
  pestId: PestType;
  fieldId: number;
  result: 'repelled' | 'recovered' | 'withered_unresolved';
  cropId: string;
  resolvedAt: string;
}

// ----------------------------------------------------
// 台灣時間 (UTC+8) 與週期計算輔助函式
// ----------------------------------------------------

/**
 * 取得目前的台灣時間 Date 物件 (UTC+8)
 */
export function getTaiwanNow(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (8 * 3600000));
}

/**
 * 計算傳入時間對應的「害蟲週週期唯一 Key」
 * 規則：
 * 每週六 19:30:00 (台灣時間) 為週期起始點，持續至下週六 19:29:59。
 * 回傳格式：例如 "2026-W35-SAT1930"
 */
export function getTaiwanPestWeekKey(customDate?: Date): string {
  const twDate = customDate || getTaiwanNow();
  const year = twDate.getFullYear();
  const month = twDate.getMonth(); // 0-11
  const date = twDate.getDate();
  const day = twDate.getDay(); // 0 (Sun) ~ 6 (Sat)
  const hours = twDate.getHours();
  const minutes = twDate.getMinutes();

  // 計算上一個或當前的星期六 19:30 基準點
  let daysSinceSaturday = (day + 1) % 7; // Sat=0, Sun=1, Mon=2, ..., Fri=6
  if (day === 6) {
    // 今天是星期六
    const isPast1930 = (hours > 19) || (hours === 19 && minutes >= 30);
    if (!isPast1930) {
      // 星期六但還沒到 19:30，屬於「上週六 19:30」的週期
      daysSinceSaturday = 7;
    } else {
      daysSinceSaturday = 0;
    }
  }

  // 取得該週期星期六的精確年月日
  const satDate = new Date(twDate.getTime() - (daysSinceSaturday * 86400000));
  const satYear = satDate.getFullYear();
  const satMonth = satDate.getMonth() + 1;
  const satDay = satDate.getDate();

  // 計算 ISO Week Number 供清晰呈現
  const firstDayOfYear = new Date(satYear, 0, 1);
  const pastDaysOfYear = (satDate.getTime() - firstDayOfYear.getTime()) / 86400000;
  const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${satYear}-W${pad(weekNum)}-SAT1930-${satYear}${pad(satMonth)}${pad(satDay)}`;
}

/**
 * 檢查當前台灣時間是否已經到達並可產生害蟲事件
 */
export function isPestEventTimeActive(): boolean {
  // 任何時間只要計算出當前有效週期即可，因為該週期起始於上一個週六 19:30
  return true;
}

// ----------------------------------------------------
// 穩定偽隨機 Hash 函式 (Deterministic PRNG)
// ----------------------------------------------------
export function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * 篩選符合被攻擊條件的農田：
 * 1. 已灌溉 (isIrrigated === true)
 * 2. 已種植作物 (cropId != null)
 * 3. 作物狀態為健康 (cropStatus === 'healthy' 或 undefined)
 */
export function getEligiblePestFields(fields: FieldPlot[]): FieldPlot[] {
  return fields.filter(f => 
    f.isIrrigated && 
    !!f.cropId && 
    (f.cropStatus === 'healthy' || !f.cropStatus)
  );
}

/**
 * 依據 userKey 與 weekKey 確定性隨機選擇受害農田與害蟲種類
 */
export function selectPestTarget(
  userKey: string,
  weekKey: string,
  eligibleFields: FieldPlot[]
): { selectedField: FieldPlot; selectedPest: PestInfo } | null {
  if (eligibleFields.length === 0) return null;

  const seedStr = `${userKey}_${weekKey}_pest_invasion_target`;
  const seed = stringToSeed(seedStr);

  const fieldIndex = seed % eligibleFields.length;
  const selectedField = eligibleFields[fieldIndex];

  const pestTypes: PestType[] = ['caterpillar', 'beetle', 'locust', 'snail', 'ant'];
  const pestIndex = (seed >> 3) % pestTypes.length;
  const selectedPest = PESTS[pestTypes[pestIndex]];

  return { selectedField, selectedPest };
}

/**
 * 依據 userKey, weekKey, fieldId 確定性挑選 1 道防衛題目 (優先偏向中高難度 Q6~Q10)
 */
export function getPestChallengeQuestion(
  userKey: string,
  weekKey: string,
  fieldId: number,
  allCards: CPlusPlusCard[]
): CPlusPlusCard | null {
  const fieldCards = allCards.filter(c => c.fieldId === fieldId);
  if (fieldCards.length === 0) return null;

  // 依題目序號排序
  const sorted = [...fieldCards].sort((a, b) => {
    const numA = parseInt(a?.id?.split('_')?.[1] || '0', 10);
    const numB = parseInt(b?.id?.split('_')?.[1] || '0', 10);
    return numA - numB;
  });

  const seedStr = `${userKey}_${weekKey}_field_${fieldId}_defense_q`;
  const seed = stringToSeed(seedStr);

  // 優先挑選後半段難度 (例如索引 5 到 9)
  if (sorted.length >= 6) {
    const candidateRange = sorted.slice(Math.min(5, sorted.length - 1));
    const chosenIndex = seed % candidateRange.length;
    return candidateRange[chosenIndex];
  }

  return sorted[seed % sorted.length];
}

/**
 * 依據 userKey, weekKey, fieldId 確定性挑選 5 道完全不重複的復育複習題目
 */
export function getRecoveryQuestions(
  userKey: string,
  weekKey: string,
  fieldId: number,
  allCards: CPlusPlusCard[]
): CPlusPlusCard[] {
  const fieldCards = allCards.filter(c => c.fieldId === fieldId);
  if (fieldCards.length === 0) return [];

  if (fieldCards.length <= 5) {
    return [...fieldCards];
  }

  // 依照 seed 進行確定性洗牌
  const seedStr = `${userKey}_${weekKey}_field_${fieldId}_recovery_q5`;
  let seed = stringToSeed(seedStr);

  const pool = [...fieldCards];
  const selected: CPlusPlusCard[] = [];

  for (let i = 0; i < 5 && pool.length > 0; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const pickIndex = Math.abs(seed) % pool.length;
    selected.push(pool.splice(pickIndex, 1)[0]);
  }

  return selected;
}
