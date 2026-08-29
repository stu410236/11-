export type CropRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface CropData {
  id: string;
  name: string;
  englishName: string;
  rarity: CropRarity;
  probability: number; // 機率百分比 (整數)
  icon: string;
  description: string;
  color: string;
  accentColor: string;
}

export interface RarityMeta {
  rarity: CropRarity;
  label: string;
  badge: string;
  color: string;
  textColor: string;
  bgGradient: string;
  borderColor: string;
  totalProbability: number;
  glowShadow: string;
}

export const RARITY_CONFIG: Record<CropRarity, RarityMeta> = {
  common: {
    rarity: 'common',
    label: '普通',
    badge: '🌱 COMMON',
    color: '#10b981',
    textColor: 'text-emerald-400',
    bgGradient: 'from-emerald-950/80 to-slate-900',
    borderColor: 'border-emerald-500/40',
    totalProbability: 50,
    glowShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]'
  },
  rare: {
    rarity: 'rare',
    label: '稀有',
    badge: '🌿 RARE',
    color: '#06b6d4',
    textColor: 'text-cyan-300',
    bgGradient: 'from-cyan-950/80 to-slate-900',
    borderColor: 'border-cyan-400/50',
    totalProbability: 30,
    glowShadow: 'shadow-[0_0_25px_rgba(6,182,212,0.4)]'
  },
  epic: {
    rarity: 'epic',
    label: '史詩',
    badge: '💜 EPIC',
    color: '#a855f7',
    textColor: 'text-purple-300',
    bgGradient: 'from-purple-950/90 to-slate-900',
    borderColor: 'border-purple-400/60',
    totalProbability: 15,
    glowShadow: 'shadow-[0_0_30px_rgba(168,85,247,0.45)]'
  },
  legendary: {
    rarity: 'legendary',
    label: '傳奇',
    badge: '✨ LEGENDARY',
    color: '#f59e0b',
    textColor: 'text-amber-300',
    bgGradient: 'from-amber-950/90 via-slate-900 to-amber-950/60',
    borderColor: 'border-amber-400/70',
    totalProbability: 4,
    glowShadow: 'shadow-[0_0_35px_rgba(245,158,11,0.5)]'
  },
  mythic: {
    rarity: 'mythic',
    label: '神話',
    badge: '🌈 MYTHIC',
    color: '#ec4899',
    textColor: 'text-pink-300',
    bgGradient: 'from-pink-950/90 via-purple-950/80 to-amber-950/80',
    borderColor: 'border-pink-400/80',
    totalProbability: 1,
    glowShadow: 'shadow-[0_0_45px_rgba(236,72,153,0.6)]'
  }
};

/**
 * 統一作物資料表（正好 15 種，總機率嚴格等於 100%）
 */
export const CROPS: CropData[] = [
  // ── COMMON (50%) ──
  {
    id: 'wheat',
    name: '小麥',
    englishName: 'Wheat',
    rarity: 'common',
    probability: 10,
    icon: '🌾',
    description: '金黃色的小麥，象徵程式設計師紮實的基礎知識。',
    color: '#10b981',
    accentColor: '#34d399'
  },
  {
    id: 'corn',
    name: '玉米',
    englishName: 'Corn',
    rarity: 'common',
    probability: 10,
    icon: '🌽',
    description: '粒粒分明的甜玉米，如同一行行整齊清晰的 C++ 語法。',
    color: '#10b981',
    accentColor: '#34d399'
  },
  {
    id: 'potato',
    name: '馬鈴薯',
    englishName: 'Potato',
    rarity: 'common',
    probability: 10,
    icon: '🥔',
    description: '樸實可靠的馬鈴薯，就像穩定運行的 main() 主函式。',
    color: '#10b981',
    accentColor: '#34d399'
  },
  {
    id: 'carrot',
    name: '胡蘿蔔',
    englishName: 'Carrot',
    rarity: 'common',
    probability: 10,
    icon: '🥕',
    description: '鮮脆明亮的胡蘿蔔，補充除錯時眼睛所需要的維生素。',
    color: '#10b981',
    accentColor: '#34d399'
  },
  {
    id: 'cabbage',
    name: '高麗菜',
    englishName: 'Cabbage',
    rarity: 'common',
    probability: 10,
    icon: '🥬',
    description: '層層包覆的甘甜高麗菜，是小綠龜最喜愛的原味點心。',
    color: '#10b981',
    accentColor: '#34d399'
  },

  // ── RARE (30%) ──
  {
    id: 'tomato',
    name: '番茄',
    englishName: 'Tomato',
    rarity: 'rare',
    probability: 6,
    icon: '🍅',
    description: '紅潤多汁的番茄，讓你的程式碼充滿多汁的活力！',
    color: '#06b6d4',
    accentColor: '#22d3ee'
  },
  {
    id: 'onion',
    name: '洋蔥',
    englishName: 'Onion',
    rarity: 'rare',
    probability: 6,
    icon: '🧅',
    description: '剝開一層還有一層，就像深入剖析指標與引用記憶體。',
    color: '#06b6d4',
    accentColor: '#22d3ee'
  },
  {
    id: 'pumpkin',
    name: '南瓜',
    englishName: 'Pumpkin',
    rarity: 'rare',
    probability: 6,
    icon: '🎃',
    description: '金燦厚實的巨型南瓜，蘊含著豐沛的演算法能量。',
    color: '#06b6d4',
    accentColor: '#22d3ee'
  },
  {
    id: 'sweet_potato',
    name: '地瓜',
    englishName: 'Sweet Potato',
    rarity: 'rare',
    probability: 6,
    icon: '🍠',
    description: '熱氣騰騰的香甜地瓜，暖和深夜刷題寫 code 的雙手。',
    color: '#06b6d4',
    accentColor: '#22d3ee'
  },
  {
    id: 'radish',
    name: '白蘿蔔',
    englishName: 'Radish',
    rarity: 'rare',
    probability: 6,
    icon: '🫚',
    description: '潔白無瑕的深根白蘿蔔，象徵深厚的資料結構內功。',
    color: '#06b6d4',
    accentColor: '#22d3ee'
  },

  // ── EPIC (15%) ──
  {
    id: 'strawberry',
    name: '草莓',
    englishName: 'Strawberry',
    rarity: 'epic',
    probability: 5,
    icon: '🍓',
    description: '酸甜迷人的極品草莓，編譯無警告時的極致享受。',
    color: '#a855f7',
    accentColor: '#c084fc'
  },
  {
    id: 'watermelon',
    name: '西瓜',
    englishName: 'Watermelon',
    rarity: 'epic',
    probability: 5,
    icon: '🍉',
    description: '清涼解渴的巨無霸西瓜，瞬間消滅記憶體洩漏帶來的躁熱。',
    color: '#a855f7',
    accentColor: '#c084fc'
  },
  {
    id: 'blueberry',
    name: '藍莓',
    englishName: 'Blueberry',
    rarity: 'epic',
    probability: 5,
    icon: '🫐',
    description: '晶瑩剔透的藍莓寶石，激發極速演算法靈感與敏銳眼光。',
    color: '#a855f7',
    accentColor: '#c084fc'
  },

  // ── LEGENDARY (4%) ──
  {
    id: 'grape',
    name: '葡萄',
    englishName: 'Grape',
    rarity: 'legendary',
    probability: 4,
    icon: '🍇',
    description: '傳奇水晶紫葡萄，一顆顆如同優雅鏈結串接的記憶體節點。',
    color: '#f59e0b',
    accentColor: '#fbbf24'
  },

  // ── MYTHIC (1%) ──
  {
    id: 'golden_cabbage',
    name: '黃金高麗菜',
    englishName: 'Golden Cabbage',
    rarity: 'mythic',
    probability: 1,
    icon: '👑🥬',
    description: '萬中選一的神話至寶！散發璀璨彩虹光芒的純金高麗菜，編譯之神的祝福。',
    color: '#ec4899',
    accentColor: '#f472b6'
  }
];

// 開發階段機率加總校驗
const totalProbability = CROPS.reduce((sum, c) => sum + c.probability, 0);
if (totalProbability !== 100) {
  console.error(`[Crop System Error] Total probability of crops must equal 100%, but got ${totalProbability}%!`);
}

/**
 * 依 ID 尋找作物資訊
 */
export const getCropById = (cropId?: string | null): CropData => {
  if (!cropId) return CROPS[0];
  const found = CROPS.find(c => c.id === cropId);
  return found || CROPS[0];
};

/**
 * 簡單安全的字串 Hash 函式（產生 0 ~ 9999 的整數）
 */
function hashStringToRange(str: string, max: number = 10000): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // 轉為 32bit 整數
  }
  return Math.abs(hash) % max;
}

/**
 * 統一加權隨機抽取作物演算法
 * 如果提供 seedStr，則進行確定性抽取（防止刷新重抽刷機率）；
 * 若無則進行標準加權隨機。
 */
export const drawCropWeighted = (seedStr?: string): CropData => {
  let roll: number;
  if (seedStr) {
    // 映射到 0.0 ~ 99.999
    roll = (hashStringToRange(seedStr, 10000) / 100);
  } else {
    roll = Math.random() * 100;
  }

  let accumulated = 0;
  for (const crop of CROPS) {
    accumulated += crop.probability;
    if (roll < accumulated) {
      return crop;
    }
  }

  return CROPS[CROPS.length - 1];
};

/**
 * 依稀有度分組作物清單（供機率說明彈窗使用）
 */
export const getCropsByRarity = (): Record<CropRarity, CropData[]> => {
  const grouped: Record<CropRarity, CropData[]> = {
    common: [],
    rare: [],
    epic: [],
    legendary: [],
    mythic: []
  };

  CROPS.forEach(c => {
    grouped[c.rarity].push(c);
  });

  return grouped;
};
