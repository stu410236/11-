import { ShopItem } from '../types';

export const SHOP_CATEGORIES = [
  { id: 'all', label: '全部商品', icon: '🏪' },
  { id: 'learning', label: '學習助益', icon: '💡' },
  { id: 'farming', label: '農場物資', icon: '🌾' },
  { id: 'pet', label: '小綠龜', icon: '🐢' },
  { id: 'battle', label: '防蟲戰備', icon: '🛡️' }
] as const;

/**
 * 🪙 農場補給店 (COIN SHOP) 商品清單
 * 集中管理商品售價、數量與說明，方便平衡數值調整
 */
export const COIN_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'coin_hint_1',
    itemId: 'hintTickets',
    name: '提示券',
    description: '答題卡關時查看精準 C++ 語法提示，且不中斷完美連勝。',
    icon: '💡',
    currency: 'coins',
    price: 150,
    amount: 1,
    category: 'learning',
    sortOrder: 1,
    itemType: 'consumable',
    usageDetail: '答題時消耗 1 張查看提示，保持零提示完美成就紀錄。'
  },
  {
    id: 'coin_treat_1',
    itemId: 'tortoiseTreats',
    name: '烏龜點心',
    description: '小綠龜最愛的手作點心，餵食增加 50 點 XP 與 15 點幸福度。',
    icon: '🐢',
    currency: 'coins',
    price: 200,
    amount: 1,
    category: 'pet',
    sortOrder: 2,
    itemType: 'consumable',
    usageDetail: '於小綠龜培育面板或背包中餵食，快速提升等級。'
  },
  {
    id: 'coin_cabbage_2',
    itemId: 'cabbages',
    name: '高麗菜 ×2',
    description: '新鮮脆甜的有機高麗菜，餵食可恢復小綠龜 25 點飽食度。',
    icon: '🥬',
    currency: 'coins',
    price: 100,
    amount: 2,
    category: 'farming',
    sortOrder: 3,
    itemType: 'consumable',
    usageDetail: '獲得 2 份高麗菜，為小綠龜補充體力。'
  },
  {
    id: 'coin_water_1',
    itemId: 'waterBuckets',
    name: '聖泉水',
    description: '清冽純淨的良田聖水，滋潤小綠龜可補充 25 點水分值。',
    icon: '💧',
    currency: 'coins',
    price: 120,
    amount: 1,
    category: 'farming',
    sortOrder: 4,
    itemType: 'consumable',
    usageDetail: '獲得 1 桶聖泉水，滋養小綠龜保持健康。'
  },
  {
    id: 'coin_pesticide_1',
    itemId: 'pesticides',
    name: '除蟲劑',
    description: '每週害蟲防衛答錯時提供一次重新挑戰機會，保護作物。',
    icon: '🧪',
    currency: 'coins',
    price: 450,
    amount: 1,
    category: 'battle',
    sortOrder: 5,
    itemType: 'consumable',
    usageDetail: '每週防衛戰失誤時自動提示使用，防止作物枯萎。'
  }
];

/**
 * 💎 珍稀商店 (DIAMOND SHOP) 商品清單
 */
export const DIAMOND_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'dia_pestnet_1',
    itemId: 'pestNets',
    name: '防蟲網',
    description: '裝備於健康農田，每週害蟲攻擊答錯時自動吸收傷害。',
    icon: '🛡️',
    currency: 'diamonds',
    price: 25,
    amount: 1,
    category: 'battle',
    sortOrder: 1,
    itemType: 'consumable',
    usageDetail: '可於良田卡片或背包裝備，抵禦一次害蟲攻擊失誤。'
  },
  {
    id: 'dia_fertilizer_1',
    itemId: 'recoveryFertilizers',
    name: '復甦肥料',
    description: '作物枯萎時使用，將復育複習題數由 5 題減少為 3 題。',
    icon: '🌱',
    currency: 'diamonds',
    price: 20,
    amount: 1,
    category: 'farming',
    sortOrder: 2,
    itemType: 'consumable',
    usageDetail: '作物枯萎後開啟復育面板使用，大幅縮短復育時間。'
  },
  {
    id: 'dia_pesticide_1',
    itemId: 'pesticides',
    name: '除蟲劑',
    description: 'Weekly Pest 防衛戰答錯時提供一次額外重新防衛機會。',
    icon: '🧪',
    currency: 'diamonds',
    price: 15,
    amount: 1,
    category: 'battle',
    sortOrder: 3,
    itemType: 'consumable',
    usageDetail: '應急除蟲良藥，守護良田作物安全。'
  },
  {
    id: 'dia_hint_3',
    itemId: 'hintTickets',
    name: '提示券 ×3',
    description: '3 張提示券組合包，答題卡關時可查看精準提示。',
    icon: '💡',
    currency: 'diamonds',
    price: 12,
    amount: 3,
    category: 'learning',
    sortOrder: 4,
    itemType: 'consumable',
    usageDetail: '一次性獲得 3 張提示券，學習解題最實用好幫手。'
  },
  {
    id: 'dia_treat_3',
    itemId: 'tortoiseTreats',
    name: '烏龜點心 ×3',
    description: '3 份精裝手作點心，快速提升小綠龜等級與親密度。',
    icon: '🐢',
    currency: 'diamonds',
    price: 15,
    amount: 3,
    category: 'pet',
    sortOrder: 5,
    itemType: 'consumable',
    usageDetail: '一次性獲得 3 份烏龜點心（每份 XP +50）。'
  }
];

export const ALL_SHOP_ITEMS: ShopItem[] = [...COIN_SHOP_ITEMS, ...DIAMOND_SHOP_ITEMS];

export function getShopItemById(id: string): ShopItem | undefined {
  return ALL_SHOP_ITEMS.find(item => item.id === id);
}
