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

export interface FieldPlot {
  id: number;
  name: string;
  description: string;
  cropName: string;
  isIrrigated: boolean;
  bestStreak: number; // Max correct answers in a row
  lastAttemptDate: string | null;
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
}
