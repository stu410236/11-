import { 
  LotteryTier, 
  LotteryTierId, 
  LotteryPrizeBundle, 
  LotteryItemType, 
  LotteryStats, 
  LotteryRewardItem 
} from '../types';

/**
 * 🌾 豐收福引所 (HARVEST FUKUBIKI) - 核心獎級機率設定
 * 嚴格遵循遊戲機率規範：
 * 特等: 2%
 * 一等: 8%
 * 二等: 25%
 * 三等: 65%
 * 總和: 100% (無空獎、無銘謝惠顧)
 */
export const LOTTERY_TIERS: LotteryTier[] = [
  {
    id: 'special',
    name: '特等',
    probability: 2,
    emoji: '🌈',
    color: 'text-rose-400',
    gradient: 'from-rose-500 via-purple-500 to-cyan-400',
    badgeBg: 'bg-gradient-to-r from-rose-500/30 via-purple-500/30 to-cyan-400/30 text-rose-200 border border-rose-400/50',
    ballColor: 'rainbow',
    description: '傳說級特等大獎！含有海量鑽石與高級道具組合！'
  },
  {
    id: 'first',
    name: '一等',
    probability: 8,
    emoji: '🥇',
    color: 'text-amber-400',
    gradient: 'from-amber-400 to-yellow-500',
    badgeBg: 'bg-amber-500/20 text-amber-300 border border-amber-400/40',
    ballColor: 'gold',
    description: '黃金一等獎！含有大量金幣、鑽石與實用道具組合！'
  },
  {
    id: 'second',
    name: '二等',
    probability: 25,
    emoji: '🥈',
    color: 'text-slate-200',
    gradient: 'from-slate-200 to-slate-400',
    badgeBg: 'bg-slate-500/20 text-slate-200 border border-slate-400/40',
    ballColor: 'silver',
    description: '白銀二等獎！含有金幣、鑽石、烏龜點心或除蟲肥料！'
  },
  {
    id: 'third',
    name: '三等',
    probability: 65,
    emoji: '🥉',
    color: 'text-emerald-300',
    gradient: 'from-emerald-400 to-teal-500',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
    ballColor: 'white',
    description: '良田三等獎！穩定獲得金幣、提示券、高麗菜或聖泉水！'
  }
];

// 開發環境機率總和健全檢查
const probabilitySum = LOTTERY_TIERS.reduce((acc, tier) => acc + tier.probability, 0);
if (probabilitySum !== 100) {
  console.error(`[Lottery Error] 機率總和異常: 應為 100%，實際為 ${probabilitySum}%`);
}

/**
 * 道具詳細說明與中繼資訊
 */
export const LOTTERY_ITEMS_META: Record<
  LotteryItemType,
  {
    name: string;
    emoji: string;
    description: string;
    usageGuide: string;
    color: string;
    bgColor: string;
  }
> = {
  coins: {
    name: '金幣',
    emoji: '🪙',
    description: '語法良田基礎通用貨幣。',
    usageGuide: '用於農田灌溉與解鎖各項功能。',
    color: 'text-amber-300',
    bgColor: 'bg-amber-500/10 border-amber-500/30'
  },
  diamonds: {
    name: '鑽石',
    emoji: '💎',
    description: '稀有高階貨幣，未來可用於特殊兌換與外觀解鎖。',
    usageGuide: '珍貴收藏貨幣，未來可用於特殊兌換。',
    color: 'text-cyan-300',
    bgColor: 'bg-cyan-500/10 border-cyan-500/30'
  },
  hintTickets: {
    name: '提示券',
    emoji: '💡',
    description: '答題卡關時可使用，獲得精準語法提示。',
    usageGuide: '答題介面點選提示時可使用。',
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-500/10 border-yellow-500/30'
  },
  pesticides: {
    name: '除蟲劑',
    emoji: '🧪',
    description: '害蟲防衛失敗時，可獲得一次重新挑戰機會。',
    usageGuide: '每週害蟲防衛答錯時可消耗 1 瓶立即重試。',
    color: 'text-purple-300',
    bgColor: 'bg-purple-500/10 border-purple-500/30'
  },
  pestNets: {
    name: '防蟲網',
    emoji: '🛡️',
    description: '可以事先保護農田，降低蟲害造成的損失。',
    usageGuide: '防護農田，防止突襲造成的作物枯萎。',
    color: 'text-blue-300',
    bgColor: 'bg-blue-500/10 border-blue-500/30'
  },
  recoveryFertilizers: {
    name: '復甦肥料',
    emoji: '🌱',
    description: '可減少枯萎作物所需的復習題數。',
    usageGuide: '作物枯萎時使用，降低復育題數門檻。',
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30'
  },
  tortoiseTreats: {
    name: '烏龜點心',
    emoji: '🐢',
    description: '小綠龜最愛的營養零嘴，可增加小綠龜經驗值（XP）。',
    usageGuide: '於寵物介面餵食，快速提升小綠龜等級。',
    color: 'text-teal-300',
    bgColor: 'bg-teal-500/10 border-teal-500/30'
  },
  water: {
    name: '聖泉水',
    emoji: '💧',
    description: '滋潤良田的高純度能量泉水。',
    usageGuide: '灌溉農田與補充小綠龜水分。',
    color: 'text-sky-300',
    bgColor: 'bg-sky-500/10 border-sky-500/30'
  },
  cabbage: {
    name: '高麗菜',
    emoji: '🥬',
    description: '小綠龜最喜愛的飽食主食。',
    usageGuide: '餵食小綠龜增加飽足感。',
    color: 'text-green-300',
    bgColor: 'bg-green-500/10 border-green-500/30'
  }
};

/**
 * 完整獎項池設定 (各獎級組合獎勵)
 */
export const LOTTERY_PRIZES: Record<LotteryTierId, LotteryPrizeBundle[]> = {
  // 🌈 特等 (2%)
  special: [
    {
      id: 'SPECIAL_A',
      tier: 'special',
      title: '百鑽極光禮盒',
      items: [
        { type: 'diamonds', amount: 100 }
      ]
    },
    {
      id: 'SPECIAL_B',
      tier: 'special',
      title: '千金豐饒大禮包',
      items: [
        { type: 'coins', amount: 1000 },
        { type: 'diamonds', amount: 50 },
        { type: 'pesticides', amount: 3 }
      ]
    },
    {
      id: 'SPECIAL_C',
      tier: 'special',
      title: '智慧鐵壁寶匣',
      items: [
        { type: 'diamonds', amount: 50 },
        { type: 'pestNets', amount: 2 },
        { type: 'hintTickets', amount: 5 }
      ]
    },
    {
      id: 'SPECIAL_D',
      tier: 'special',
      title: '生命神木珍賞',
      items: [
        { type: 'diamonds', amount: 50 },
        { type: 'recoveryFertilizers', amount: 3 },
        { type: 'tortoiseTreats', amount: 3 }
      ]
    }
  ],

  // 🥇 一等 (8%)
  first: [
    {
      id: 'FIRST_A',
      tier: 'first',
      title: '璀璨除蟲組合',
      items: [
        { type: 'coins', amount: 500 },
        { type: 'diamonds', amount: 30 },
        { type: 'pesticides', amount: 2 }
      ]
    },
    {
      id: 'FIRST_B',
      tier: 'first',
      title: '明眸守護套組',
      items: [
        { type: 'diamonds', amount: 20 },
        { type: 'pestNets', amount: 1 },
        { type: 'hintTickets', amount: 3 }
      ]
    },
    {
      id: 'FIRST_C',
      tier: 'first',
      title: '靈龜復育盛宴',
      items: [
        { type: 'coins', amount: 400 },
        { type: 'recoveryFertilizers', amount: 2 },
        { type: 'tortoiseTreats', amount: 2 }
      ]
    }
  ],

  // 🥈 二等 (25%)
  second: [
    {
      id: 'SECOND_A',
      tier: 'second',
      title: '淨土除蟲袋',
      items: [
        { type: 'coins', amount: 250 },
        { type: 'pesticides', amount: 1 }
      ]
    },
    {
      id: 'SECOND_B',
      tier: 'second',
      title: '靈光鑽石小盒',
      items: [
        { type: 'diamonds', amount: 10 },
        { type: 'hintTickets', amount: 2 }
      ]
    },
    {
      id: 'SECOND_C',
      tier: 'second',
      title: '龜龜活水包',
      items: [
        { type: 'tortoiseTreats', amount: 1 },
        { type: 'water', amount: 2 }
      ]
    },
    {
      id: 'SECOND_D',
      tier: 'second',
      title: '春風肥料組',
      items: [
        { type: 'coins', amount: 200 },
        { type: 'recoveryFertilizers', amount: 1 }
      ]
    }
  ],

  // 🥉 三等 (65%)
  third: [
    {
      id: 'THIRD_A',
      tier: 'third',
      title: '金幣袋',
      items: [
        { type: 'coins', amount: 100 }
      ]
    },
    {
      id: 'THIRD_B',
      tier: 'third',
      title: '提示券',
      items: [
        { type: 'hintTickets', amount: 1 }
      ]
    },
    {
      id: 'THIRD_C',
      tier: 'third',
      title: '雙份高麗菜',
      items: [
        { type: 'cabbage', amount: 2 }
      ]
    },
    {
      id: 'THIRD_D',
      tier: 'third',
      title: '甘甜聖泉水',
      items: [
        { type: 'water', amount: 1 }
      ]
    },
    {
      id: 'THIRD_E',
      tier: 'third',
      title: '日常蔬果金',
      items: [
        { type: 'coins', amount: 75 },
        { type: 'cabbage', amount: 1 }
      ]
    }
  ]
};

/**
 * 依機率隨機抽取獎級 (純數學亂數，絕無 AI / Gemini 介入)
 */
export function weightedRandomLotteryTier(forceTier?: LotteryTierId): LotteryTier {
  if (forceTier) {
    const found = LOTTERY_TIERS.find(t => t.id === forceTier);
    if (found) return found;
  }

  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const tier of LOTTERY_TIERS) {
    cumulative += tier.probability;
    if (rand <= cumulative) {
      return tier;
    }
  }

  // 預設保底三等
  return LOTTERY_TIERS[LOTTERY_TIERS.length - 1];
}

/**
 * 從指定獎級中隨機選取一個獎勵組合
 */
export function selectPrizeFromTier(tierId: LotteryTierId): LotteryPrizeBundle {
  const bundles = LOTTERY_PRIZES[tierId];
  if (!bundles || bundles.length === 0) {
    // 防禦保底
    return {
      id: 'FALLBACK_THIRD',
      tier: 'third',
      title: '金幣袋',
      items: [{ type: 'coins', amount: 100 }]
    };
  }

  const idx = Math.floor(Math.random() * bundles.length);
  return bundles[idx];
}

/**
 * 格式化獎項內容為文字清單摘要
 */
export function formatPrizeItemsSummary(items: LotteryRewardItem[]): string {
  return items
    .map(item => {
      const meta = LOTTERY_ITEMS_META[item.type];
      return `${meta ? meta.emoji : ''} ${meta ? meta.name : item.type} ×${item.amount}`;
    })
    .join(' + ');
}

/**
 * 建立預設抽獎統計資料
 */
export function createDefaultLotteryStats(): LotteryStats {
  return {
    totalDraws: 0,
    specialWins: 0,
    firstWins: 0,
    secondWins: 0,
    thirdWins: 0
  };
}
