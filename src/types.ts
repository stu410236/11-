export type QuestionType = 'fill_blank' | 'debug' | 'application' | 'predict_output' | 'complete_code' | 'code_reading';

export interface CPlusPlusCard {
  id: string;
  fieldId: number; // 1 to 150 representing which field it belongs to
  type?: QuestionType; // Question category
  title: string;
  chineseDescription: string;
  codeTemplate: string;
  expectedAnswer: string;
  acceptedAnswers?: string[]; // Multiple valid equivalent answers
  hint: string;
  explanation: string;
  difficulty?: number; // 1 to 5
  // Specific to debug questions:
  buggyCode?: string;
  originalBug?: string;
  fixedLine?: string;
  // Specific to application questions:
  scenario?: string;
  // Specific to code_reading (multiple choice):
  options?: string[];
  correctOption?: number; // 0, 1, 2, 3
}

export type CropRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface FieldPlot {
  id: number;
  name: string;
  description: string;
  cropName: string;
  isIrrigated: boolean;
  bestStreak: number; // Max correct answers in a row
  lastAttemptDate: string | null;
  cropId?: string | null;
  cropDrawPending?: boolean;
  cropDrawnAt?: string | null;
  // 每週害蟲入侵與農田防禦狀態欄位 (向後相容)
  cropStatus?: 'healthy' | 'withered';
  witheredAt?: string | null;
  witheredByPestWeek?: string | null;
  pestNetEquipped?: boolean;
}

export interface TortoisePet {
  name: string;
  level: number;
  xp: number;
  fullness: number; // 0-100
  hydration: number; // 0-100
  happiness: number; // 0-100
  appearance: 'baby' | 'explorer' | 'wizard' | 'cyborg';
  ownedAccessories?: string[];
  equippedAccessories?: Record<string, string>;
}

export interface DailyChallengeState {
  lastCompletedDate?: string; // "YYYY-MM-DD"
  streak: number;
  bestStreak: number;
  totalCompleted: number;
  lastQuestionId?: string;
}

export type AchievementRarity = 'epic' | 'legendary' | 'mythic';

export interface SecretAchievementRecord {
  id: string;
  unlockedAt: string; // "YYYY/MM/DD HH:mm" or "YYYY/MM/DD"
  rarity: AchievementRarity;
  badgeId: string;
}

export interface AchievementStats {
  lifetimeCorrectAnswers: number;
  lifetimeCoinsEarned: number;
  lifetimeCabbagesEarned: number;
  lifetimeWaterEarned: number;
  consecutiveCorrectAnswers: number;
  highestCorrectStreak: number;
  noHintCorrectStreak: number;
  noHintPerfectFieldsStreak: number;
  uniqueActiveDays: string[];
  fieldFailureCounts: Record<number, number>; // fieldId -> failCount
  lifetimeDailyQuestsClaimed?: number;
  turtleTrainCount?: number;
}

export interface GameState {
  score: number;
  coins: number;
  cabbages: number;
  waterBuckets: number;
  completedAttempts: Record<number, boolean>; // fieldId -> isFullyIrrigated (10/10 correct)
  fieldProgress: Record<number, { correctCount: number; answeredIds: string[] }>;
  currentStreak: number;
  maxStreak: number;
  dailyQuestsDate?: string;
  dailyQuestsProgress?: Record<string, { currentValue: number; isClaimed: boolean }>;
  dailyChallenge?: DailyChallengeState;
  
  // 成就系統
  unlockedAchievements?: Record<string, SecretAchievementRecord>;
  achievementStats?: AchievementStats;

  // 每週害蟲入侵系統
  weeklyPest?: import('./data/pests').WeeklyPestEvent;
  pestHistory?: import('./data/pests').PestHistoryRecord[];
  totalPestsRepelled?: number;
  totalCropsRecovered?: number;
  pestDefenseWinStreak?: number;

  // 🌾 豐收福引所 (HARVEST FUKUBIKI) 系統
  lotteryTickets?: number;
  diamonds?: number;
  hintTickets?: number;
  pesticides?: number;
  pestNets?: number;
  recoveryFertilizers?: number;
  tortoiseTreats?: number;
  plantMilestoneTicketsGranted?: number;
  dailyPerfectTicketGrantedDate?: string;
  lotteryStats?: LotteryStats;
  lotteryHistory?: LotteryHistoryRecord[];
  lotterySystemStartedAt?: string;

  // 🏪 農場商店 (FARM SHOP) 系統
  shopHistory?: ShopHistoryRecord[];
  shopStats?: ShopStats;
}

export type ShopCurrency = 'coins' | 'diamonds';
export type ShopCategory = 'all' | 'learning' | 'farming' | 'pet' | 'battle';

export interface ShopItem {
  id: string;
  itemId: 'hintTickets' | 'tortoiseTreats' | 'cabbages' | 'waterBuckets' | 'pesticides' | 'pestNets' | 'recoveryFertilizers';
  name: string;
  description: string;
  icon: string;
  currency: ShopCurrency;
  price: number;
  amount: number;
  category: 'learning' | 'farming' | 'pet' | 'battle';
  sortOrder: number;
  itemType?: 'consumable' | 'cosmetic';
  usageDetail?: string;
}

export interface ShopHistoryRecord {
  id: string;
  shopItemId: string;
  itemId: string;
  name: string;
  amount: number;
  currency: ShopCurrency;
  price: number;
  purchasedAt: string;
}

export interface ShopStats {
  totalPurchases: number;
  totalCoinsSpent: number;
  totalDiamondsSpent: number;
}

export type LotteryTierId = 'special' | 'first' | 'second' | 'third';

export type LotteryItemType = 
  | 'coins' 
  | 'diamonds' 
  | 'hintTickets' 
  | 'pesticides' 
  | 'pestNets' 
  | 'recoveryFertilizers' 
  | 'tortoiseTreats' 
  | 'water' 
  | 'cabbage';

export interface LotteryRewardItem {
  type: LotteryItemType;
  amount: number;
}

export interface LotteryTier {
  id: LotteryTierId;
  name: string;
  probability: number;
  emoji: string;
  color: string;
  gradient: string;
  badgeBg: string;
  ballColor: string;
  description: string;
}

export interface LotteryPrizeBundle {
  id: string;
  tier: LotteryTierId;
  title: string;
  items: LotteryRewardItem[];
  weight?: number;
}

export interface LotteryHistoryRecord {
  id: string;
  tier: LotteryTierId;
  prizeId: string;
  prizeTitle: string;
  itemsSummary: string;
  drawnAt: string;
}

export interface LotteryStats {
  totalDraws: number;
  specialWins: number;
  firstWins: number;
  secondWins: number;
  thirdWins: number;
}

export type { WeeklyPestEvent, PestInfo, PestHistoryRecord } from './data/pests';

