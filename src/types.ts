export interface CPlusPlusCard {
  id: string;
  fieldId: number; // 1 to 9 representing which field it belongs to
  title: string;
  chineseDescription: string;
  codeTemplate: string;
  expectedAnswer: string;
  hint: string;
  explanation: string;
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
}
