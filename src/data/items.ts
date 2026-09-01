export type ItemUsageType = 
  | 'currency' 
  | 'hint' 
  | 'pest-defense' 
  | 'field-equip' 
  | 'crop-recovery' 
  | 'tortoise-feed' 
  | 'tortoise-water' 
  | 'lottery';

export interface GameItemDefinition {
  id: string;
  name: string;
  emoji: string;
  category: 'currency' | 'battle' | 'farming' | 'pet' | 'special';
  description: string;
  usageGuide: string;
  color: string;
  bgColor: string;
  badgeBg: string;
  borderColor: string;
  usageType: ItemUsageType;
}

export const GAME_ITEMS: Record<string, GameItemDefinition> = {
  coins: {
    id: 'coins',
    name: '金幣',
    emoji: '🪙',
    category: 'currency',
    description: '語法良田基礎通用貨幣。',
    usageGuide: '用於農田灌溉與解鎖各項功能。',
    color: 'text-amber-300',
    bgColor: 'bg-amber-500/10',
    badgeBg: 'bg-amber-500/20 text-amber-300',
    borderColor: 'border-amber-500/30',
    usageType: 'currency'
  },
  diamonds: {
    id: 'diamonds',
    name: '鑽石',
    emoji: '💎',
    category: 'currency',
    description: '珍貴貨幣，可於之後建立的特殊商店兌換限定商品。',
    usageGuide: '珍貴收藏貨幣，可於之後建立的特殊商店兌換限定商品。',
    color: 'text-cyan-300',
    bgColor: 'bg-cyan-500/10',
    badgeBg: 'bg-cyan-500/20 text-cyan-300',
    borderColor: 'border-cyan-500/30',
    usageType: 'currency'
  },
  hintTickets: {
    id: 'hintTickets',
    name: '提示券',
    emoji: '💡',
    category: 'special',
    description: '答題卡關時可使用，獲得精準 C++ 語法提點。',
    usageGuide: '於挑戰 C++ 關卡時點擊提示按鈕確認使用。',
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-500/10',
    badgeBg: 'bg-yellow-500/20 text-yellow-300',
    borderColor: 'border-yellow-500/30',
    usageType: 'hint'
  },
  pesticides: {
    id: 'pesticides',
    name: '除蟲劑',
    emoji: '🧪',
    category: 'battle',
    description: '害蟲防衛失敗時，可以獲得一次最後的重新作答機會。',
    usageGuide: '於每週害蟲防衛戰第一次回答錯誤時使用（每場限用 1 次）。',
    color: 'text-purple-300',
    bgColor: 'bg-purple-500/10',
    badgeBg: 'bg-purple-500/20 text-purple-300',
    borderColor: 'border-purple-500/30',
    usageType: 'pest-defense'
  },
  pestNets: {
    id: 'pestNets',
    name: '防蟲網',
    emoji: '🛡️',
    category: 'battle',
    description: '事前防禦道具，裝備於健康農田可自動擋下首次害蟲失誤。',
    usageGuide: '巡視健康農田時可裝備，於害蟲入侵答錯時自動吸收傷害。',
    color: 'text-blue-300',
    bgColor: 'bg-blue-500/10',
    badgeBg: 'bg-blue-500/20 text-blue-300',
    borderColor: 'border-blue-500/30',
    usageType: 'field-equip'
  },
  recoveryFertilizers: {
    id: 'recoveryFertilizers',
    name: '復甦肥料',
    emoji: '🌱',
    category: 'farming',
    description: '作物枯萎時使用，將復育複習題數由 5 題減少為 3 題。',
    usageGuide: '於農田復育介面中使用，大幅減輕複習負擔。',
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-500/10',
    badgeBg: 'bg-emerald-500/20 text-emerald-300',
    borderColor: 'border-emerald-500/30',
    usageType: 'crop-recovery'
  },
  tortoiseTreats: {
    id: 'tortoiseTreats',
    name: '烏龜點心',
    emoji: '🐢',
    category: 'pet',
    description: '小綠龜最愛的手作點心，餵食可大幅提升烏龜經驗值（XP +50）與幸福度。',
    usageGuide: '於小綠龜培育介面或背包中選擇餵食。',
    color: 'text-teal-300',
    bgColor: 'bg-teal-500/10',
    badgeBg: 'bg-teal-500/20 text-teal-300',
    borderColor: 'border-teal-500/30',
    usageType: 'tortoise-feed'
  },
  water: {
    id: 'water',
    name: '聖泉水',
    emoji: '🪣',
    category: 'pet',
    description: '灌溉良田收穫的清冽聖水，可用於滋潤小綠龜提升水分值與幸福感。',
    usageGuide: '於小綠龜培育介面中給水。',
    color: 'text-sky-300',
    bgColor: 'bg-sky-500/10',
    badgeBg: 'bg-sky-500/20 text-sky-300',
    borderColor: 'border-sky-500/30',
    usageType: 'tortoise-water'
  },
  cabbage: {
    id: 'cabbage',
    name: '高麗菜',
    emoji: '🥬',
    category: 'pet',
    description: '良田收成的新鮮脆甜蔬菜，可用於餵食小綠龜提升飽食度與幸福感。',
    usageGuide: '於小綠龜培育介面中餵食。',
    color: 'text-green-300',
    bgColor: 'bg-green-500/10',
    badgeBg: 'bg-green-500/20 text-green-300',
    borderColor: 'border-green-500/30',
    usageType: 'tortoise-feed'
  },
  lotteryTickets: {
    id: 'lotteryTickets',
    name: '福引券',
    emoji: '🎟️',
    category: 'special',
    description: '豐收福引所專用抽獎券，可用於搖珠抽取特等至三等各類豐厚獎勵！',
    usageGuide: '於豐收福引所中消耗 1 張進行日式六角木箱搖珠。',
    color: 'text-amber-300',
    bgColor: 'bg-amber-500/10',
    badgeBg: 'bg-amber-500/20 text-amber-300',
    borderColor: 'border-amber-500/30',
    usageType: 'lottery'
  }
};
