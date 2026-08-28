import { GameState, FieldPlot, TortoisePet, AchievementRarity, SecretAchievementRecord } from '../types';
import { getTaiwanDateKey } from '../utils/dailyChallenge';

export interface SecretAchievementDefinition {
  id: string;
  title: string;
  badgeId: string;
  badgeEmoji: string;
  rarity: AchievementRarity;
  description: string; // 達成條件說明 (解鎖後顯示)
  quote: string; // 哲理名言 / 語法引言
  reward: {
    coins: number;
    cabbages: number;
    waterBuckets: number;
  };
  check: (params: {
    gameState: GameState;
    fields: FieldPlot[];
    tortoise: TortoisePet;
    todayDateKey: string;
    currentHourTW: number;
    justCompletedFieldId?: number;
    justCompletedFieldSuccess?: boolean;
    justAnsweredCorrectly?: boolean;
  }) => boolean;
}

/**
 * 取得台灣時間（Asia/Taipei UTC+8）的小時數 (0-23)
 */
export function getTaiwanHour(date: Date = new Date()): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Taipei',
      hour: 'numeric',
      hour12: false
    });
    return parseInt(formatter.format(date), 10);
  } catch (e) {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const twDate = new Date(utc + (3600000 * 8));
    return twDate.getHours();
  }
}

/**
 * 取得台灣時間格式化日期時間 (YYYY/MM/DD HH:mm)
 */
export function getTaiwanFormattedNow(): string {
  try {
    const formatter = new Intl.DateTimeFormat('zh-TW', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formatter.format(new Date());
  } catch (e) {
    const d = new Date();
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
}

/**
 * 建立預設的成就統計資料
 */
export function createDefaultAchievementStats(): NonNullable<GameState['achievementStats']> {
  return {
    lifetimeCorrectAnswers: 0,
    lifetimeCoinsEarned: 10,
    lifetimeCabbagesEarned: 0,
    lifetimeWaterEarned: 0,
    consecutiveCorrectAnswers: 0,
    highestCorrectStreak: 0,
    noHintCorrectStreak: 0,
    noHintPerfectFieldsStreak: 0,
    uniqueActiveDays: [getTaiwanDateKey()],
    fieldFailureCounts: {},
    lifetimeDailyQuestsClaimed: 0,
    turtleTrainCount: 0,
  };
}

/**
 * 18 個精選隱藏成就定義列表
 */
export const SECRET_ACHIEVEMENTS: SecretAchievementDefinition[] = [
  // 1. 🔥 完美主義者
  {
    id: 'secret_perfectionist',
    title: '完美主義者',
    badgeId: 'perfectionist',
    badgeEmoji: '🔥',
    rarity: 'legendary',
    description: '連續答對 100 題，中途沒有答錯任何一次。',
    quote: '「真正的程式碼，不允許一絲誤差。」',
    reward: { coins: 350, cabbages: 2, waterBuckets: 2 },
    check: ({ gameState }) => {
      const highest = gameState.achievementStats?.highestCorrectStreak ?? 0;
      const current = gameState.achievementStats?.consecutiveCorrectAnswers ?? 0;
      const maxStreak = gameState.maxStreak ?? 0;
      return highest >= 100 || current >= 100 || maxStreak >= 100;
    }
  },

  // 2. ⚡ 編譯之神
  {
    id: 'secret_god_of_compiler',
    title: '編譯之神',
    badgeId: 'god_of_compiler',
    badgeEmoji: '⚡',
    rarity: 'mythic',
    description: '連續答對 250 題，進入神之專注領域。',
    quote: '「編譯器已經開始懷疑你是不是它的同類。」',
    reward: { coins: 800, cabbages: 5, waterBuckets: 5 },
    check: ({ gameState }) => {
      const highest = gameState.achievementStats?.highestCorrectStreak ?? 0;
      const current = gameState.achievementStats?.consecutiveCorrectAnswers ?? 0;
      const maxStreak = gameState.maxStreak ?? 0;
      return highest >= 250 || current >= 250 || maxStreak >= 250;
    }
  },

  // 3. 🌾 百田之主
  {
    id: 'secret_master_of_100_fields',
    title: '百田之主',
    badgeId: 'master_of_100_fields',
    badgeEmoji: '🌾',
    rarity: 'legendary',
    description: '成功完成 100 個不同 C++ 良田的 100% 完美灌溉。',
    quote: '「百畝良田皆生機盎然，記憶體陣列任你驅使。」',
    reward: { coins: 400, cabbages: 3, waterBuckets: 3 },
    check: ({ fields, gameState }) => {
      const irrigatedCount = fields.filter(f => f.isIrrigated).length;
      const completedCount = Object.values(gameState.completedAttempts || {}).filter(Boolean).length;
      return irrigatedCount >= 100 || completedCount >= 100;
    }
  },

  // 4. 👑 C++ 農場之王
  {
    id: 'secret_king_of_cpp_farm',
    title: 'C++ 農場之王',
    badgeId: 'king_of_cpp_farm',
    badgeEmoji: '👑',
    rarity: 'mythic',
    description: '完成全部 150 個不同良田的 100% 完美灌溉。',
    quote: '完成所有 150 個 C++ 語法良田。名言：「真正的農夫，耕的是記憶體。」',
    reward: { coins: 1000, cabbages: 10, waterBuckets: 10 },
    check: ({ fields, gameState }) => {
      const irrigatedCount = fields.filter(f => f.isIrrigated).length;
      const completedCount = Object.values(gameState.completedAttempts || {}).filter(Boolean).length;
      return (fields.length > 0 && irrigatedCount >= fields.length) || completedCount >= 150;
    }
  },

  // 5. 🐢 龜仙人
  {
    id: 'secret_turtle_sage',
    title: '龜仙人',
    badgeId: 'turtle_sage',
    badgeEmoji: '🐢',
    rarity: 'legendary',
    description: '細心培育小綠龜，使其境界突破至等級 15。',
    quote: '「小綠龜已參透指標之理，蛻變為傳說中的神龜仙人。」',
    reward: { coins: 350, cabbages: 4, waterBuckets: 4 },
    check: ({ tortoise }) => tortoise.level >= 15
  },

  // 6. 🥬 高麗菜大亨
  {
    id: 'secret_cabbage_tycoon',
    title: '高麗菜大亨',
    badgeId: 'cabbage_tycoon',
    badgeEmoji: '🥬',
    rarity: 'epic',
    description: '歷史累積收成取得 100 個有機高麗菜。',
    quote: '「收成的高麗菜堆積如山，小綠龜一年四季都不會餓肚子了。」',
    reward: { coins: 150, cabbages: 0, waterBuckets: 3 },
    check: ({ gameState }) => {
      const earned = gameState.achievementStats?.lifetimeCabbagesEarned ?? gameState.cabbages ?? 0;
      return earned >= 100;
    }
  },

  // 7. 💰 C++ 富豪
  {
    id: 'secret_cpp_millionaire',
    title: 'C++ 富豪',
    badgeId: 'cpp_millionaire',
    badgeEmoji: '💰',
    rarity: 'epic',
    description: '歷史累積賺取 10,000 金幣。',
    quote: '「在語法良田賺取了萬貫家產，富甲一方。」',
    reward: { coins: 200, cabbages: 2, waterBuckets: 0 },
    check: ({ gameState }) => {
      const earned = gameState.achievementStats?.lifetimeCoinsEarned ?? gameState.coins ?? 0;
      return earned >= 10000;
    }
  },

  // 8. 💧 聖泉守護者
  {
    id: 'secret_spring_guardian',
    title: '聖泉守護者',
    badgeId: 'spring_guardian',
    badgeEmoji: '💧',
    rarity: 'epic',
    description: '歷史累積取得 100 桶聖泉水。',
    quote: '「源源不絕的潔淨聖泉，洗滌了所有記憶體洩漏 (Memory Leak)。」',
    reward: { coins: 150, cabbages: 3, waterBuckets: 0 },
    check: ({ gameState }) => {
      const earned = gameState.achievementStats?.lifetimeWaterEarned ?? gameState.waterBuckets ?? 0;
      return earned >= 100;
    }
  },

  // 9. 🌙 深夜編譯者
  {
    id: 'secret_midnight_coder',
    title: '深夜編譯者',
    badgeId: 'midnight_coder',
    badgeEmoji: '🌙',
    rarity: 'epic',
    description: '在台灣時間 00:00～03:59 之間完成一個完美 10/10 關卡。',
    quote: '「夜深人靜之時，唯有編譯器的霓虹伴你前行。」',
    reward: { coins: 150, cabbages: 1, waterBuckets: 1 },
    check: ({ currentHourTW, justCompletedFieldSuccess }) => {
      return !!justCompletedFieldSuccess && currentHourTW >= 0 && currentHourTW < 4;
    }
  },

  // 10. 🌅 第一行程式碼
  {
    id: 'secret_dawn_coder',
    title: '第一行程式碼',
    badgeId: 'dawn_coder',
    badgeEmoji: '🌅',
    rarity: 'epic',
    description: '在台灣時間 05:00～06:59 之間完成一個完美 10/10 關卡。',
    quote: '「朝陽初升，你在清晨敲下了今天的第一行優雅程式碼。」',
    reward: { coins: 150, cabbages: 1, waterBuckets: 1 },
    check: ({ currentHourTW, justCompletedFieldSuccess }) => {
      return !!justCompletedFieldSuccess && currentHourTW >= 5 && currentHourTW < 7;
    }
  },

  // 11. 🔁 永不放棄
  {
    id: 'secret_never_give_up',
    title: '永不放棄',
    badgeId: 'never_give_up',
    badgeEmoji: '🔁',
    rarity: 'epic',
    description: '同一塊曾失敗至少 5 次的田地，最後成功取得 10/10 完美灌溉。',
    quote: '「即使遭遇無數次 Compile Error，也絕不退縮直到完全綠燈。」',
    reward: { coins: 180, cabbages: 2, waterBuckets: 2 },
    check: ({ gameState, justCompletedFieldId, justCompletedFieldSuccess }) => {
      if (!justCompletedFieldSuccess || justCompletedFieldId === undefined) return false;
      const failCount = gameState.achievementStats?.fieldFailureCounts?.[justCompletedFieldId] ?? 0;
      return failCount >= 5;
    }
  },

  // 12. 💡 不需要提示
  {
    id: 'secret_no_hint_master',
    title: '不需要提示',
    badgeId: 'no_hint_master',
    badgeEmoji: '💡',
    rarity: 'legendary',
    description: '連續完成 10 個不同良田的 10/10，整段期間完全未使用提示。',
    quote: '「胸有成竹，十畝良田信手拈來，不藉外力。」',
    reward: { coins: 400, cabbages: 3, waterBuckets: 3 },
    check: ({ gameState }) => {
      const streak = gameState.achievementStats?.noHintPerfectFieldsStreak ?? 0;
      return streak >= 10;
    }
  },

  // 13. 🧠 活的編譯器
  {
    id: 'secret_living_compiler',
    title: '活的編譯器',
    badgeId: 'living_compiler',
    badgeEmoji: '🧠',
    rarity: 'legendary',
    description: '連續答對 50 題且期間完全沒有使用任何提示。',
    quote: '「你的大腦就是最快、最精準的靜態程式碼分析器。」',
    reward: { coins: 350, cabbages: 3, waterBuckets: 3 },
    check: ({ gameState }) => {
      const streak = gameState.achievementStats?.noHintCorrectStreak ?? 0;
      return streak >= 50;
    }
  },

  // 14. 🚜 老農夫
  {
    id: 'secret_veteran_farmer',
    title: '老農夫',
    badgeId: 'veteran_farmer',
    badgeEmoji: '🚜',
    rarity: 'legendary',
    description: '在不同自然日登入並遊玩至少 30 天（台灣時間）。',
    quote: '「歷經歲月洗禮，三十日耕耘不輟，已成良田傳奇。」',
    reward: { coins: 500, cabbages: 5, waterBuckets: 5 },
    check: ({ gameState }) => {
      const days = gameState.achievementStats?.uniqueActiveDays ?? [];
      return days.length >= 30;
    }
  },

  // 15. 🏆 傳說中的農夫 (Meta Achievement)
  {
    id: 'secret_meta_legend',
    title: '傳說中的農夫',
    badgeId: 'meta_legend',
    badgeEmoji: '🏆',
    rarity: 'mythic',
    description: '取得至少 5 個其他隱藏成就（不含此成就）。',
    quote: '「集齊多項傳說偉業，農夫之名將載入 C++ 史冊！」',
    reward: { coins: 800, cabbages: 5, waterBuckets: 5 },
    check: ({ gameState }) => {
      const unlocked = gameState.unlockedAchievements || {};
      const otherUnlockedCount = Object.keys(unlocked).filter(id => id !== 'secret_meta_legend').length;
      return otherUnlockedCount >= 5;
    }
  },

  // 16. 📅 日日精進
  {
    id: 'secret_daily_streak_7',
    title: '日日精進',
    badgeId: 'daily_streak_7',
    badgeEmoji: '📅',
    rarity: 'epic',
    description: '每日限定挑戰連續達成 7 天。',
    quote: '「日拱一卒，功不唐捐，連續七天征服每日限定題。」',
    reward: { coins: 200, cabbages: 2, waterBuckets: 2 },
    check: ({ gameState }) => {
      const streak = gameState.dailyChallenge?.streak ?? 0;
      const bestStreak = gameState.dailyChallenge?.bestStreak ?? 0;
      return streak >= 7 || bestStreak >= 7;
    }
  },

  // 17. 🎯 每日勞模
  {
    id: 'secret_daily_quests_master',
    title: '每日勞模',
    badgeId: 'daily_quests_master',
    badgeEmoji: '🎯',
    rarity: 'epic',
    description: '歷史累積完成領取 30 個每日任務獎勵。',
    quote: '「勤勞致富，每日任務一個不落。」',
    reward: { coins: 200, cabbages: 0, waterBuckets: 3 },
    check: ({ gameState }) => {
      const count = gameState.achievementStats?.lifetimeDailyQuestsClaimed ?? 0;
      return count >= 30;
    }
  },

  // 18. 🎓 智商超群
  {
    id: 'secret_turtle_trainer',
    title: '智商超群',
    badgeId: 'turtle_trainer',
    badgeEmoji: '🎓',
    rarity: 'epic',
    description: '累計對小綠龜進行「C++ 腦力特訓」至少 20 次。',
    quote: '「嚴師出高徒！小綠龜的大腦已被鍛鍊得如同高效能 CPU。」',
    reward: { coins: 180, cabbages: 2, waterBuckets: 0 },
    check: ({ gameState }) => {
      const count = gameState.achievementStats?.turtleTrainCount ?? 0;
      return count >= 20;
    }
  }
];

/**
 * 稀有度視覺風格設定
 */
export const RARITY_CONFIG = {
  epic: {
    label: 'EPIC',
    badgeText: '🟣 EPIC',
    color: 'text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-950/60',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.25)]',
    gradient: 'from-purple-900/60 via-slate-900 to-slate-950',
    tagBg: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    cardBorder: 'border-purple-500/30'
  },
  legendary: {
    label: 'LEGENDARY',
    badgeText: '🟡 LEGENDARY',
    color: 'text-amber-400',
    border: 'border-amber-500/40',
    bg: 'bg-amber-950/60',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    gradient: 'from-amber-900/60 via-slate-900 to-slate-950',
    tagBg: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    cardBorder: 'border-amber-500/40'
  },
  mythic: {
    label: 'MYTHIC',
    badgeText: '🌈 MYTHIC',
    color: 'text-cyan-300',
    border: 'border-cyan-400/50',
    bg: 'bg-slate-950',
    glow: 'shadow-[0_0_25px_rgba(34,211,238,0.4)]',
    gradient: 'from-cyan-950/80 via-purple-950/60 to-pink-950/60',
    tagBg: 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-400/40',
    cardBorder: 'border-cyan-400/50'
  }
};
