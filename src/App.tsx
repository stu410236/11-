import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// Web App's Firebase configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyD0KdokY4Gwbbz_ZX5lFWVaHGw9SrWzg58",
  authDomain: "alvin-16896.firebaseapp.com",
  projectId: "alvin-16896",
  storageBucket: "alvin-16896.firebasestorage.app",
  messagingSenderId: "998265430087",
  appId: "1:998265430087:web:c6e57b95149c6a78a19162",
  measurementId: "G-SWC44KKJT0"
};

// Initialize Firebase client-side instance safely
let appInstance: any = null;
let auth: any = null;
let db: any = null;
try {
  appInstance = initializeApp(firebaseConfig);
  auth = getAuth(appInstance);
  db = getFirestore(appInstance);
} catch (e) {
  console.error("Firebase client initialization failed:", e);
}

const RANDOM_FARMER_NICKNAMES = [
  '指標巡邏官', '記憶體守護者', '範本魔法師', '智慧指標宗師',
  '析構狂戰士', '遞迴探索家', '多型架構師', '編譯器征服者',
  'Lambda領航員', '極速重載專家', '動態配置學者', '虛擬函式獵人',
  '命名空間開拓者', '重載神槍手', '農村C++達人', '演算法農夫',
  '現代C++大師', '陣列開拓者', '引用守護神', '結構體匠人'
];

const generateRandomNickname = () => {
  const prefix = RANDOM_FARMER_NICKNAMES[Math.floor(Math.random() * RANDOM_FARMER_NICKNAMES.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${prefix}#${num}`;
};
import { 
  Sparkles, 
  Droplet, 
  Coins, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Edit2, 
  ArrowLeft,
  BookOpen,
  Info,
  Heart,
  Home,
  Database,
  User,
  BarChart2,
  Settings,
  Flame,
  Search,
  Check,
  Filter,
  LayoutGrid,
  ShoppingBag,
  Tag,
  Shield,
  Timer
} from 'lucide-react';
import { CPP_CARDS_DATA, FIELD_PLOTS_DATA, CHAPTERS_DATA, getChapterForField } from './data/cppCards';
import { CPlusPlusCard, FieldPlot, TortoisePet, GameState, DailyChallengeState, SecretAchievementRecord } from './types';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { QuestionCardRenderer, getQuestionTypeMeta } from './components/QuestionCardRenderer';
import { verifyQuestionAnswer } from './utils/answerVerification';
import { 
  getTaiwanDateKey, 
  getDailyChallengeQuestion, 
  calculateDailyChallengeStreak, 
  DAILY_CHALLENGE_REWARD 
} from './utils/dailyChallenge';
import {
  SECRET_ACHIEVEMENTS,
  SecretAchievementDefinition,
  getTaiwanHour,
  getTaiwanFormattedNow,
  createDefaultAchievementStats,
  RARITY_CONFIG
} from './data/secretAchievements';
import {
  SecretAchievementUnlockModal,
  SecretAchievementDetailModal
} from './components/SecretAchievementModal';

// Web Audio API 音效合成器
function playSynthSound(type: 'correct' | 'wrong' | 'click' | 'irrigate' | 'feed' | 'water' | 'pet' | 'levelUp', isMuted: boolean) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.08);
    } else if (type === 'correct') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(783.99, now + 0.16); // G5
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.25);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.3);
    } else if (type === 'irrigate') {
      // 灌溉成功的瀑布流水聲與音樂
      [349.23, 440.00, 523.25, 698.46].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.05, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.4);
      });
    } else if (type === 'feed') {
      // 咀嚼聲
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.setValueAtTime(180, now + 0.06);
      osc.frequency.setValueAtTime(100, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.2);
    } else if (type === 'water') {
      // 咕嚕咕嚕喝水聲
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.25);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.3);
    } else if (type === 'pet') {
      // 溫暖的喜悅音
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.2);
    } else if (type === 'levelUp') {
      // 升級升華琶音
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.3);
      });
    }
  } catch (e) {
    // 瀏覽器不支援 Web Audio 則忽略
  }
}

const QUEST_TEMPLATES = [
  {
    id: 'daily_login',
    title: '☀️ 每日登入良田',
    description: '每日登入遊戲巡視你的 C++ 良田。',
    icon: '🌾',
    targetValue: 1,
    rewardCoins: 20,
    rewardCabbages: 0,
    rewardWaterBuckets: 0,
  },
  {
    id: 'answer_questions',
    title: '✍️ 答對 10 題 C++',
    description: '在語法良田中正確答對 10 個程式語法填空。',
    icon: '📝',
    targetValue: 10,
    rewardCoins: 50,
    rewardCabbages: 2,
    rewardWaterBuckets: 1,
  },
  {
    id: 'feed_tortoise',
    title: '🥬 餵食小烏龜 3 次',
    description: '使用收成的高麗菜餵食你的編譯小烏龜，保持精神飽滿。',
    icon: '🐢',
    targetValue: 3,
    rewardCoins: 30,
    rewardCabbages: 0,
    rewardWaterBuckets: 1,
  }
];

const TORTOISE_WISDOM_QUOTES = [
  "「記得在每行程式結尾加上分號 `;`，不然我的龜殼會被編譯器壓碎喔！」",
  "「你知道嗎？`std::endl` 比起 `\\n` 還多做了一個 `flush()` 動作，想要快點長大請用 `\\n`！」",
  "「傳址(Call by Reference)就像我的分身，修改分身，本體也會跟著變強大！」",
  "「指標就跟藏寶圖一樣，`*ptr` 就是順著藏寶圖挖出真正的寶藏(`Dereference`)！」",
  "「堆積(Heap)記憶體很大，但是用 `new` 挖出來的坑，一定要自己用 `delete` 填回去喔。」",
  "「`std::vector` 會在背後悄悄把空間加倍。多麼聰明的動態陣列啊！」",
  "「使用智慧指標 `std::unique_ptr`，它就會像貼心保鏢一樣，時間到了自動幫你 delete 資源！」",
  "「物件導向的繼承就像我傳承給子孫的龜殼，public 是公有的，private 是我的秘密。」",
  "「寫程式跟種田一樣，需要一步一腳印。急躁的 code 只會引發 Undefined Behavior！」",
  "「`std::map` 底層是用神奇的紅黑樹(Red-Black Tree)架構的，每一次搜尋都很快！」"
];

// Crop emoji helper
const getCropEmoji = (id: number) => {
  const CROP_EMOJIS = ['🫛', '🥬', '🌽', '🥕', '🍉', '🍓', '🍄', '🌵', '🌾', '🍅', '🍆', '🎃', '🧅', '🥦', '🌻', '🍎', '🍋', '🍇'];
  return CROP_EMOJIS[(id - 1) % CROP_EMOJIS.length];
};

// 播放作物成長音效
function playCropGrowthSound(stage: 1 | 2 | 3, isMuted: boolean) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (stage === 1) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (stage === 2) {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.08, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.25);
      });
    } else if (stage === 3) {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.1, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    }
  } catch (e) {}
}

interface CropGrowingAnimationProps {
  plot: { id: number; name: string; cropName: string; emoji: string };
  onClose: () => void;
  isMuted: boolean;
}

const CropGrowingAnimation: React.FC<CropGrowingAnimationProps> = ({ plot, onClose, isMuted }) => {
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    playCropGrowthSound(1, isMuted);

    const t1 = setTimeout(() => {
      setStage(2);
      playCropGrowthSound(2, isMuted);
    }, 2200);

    const t2 = setTimeout(() => {
      setStage(3);
      playCropGrowthSound(3, isMuted);
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isMuted]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center justify-center gap-6 mb-8 relative z-10">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
              stage >= 1 ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>1</div>
            <span className={`text-[10px] font-bold ${stage >= 1 ? 'text-emerald-400' : 'text-slate-500'}`}>播種</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-800 relative">
            <div className={`absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-1000 ${stage >= 2 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
              stage >= 2 ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>2</div>
            <span className={`text-[10px] font-bold ${stage >= 2 ? 'text-emerald-400' : 'text-slate-500'}`}>萌芽</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-800 relative">
            <div className={`absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-1000 ${stage >= 3 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
              stage >= 3 ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>3</div>
            <span className={`text-[10px] font-bold ${stage >= 3 ? 'text-emerald-400' : 'text-slate-500'}`}>成熟</span>
          </div>
        </div>

        <div className="h-56 flex flex-col items-center justify-center relative mb-6">
          <AnimatePresence mode="wait">
            {stage === 1 && (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative">
                  <motion.span 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-5xl block"
                  >
                    🚜
                  </motion.span>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-2 -right-2 bg-amber-800 text-white rounded-full p-1 text-xs border border-amber-600"
                  >
                    🟫
                  </motion.div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-emerald-400">正在開墾良田、播下語法種子...</p>
                  <p className="text-xs text-slate-400 font-mono">Compiling {plot.name} soil matrix...</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.span 
                      key={i} 
                      animate={{ y: [0, 20], opacity: [0, 1, 0] }} 
                      transition={{ delay: i * 0.15, repeat: Infinity, duration: 0.8 }}
                      className="text-blue-400 text-xs"
                    >
                      💧
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="stage2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl filter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  >
                    🌱
                  </motion.div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -40], 
                          x: [0, (i % 2 === 0 ? 30 : -30)], 
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                        className="absolute w-2 h-2 rounded-full bg-emerald-400"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-emerald-300">破土而出！C++ 嫩芽汲取智慧之泉！</p>
                  <p className="text-xs text-slate-400 font-mono">Syntax optimization 100% complete.</p>
                </div>
              </motion.div>
            )}

            {stage === 3 && (
              <motion.div
                key="stage3"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative">
                  <div className="text-8xl filter drop-shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse">
                    {plot.emoji}
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    {['🪙', '✨', '⭐', '🥬'].map((item, idx) => (
                      <motion.div
                        key={idx}
                        animate={{ 
                          y: [0, -60, -30], 
                          x: [0, (idx === 0 ? -50 : idx === 1 ? 50 : idx === 2 ? -30 : 30)], 
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.5, 0.8]
                        }}
                        transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                        className="absolute text-xl"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-black text-amber-400">大豐收！極品 【{plot.cropName}】 熟成了！</p>
                  <p className="text-xs text-emerald-300 font-bold">完美答對 10 題！恭喜灌溉成功！</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-10 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
            {stage === 1 && `正在將編譯器最佳化能量注入土壤中...`}
            {stage === 2 && `強大的 ${plot.cropName} 嫩芽汲取了聖泉，並將編譯語法融合到了纖維細胞中！`}
            {stage === 3 && `成功獲取豐厚獎勵：+50金幣、+3高麗菜、+3聖泉水，神龜守護者也同步獲得 40 經驗值！`}
          </p>

          {stage === 3 ? (
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black py-3 rounded-2xl hover:from-emerald-400 hover:to-teal-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              收下極品作物 & 獎勵 🎁
            </button>
          ) : (
            <div className="w-full bg-slate-900 border border-slate-800 text-slate-500 py-3 rounded-2xl text-xs font-mono">
              成長進行中... {stage === 1 ? '30%' : '75%'}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export interface AccessoryItem {
  id: string;
  name: string;
  emoji: string;
  slot: 'head' | 'face' | 'neck' | 'shell';
  price: number;
  description: string;
}

export const ACCESSORY_SHOP_ITEMS: AccessoryItem[] = [
  { id: 'top_hat', name: '英倫紳士高帽', emoji: '🎩', slot: 'head', price: 30, description: '讓小綠龜充滿英倫紳士風度，極具智慧。' },
  { id: 'party_hat', name: '狂歡派對帽', emoji: '🥳', slot: 'head', price: 15, description: '慶祝學會 C++ 的狂歡多彩派對帽！' },
  { id: 'crown', name: '奢華黃金皇冠', emoji: '👑', slot: 'head', price: 120, description: '精通指標、範本與記憶體管理的王者象徵。' },
  { id: 'straw_hat', name: '陽光休閒草帽', emoji: '👒', slot: 'head', price: 25, description: '最適合夏日微風農場的清涼編織草帽。' },
  { id: 'sunglasses', name: '極客酷炫墨鏡', emoji: '🕶️', slot: 'face', price: 40, description: '阻擋伺服器機櫃霓虹強光，炫酷加倍。' },
  { id: 'glasses', name: '復古圓框眼鏡', emoji: '👓', slot: 'face', price: 20, description: '戴上後，看 C++ 編譯報錯訊息更清晰。' },
  { id: 'bow_tie', name: '優雅紅色領結', emoji: '🎀', slot: 'neck', price: 35, description: '精緻的高級紅色領結，透露不凡氣質。' },
  { id: 'scarf', name: '冬日保暖圍巾', emoji: '🧣', slot: 'neck', price: 50, description: '給溫室小綠龜最溫暖的編織羊毛圍巾。' },
  { id: 'golden_shell', name: '黃金奢華裝甲', emoji: '✨', slot: 'shell', price: 200, description: '純金與星光打造的炫彩外殼，尊貴無比。' },
  { id: 'cyber_shield', name: '矩陣科技護盾', emoji: '🛡️', slot: 'shell', price: 150, description: '流溢著霓虹青光的能量網，十足極客範。' },
  { id: 'flower_garden', name: '生態繁花花園', emoji: '🌸', slot: 'shell', price: 80, description: '由粉嫩櫻花與金色向日葵裝點的移動花園。' },
];

export default function App() {
  // === 0. Tab 選擇狀態 ===
  // 支援的地圖 tab 分類：'farm' | 'cards' | 'pet' | 'stats' | 'achievements' | 'settings'
  const [currentTab, setCurrentTab] = useState<'farm' | 'cards' | 'pet' | 'stats' | 'achievements' | 'settings'>('farm');

  // === 0.5. 預設初始狀態產生器與帳號 Key 輔助函式 ===
  const createDefaultGameState = (): GameState => ({
    score: 0,
    coins: 10,
    cabbages: 0,
    waterBuckets: 0,
    completedAttempts: {},
    fieldProgress: {},
    currentStreak: 0,
    maxStreak: 0,
    dailyQuestsDate: new Date().toDateString(),
    dailyQuestsProgress: {
      daily_login: { currentValue: 1, isClaimed: false },
      answer_questions: { currentValue: 0, isClaimed: false },
      feed_tortoise: { currentValue: 0, isClaimed: false }
    },
    dailyChallenge: {
      lastCompletedDate: undefined,
      streak: 0,
      bestStreak: 0,
      totalCompleted: 0,
      lastQuestionId: undefined
    },
    unlockedAchievements: {},
    achievementStats: createDefaultAchievementStats()
  });

  const createDefaultFields = (): FieldPlot[] => FIELD_PLOTS_DATA.map(f => ({
    ...f,
    isIrrigated: false,
    bestStreak: 0,
    lastAttemptDate: null
  }));

  const createDefaultTortoise = (): TortoisePet => ({
    name: '小綠龜',
    level: 1,
    xp: 0,
    fullness: 50,
    hydration: 50,
    happiness: 50,
    appearance: 'baby',
    ownedAccessories: [],
    equippedAccessories: {},
  });

  const getStorageUserKey = (u: { username?: string; userKey?: string } | null) => {
    if (!u) return 'guest';
    if (u.userKey) return u.userKey.trim().toLowerCase();
    if (u.username) return u.username.trim().toLowerCase();
    return 'guest';
  };

  // === 4. 帳號狀態（優先載入） ===
  const [currentUser, setCurrentUser] = useState<{ username: string; password?: string; userKey?: string; authType?: 'google' | 'anonymous' | 'password' } | null>(() => {
    const local = localStorage.getItem('cpp_farm_currentUser');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
    return null;
  });

  // === 1. 核心遊戲與資源狀態（依據目前帳號區隔） ===
  const [gameState, setGameState] = useState<GameState>(() => {
    const localUserStr = localStorage.getItem('cpp_farm_currentUser');
    let uKey = 'guest';
    if (localUserStr) {
      try {
        const u = JSON.parse(localUserStr);
        uKey = getStorageUserKey(u);
      } catch (e) {}
    }
    const local = localStorage.getItem(`cpp_farm_gameState_${uKey}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return {
          ...createDefaultGameState(),
          ...parsed
        };
      } catch (e) {}
    }
    return createDefaultGameState();
  });

  // === 2. 田地列表狀態 ===
  const [fields, setFields] = useState<FieldPlot[]>(() => {
    const localUserStr = localStorage.getItem('cpp_farm_currentUser');
    let uKey = 'guest';
    if (localUserStr) {
      try {
        const u = JSON.parse(localUserStr);
        uKey = getStorageUserKey(u);
      } catch (e) {}
    }
    const local = localStorage.getItem(`cpp_farm_fields_${uKey}`);
    if (local) {
      try {
        const parsed = JSON.parse(local) as FieldPlot[];
        return FIELD_PLOTS_DATA.map((fresh) => {
          const saved = parsed.find(p => p.id === fresh.id);
          return {
            ...fresh,
            isIrrigated: saved ? saved.isIrrigated : false,
            bestStreak: saved ? saved.bestStreak : 0,
            lastAttemptDate: saved ? saved.lastAttemptDate : null
          };
        });
      } catch (e) {}
    }
    return createDefaultFields();
  });

  // === 3. 烏龜寵物狀態 ===
  const [tortoise, setTortoise] = useState<TortoisePet>(() => {
    const localUserStr = localStorage.getItem('cpp_farm_currentUser');
    let uKey = 'guest';
    if (localUserStr) {
      try {
        const u = JSON.parse(localUserStr);
        uKey = getStorageUserKey(u);
      } catch (e) {}
    }
    const local = localStorage.getItem(`cpp_farm_tortoise_${uKey}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return {
          ...createDefaultTortoise(),
          ...parsed,
          ownedAccessories: parsed.ownedAccessories || [],
          equippedAccessories: parsed.equippedAccessories || {},
        };
      } catch (e) {}
    }
    return createDefaultTortoise();
  });

  // === 4. UI 輔助狀態 ===
  const [activeQuestions, setActiveQuestions] = useState<CPlusPlusCard[]>([]); // 挑戰中的 10 題隨機綜合題目
  const [activeFieldId, setActiveFieldId] = useState<number | null>(null); // 當前正在挑戰的田地 ID
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // 挑戰中第幾題 (0-9)
  const [typedAnswer, setTypedAnswer] = useState<string>(''); // 使用者輸入的填充答案
  const [isAnswered, setIsAnswered] = useState<boolean>(false); // 當前題目是否已解答
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false); // 當前回答是否正確
  const [showHint, setShowHint] = useState<boolean>(false); // 是否顯示提示
  const [currentFieldCorrectAnswers, setCurrentFieldCorrectAnswers] = useState<number>(0); // 當前田地答對幾題
  const [isMuted, setIsMuted] = useState<boolean>(false); // 是否靜音
  const [isEditingName, setIsEditingName] = useState<boolean>(false); // 是否編輯烏龜名字
  const [tempName, setTempName] = useState<string>(tortoise.name);
  const [tortoiseSpeech, setTortoiseSpeech] = useState<string>('「哈囉！我是你的 C++ 助手小綠龜！多灌溉田地，收成好料餵我吧！」');
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false); // 灌溉成功慶祝動畫
  const [growingPlot, setGrowingPlot] = useState<{ id: number; name: string; cropName: string; emoji: string } | null>(null); // 作物成長動態
  const [petActionEffect, setPetActionEffect] = useState<string | null>(null); // 餵食/給水/摸摸的特效文字
  const [petSubTab, setPetSubTab] = useState<'nurture' | 'shop' | 'wardrobe'>('nurture');

  // 字庫（Tab 2）搜尋與過濾狀態
  const [selectedFieldFilter, setSelectedFieldFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 地圖（Tab 1）章節階段與佈局篩選狀態
  const [mapDifficultyFilter, setMapDifficultyFilter] = useState<string>('all');
  const [mapViewMode, setMapViewMode] = useState<'matrix' | 'grid'>('matrix');
  const [mapSearchQuery, setMapSearchQuery] = useState<string>('');

  // === 4. 帳號與同步狀態 ===
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMethodTab, setAuthMethodTab] = useState<'quick' | 'account'>('quick');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authUsername, setAuthUsername] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [customNickname, setCustomNickname] = useState<string>(() => generateRandomNickname());
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [socialLoadingProvider, setSocialLoadingProvider] = useState<'google' | 'anonymous' | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // 獨立暱稱修改狀態
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState<boolean>(false);
  const [newNicknameInput, setNewNicknameInput] = useState<string>('');
  const [isUpdatingNickname, setIsUpdatingNickname] = useState<boolean>(false);

  // === 4.5. 每日任務與每日限定挑戰狀態 ===
  const [isDailyQuestOpen, setIsDailyQuestOpen] = useState<boolean>(false);
  const [claimFeedback, setClaimFeedback] = useState<string | null>(null);

  // 每日限定挑戰專屬狀態 (全 150 關獨立，確定性每日 1 題)
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState<boolean>(false);
  const [hasAutoOpenedDailyChallenge, setHasAutoOpenedDailyChallenge] = useState<boolean>(false);

  // 依據台灣時間 (Asia/Taipei UTC+8) 計算今日 dateKey 與今日題目
  const todayDateKey = getTaiwanDateKey();
  const dailyChallengeQuestion = React.useMemo(() => {
    return getDailyChallengeQuestion(todayDateKey, CPP_CARDS_DATA);
  }, [todayDateKey]);
  const isDailyChallengeCompletedToday = gameState.dailyChallenge?.lastCompletedDate === todayDateKey;

  // === 4.55. 隱藏成就專屬狀態 ===
  const [newlyUnlockedSecret, setNewlyUnlockedSecret] = useState<SecretAchievementDefinition | null>(null);
  const [viewingSecretDetail, setViewingSecretDetail] = useState<{ def: SecretAchievementDefinition; record: SecretAchievementRecord | null } | null>(null);
  const [hasUsedHintInCurrentField, setHasUsedHintInCurrentField] = useState<boolean>(false);

  // === 隱藏成就檢測與解鎖核心函式 ===
  const checkAndUnlockSecretAchievements = (params?: {
    customGameState?: GameState;
    customFields?: FieldPlot[];
    customTortoise?: TortoisePet;
    justCompletedFieldId?: number;
    justCompletedFieldSuccess?: boolean;
    justAnsweredCorrectly?: boolean;
  }) => {
    const currentGS = params?.customGameState || gameState;
    const currentFields = params?.customFields || fields;
    const currentTortoise = params?.customTortoise || tortoise;
    const unlockedMap = currentGS.unlockedAchievements || {};
    const currentHourTW = getTaiwanHour();

    const newlyUnlocked: SecretAchievementDefinition[] = [];

    SECRET_ACHIEVEMENTS.forEach(def => {
      if (unlockedMap[def.id]) return; // 已解鎖過，不重複觸發

      const passed = def.check({
        gameState: currentGS,
        fields: currentFields,
        tortoise: currentTortoise,
        todayDateKey,
        currentHourTW,
        justCompletedFieldId: params?.justCompletedFieldId,
        justCompletedFieldSuccess: params?.justCompletedFieldSuccess,
        justAnsweredCorrectly: params?.justAnsweredCorrectly,
      });

      if (passed) {
        newlyUnlocked.push(def);
      }
    });

    if (newlyUnlocked.length === 0) return;

    const formattedNow = getTaiwanFormattedNow();
    let addCoins = 0;
    let addCabbages = 0;
    let addWater = 0;
    const updatedUnlocked: Record<string, SecretAchievementRecord> = { ...unlockedMap };

    newlyUnlocked.forEach(def => {
      updatedUnlocked[def.id] = {
        id: def.id,
        unlockedAt: formattedNow,
        rarity: def.rarity,
        badgeId: def.badgeId,
      };
      addCoins += def.reward.coins;
      addCabbages += def.reward.cabbages;
      addWater += def.reward.waterBuckets;
    });

    // 安全更新 state，杜絕重複循環
    setGameState(prev => {
      const prevStats = prev.achievementStats || createDefaultAchievementStats();
      return {
        ...prev,
        coins: prev.coins + addCoins,
        cabbages: prev.cabbages + addCabbages,
        waterBuckets: prev.waterBuckets + addWater,
        unlockedAchievements: {
          ...(prev.unlockedAchievements || {}),
          ...updatedUnlocked,
        },
        achievementStats: {
          ...prevStats,
          lifetimeCoinsEarned: (prevStats.lifetimeCoinsEarned || 0) + addCoins,
          lifetimeCabbagesEarned: (prevStats.lifetimeCabbagesEarned || 0) + addCabbages,
          lifetimeWaterEarned: (prevStats.lifetimeWaterEarned || 0) + addWater,
        }
      };
    });

    playSynthSound('levelUp', isMuted);
    // 優先展示最高稀有度成就
    const sortedNew = [...newlyUnlocked].sort((a, b) => {
      const order = { mythic: 3, legendary: 2, epic: 1 };
      return order[b.rarity] - order[a.rarity];
    });
    setNewlyUnlockedSecret(sortedNew[0]);
  };

  // 自動維護台灣時間的登入遊玩天數 (Unique Active Days)
  useEffect(() => {
    setGameState(prev => {
      const prevStats = prev.achievementStats || createDefaultAchievementStats();
      const currentDays = prevStats.uniqueActiveDays || [];
      if (!currentDays.includes(todayDateKey)) {
        return {
          ...prev,
          achievementStats: {
            ...prevStats,
            uniqueActiveDays: [...currentDays, todayDateKey]
          }
        };
      }
      return prev;
    });
  }, [todayDateKey]);

  // 載入玩家帳號或重整時，平順回溯檢驗已符合的成就
  useEffect(() => {
    const timer = setTimeout(() => {
      checkAndUnlockSecretAchievements();
    }, 1200);
    return () => clearTimeout(timer);
  }, [currentUser]);

  // === 4.6. 灌溉挑戰倒數計時器狀態 ===
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // 根據關卡難度，調整倒數計時器時間 (150 個良田，難度逐漸遞增)
  const getTimerDurationForField = (fieldId: number): number => {
    if (fieldId <= 30) return 40;      // 基礎 & 運算子：40 秒 (適合初學者)
    if (fieldId <= 75) return 30;      // 迴圈 & 函式 & 陣列：30 秒 (標準時間)
    if (fieldId <= 120) return 20;     // 指標 & 物件導向：20 秒 (進階緊張感)
    return 15;                         // STL & 現代 C++：15 秒 (高難度極限挑戰)
  };

  // 新手導覽相關狀態
  const [openOnboarding, setOpenOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('cpp_farm_onboarding_completed') !== 'true';
  });
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [highlightRect, setHighlightRect] = useState<{ top: number; left: number; width: number; height: number; borderRadius: number } | null>(null);

  // 導覽步驟對應的 DOM 元素 ID 與分頁設定
  useEffect(() => {
    if (!openOnboarding) {
      setHighlightRect(null);
      return;
    }

    const stepTargets: { [key: number]: { id: string; tab: 'farm' | 'cards' | 'pet' | 'stats' | 'achievements' | 'settings' } } = {
      0: { id: '', tab: 'farm' }, // 歡迎畫面
      1: { id: 'map-difficulty-select', tab: 'farm' }, // 難度篩選
      2: { id: 'plot-card-1', tab: 'farm' }, // 第一個田地
      3: { id: '', tab: 'farm' }, // 解題輸入範例 (無特定 DOM highlight)
      4: { id: 'tab-button-pet', tab: 'pet' }, // 溫室/小綠龜 (切換到 pet 分頁)
      5: { id: 'tab-button-cards', tab: 'farm' }, // 結尾
    };

    const currentConfig = stepTargets[onboardingStep];
    if (currentConfig) {
      // 如果需要切換分頁，則切換
      if (currentTab !== currentConfig.tab) {
        setCurrentTab(currentConfig.tab);
      }

      // 如果是 step 2，確保清除搜尋與難度篩選，使 plot-card-1 能被完美渲染在 DOM 中
      if (onboardingStep === 2) {
        setMapDifficultyFilter('all');
        setMapSearchQuery('');
      }

      // 稍微延遲更新，給 DOM 切換分頁或渲染的時間
      const timer = setTimeout(() => {
        if (!currentConfig.id) {
          setHighlightRect(null);
          return;
        }

        const el = document.getElementById(currentConfig.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const isTab = currentConfig.id.startsWith('tab-');
          const isPlot = currentConfig.id.startsWith('plot-card-');
          setHighlightRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: isTab ? 9999 : (isPlot ? 16 : 12),
          });
        } else {
          setHighlightRect(null);
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [onboardingStep, openOnboarding]);

  // 動態更新 Highlight 位置（例如視窗大小改變或捲動時）
  useEffect(() => {
    if (!openOnboarding || onboardingStep === 0 || onboardingStep === 3) {
      setHighlightRect(null);
      return;
    }

    const stepTargets: { [key: number]: string } = {
      0: '',
      1: 'map-difficulty-select',
      2: 'plot-card-1',
      3: '',
      4: 'tab-button-pet',
      5: 'tab-button-cards',
    };

    const targetId = stepTargets[onboardingStep];
    if (!targetId) return;

    const handleUpdate = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const isTab = targetId.startsWith('tab-');
        const isPlot = targetId.startsWith('plot-card-');
        setHighlightRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: isTab ? 9999 : (isPlot ? 16 : 12),
        });
      }
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);
    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
    };
  }, [openOnboarding, onboardingStep]);

  // 本地儲存同步（依據當前帳號區隔）
  useEffect(() => {
    const uKey = getStorageUserKey(currentUser);
    localStorage.setItem(`cpp_farm_gameState_${uKey}`, JSON.stringify(gameState));
  }, [gameState, currentUser]);

  useEffect(() => {
    const uKey = getStorageUserKey(currentUser);
    localStorage.setItem(`cpp_farm_fields_${uKey}`, JSON.stringify(fields));
  }, [fields, currentUser]);

  useEffect(() => {
    const uKey = getStorageUserKey(currentUser);
    localStorage.setItem(`cpp_farm_tortoise_${uKey}`, JSON.stringify(tortoise));
  }, [tortoise, currentUser]);

  // 雲端資料庫備份同步與自動儲存
  useEffect(() => {
    if (!currentUser) return;
    const timer = setTimeout(async () => {
      try {
        setIsSyncing(true);
        if (!db || !currentUser.userKey) {
  throw new Error('Firestore 或使用者 UID 尚未準備完成');
}

await setDoc(
  doc(db, 'users', currentUser.userKey),
  {
    username: currentUser.username,
    gameState,
    fields,
    tortoise,
    updatedAt: serverTimestamp()
  },
  { merge: true }
);
      } catch (e) {
        console.error("Cloud sync network error:", e);
      } finally {
        setIsSyncing(false);
      }
    }, 2000); // 2 秒防抖，避免頻繁寫入

    return () => clearTimeout(timer);
  }, [gameState, fields, tortoise, currentUser]);

  // 登出
  const handleLogout = () => {
    playSynthSound('click', isMuted);
    setCurrentUser(null);
    localStorage.removeItem('cpp_farm_currentUser');
    // 登出後切換至全新預設狀態，防止進度跨帳號繼承
    setGameState(createDefaultGameState());
    setFields(createDefaultFields());
    setTortoise(createDefaultTortoise());
  };

  // Google 登入
  const handleGoogleLogin = async () => {
    playSynthSound('click', isMuted);
    setAuthError(null);
    setAuthSuccess(null);
    setSocialLoadingProvider('google');

    try {
      if (!auth) {
        throw new Error('Firebase Auth 模組尚未準備完成，請重新整理網頁後重試。');
      }

      const googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, googleProvider);
      const googleName = result.user.displayName || 'Google 使用者';
      const providerId = result.user.uid;
      const finalNickname = customNickname.trim() || googleName;

      const userRef = doc(db, 'users', providerId);
const userSnap = await getDoc(userRef);

let data: any;

if (userSnap.exists()) {
  data = {
    ...userSnap.data(),
    userKey: providerId
  };

  if (!data.username) {
    data.username = finalNickname;

    await setDoc(
      userRef,
      {
        username: finalNickname,
        authType: 'google',
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  }
} else {
  data = {
    username: finalNickname,
    userKey: providerId,
    authType: 'google',
    gameState: null,
    fields: null,
    tortoise: null
  };

  await setDoc(userRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}
      const loggedUser = {
        username: data.username,
        userKey: data.userKey,
        authType: 'google' as const
      };
      setCurrentUser(loggedUser);
      localStorage.setItem('cpp_farm_currentUser', JSON.stringify(loggedUser));

      // 載入該帳號進度
      setGameState(data.gameState ? { ...createDefaultGameState(), ...data.gameState } : createDefaultGameState());

      if (data.fields) {
        const parsed = data.fields as FieldPlot[];
        setFields(FIELD_PLOTS_DATA.map((fresh) => {
          const saved = parsed.find(p => p.id === fresh.id);
          return {
            ...fresh,
            isIrrigated: saved ? saved.isIrrigated : false,
            bestStreak: saved ? saved.bestStreak : 0,
            lastAttemptDate: saved ? saved.lastAttemptDate : null
          };
        }));
      } else {
        setFields(createDefaultFields());
      }

      setTortoise(data.tortoise ? { ...createDefaultTortoise(), ...data.tortoise } : createDefaultTortoise());

      playSynthSound('levelUp', isMuted);
      setAuthSuccess(`🎉 歡迎！Google 登入成功，農夫暱稱「${data.username}」！`);
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setAuthSuccess(null);
      }, 1000);
    } catch (e: any) {
      console.error("Google login error:", e);
      if (e.code === 'auth/popup-blocked') {
        setAuthError('彈出視窗已被瀏覽器封鎖！請在網址列右側允許彈出視窗後重試。');
      } else if (e.code === 'auth/cancelled-popup-request' || e.code === 'auth/popup-closed-by-user') {
        setAuthError('Google 登入已取消。');
      } else {
        setAuthError(`Google 登入失敗: ${e.message || e}`);
      }
    } finally {
      setSocialLoadingProvider(null);
    }
  };

  // 匿名登入 (訪客快速開始)
  const handleAnonymousLogin = async () => {
    playSynthSound('click', isMuted);
    setAuthError(null);
    setAuthSuccess(null);
    setSocialLoadingProvider('anonymous');

    try {
if (!auth || !db) {
  throw new Error('Firebase 尚未準備完成，請重新整理後再試。');
}

const anonResult = await signInAnonymously(auth);
const providerId = anonResult.user.uid;

      const finalNickname = customNickname.trim() || generateRandomNickname();

const userRef = doc(db, 'users', providerId);
const userSnap = await getDoc(userRef);

let data: any;

if (userSnap.exists()) {
  data = {
    ...userSnap.data(),
    userKey: providerId
  };

  if (!data.username) {
    data.username = finalNickname;

    await setDoc(
      userRef,
      {
        username: finalNickname,
        authType: 'anonymous',
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  }

} else {
  data = {
    username: finalNickname,
    userKey: providerId,
    authType: 'anonymous',
    gameState: null,
    fields: null,
    tortoise: null
  };

  await setDoc(
    userRef,
    {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  );
}
      const loggedUser = {
        username: data.username,
        userKey: data.userKey,
        authType: 'anonymous' as const
      };
      setCurrentUser(loggedUser);
      localStorage.setItem('cpp_farm_currentUser', JSON.stringify(loggedUser));

      // 載入進度
      setGameState(data.gameState ? { ...createDefaultGameState(), ...data.gameState } : createDefaultGameState());

      if (data.fields) {
        const parsed = data.fields as FieldPlot[];
        setFields(FIELD_PLOTS_DATA.map((fresh) => {
          const saved = parsed.find(p => p.id === fresh.id);
          return {
            ...fresh,
            isIrrigated: saved ? saved.isIrrigated : false,
            bestStreak: saved ? saved.bestStreak : 0,
            lastAttemptDate: saved ? saved.lastAttemptDate : null
          };
        }));
      } else {
        setFields(createDefaultFields());
      }

      setTortoise(data.tortoise ? { ...createDefaultTortoise(), ...data.tortoise } : createDefaultTortoise());

      playSynthSound('levelUp', isMuted);
      setAuthSuccess(`🎉 匿名模式就緒！歡迎農夫「${data.username}」！`);
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setAuthSuccess(null);
      }, 1000);
    } catch (e: any) {
      console.error("Anonymous login error:", e);
      setAuthError(`匿名登入失敗: ${e.message || e}`);
    } finally {
      setSocialLoadingProvider(null);
    }
  };

  // 修改 / 更新暱稱
  const handleUpdateNickname = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNicknameInput.trim()) return;
    const cleanNick = newNicknameInput.trim();
    setIsUpdatingNickname(true);
    playSynthSound('click', isMuted);

    try {
      const res = await fetch('/api/auth/update-nickname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser?.username,
          userKey: currentUser?.userKey,
          newNickname: cleanNick,
          password: currentUser?.password
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const updatedUser = {
          ...currentUser!,
          username: cleanNick
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('cpp_farm_currentUser', JSON.stringify(updatedUser));
        setIsNicknameModalOpen(false);
        playSynthSound('levelUp', isMuted);
        setClaimFeedback(`✨ 暱稱已成功更新為「${cleanNick}」！`);
        setTimeout(() => setClaimFeedback(null), 3000);
      } else {
        alert(data.error || '更新暱稱失敗');
      }
    } catch (err) {
      console.error("Update nickname error:", err);
      alert('更新暱稱時發生連線錯誤');
    } finally {
      setIsUpdatingNickname(false);
    }
  };

  // 帳號密碼登入 / 註冊送出
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    if (!authUsername.trim() || !authPassword) {
      setAuthError('請填寫帳號與密碼');
      setAuthLoading(false);
      return;
    }

    try {
     const username = authUsername.trim();

// Firebase Email/Password 需要 email 格式。
// 使用者畫面仍然只需要輸入「學籍帳號」。
const firebaseEmail = `${username}@cppfarm.app`;

let firebaseUser;

if (authMode === 'register') {
  const credential = await createUserWithEmailAndPassword(
    auth,
    firebaseEmail,
    authPassword
  );

  firebaseUser = credential.user;

} else {
  const credential = await signInWithEmailAndPassword(
    auth,
    firebaseEmail,
    authPassword
  );

  firebaseUser = credential.user;
}

const userRef = doc(db, 'users', firebaseUser.uid);
const userSnap = await getDoc(userRef);

let data: any;

if (authMode === 'register') {

  // 建立新的 Firestore 玩家資料
  data = {
    username,
    userKey: firebaseUser.uid,
    authType: 'password',
    gameState: null,
    fields: null,
    tortoise: null
  };

  await setDoc(
    userRef,
    {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  );

  // Firebase 註冊成功後會自動登入，
  // 這裡先登出，讓使用者重新以帳密登入
  await signOut(auth);

  setAuthSuccess('註冊成功！已為您自動切換至登入模式。');
  setAuthMode('login');
  setAuthPassword('');
  playSynthSound('levelUp', isMuted);

} else {

  // 登入後讀取 Firestore 玩家資料
  if (userSnap.exists()) {
    data = {
      ...userSnap.data(),
      userKey: firebaseUser.uid
    };
  } else {
    // Firebase 帳號存在，但 Firestore 尚未有資料時自動補建
    data = {
      username,
      userKey: firebaseUser.uid,
      authType: 'password',
      gameState: null,
      fields: null,
      tortoise: null
    };

    await setDoc(
      userRef,
      {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    );
  }

  const loggedUser = {
    username: data.username || username,
    userKey: firebaseUser.uid,
    authType: 'password' as const
  };

  setCurrentUser(loggedUser);

  localStorage.setItem(
    'cpp_farm_currentUser',
    JSON.stringify(loggedUser)
  );

  // 載入遊戲進度
  setGameState(
    data.gameState
      ? { ...createDefaultGameState(), ...data.gameState }
      : createDefaultGameState()
  );

  if (data.fields) {
    const parsed = data.fields as FieldPlot[];

    setFields(
      FIELD_PLOTS_DATA.map((fresh) => {
        const saved = parsed.find(p => p.id === fresh.id);

        return {
          ...fresh,
          isIrrigated: saved ? saved.isIrrigated : false,
          bestStreak: saved ? saved.bestStreak : 0,
          lastAttemptDate: saved ? saved.lastAttemptDate : null
        };
      })
    );
  } else {
    setFields(createDefaultFields());
  }

  setTortoise(
    data.tortoise
      ? { ...createDefaultTortoise(), ...data.tortoise }
      : createDefaultTortoise()
  );

  playSynthSound('levelUp', isMuted);

  setAuthSuccess(
    `🎉 登入成功，歡迎「${data.username || username}」！`
  );

  setTimeout(() => {
    setIsAuthModalOpen(false);
    setAuthSuccess(null);
  }, 1000);
}
   } catch (err: any) {
      console.error('Password auth error:', err);
      setAuthError(`登入失敗：${err.code || ''} ${err.message || err}`);
    } finally {
      setAuthLoading(false);
    }
  };

  // 隨機烏龜動態講話
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.65) {
        const randomQuote = TORTOISE_WISDOM_QUOTES[Math.floor(Math.random() * TORTOISE_WISDOM_QUOTES.length)];
        setTortoiseSpeech(randomQuote);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // === 每日任務核心邏輯 ===
  useEffect(() => {
    const todayStr = new Date().toDateString();
    setGameState(prev => {
      if (prev.dailyQuestsDate === todayStr && prev.dailyQuestsProgress) {
        return prev;
      }
      return {
        ...prev,
        dailyQuestsDate: todayStr,
        dailyQuestsProgress: {
          daily_login: { currentValue: 1, isClaimed: false },
          answer_questions: { currentValue: 0, isClaimed: false },
          feed_tortoise: { currentValue: 0, isClaimed: false }
        }
      };
    });
  }, []);

  const updateQuestProgress = (questId: 'answer_questions' | 'feed_tortoise', amount: number) => {
    setGameState(prev => {
      const todayStr = new Date().toDateString();
      const progress = prev.dailyQuestsProgress || {
        daily_login: { currentValue: 1, isClaimed: false },
        answer_questions: { currentValue: 0, isClaimed: false },
        feed_tortoise: { currentValue: 0, isClaimed: false }
      };

      const questProgress = progress[questId] || { currentValue: 0, isClaimed: false };
      const template = QUEST_TEMPLATES.find(t => t.id === questId);
      if (!template) return prev;

      if (questProgress.isClaimed) return prev;

      const newValue = Math.min(template.targetValue, questProgress.currentValue + amount);
      if (newValue === questProgress.currentValue) return prev;

      return {
        ...prev,
        dailyQuestsDate: todayStr,
        dailyQuestsProgress: {
          ...progress,
          [questId]: {
            ...questProgress,
            currentValue: newValue
          }
        }
      };
    });
  };

  const handleClaimQuestReward = (questId: string) => {
    const template = QUEST_TEMPLATES.find(t => t.id === questId);
    if (!template) return;

    let nextGS: GameState | null = null;
    setGameState(prev => {
      const progress = prev.dailyQuestsProgress;
      if (!progress) return prev;

      const questProgress = progress[questId];
      if (!questProgress) return prev;

      if (questProgress.currentValue < template.targetValue) return prev;
      if (questProgress.isClaimed) return prev;

      playSynthSound('levelUp', isMuted);
      
      const rewardsText = `獲得金幣 +${template.rewardCoins}` + 
        (template.rewardCabbages ? `、高麗菜 +${template.rewardCabbages}` : '') + 
        (template.rewardWaterBuckets ? `、聖泉水 +${template.rewardWaterBuckets}` : '');
      setClaimFeedback(`🎉 已領取「${template.title}」獎勵：${rewardsText}！`);
      setTimeout(() => setClaimFeedback(null), 4000);

      const prevStats = prev.achievementStats || createDefaultAchievementStats();
      const updated: GameState = {
        ...prev,
        coins: prev.coins + template.rewardCoins,
        cabbages: prev.cabbages + (template.rewardCabbages || 0),
        waterBuckets: prev.waterBuckets + (template.rewardWaterBuckets || 0),
        dailyQuestsProgress: {
          ...progress,
          [questId]: {
            ...questProgress,
            isClaimed: true
          }
        },
        achievementStats: {
          ...prevStats,
          lifetimeCoinsEarned: (prevStats.lifetimeCoinsEarned || 0) + template.rewardCoins,
          lifetimeCabbagesEarned: (prevStats.lifetimeCabbagesEarned || 0) + (template.rewardCabbages || 0),
          lifetimeWaterEarned: (prevStats.lifetimeWaterEarned || 0) + (template.rewardWaterBuckets || 0),
          lifetimeDailyQuestsClaimed: (prevStats.lifetimeDailyQuestsClaimed || 0) + 1,
        }
      };
      nextGS = updated;
      return updated;
    });

    if (nextGS) {
      checkAndUnlockSecretAchievements({ customGameState: nextGS });
    }
  };

  const hasUnclaimedQuests = QUEST_TEMPLATES.some(template => {
    const progress = gameState.dailyQuestsProgress?.[template.id];
    return progress && progress.currentValue >= template.targetValue && !progress.isClaimed;
  });

  // === 每日限定挑戰：每日登入 / 載入自動彈出邏輯 ===
  useEffect(() => {
    if (hasAutoOpenedDailyChallenge) return;
    if (openOnboarding) return; // 若在新手導覽階段，暫不干擾

    const isCompleted = gameState.dailyChallenge?.lastCompletedDate === todayDateKey;
    if (!isCompleted) {
      const timer = setTimeout(() => {
        setIsDailyChallengeOpen(true);
        setHasAutoOpenedDailyChallenge(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setHasAutoOpenedDailyChallenge(true);
    }
  }, [hasAutoOpenedDailyChallenge, gameState.dailyChallenge?.lastCompletedDate, todayDateKey, openOnboarding]);

  // === 每日限定挑戰完成處理函式 ===
  const handleCompleteDailyChallenge = (questionId: string) => {
    // 嚴格防範重複領取
    if (gameState.dailyChallenge?.lastCompletedDate === todayDateKey) {
      return;
    }

    const streakResult = calculateDailyChallengeStreak(
      gameState.dailyChallenge?.lastCompletedDate,
      todayDateKey,
      gameState.dailyChallenge?.streak || 0,
      gameState.dailyChallenge?.bestStreak || 0
    );

    // 1. 更新遊戲資源與挑戰存檔
    let nextGS: GameState | null = null;
    setGameState(prev => {
      const prevChallenge = prev.dailyChallenge || { streak: 0, bestStreak: 0, totalCompleted: 0 };
      const prevStats = prev.achievementStats || createDefaultAchievementStats();
      const updated: GameState = {
        ...prev,
        coins: prev.coins + DAILY_CHALLENGE_REWARD.coins,
        cabbages: prev.cabbages + DAILY_CHALLENGE_REWARD.cabbages,
        waterBuckets: prev.waterBuckets + DAILY_CHALLENGE_REWARD.waterBuckets,
        dailyChallenge: {
          lastCompletedDate: todayDateKey,
          streak: streakResult.newStreak,
          bestStreak: streakResult.newBestStreak,
          totalCompleted: (prevChallenge.totalCompleted || 0) + 1,
          lastQuestionId: questionId
        },
        achievementStats: {
          ...prevStats,
          lifetimeCoinsEarned: (prevStats.lifetimeCoinsEarned || 0) + DAILY_CHALLENGE_REWARD.coins,
          lifetimeCabbagesEarned: (prevStats.lifetimeCabbagesEarned || 0) + DAILY_CHALLENGE_REWARD.cabbages,
          lifetimeWaterEarned: (prevStats.lifetimeWaterEarned || 0) + DAILY_CHALLENGE_REWARD.waterBuckets,
        }
      };
      nextGS = updated;
      return updated;
    });

    // 2. 烏龜經驗值獎勵升級
    setTortoise(prev => {
      const newXp = prev.xp + DAILY_CHALLENGE_REWARD.tortoiseXp;
      const neededXp = prev.level * 100;
      if (newXp >= neededXp) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: newXp - neededXp,
          happiness: Math.min(100, prev.happiness + 20)
        };
      }
      return {
        ...prev,
        xp: newXp
      };
    });

    // 3. 推進「回答題目」每日任務進度
    updateQuestProgress('answer_questions', 1);

    // 4. 播放特效與提示訊息
    playSynthSound('levelUp', isMuted);
    setClaimFeedback(`🎉 今日限定挑戰完成！獲得金幣 +${DAILY_CHALLENGE_REWARD.coins}、高麗菜 +${DAILY_CHALLENGE_REWARD.cabbages}、聖泉水 +${DAILY_CHALLENGE_REWARD.waterBuckets}、烏龜經驗值 +${DAILY_CHALLENGE_REWARD.tortoiseXp}！`);
    setTimeout(() => setClaimFeedback(null), 5000);

    if (nextGS) {
      checkAndUnlockSecretAchievements({ customGameState: nextGS });
    }
  };

  // === 4.7. 灌溉挑戰倒數計時器核心邏輯 (已移除計時限制) ===
  const handleTimeOut = () => {
    // 依使用者要求，已移除計時限制
  };

  // 輔助函式：取得目前田地的 10 題題目 (保留供字庫或其他地方使用)
  const getCurrentFieldQuestions = (fieldId: number): CPlusPlusCard[] => {
    return CPP_CARDS_DATA.filter(card => card.fieldId === fieldId);
  };

  // 點擊田地，進入灌溉挑戰
  const handleSelectField = (fieldId: number) => {
    playSynthSound('click', isMuted);
    setHasUsedHintInCurrentField(false);
    
    // 實作題目由淺入深且不重複：依據題目 ID 的尾部序號 (1 到 10) 排序，使難度慢慢遞增
    const fieldQuestions = CPP_CARDS_DATA.filter(card => card.fieldId === fieldId);
    const selectedQuestions = [...fieldQuestions].sort((a, b) => {
      const indexA = parseInt(a.id.split('_')[1] || '0');
      const indexB = parseInt(b.id.split('_')[1] || '0');
      return indexA - indexB;
    });
    
    setActiveQuestions(selectedQuestions);
    setActiveFieldId(fieldId);
    setCurrentQuestionIndex(0);
    setTypedAnswer('');
    setIsAnswered(false);
    setShowHint(false);
    setCurrentFieldCorrectAnswers(0);

    // 初始化與啟動計時器
    const duration = getTimerDurationForField(fieldId);
    setTimeLeft(duration);
    setIsTimerActive(true);
  };

  // 送出填空答案
  const handleSubmitAnswer = () => {
    if (activeFieldId === null || isAnswered || activeQuestions.length === 0) return;
    
    const currentQuestion = activeQuestions[currentQuestionIndex];
    
    const isCorrect = verifyQuestionAnswer(typedAnswer, currentQuestion);
    
    setIsAnswered(true);
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      playSynthSound('correct', isMuted);
      setCurrentFieldCorrectAnswers(prev => prev + 1);
      updateQuestProgress('answer_questions', 1);

      let nextGS: GameState | null = null;
      setGameState(prev => {
        const nextStreak = (prev.currentStreak || 0) + 1;
        const nextMaxStreak = Math.max(prev.maxStreak || 0, nextStreak);
        const prevStats = prev.achievementStats || createDefaultAchievementStats();
        const nextConsecutive = (prevStats.consecutiveCorrectAnswers || 0) + 1;
        const nextHighestStreak = Math.max(prevStats.highestCorrectStreak || 0, nextConsecutive, nextMaxStreak);
        const nextNoHint = (showHint || hasUsedHintInCurrentField) ? 0 : ((prevStats.noHintCorrectStreak || 0) + 1);

        const updated: GameState = {
          ...prev,
          coins: prev.coins + 2,
          score: prev.score + 1,
          currentStreak: nextStreak,
          maxStreak: nextMaxStreak,
          achievementStats: {
            ...prevStats,
            lifetimeCorrectAnswers: (prevStats.lifetimeCorrectAnswers || 0) + 1,
            lifetimeCoinsEarned: (prevStats.lifetimeCoinsEarned || 0) + 2,
            consecutiveCorrectAnswers: nextConsecutive,
            highestCorrectStreak: nextHighestStreak,
            noHintCorrectStreak: nextNoHint,
          }
        };
        nextGS = updated;
        return updated;
      });

      if (Math.random() > 0.4) {
        setTortoiseSpeech(`「哇！太棒了！『${currentQuestion.expectedAnswer}』答對了，智慧之泉正在滋潤這片良田！」`);
      }

      if (nextGS) {
        checkAndUnlockSecretAchievements({ customGameState: nextGS, justAnsweredCorrectly: true });
      }
    } else {
      playSynthSound('wrong', isMuted);
      setGameState(prev => {
        const prevStats = prev.achievementStats || createDefaultAchievementStats();
        return {
          ...prev,
          currentStreak: 0,
          achievementStats: {
            ...prevStats,
            consecutiveCorrectAnswers: 0,
            noHintCorrectStreak: 0,
            noHintPerfectFieldsStreak: 0,
          }
        };
      });
    }
  };

  // 進入下一題
  const handleNextQuestion = () => {
    if (activeFieldId === null || activeQuestions.length === 0) return;
    playSynthSound('click', isMuted);
    
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTypedAnswer('');
      setIsAnswered(false);
      setShowHint(false);

      // 重設計時器並啟動
      const duration = getTimerDurationForField(activeFieldId);
      setTimeLeft(duration);
      setIsTimerActive(true);
    } else {
      // 10 題結束！結算灌溉結果
      const isPerfect = currentFieldCorrectAnswers === 10;
      
      let updatedFields: FieldPlot[] = [];
      setFields(prevFields => {
        updatedFields = prevFields.map(f => {
          if (f.id === activeFieldId) {
            return {
              ...f,
              isIrrigated: isPerfect ? true : f.isIrrigated,
              bestStreak: Math.max(f.bestStreak, currentFieldCorrectAnswers),
              lastAttemptDate: new Date().toLocaleDateString()
            };
          }
          return f;
        });
        return updatedFields;
      });

      if (isPerfect) {
        playSynthSound('irrigate', isMuted);
        setIsCelebrating(true);
        const currentField = fields.find(f => f.id === activeFieldId);
        if (currentField) {
          setGrowingPlot({
            id: currentField.id,
            name: currentField.name,
            cropName: currentField.cropName,
            emoji: getCropEmoji(currentField.id)
          });
        }
        setTortoiseSpeech(`「太令人感動了！${currentField?.name || '這片良田'} 已經 100% 成功灌溉！收穫了鮮脆的高麗菜與潔淨的聖泉水！」`);
        
        let nextGS: GameState | null = null;
        setGameState(prev => {
          const prevStats = prev.achievementStats || createDefaultAchievementStats();
          const nextNoHintFields = hasUsedHintInCurrentField ? 0 : ((prevStats.noHintPerfectFieldsStreak || 0) + 1);
          const updated: GameState = {
            ...prev,
            coins: prev.coins + 50,
            cabbages: prev.cabbages + 3,
            waterBuckets: prev.waterBuckets + 3,
            completedAttempts: {
              ...prev.completedAttempts,
              [activeFieldId]: true
            },
            achievementStats: {
              ...prevStats,
              lifetimeCoinsEarned: (prevStats.lifetimeCoinsEarned || 0) + 50,
              lifetimeCabbagesEarned: (prevStats.lifetimeCabbagesEarned || 0) + 3,
              lifetimeWaterEarned: (prevStats.lifetimeWaterEarned || 0) + 3,
              noHintPerfectFieldsStreak: nextNoHintFields,
            }
          };
          nextGS = updated;
          return updated;
        });

        handleTortoiseXp(40);

        if (nextGS) {
          checkAndUnlockSecretAchievements({
            customGameState: nextGS,
            customFields: updatedFields.length > 0 ? updatedFields : undefined,
            justCompletedFieldId: activeFieldId,
            justCompletedFieldSuccess: true
          });
        }
      } else {
        setTortoiseSpeech(`「好可惜！這次只完成了 ${currentFieldCorrectAnswers}/10 題。田地需要 100% 完美答對才能完全被灌溉喔！讓我們再挑戰一次吧！」`);
        setGameState(prev => {
          const prevStats = prev.achievementStats || createDefaultAchievementStats();
          const failCounts = { ...(prevStats.fieldFailureCounts || {}) };
          failCounts[activeFieldId] = (failCounts[activeFieldId] || 0) + 1;
          return {
            ...prev,
            achievementStats: {
              ...prevStats,
              fieldFailureCounts: failCounts,
              noHintPerfectFieldsStreak: 0,
            }
          };
        });
      }

      setActiveFieldId(null);
      setIsTimerActive(false);
    }
  };

  // 處理烏龜獲得經驗值
  const handleTortoiseXp = (amount: number) => {
    let nextTortoise: TortoisePet | null = null;
    setTortoise(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      const xpNeeded = prev.level * 100;
      
      if (newXp >= xpNeeded) {
        newXp -= xpNeeded;
        newLevel += 1;
        playSynthSound('levelUp', isMuted);
        
        let newApp = prev.appearance;
        if (newLevel >= 8) newApp = 'cyborg';
        else if (newLevel >= 5) newApp = 'wizard';
        else if (newLevel >= 3) newApp = 'explorer';

        setTortoiseSpeech(`「嗶嗶！小綠龜升級到 Lvl.${newLevel} 了！我感覺寫 C++ 的手感更好了！」`);
        const updated: TortoisePet = {
          ...prev,
          level: newLevel,
          xp: newXp,
          appearance: newApp,
          happiness: Math.min(100, prev.happiness + 20)
        };
        nextTortoise = updated;
        return updated;
      }
      return {
        ...prev,
        xp: newXp
      };
    });

    if (nextTortoise) {
      checkAndUnlockSecretAchievements({ customTortoise: nextTortoise });
    }
  };

  // 餵食烏龜 (高麗菜)
  const handleFeedTortoise = () => {
    if (gameState.cabbages <= 0) {
      setTortoiseSpeech('「嗚嗚...我們沒有高麗菜了。請先去完成田地的完美 10 題挑戰，多收成一點吧！」');
      return;
    }

    playSynthSound('feed', isMuted);
    setPetActionEffect('🥬 餵食成功！飽食度 +25');
    setTimeout(() => setPetActionEffect(null), 3000);

    updateQuestProgress('feed_tortoise', 1);
    setGameState(prev => ({ ...prev, cabbages: prev.cabbages - 1 }));
    setTortoise(prev => ({
      ...prev,
      fullness: Math.min(100, prev.fullness + 25),
      happiness: Math.min(100, prev.happiness + 5)
    }));
    handleTortoiseXp(15);
    setTortoiseSpeech('「嚼嚼嚼...這顆新鮮的高麗菜真甜！感謝主人，我有力氣幫你巡田水了！」');
  };

  // 給水 (聖泉水)
  const handleWaterTortoise = () => {
    if (gameState.waterBuckets <= 0) {
      setTortoiseSpeech('「咕嚕...口好渴！沒有聖泉水了，去灌溉田地就能得到好喝的泉水喔！」');
      return;
    }

    playSynthSound('water', isMuted);
    setPetActionEffect('🪣 給水成功！水分值 +25');
    setTimeout(() => setPetActionEffect(null), 3000);

    setGameState(prev => ({ ...prev, waterBuckets: prev.waterBuckets - 1 }));
    setTortoise(prev => ({
      ...prev,
      hydration: Math.min(100, prev.hydration + 25),
      happiness: Math.min(100, prev.happiness + 5)
    }));
    handleTortoiseXp(15);
    setTortoiseSpeech('「咕嚕咕嚕...哈！聖泉水冰冰涼涼的好舒服，邏輯思維瞬間清晰了起來！」');
  };

  // 摸摸烏龜
  const handlePetTortoise = () => {
    playSynthSound('pet', isMuted);
    setPetActionEffect('👋 摸摸頭！幸福度 +15');
    setTimeout(() => setPetActionEffect(null), 3000);

    setTortoise(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15)
    }));
    handleTortoiseXp(5);
    setTortoiseSpeech('「嘿嘿，摸起來暖洋洋的。我最喜歡一邊被摸，一邊看你寫 C++ 了！」');
  };

  // 進行 C++ 智力特訓
  const handleTrainTortoise = () => {
    if (tortoise.fullness < 20 || tortoise.hydration < 20) {
      setTortoiseSpeech('「嗚～我太累太餓了，沒辦法進行特訓。請先餵我吃點高麗菜、喝點泉水吧！」');
      return;
    }

    playSynthSound('levelUp', isMuted);
    setPetActionEffect('🐢 C++ 特訓成功！XP +40 (飽食/水分 -20)');
    setTimeout(() => setPetActionEffect(null), 3000);

    setTortoise(prev => ({
      ...prev,
      fullness: Math.max(0, prev.fullness - 20),
      hydration: Math.max(0, prev.hydration - 20),
    }));
    handleTortoiseXp(40);

    let nextGS: GameState | null = null;
    setGameState(prev => {
      const prevStats = prev.achievementStats || createDefaultAchievementStats();
      const updated: GameState = {
        ...prev,
        achievementStats: {
          ...prevStats,
          turtleTrainCount: (prevStats.turtleTrainCount || 0) + 1
        }
      };
      nextGS = updated;
      return updated;
    });
    
    const randomWisdom = TORTOISE_WISDOM_QUOTES[Math.floor(Math.random() * TORTOISE_WISDOM_QUOTES.length)];
    setTortoiseSpeech(`「特訓完畢！我學會了新技巧：${randomWisdom}」`);

    if (nextGS) {
      checkAndUnlockSecretAchievements({ customGameState: nextGS });
    }
  };

  // 儲存修改的烏龜名字
  const saveTortoiseName = () => {
    if (tempName.trim()) {
      setTortoise(prev => ({ ...prev, name: tempName }));
      setIsEditingName(false);
      setTortoiseSpeech(`「太好了！從今以後我就叫『${tempName}』，我會更努力幫你顧田地的！」`);
    }
  };

  // 購買寵物配件
  const handleBuyAccessory = (item: AccessoryItem) => {
    if (gameState.coins < item.price) {
      setTortoiseSpeech(`「哎呀！我的主人，${item.name} 需要 ${item.price} CR，但我們現在只有 ${gameState.coins} CR。請多答對幾題或收成農作物來賺取金幣吧！」`);
      playSynthSound('wrong', isMuted);
      return;
    }

    playSynthSound('levelUp', isMuted);
    setPetActionEffect(`🛍️ 購買成功！-${item.price} CR`);
    setTimeout(() => setPetActionEffect(null), 3000);

    // 扣除金幣
    setGameState(prev => ({
      ...prev,
      coins: prev.coins - item.price
    }));

    // 新增至已擁有配件
    setTortoise(prev => {
      const owned = prev.ownedAccessories || [];
      if (owned.includes(item.id)) return prev;
      return {
        ...prev,
        ownedAccessories: [...owned, item.id]
      };
    });

    setTortoiseSpeech(`「哇！太精緻了！謝謝主人送我 ${item.emoji} ${item.name}！快在裝備欄幫我穿戴上，看看合不合身吧！」`);
  };

  // 穿戴寵物配件
  const handleEquipAccessory = (item: AccessoryItem) => {
    const owned = tortoise.ownedAccessories || [];
    if (!owned.includes(item.id)) {
      setTortoiseSpeech(`「咦？我們好像還沒擁有 ${item.name}呢，必須先在商店購買後才能裝備喔！」`);
      return;
    }

    playSynthSound('click', isMuted);
    setPetActionEffect(`✨ 裝備了 ${item.emoji}`);
    setTimeout(() => setPetActionEffect(null), 3000);

    setTortoise(prev => {
      const equipped = prev.equippedAccessories || {};
      return {
        ...prev,
        equippedAccessories: {
          ...equipped,
          [item.slot]: item.id
        }
      };
    });

    setTortoiseSpeech(`「好看嗎？戴上 ${item.emoji} ${item.name} 後，我感覺自己對 C++ 的理解又上升到了一個全新的次元！」`);
  };

  // 卸下寵物配件
  const handleUnequipAccessory = (slot: 'head' | 'face' | 'neck' | 'shell') => {
    playSynthSound('click', isMuted);
    setPetActionEffect(`卸下配件 💨`);
    setTimeout(() => setPetActionEffect(null), 3000);

    setTortoise(prev => {
      const equipped = { ...(prev.equippedAccessories || {}) };
      delete equipped[slot];
      return {
        ...prev,
        equippedAccessories: equipped
      };
    });

    setTortoiseSpeech(`「呼～卸下了配件感覺輕鬆多啦！不管穿戴什麼，我都是最挺主人的小綠龜！」`);
  };

  // 重設遊戲進度
  const handleResetGame = () => {
    if (window.confirm('確定要重新開始遊戲嗎？這將會清空所有田地灌溉進度與烏龜狀態，重新開始！')) {
      const resetGameState: GameState = {
        score: 0,
        coins: 10,
        cabbages: 0,
        waterBuckets: 0,
        completedAttempts: {},
        fieldProgress: {},
        currentStreak: 0,
        maxStreak: 0
      };
      const resetFields = FIELD_PLOTS_DATA.map(f => ({ ...f, isIrrigated: false, bestStreak: 0, lastAttemptDate: null }));
      const resetTortoise: TortoisePet = {
        name: '小綠龜',
        level: 1,
        xp: 0,
        fullness: 50,
        hydration: 50,
        happiness: 50,
        appearance: 'baby'
      };

      setGameState(resetGameState);
      setFields(resetFields);
      setTortoise(resetTortoise);
      setActiveFieldId(null);
      setCurrentTab('farm');
      setTortoiseSpeech('「耕地與記憶已全部洗牌。讓我們從零開始，再次建構精湛的 C++ 語法帝國吧！」');
    }
  };

  const irrigatedCount = fields.filter(f => f.isIrrigated).length;

  // 地圖篩選與搜尋邏輯
  const filteredFields = fields.filter(plot => {
    // 難度與章節階段篩選
    let matchDifficulty = true;
    if (mapDifficultyFilter === 'stage1' || mapDifficultyFilter === 'basic') {
      matchDifficulty = plot.id <= 100; // 高中核心 (1-100)
    } else if (mapDifficultyFilter === 'stage2' || mapDifficultyFilter === 'intermediate') {
      matchDifficulty = plot.id >= 101 && plot.id <= 120; // 高中進階 (101-120)
    } else if (mapDifficultyFilter === 'stage3' || mapDifficultyFilter === 'advanced') {
      matchDifficulty = plot.id >= 121 && plot.id <= 150; // 延伸與競賽 (121-150)
    } else if (mapDifficultyFilter.startsWith('ch_')) {
      const chNum = parseInt(mapDifficultyFilter.replace('ch_', ''), 10);
      const ch = CHAPTERS_DATA.find(c => c.chapter === chNum);
      if (ch) {
        matchDifficulty = plot.id >= ch.startId && plot.id <= ch.endId;
      }
    }

    // 關鍵字篩選 (ID, 名稱, 作物)
    let matchSearch = true;
    if (mapSearchQuery.trim()) {
      const q = mapSearchQuery.toLowerCase().trim();
      matchSearch = plot.id.toString() === q ||
                    plot.name.toLowerCase().includes(q) ||
                    plot.cropName.toLowerCase().includes(q) ||
                    (plot.description && plot.description.toLowerCase().includes(q));
    }

    return matchDifficulty && matchSearch;
  });

  const filteredIrrigatedCount = filteredFields.filter(f => f.isIrrigated).length;

  // 過濾字庫資料的邏輯
  const filteredCards = CPP_CARDS_DATA.filter(card => {
    const matchesField = selectedFieldFilter === 'all' || card.fieldId === selectedFieldFilter;
    const matchesSearch = 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.chineseDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.codeTemplate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.expectedAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesField && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 pb-28 relative cyber-grid-bg">
      
      {/* 頂部通用橫幅 */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0e211a] to-slate-950 px-6 py-3.5 shadow-xl border-b border-emerald-500/20 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full border border-white/20">
              <Droplet className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wider text-white font-display">
                C++ 語法良田
              </h1>
              <p className="text-[10px] text-green-100 font-mono tracking-wide uppercase">
                PERFECT 10-QUEST MEMORY FARMING GAME
              </p>
            </div>
          </div>

          {/* 帳號登入與靜音快速工具 */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 pl-2 pr-1.5 py-1 rounded-full text-xs shadow-inner">
                {currentUser.authType === 'google' ? (
                  <span className="text-xs" title="Google 登入帳號">🌐</span>
                ) : currentUser.authType === 'anonymous' ? (
                  <span className="text-xs" title="匿名農夫帳號">👤</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="帳號已連線"></span>
                )}
                
                {/* 暱稱顯示與點擊編輯 */}
                <button
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setNewNicknameInput(currentUser.username);
                    setIsNicknameModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-emerald-200 hover:text-white font-medium max-w-[110px] truncate transition group cursor-pointer"
                  title="點擊修改暱稱"
                >
                  <span className="truncate">{currentUser.username}</span>
                  <Edit2 className="w-3 h-3 text-emerald-400/70 group-hover:text-emerald-300 shrink-0" />
                </button>

                {isSyncing ? (
                  <span className="text-[9px] text-emerald-400/70 font-mono">同步中</span>
                ) : (
                  <span className="text-[9px] text-emerald-400/40 font-mono">已同步</span>
                )}

                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-400 transition ml-0.5 px-1.5 py-0.5 rounded hover:bg-rose-500/10 text-[11px] font-bold"
                  title="登出帳號"
                >
                  登出
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  playSynthSound('click', isMuted);
                  setAuthMethodTab('quick');
                  setCustomNickname(generateRandomNickname());
                  setAuthError(null);
                  setAuthSuccess(null);
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/50 hover:to-teal-600/50 border border-emerald-500/40 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold transition font-display shadow-sm active:scale-95"
              >
                <span>🔑 登入 / 建立暱稱</span>
              </button>
            )}

            {/* 📅 今日 C++ 限定挑戰按鈕 */}
            <button
              onClick={() => {
                playSynthSound('click', isMuted);
                setIsDailyChallengeOpen(true);
              }}
              className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition font-display border shadow-sm ${
                isDailyChallengeCompletedToday
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 hover:from-amber-500/30 hover:to-teal-500/30 border-amber-400/50 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] animate-pulse'
              }`}
              title="每日 C++ 限定挑戰 (每日 1 題)"
            >
              <span className="text-xs">📅</span>
              <span className="hidden sm:inline">今日限定題</span>
              {isDailyChallengeCompletedToday ? (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded-full font-mono">
                  ✓ 完成
                </span>
              ) : (
                <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  NEW
                </span>
              )}
            </button>

            {/* 📅 每日任務按鈕 */}
            <button
              onClick={() => {
                playSynthSound('click', isMuted);
                setIsDailyQuestOpen(true);
              }}
              className="relative p-1.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/35 border border-emerald-500/30 text-emerald-300 transition"
              title="每日任務"
            >
              <Calendar className="w-4 h-4" />
              {/* Unclaimed Notification Badge */}
              {hasUnclaimedQuests && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 border border-slate-950 rounded-full animate-ping"></span>
              )}
              {hasUnclaimedQuests && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 border border-slate-950 rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-full bg-black/10 text-white/80 hover:text-white hover:bg-black/20 transition"
              title={isMuted ? '開啟音效' : '關閉音效'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">

        {/* 1. 全域完美答對慶祝橫幅 */}
        {growingPlot && (
          <CropGrowingAnimation 
            plot={growingPlot} 
            onClose={() => {
              setGrowingPlot(null);
            }} 
            isMuted={isMuted} 
          />
        )}

        {isCelebrating && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-300 shadow-[0_4px_12px_rgba(245,158,11,0.2)] animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce">🌻</span>
              <div>
                <h3 className="text-sm font-bold text-amber-800 font-display">
                  【 恭喜！完美灌溉！C++ 知識核心同步完成 】
                </h3>
                <p className="text-xs text-amber-700 mt-0.5">
                  完美答對 10 題！田地結出豐碩的生命果實：獲得 +50金幣、+3高麗菜、+3聖泉水，烏龜同步成長！
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCelebrating(false)}
              className="w-full sm:w-auto text-amber-900 bg-amber-200 border border-amber-400 px-4 py-1.5 rounded-full text-xs font-bold font-display hover:bg-amber-300 transition"
            >
              收下作物
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: 地圖 (FARM MAIN VIEW) */}
        {/* ========================================================= */}
        {currentTab === 'farm' && (
          <div className="space-y-6">
            
            {activeFieldId === null ? (
              <>
                {/* 1A. 頂部簡約資訊與資源看板 (COMPACT STATUS HEADER) */}
                <div className="cyber-card border border-emerald-500/20 rounded-3xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-base font-black text-emerald-400 font-display flex items-center gap-2">
                        <span>🚜</span> C++ 綜合編譯科技良田 ({fields.length}區)
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        點擊任何一塊土壤，即可進行該區 10 題專屬、綜合概念的語法灌溉挑戰，數字越後面難度越高！
                      </p>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
                      綠化進度: {irrigatedCount} / {fields.length} 區
                    </div>
                  </div>

                  {/* 資源狀態列 */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center justify-center gap-2 py-2 px-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                      <span className="text-base">🪙</span>
                      <div>
                        <span className="text-[9px] text-amber-500/50 block font-mono leading-none">CREDITS</span>
                        <span className="text-xs font-black text-amber-400 font-display">{gameState.coins} CR</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-2 px-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <span className="text-base">🥬</span>
                      <div>
                        <span className="text-[9px] text-emerald-500/50 block font-mono leading-none">CABBAGES</span>
                        <span className="text-xs font-black text-emerald-400 font-display">{gameState.cabbages} PKG</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-2 px-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <span className="text-base">🪣</span>
                      <div>
                        <span className="text-[9px] text-blue-500/50 block font-mono leading-none">SACRED WATER</span>
                        <span className="text-xs font-black text-blue-400 font-display">{gameState.waterBuckets} CELL</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1B. 篩選與佈局控制列 (FILTER & LAYOUT CONTROLS) */}
                <div className="bg-[#0b1324] border border-emerald-500/20 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-xl">
                  {/* Left part: Difficulty dropdown & Search */}
                  <div className="flex flex-col sm:flex-row gap-3 flex-grow">
                    {/* Difficulty select dropdown with glowing styling */}
                    <div className="relative flex-grow sm:max-w-[240px]">
                      <span className="absolute inset-y-0 left-3 flex items-center text-emerald-400 pointer-events-none">
                        <Filter className="w-3.5 h-3.5" />
                      </span>
                      <select
                        id="map-difficulty-select"
                        value={mapDifficultyFilter}
                        onChange={(e) => {
                          playSynthSound('click', isMuted);
                          setMapDifficultyFilter(e.target.value);
                        }}
                        className="w-full bg-[#070b14] text-slate-200 text-xs font-bold font-display rounded-xl py-2.5 pl-9 pr-8 border border-emerald-500/20 focus:outline-none focus:border-emerald-400/80 transition-all cursor-pointer appearance-none"
                      >
                        <option value="all">🌐 全部 150 區良田 (全 15 章節)</option>
                        <optgroup label="── 依課程定位篩選 ──">
                          <option value="stage1">🏫 高中核心 (1 - 100 區，第 1～10 章)</option>
                          <option value="stage2">🚀 高中進階 (101 - 120 區，第 11～12 章)</option>
                          <option value="stage3">🧠 延伸與競賽 (121 - 150 區，第 13～15 章)</option>
                        </optgroup>
                        <optgroup label="── 依 15 大主題章節篩選 ──">
                          {CHAPTERS_DATA.map(ch => (
                            <option key={ch.chapter} value={`ch_${ch.chapter}`}>
                              {ch.emoji} 第 {ch.chapter} 章：{ch.topic} ({ch.startId}～{ch.endId} 區)
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-[10px]">
                        ▼
                      </div>
                    </div>

                    {/* Search box for fields */}
                    <div className="relative flex-grow">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 pointer-events-none">
                        <Search className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="text"
                        placeholder="搜尋良田編號、單元名稱或作物名稱..."
                        value={mapSearchQuery}
                        onChange={(e) => setMapSearchQuery(e.target.value)}
                        className="w-full bg-[#070b14] text-slate-200 text-xs rounded-xl py-2.5 pl-9 pr-3 border border-emerald-500/10 focus:outline-none focus:border-emerald-400/80 transition-all font-display"
                      />
                      {mapSearchQuery && (
                        <button
                          onClick={() => setMapSearchQuery('')}
                          className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right part: View Layout selector */}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        playSynthSound('click', isMuted);
                        setMapViewMode('matrix');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                        mapViewMode === 'matrix'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-300'
                      }`}
                      title="滑動矩陣 (傳統 5 列水平捲動地圖)"
                    >
                      <span>🗺️</span>
                      <span>滑動矩陣</span>
                    </button>
                    <button
                      onClick={() => {
                        playSynthSound('click', isMuted);
                        setMapViewMode('grid');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                        mapViewMode === 'grid'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-300'
                      }`}
                      title="智慧網格 (更適合篩選過濾後的直覺佈局)"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>智慧網格</span>
                    </button>
                  </div>
                </div>

                {/* 1C. 良田主要顯示區 */}
                {filteredFields.length === 0 ? (
                  <div className="bg-[#0c1221] border border-dashed border-emerald-500/20 rounded-3xl py-12 px-6 flex flex-col items-center justify-center text-center text-slate-400 shadow-xl">
                    <span className="text-5xl mb-3 animate-bounce">🔍</span>
                    <h3 className="text-sm font-black text-emerald-400 font-display">找不到相符的科技良田</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      在當前的篩選條件中，沒有包含 "{mapSearchQuery}" 的良田。請重新搜尋或調整篩選。
                    </p>
                    <button
                      onClick={() => {
                        playSynthSound('click', isMuted);
                        setMapDifficultyFilter('all');
                        setMapSearchQuery('');
                      }}
                      className="mt-4 px-4 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-bold hover:bg-emerald-500/25 transition"
                    >
                      重設所有篩選 🔄
                    </button>
                  </div>
                ) : mapViewMode === 'matrix' ? (
                  /* 滾動式語法良田泥土區 (FIELD HORIZONTAL SCROLL AREA) */
                  <div className="bg-[#0c1221] border border-emerald-500/20 rounded-3xl p-4 shadow-xl relative overflow-hidden soil-tilled-cyber cyber-glow-emerald">
                    {/* 篩選進度標示 */}
                    <div className="flex justify-between items-center mb-2 px-2">
                      <span className="text-[10px] text-slate-400 font-mono">
                        目前難度篩選範圍
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold font-mono">
                        篩選進度: {filteredIrrigatedCount} / {filteredFields.length} 區
                      </span>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="overflow-x-auto py-2 scrollbar-cyber select-none">
                      <div className="inline-grid grid-rows-5 grid-flow-col gap-3 px-2 py-1 min-w-max">
                        {filteredFields.map(plot => {
                          const isIrrigated = plot.isIrrigated;
                          return (
                            <button
                              key={plot.id}
                              onClick={() => handleSelectField(plot.id)}
                              id={`plot-card-${plot.id}`}
                              title={`${plot.name}: ${plot.cropName} (${isIrrigated ? '已灌溉' : '待灌溉'} - 最高紀錄 ${plot.bestStreak}/10 題)`}
                              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-md relative ${
                                isIrrigated
                                  ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/30 border-emerald-400/80 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                                  : 'bg-[#131d31] border-slate-700/80 hover:bg-[#1a2944] hover:border-emerald-400 text-slate-500 hover:text-emerald-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
                              }`}
                            >
                              {isIrrigated ? (
                                <div className="relative flex flex-col items-center justify-center">
                                  {/* Subtle glowing spark */}
                                  <div className="absolute -top-1.5 -right-1.5 text-[8px] animate-pulse">✨</div>
                                  <span className="text-2xl sm:text-3xl animate-bounce">
                                    {getCropEmoji(plot.id)}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center space-y-0.5">
                                  <span className="text-[9px] opacity-30">🌱</span>
                                  <span className="text-[10px] font-black font-mono leading-none">{plot.id}</span>
                                </div>
                              )}

                              {/* Tiny lock/check indicator badge in corner */}
                              <div className="absolute bottom-0.5 right-0.5 pointer-events-none">
                                {isIrrigated ? (
                                  <span className="text-[8px] bg-emerald-500 text-teal-950 rounded-full p-0.5 leading-none">✓</span>
                                ) : null}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sliding Hint Label */}
                    <div className="text-center mt-2">
                      <span className="text-[10px] text-emerald-400 font-bold font-mono tracking-wider animate-pulse bg-emerald-950/30 border border-emerald-500/10 px-3 py-1 rounded-full inline-block">
                        ◀ 左右滑動巡視 {filteredFields.length} 區良田 (向右滑動解鎖更多) ▶
                      </span>
                    </div>
                  </div>
                ) : (
                  /* 智慧網格 (SMART GRID VIEW) */
                  <div className="space-y-4">
                    {/* Grid Progress Info */}
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs text-slate-400 font-display">
                        智慧直覺卡片網格 (篩選出 {filteredFields.length} 區)
                      </span>
                      <span className="text-xs text-emerald-400 font-bold font-mono bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        完美灌溉率: {filteredFields.length > 0 ? Math.round((filteredIrrigatedCount / filteredFields.length) * 100) : 0}% ({filteredIrrigatedCount} / {filteredFields.length})
                      </span>
                    </div>

                    {/* Responsive Bento Grid of Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {filteredFields.map(plot => {
                        const isIrrigated = plot.isIrrigated;
                        const cleanCategoryName = plot.name.match(/\(([^)]+)\)/)?.[1] || plot.name;

                        const chInfo = getChapterForField(plot.id);
                        // Determine stage color badge
                        let levelBadgeColor = 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400';
                        if (chInfo.stage === '高中進階') {
                          levelBadgeColor = 'border-amber-500/20 bg-amber-500/10 text-amber-400';
                        } else if (chInfo.stage.includes('延伸') || chInfo.stage.includes('競賽')) {
                          levelBadgeColor = 'border-purple-500/20 bg-purple-500/10 text-purple-400';
                        }

                        return (
                          <button
                            key={plot.id}
                            onClick={() => handleSelectField(plot.id)}
                            className={`group relative p-3.5 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95 flex flex-col justify-between h-[120px] overflow-hidden ${
                              isIrrigated
                                ? 'bg-gradient-to-br from-[#0c1324] to-[#0c2419] border-emerald-500/30 text-emerald-300 shadow-[0_4px_16px_rgba(16,185,129,0.06)]'
                                : 'bg-slate-900/60 border-slate-800 hover:bg-[#131d31] hover:border-emerald-400'
                            }`}
                          >
                            {/* Card Header Info */}
                            <div className="flex items-start justify-between w-full gap-1.5">
                              <span className={`text-[9px] font-black font-mono tracking-wider border px-1.5 py-0.5 rounded leading-none ${levelBadgeColor}`}>
                                #{plot.id}
                              </span>
                              {isIrrigated ? (
                                <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 leading-none">
                                  ✓ 已收成
                                </span>
                              ) : (
                                <span className="text-[8px] bg-slate-950 text-slate-500 px-1.5 py-0.5 rounded border border-slate-800 leading-none">
                                  待灌溉
                                </span>
                              )}
                            </div>

                            {/* Card Content Row */}
                            <div className="flex items-center gap-2.5 w-full mt-2">
                              <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                                isIrrigated 
                                  ? 'bg-emerald-500/10 text-emerald-400 ring-2 ring-emerald-500/15' 
                                  : 'bg-slate-950 border border-slate-800/80 text-slate-600'
                              }`}>
                                <span className="text-2xl">
                                  {isIrrigated ? getCropEmoji(plot.id) : '🌱'}
                                </span>
                              </div>
                              <div className="overflow-hidden flex-grow leading-snug">
                                <h5 className="text-[11px] font-black text-slate-200 truncate group-hover:text-emerald-400 transition-colors leading-tight">
                                  {cleanCategoryName}
                                </h5>
                                <p className="text-[9px] text-slate-500 truncate mt-0.5 leading-none">
                                  作物: {plot.cropName}
                                </p>
                                {plot.bestStreak > 0 ? (
                                  <p className="text-[9px] text-emerald-400/80 font-mono mt-1 font-bold leading-none">
                                    紀錄: {plot.bestStreak}/10 題
                                  </p>
                                ) : (
                                  <p className="text-[9px] text-slate-600 font-mono mt-1 leading-none">
                                    尚未挑戰
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Hover effect glowing background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Grid instructions card */}
                <div className="cyber-card border border-emerald-500/10 p-5 rounded-2xl flex gap-3 items-start">
                  <span className="text-xl mt-0.5">🌾</span>
                  <div>
                    <h4 className="text-xs font-black text-emerald-400 font-display">如何玩 C++ 綜合良田？</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      這裡共有 <strong className="text-emerald-400 font-bold">{fields.length} 塊精緻土壤</strong>。
                      點擊任何一塊，都將面臨 <strong className="text-emerald-400 font-bold">10 題專屬、混合各單元概念的 C++ 綜合挑戰，數字越後面難度越高，且題目絕不重複</strong>！
                      連續答對全部 10 題（完美率 100%）即可成功灌溉該土壤，培育出專屬的收成，並為神奇 C++ 烏龜帶回豐富的高麗菜與聖水！
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // =========================================================
              // CORE CHALLENGE SCREEN IN TAB 1 (WOOD/PAPER SKIN)
              // =========================================================
              <div className="max-w-2xl mx-auto space-y-6">
                
                {/* 1C. Challenge Header */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      playSynthSound('click', isMuted);
                      setActiveFieldId(null);
                    }}
                    className="flex items-center gap-1.5 text-xs text-green-700 font-extrabold font-display hover:text-green-900 transition bg-white border border-green-200 px-3.5 py-2 rounded-full shadow-sm cursor-pointer active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> ◄ 放棄挑戰，回良田
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">目前田地:</span>
                    <span className="text-sm font-black text-green-700 font-display">
                      {fields.find(f => f.id === activeFieldId)?.name}
                    </span>
                  </div>
                </div>

                {/* 1D. Progress tracker dots */}
                <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-display font-extrabold">
                        第 {currentQuestionIndex + 1} 題 / 共 10 題
                      </span>
                      {fields.find(f => f.id === activeFieldId)?.isIrrigated && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                          ✓ 複習模式
                        </span>
                      )}
                    </div>

                    {/* Jump to question dropdown menu */}
                    {fields.find(f => f.id === activeFieldId)?.isIrrigated && (
                      <div className="flex items-center gap-1.5">
                        <label htmlFor="jump-question-select" className="text-xs font-bold text-gray-500 font-mono">
                          快速跳轉:
                        </label>
                        <select
                          id="jump-question-select"
                          value={currentQuestionIndex}
                          onChange={(e) => {
                            const idx = parseInt(e.target.value, 10);
                            setCurrentQuestionIndex(idx);
                            setTypedAnswer('');
                            setIsAnswered(false);
                            setShowHint(false);
                            playSynthSound('click', isMuted);
                          }}
                          className="text-xs bg-green-50 border-2 border-green-200 text-green-800 font-extrabold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-green-400 transition cursor-pointer"
                        >
                          {activeQuestions.map((q, idx) => (
                            <option key={idx} value={idx}>
                              第 {idx + 1} 題: {q.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <span className="text-xs font-mono text-gray-500 font-semibold self-start md:self-auto">
                      連續答對: <span className="text-green-600 font-black">{currentFieldCorrectAnswers}</span> / 10
                    </span>
                  </div>

                  {/* 10 dots progress bar */}
                  <div className="grid grid-cols-10 gap-2 h-3.5 w-full">
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const isIrrigated = fields.find(f => f.id === activeFieldId)?.isIrrigated;
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={!isIrrigated}
                          onClick={() => {
                            setCurrentQuestionIndex(idx);
                            setTypedAnswer('');
                            setIsAnswered(false);
                            setShowHint(false);
                            playSynthSound('click', isMuted);
                          }}
                          title={isIrrigated ? `跳轉至第 ${idx + 1} 題` : undefined}
                          className={`h-full rounded-full transition-all duration-300 ${
                            isIrrigated
                              ? 'cursor-pointer hover:opacity-80 active:scale-95'
                              : 'cursor-default'
                          } ${
                            idx < currentQuestionIndex
                              ? 'bg-green-500 shadow-sm'
                              : idx === currentQuestionIndex
                              ? 'bg-amber-400 animate-pulse-light scale-105 ring-2 ring-amber-300'
                              : 'bg-gray-100 border border-gray-200'
                          }`}
                        ></button>
                      );
                    })}
                  </div>
                  {fields.find(f => f.id === activeFieldId)?.isIrrigated && (
                    <p className="text-[10px] text-gray-400 mt-2 font-medium text-center">
                      💡 提示：本單元已通關！你可以使用「快速跳轉」選單，或直接點擊上方進度條圓點，任意切換題目進行複習。
                    </p>
                  )}
                </div>

                {/* 1E. Universal Multi-Type C++ Question Card Renderer */}
                <QuestionCardRenderer
                  question={activeQuestions[currentQuestionIndex]}
                  typedAnswer={typedAnswer}
                  onAnswerChange={setTypedAnswer}
                  onSubmit={handleSubmitAnswer}
                  onNext={handleNextQuestion}
                  isAnswered={isAnswered}
                  isAnswerCorrect={isAnswerCorrect}
                  showHint={showHint}
                  onShowHint={() => {
                    playSynthSound('click', isMuted);
                    setShowHint(true);
                    setHasUsedHintInCurrentField(true);
                    setGameState(prev => {
                      const prevStats = prev.achievementStats || createDefaultAchievementStats();
                      return {
                        ...prev,
                        achievementStats: {
                          ...prevStats,
                          noHintCorrectStreak: 0,
                          noHintPerfectFieldsStreak: 0,
                        }
                      };
                    });
                  }}
                  isLastQuestion={currentQuestionIndex === activeQuestions.length - 1}
                  isReviewMode={!!fields.find(f => f.id === activeFieldId)?.isIrrigated}
                />

              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: 字庫 (CARDS DICTIONARY VIEW) */}
        {/* ========================================================= */}
        {currentTab === 'cards' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-green-800 font-display">C++ 語法字庫</h2>
                  <p className="text-xs text-gray-500 mt-0.5">學習良田所有關卡的完整語法代碼與詳解，點擊隨時進行預習！</p>
                </div>
                <div className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200 font-mono font-bold">
                  庫存總計: {CPP_CARDS_DATA.length} 語法節點
                </div>
              </div>

              {/* Filtering Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Search query */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜尋關鍵字, 如 cout, pointer..."
                    className="w-full bg-gray-50 border border-gray-200 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 rounded-full py-2 pl-9 pr-4 text-xs transition-all"
                  />
                </div>

                {/* Field select dropdown */}
                <select
                  value={selectedFieldFilter}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedFieldFilter(val === 'all' ? 'all' : Number(val));
                  }}
                  className="bg-gray-50 border border-gray-200 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 rounded-full py-2 px-4 text-xs transition-all cursor-pointer"
                >
                  <option value="all">🔍 顯示全部 {fields.length} 個語法良田 ({CPP_CARDS_DATA.length} 題)</option>
                  {CHAPTERS_DATA.map(ch => (
                    <optgroup key={ch.chapter} label={`── ${ch.emoji} 第 ${ch.chapter} 章：${ch.topic} (${ch.stage}) ──`}>
                      {fields.filter(f => f.id >= ch.startId && f.id <= ch.endId).map(f => (
                        <option key={f.id} value={f.id}>
                          #{f.id} {f.name} ({f.cropName})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Display list of dictionary cards */}
            <div className="space-y-4">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => {
                  const relativeField = fields.find(f => f.id === card.fieldId);
                  const meta = getQuestionTypeMeta(card.type);

                  return (
                    <div key={card.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3.5 hover:border-green-300 transition-colors duration-200">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-display border ${meta.badgeBg}`}>
                              {meta.emoji} {meta.label}
                            </span>
                            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold font-display">
                              {card.title}
                            </span>
                            <span className="text-[9px] text-gray-400 font-mono">ID: {card.id}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 font-sans">
                            {card.chineseDescription}
                          </p>
                        </div>
                        <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 whitespace-nowrap">
                          {relativeField?.cropName || 'C++'}
                        </span>
                      </div>

                      {/* Display C++ code snippet */}
                      <div className="bg-[#1e2330] rounded-xl p-3.5 border border-[#ebdfc6]/10 text-white font-mono text-xs overflow-x-auto whitespace-pre">
                        <span className="text-[8px] text-gray-400 block mb-1">C++ 程式碼範本：</span>
                        <div className="text-emerald-200 leading-relaxed">
                          {card.codeTemplate}
                        </div>
                      </div>

                      {/* Multiple choice options if code reading */}
                      {card.options && card.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          {card.options.map((opt, idx) => (
                            <div 
                              key={idx} 
                              className={`text-[11px] font-mono px-2 py-1 rounded ${
                                card.correctOption === idx 
                                  ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300' 
                                  : 'text-slate-600'
                              }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Standard answer & Explanation details */}
                      <div className="bg-gray-50 rounded-xl p-3.5 text-[11px] text-gray-600 leading-relaxed space-y-1.5 border border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs font-mono">
                          <strong className="text-gray-700">標準解答：</strong>
                          <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded select-all">
                            {card.expectedAnswer}
                          </span>
                        </div>
                        <p className="text-gray-700">
                          <strong className="text-gray-800">💡 知識點剖析：</strong>{card.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white text-center py-12 rounded-2xl border border-gray-100 text-gray-400 text-xs">
                  找不到符合條件的 C++ 語法。試著換個關鍵字搜尋吧！
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: 溫室 (TORTOISE BIO-LAB VIEW) */}
        {/* ========================================================= */}
        {currentTab === 'pet' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
            {/* Left status panel */}
            <div className="md:col-span-8 bg-white border border-green-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[460px] relative overflow-hidden">
              
              {/* Pet Info Board */}
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    {isEditingName ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          maxLength={10}
                          className="bg-gray-50 border border-green-300 text-gray-800 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-green-500 font-display"
                          placeholder="小綠龜..."
                        />
                        <button
                          onClick={saveTortoiseName}
                          className="bg-green-600 text-white text-[10px] font-black font-display px-2.5 py-1.5 rounded-lg hover:bg-green-700 transition"
                        >
                          確定
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-black text-green-800 font-display tracking-wider">
                          {tortoise.name}
                        </h3>
                        <button
                          onClick={() => {
                            setTempName(tortoise.name);
                            setIsEditingName(true);
                          }}
                          className="text-gray-400 hover:text-green-600 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Level tag */}
                  <div className="bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full text-xs font-black font-display shadow-sm">
                    Lvl.{tortoise.level}
                  </div>
                </div>

                {/* XP level bar */}
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>學習經驗值 (SYNC XP)</span>
                    <span>{tortoise.xp} / {tortoise.level * 100} XP</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden p-[1px] border border-gray-200">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (tortoise.xp / (tortoise.level * 100)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Central Turtle Interactive Animator */}
              <div className="relative py-6 flex flex-col items-center justify-center">
                
                {/* Visual float elements */}
                <div className="absolute w-40 h-40 rounded-full border border-green-100/40 animate-spin pointer-events-none" style={{ animationDuration: '24s' }}></div>
                <div className="absolute w-32 h-32 rounded-full border border-dashed border-amber-200/50 animate-spin pointer-events-none" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>

                {/* Floating Effect text */}
                {petActionEffect && (
                  <div className="absolute top-1 bg-amber-500 text-white font-extrabold font-display text-[10px] tracking-widest px-3 py-1 rounded-full shadow-md z-10 animate-bounce">
                    {petActionEffect}
                  </div>
                )}

                {/* Speech dialogue bubble */}
                <div className="relative bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-6 text-xs text-amber-900 leading-relaxed max-w-[280px] text-center shadow-sm">
                  <p className="font-sans font-semibold italic">{tortoiseSpeech}</p>
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-50 border-r border-b border-amber-200 rotate-45"></div>
                </div>

                {/* Cute Turtle Body CSS - optimized to match the uploaded cartoon turtle */}
                <div className="w-40 h-36 relative flex items-center justify-center select-none cursor-pointer group animate-fade-in" onClick={handlePetTortoise}>
                  {/* Subtle Shadow */}
                  <div className="absolute bottom-1 w-28 h-4 bg-green-950/15 rounded-full blur-md"></div>
                  
                  {/* Outer scaling container for the entire turtle to prevent parts from flying apart when hovered */}
                  <div className="relative w-40 h-30 transform transition-transform duration-300 group-hover:scale-108 flex items-center justify-center">
                    
                    {/* The Premium Cartoon Turtle SVG */}
                    <svg viewBox="0 0 200 150" className="w-40 h-30 drop-shadow-[0_4px_6px_rgba(29,39,32,0.15)] select-none pointer-events-none z-10">
                      {/* Left Rear Leg (drawn in back) */}
                      <path
                        d="M 135 110 C 130 128, 120 138, 115 138 C 110 138, 114 125, 124 114"
                        fill="#92cba3"
                        stroke="#1d2720"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Tail (at the back) */}
                      <path
                        d="M 160 100 C 172 102, 182 94, 182 88 C 174 91, 164 94, 154 96 Z"
                        fill="#aed8bc"
                        stroke="#1d2720"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Right Rear Leg */}
                      <path
                        d="M 148 112 C 153 130, 160 140, 168 140 C 172 140, 170 132, 162 118"
                        fill="#aed8bc"
                        stroke="#1d2720"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Claw details for right rear leg */}
                      <path d="M 161 136 L 162 140" stroke="#1d2720" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 164 136 L 166 139" stroke="#1d2720" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 167 135 L 169 137" stroke="#1d2720" strokeWidth="2" strokeLinecap="round" />

                      {/* Left Front Leg (drawn in back) */}
                      <path
                        d="M 68 105 C 60 120, 52 128, 48 128 C 44 128, 48 118, 58 108"
                        fill="#92cba3"
                        stroke="#1d2720"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Head & Neck */}
                      <path
                        d="M 72 110 C 62 118, 45 118, 36 108 C 18 92, 16 68, 38 58 C 58 48, 76 65, 78 88 C 78 95, 78 102, 72 110 Z"
                        fill="#aed8bc"
                        stroke="#1d2720"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Eye */}
                      <ellipse cx="40" cy="74" rx="5.5" ry="6.5" fill="#1c241f" />
                      {/* Eye glint */}
                      <circle cx="38" cy="71" r="1.8" fill="#ffffff" />
                      <circle cx="42" cy="77" r="0.7" fill="#ffffff" />

                      {/* Smile */}
                      <path
                        d="M 28 88 Q 36 96 46 89"
                        fill="none"
                        stroke="#1c241f"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />

                      {/* Cheek blush */}
                      <ellipse cx="50" cy="85" rx="6.5" ry="5.5" fill="#eba4a3" />

                      {/* Right Front Leg */}
                      <path
                        d="M 78 110 C 76 130, 68 142, 56 144 C 51 144, 53 135, 62 120"
                        fill="#aed8bc"
                        stroke="#1d2720"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Claw details for right front leg */}
                      <path d="M 53 138 L 54 142" stroke="#1d2720" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 57 139 L 59 143" stroke="#1d2720" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 61 138 L 63 141" stroke="#1d2720" strokeWidth="2" strokeLinecap="round" />

                      {/* Main Shell Dome */}
                      <path
                        d="M 60 102 C 55 65, 82 28, 122 28 C 160 28, 180 65, 174 102 C 158 106, 120 108, 60 102 Z"
                        fill={
                          tortoise.appearance === 'cyborg' ? '#0e7490' :
                          tortoise.appearance === 'wizard' ? '#6d28d9' :
                          tortoise.appearance === 'explorer' ? '#b45309' : '#8cb792'
                        }
                        stroke="#1d2720"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Shell Rim / Bottom Trim */}
                      <path
                        d="M 58 102 C 100 108, 140 106, 176 102"
                        fill="none"
                        stroke="#1d2720"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />

                      {/* Shell scute outline patterns (similar to the cartoon turtle) */}
                      <path
                        d="M 90 60 Q 120 48 150 60 Q 155 80 145 95 Q 120 98 95 95 Q 85 80 90 60 Z"
                        fill="none"
                        stroke="#ccead2"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.85"
                      />
                      {/* Radiating dividers */}
                      <path d="M 122 28 L 120 48" stroke="#ccead2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                      <path d="M 85 45 L 98 56" stroke="#ccead2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                      <path d="M 160 45 L 142 56" stroke="#ccead2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                      <path d="M 64 72 L 90 68" stroke="#ccead2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                      <path d="M 172 72 L 150 68" stroke="#ccead2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                      <path d="M 68 92 L 94 88" stroke="#ccead2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                      <path d="M 168 92 L 146 88" stroke="#ccead2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                      <path d="M 120 98 L 120 104" stroke="#ccead2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                    </svg>

                    {/* Cosmetic hats according to appearance state */}
                    {tortoise.appearance === 'wizard' && (
                      <div className="absolute top-[10px] left-[22px] w-8 h-8 bg-purple-600 rotate-12 clip-triangle border-b border-purple-300 flex items-center justify-center shadow-sm z-20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                        <span className="text-[6px] text-yellow-300 block mt-4">★</span>
                      </div>
                    )}
                    {tortoise.appearance === 'explorer' && (
                      <div className="absolute top-[18px] left-[26px] bg-[#b33939] text-white rounded-sm text-[7px] px-1 font-bold border border-[#8b2d2d] z-20">
                        CAMP
                      </div>
                    )}
                    {tortoise.appearance === 'cyborg' && (
                      <div className="absolute top-[42px] left-[65px] w-3 h-3 bg-cyan-400 rounded-full animate-ping z-20"></div>
                    )}

                    {/* Equipped Shell Accessories */}
                    {tortoise.equippedAccessories?.shell === 'golden_shell' && (
                      <div className="absolute left-[48px] top-[22px] w-[91px] h-[59px] bg-yellow-400/15 rounded-[50%/60%_60%_40%_40%] border-2 border-yellow-400 animate-pulse shadow-[0_0_12px_rgba(250,204,21,0.55)] z-20 flex items-center justify-center">
                        <span className="absolute -top-1 -right-1 text-[10px]">✨</span>
                        <span className="absolute -bottom-1 -left-1 text-[10px]">✨</span>
                      </div>
                    )}
                    {tortoise.equippedAccessories?.shell === 'cyber_shield' && (
                      <>
                        <div className="absolute left-[44px] top-[18px] w-[99px] h-[67px] rounded-full border border-cyan-400/80 animate-ping pointer-events-none z-20" style={{ animationDuration: '2s' }} />
                        <div className="absolute left-[48px] top-[22px] w-[91px] h-[59px] bg-cyan-500/10 rounded-[50%/60%_60%_40%_40%] border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] z-20" />
                      </>
                    )}
                    {tortoise.equippedAccessories?.shell === 'flower_garden' && (
                      <div className="absolute left-[48px] top-[22px] w-[91px] h-[59px] z-20 pointer-events-none">
                        <span className="absolute top-1 left-3 text-[10px]">🌸</span>
                        <span className="absolute top-5 left-10 text-[9px]">🌻</span>
                        <span className="absolute top-2 left-14 text-[10px]">🌼</span>
                      </div>
                    )}

                    {/* Equipped Face Accessories */}
                    {tortoise.equippedAccessories?.face === 'sunglasses' && (
                      <span className="absolute left-[20px] top-[50px] text-lg select-none z-30">🕶️</span>
                    )}
                    {tortoise.equippedAccessories?.face === 'glasses' && (
                      <span className="absolute left-[24px] top-[52px] text-base select-none z-30">👓</span>
                    )}

                    {/* Equipped Head Accessories */}
                    {tortoise.equippedAccessories?.head === 'top_hat' && (
                      <span className="absolute left-[18px] top-[16px] text-xl select-none z-30 animate-bounce" style={{ animationDuration: '3.5s' }}>🎩</span>
                    )}
                    {tortoise.equippedAccessories?.head === 'party_hat' && (
                      <span className="absolute left-[20px] top-[18px] text-xl select-none z-30">🥳</span>
                    )}
                    {tortoise.equippedAccessories?.head === 'crown' && (
                      <span className="absolute left-[18px] top-[14px] text-xl select-none z-30 drop-shadow-[0_2px_4px_rgba(251,191,36,0.65)]">👑</span>
                    )}
                    {tortoise.equippedAccessories?.head === 'straw_hat' && (
                      <span className="absolute left-[16px] top-[18px] text-xl select-none z-30">👒</span>
                    )}

                    {/* Equipped Neck Accessories */}
                    {tortoise.equippedAccessories?.neck === 'bow_tie' && (
                      <span className="absolute left-[38px] top-[66px] text-xs select-none z-30">🎀</span>
                    )}
                    {tortoise.equippedAccessories?.neck === 'scarf' && (
                      <span className="absolute left-[34px] top-[62px] text-sm select-none z-30">🧣</span>
                    )}

                  </div>
                </div>

              </div>

              {/* Bottom inventory items summary */}
              <div className="flex justify-around bg-gray-50 p-3.5 rounded-2xl border border-gray-100 text-xs">
                <div className="text-center">
                  <span className="text-gray-400 block font-mono uppercase text-[9px]">Bio-matter</span>
                  <span className="font-bold text-green-700">🥬 {gameState.cabbages} PKG</span>
                </div>
                <div className="text-center border-l border-gray-200 pl-8">
                  <span className="text-gray-400 block font-mono uppercase text-[9px]">Fluid Coolant</span>
                  <span className="font-bold text-blue-500">🪣 {gameState.waterBuckets} CELL</span>
                </div>
                <div className="text-center border-l border-gray-200 pl-8">
                  <span className="text-gray-400 block font-mono uppercase text-[9px]">Appearance Mode</span>
                  <span className="font-bold text-amber-600 uppercase font-display text-[10px]">
                    {tortoise.appearance === 'baby' ? '幼龜期' :
                     tortoise.appearance === 'explorer' ? '探險小龜' :
                     tortoise.appearance === 'wizard' ? '大魔法龜' : '半機械智龜'}
                  </span>
                </div>
              </div>

            </div>

            {/* Right Interactive feeding controls */}
            <div className="md:col-span-4 space-y-4">
              {/* Pet Sub-tab navigation */}
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-gray-200 gap-1 select-none">
                <button
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setPetSubTab('nurture');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-black transition-all ${
                    petSubTab === 'nurture'
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  🧪 培育
                </button>
                <button
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setPetSubTab('shop');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-black transition-all ${
                    petSubTab === 'shop'
                      ? 'bg-white text-amber-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  🛍️ 商店
                </button>
                <button
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setPetSubTab('wardrobe');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-black transition-all ${
                    petSubTab === 'wardrobe'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  👚 衣櫥
                </button>
              </div>

              {/* SECTION A: NURTURE */}
              {petSubTab === 'nurture' && (
                <>
                  {/* Pet Stats parameters */}
                  <div className="bg-white border border-green-100 rounded-3xl p-5 shadow-sm space-y-4 font-display animate-fade-in">
                    <h4 className="text-sm font-black text-green-800">烏龜生命參數</h4>
                    
                    {/* Fullness bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-gray-500">🥬 飽食度</span>
                        <span className="text-green-600">{tortoise.fullness} / 100</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden p-[1px] border border-gray-200">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            tortoise.fullness < 30 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${tortoise.fullness}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Hydration bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-gray-500">💧 水分值</span>
                        <span className="text-blue-500">{tortoise.hydration} / 100</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden p-[1px] border border-gray-200">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            tortoise.hydration < 30 ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${tortoise.hydration}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Happiness bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-gray-500">❤️ 幸福感</span>
                        <span className="text-red-400">{tortoise.happiness} / 100</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden p-[1px] border border-gray-200">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            tortoise.happiness < 30 ? 'bg-red-500' : 'bg-red-400'
                          }`}
                          style={{ width: `${tortoise.happiness}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Feed options buttons */}
                  <div className="bg-white border border-green-100 rounded-3xl p-5 shadow-sm space-y-2.5 font-display animate-fade-in">
                    <h4 className="text-sm font-black text-green-800">培育指令控制</h4>
                    
                    <button
                      onClick={handleFeedTortoise}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-green-50 text-green-800 border border-green-200 hover:bg-green-100 transition text-xs font-bold"
                    >
                      <span className="flex items-center gap-1.5">🥬 餵高麗菜</span>
                      <span className="text-[10px] bg-green-200/60 px-2 py-0.5 rounded-full font-mono">
                        消耗 1 / 剩 {gameState.cabbages}
                      </span>
                    </button>

                    <button
                      onClick={handleWaterTortoise}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition text-xs font-bold"
                    >
                      <span className="flex items-center gap-1.5">🪣 餵灌溉聖水</span>
                      <span className="text-[10px] bg-blue-200/60 px-2 py-0.5 rounded-full font-mono">
                        消耗 1 / 剩 {gameState.waterBuckets}
                      </span>
                    </button>

                    <button
                      onClick={handlePetTortoise}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition text-xs font-bold"
                    >
                      <span className="flex items-center gap-1.5">👋 摸摸頭</span>
                      <span className="text-[10px] bg-rose-200/60 px-2 py-0.5 rounded-full font-mono">
                        無消耗 / 增加幸福
                      </span>
                    </button>

                    <button
                      onClick={handleTrainTortoise}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition text-xs font-bold"
                    >
                      <span className="flex items-center gap-1.5">🎓 C++ 腦力特訓</span>
                      <span className="text-[10px] bg-purple-200/60 px-2 py-0.5 rounded-full font-mono">
                        飽食與水分-20 / 大量XP
                      </span>
                    </button>
                  </div>
                </>
              )}

              {/* SECTION B: SHOP */}
              {petSubTab === 'shop' && (
                <div className="bg-white border border-amber-100 rounded-3xl p-5 shadow-sm space-y-4 font-display animate-fade-in">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h4 className="text-sm font-black text-amber-800 flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-amber-600" />
                      裝飾配件商店
                    </h4>
                    <span className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      🪙 {gameState.coins} CR
                    </span>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {ACCESSORY_SHOP_ITEMS.map((item) => {
                      const isOwned = (tortoise.ownedAccessories || []).includes(item.id);
                      return (
                        <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3 justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-xl shrink-0">{item.emoji}</span>
                              <span className="font-bold text-xs text-slate-800 truncate">{item.name}</span>
                              <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase font-mono tracking-wider font-semibold shrink-0">
                                {item.slot === 'head' ? '頭部' : item.slot === 'face' ? '臉部' : item.slot === 'neck' ? '頸部' : '龜殼'}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-normal">{item.description}</p>
                          </div>
                          
                          <div className="flex flex-col items-end justify-center shrink-0">
                            {isOwned ? (
                              <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded-xl font-bold font-display">
                                已擁有 ✓
                              </span>
                            ) : (
                              <button
                                onClick={() => handleBuyAccessory(item)}
                                className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] font-display flex items-center gap-1 shadow-sm transition-all ${
                                  gameState.coins >= item.price
                                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                                }`}
                              >
                                <span>🪙 {item.price}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION C: WARDROBE */}
              {petSubTab === 'wardrobe' && (
                <div className="bg-white border border-indigo-100 rounded-3xl p-5 shadow-sm space-y-4 font-display animate-fade-in">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h4 className="text-sm font-black text-indigo-800 flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-indigo-600" />
                      烏龜更衣衣櫥
                    </h4>
                    <span className="text-[10px] text-gray-400">穿戴你的解題戰利品</span>
                  </div>

                  {/* Equipped Slots Summary */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">當前穿戴狀態</span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['head', 'face', 'neck', 'shell'] as const).map((slot) => {
                        const equippedId = tortoise.equippedAccessories?.[slot];
                        const item = ACCESSORY_SHOP_ITEMS.find((i) => i.id === equippedId);
                        const slotName = slot === 'head' ? '頭部 🎩' : slot === 'face' ? '臉部 🕶️' : slot === 'neck' ? '頸部 🎀' : '龜殼 🛡️';
                        
                        return (
                          <div key={slot} className="p-2 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col justify-between h-14 relative">
                            <span className="text-[9px] text-slate-400 font-bold">{slotName}</span>
                            {item ? (
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-bold text-slate-700 truncate flex items-center gap-1 min-w-0">
                                  <span>{item.emoji}</span>
                                  <span className="truncate max-w-[55px]">{item.name}</span>
                                </span>
                                <button
                                  onClick={() => handleUnequipAccessory(slot)}
                                  className="text-[9px] text-rose-500 hover:text-rose-700 font-bold font-display shrink-0"
                                >
                                  卸下
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-gray-400 italic mt-1">無裝備</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Owned inventory list */}
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      我的置物櫃 (已擁有 {(tortoise.ownedAccessories || []).length} 件)
                    </span>
                    
                    {(tortoise.ownedAccessories || []).length === 0 ? (
                      <div className="text-center py-6 text-gray-400 text-xs">
                        <p>衣櫥空空如也 🥺</p>
                        <button
                          onClick={() => setPetSubTab('shop')}
                          className="mt-2 text-amber-500 hover:text-amber-600 font-bold text-[10px] underline"
                        >
                          前往商店選購吧 ➔
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
                        {ACCESSORY_SHOP_ITEMS.filter((item) => (tortoise.ownedAccessories || []).includes(item.id)).map((item) => {
                          const isEquipped = tortoise.equippedAccessories?.[item.slot] === item.id;
                          return (
                            <div 
                              key={item.id} 
                              className={`p-2 rounded-xl border flex items-center justify-between transition-colors ${
                                isEquipped 
                                  ? 'bg-indigo-50/50 border-indigo-200' 
                                  : 'bg-slate-50 hover:bg-slate-100 border-slate-100'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-lg shrink-0">{item.emoji}</span>
                                <div className="min-w-0">
                                  <p className="font-bold text-xs text-slate-800 truncate">{item.name}</p>
                                  <span className="text-[8px] text-indigo-500 font-medium">
                                    {item.slot === 'head' ? '頭部配件' : item.slot === 'face' ? '臉部配件' : item.slot === 'neck' ? '頸部配件' : '龜殼裝甲'}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  if (isEquipped) {
                                    handleUnequipAccessory(item.slot);
                                  } else {
                                    handleEquipAccessory(item);
                                  }
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold font-display transition-colors ${
                                  isEquipped
                                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                }`}
                              >
                                {isEquipped ? '裝備中 ✓' : '點擊穿戴'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: 統計 (STATISTICS VIEW) */}
        {/* ========================================================= */}
        {currentTab === 'stats' && (
          <div className="space-y-6 animate-fade-in">
            {/* Overview dashboard widget grids */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center space-y-1">
                <span className="text-2xl">🪙</span>
                <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">Total Credits</span>
                <span className="text-base font-black text-amber-600 font-display">{gameState.coins} CR</span>
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center space-y-1">
                <span className="text-2xl">🥬</span>
                <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">Harvested Bio</span>
                <span className="text-base font-black text-green-700 font-display">{gameState.cabbages} PKG</span>
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center space-y-1">
                <span className="text-2xl">🪣</span>
                <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">Fluid Coolants</span>
                <span className="text-base font-black text-blue-500 font-display">{gameState.waterBuckets} CELL</span>
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center space-y-1">
                <span className="text-2xl">🔥</span>
                <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">SYNC CORES</span>
                <span className="text-base font-black text-emerald-600 font-display">{irrigatedCount} / {fields.length} Cores</span>
              </div>
            </div>

            {/* In-depth details & achievements */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Detailed matrix list */}
              <div className="md:col-span-7 bg-white border border-green-100 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-green-800 border-b border-gray-100 pb-2.5 font-display">
                  各區良田灌溉進度
                </h3>
                
                <div className="space-y-3 font-sans max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                  {fields.map(plot => (
                    <div key={plot.id} className="flex items-center justify-between text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div>
                        <span className="font-bold text-gray-800 block">良田 #{plot.id}</span>
                        <span className="text-[10px] text-gray-400 font-mono">培育作物: {plot.cropName}</span>
                      </div>
                      <div className="text-right">
                        {plot.isIrrigated ? (
                          <span className="text-green-600 font-extrabold block">✓ 已灌溉 100%</span>
                        ) : (
                          <span className="text-gray-400 block">待解鎖</span>
                        )}
                        <span className="text-[10px] text-gray-400 font-mono">最高答對: {plot.bestStreak} / 10 題</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Milestone achievements */}
              <div className="md:col-span-5 bg-white border border-green-100 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-green-800 border-b border-gray-100 pb-2.5 font-display">
                  C++ 榮譽徽章與里程碑
                </h3>

                <div className="space-y-4">
                  {/* Badge 1 */}
                  <div className="flex gap-3 items-start">
                    <span className={`text-2xl p-1.5 rounded-full ${fields[0].isIrrigated ? 'bg-amber-100' : 'bg-gray-100 grayscale opacity-40'}`}>
                      🌱
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-gray-800 font-display">C++ 新手農夫</h4>
                      <p className="text-[10px] text-gray-500">成功完成第一塊良田（基礎輸入輸出）的 100% 完美灌溉。</p>
                    </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="flex gap-3 items-start">
                    <span className={`text-2xl p-1.5 rounded-full ${fields[4].isIrrigated ? 'bg-amber-100' : 'bg-gray-100 grayscale opacity-40'}`}>
                      🔁
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-gray-800 font-display">迴圈掌控大師</h4>
                      <p className="text-[10px] text-gray-500">成功完美灌溉重複結構迴圈田，徹底參透 for / while 迴圈原理。</p>
                    </div>
                  </div>

                  {/* Badge 3 */}
                  <div className="flex gap-3 items-start">
                    <span className={`text-2xl p-1.5 rounded-full ${fields[6].isIrrigated ? 'bg-amber-100' : 'bg-gray-100 grayscale opacity-40'}`}>
                      🗺
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-gray-800 font-display">指標指路人</h4>
                      <p className="text-[10px] text-gray-500">成功突破最深奧的第七關（指標與位址田），掌握 C++ 的靈魂！</p>
                    </div>
                  </div>

                  {/* Badge 4 */}
                  <div className="flex gap-3 items-start">
                    <span className={`text-2xl p-1.5 rounded-full ${irrigatedCount === fields.length ? 'bg-yellow-100 border border-yellow-300' : 'bg-gray-100 grayscale opacity-40'}`}>
                      👑
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-gray-800 font-display">C++ 語法帝國至尊</h4>
                      <p className="text-[10px] text-gray-500">完美灌溉全數 {fields.length} 區核心程式田，烏龜智者對你致上最高敬意！</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4.5: 成就 (ACHIEVEMENTS VIEW) */}
        {/* ========================================================= */}
        {currentTab === 'achievements' && (() => {
          // 既有普通成就清單 (完整保留，絕不破壞)
          const achievementsList = [
            {
              id: 'score_1',
              title: '🌱 C++ 初試身手',
              description: '在 C++ 良田中正確答對 5 個語法填空。',
              icon: '🌱',
              badgeColor: 'from-emerald-400 to-green-600',
              targetText: '答對題數',
              currentValue: gameState.score,
              targetValue: 5,
              isUnlocked: gameState.score >= 5,
            },
            {
              id: 'score_2',
              title: '📖 語法修行者',
              description: '熟能生巧！累積正確答對 30 個語法題目。',
              icon: '📖',
              badgeColor: 'from-sky-400 to-blue-600',
              targetText: '答對題數',
              currentValue: gameState.score,
              targetValue: 30,
              isUnlocked: gameState.score >= 30,
            },
            {
              id: 'score_3',
              title: '⚡ 編譯大宗師',
              description: '登峰造極！累積正確答對 100 個語法題目。',
              icon: '⚡',
              badgeColor: 'from-purple-500 to-indigo-700',
              targetText: '答對題數',
              currentValue: gameState.score,
              targetValue: 100,
              isUnlocked: gameState.score >= 100,
            },
            {
              id: 'coins_1',
              title: '🪙 第一桶金',
              description: '在良田中辛勤耕耘，累積儲蓄達 100 金幣。',
              icon: '🪙',
              badgeColor: 'from-yellow-400 to-amber-500',
              targetText: '持有金幣',
              currentValue: gameState.coins,
              targetValue: 100,
              isUnlocked: gameState.coins >= 100,
            },
            {
              id: 'coins_2',
              title: '💰 富甲良田',
              description: '富足的農業帝國！累積儲蓄達 500 金幣。',
              icon: '💰',
              badgeColor: 'from-amber-500 to-orange-600',
              targetText: '持有金幣',
              currentValue: gameState.coins,
              targetValue: 500,
              isUnlocked: gameState.coins >= 500,
            },
            {
              id: 'coins_3',
              title: '💎 微電子金控巨賈',
              description: '無可限量的財富！累積儲蓄達 1000 金幣。',
              icon: '💎',
              badgeColor: 'from-cyan-400 to-blue-600',
              targetText: '持有金幣',
              currentValue: gameState.coins,
              targetValue: 1000,
              isUnlocked: gameState.coins >= 1000,
            },
            {
              id: 'streak_1',
              title: '🔥 完美開端',
              description: '專注與精確！連續答對 5 個題目。',
              icon: '🔥',
              badgeColor: 'from-orange-400 to-red-500',
              targetText: '連續答對',
              currentValue: gameState.maxStreak || 0,
              targetValue: 5,
              isUnlocked: (gameState.maxStreak || 0) >= 5,
            },
            {
              id: 'streak_2',
              title: '🐉 勢如破竹',
              description: '無人能擋！連續答對 20 個題目。',
              icon: '🐉',
              badgeColor: 'from-red-500 to-rose-700',
              targetText: '連續答對',
              currentValue: gameState.maxStreak || 0,
              targetValue: 20,
              isUnlocked: (gameState.maxStreak || 0) >= 20,
            },
            {
              id: 'streak_3',
              title: '🔮 神之境界',
              description: '神乎其技！連續答對 50 個題目。',
              icon: '🔮',
              badgeColor: 'from-violet-600 to-purple-900',
              targetText: '連續答對',
              currentValue: gameState.maxStreak || 0,
              targetValue: 50,
              isUnlocked: (gameState.maxStreak || 0) >= 50,
            },
            {
              id: 'fields_1',
              title: '🚜 綠色革命',
              description: '成功完成並完美灌溉 3 區核心良田。',
              icon: '🚜',
              badgeColor: 'from-emerald-400 to-teal-600',
              targetText: '已灌溉區',
              currentValue: irrigatedCount,
              targetValue: 3,
              isUnlocked: irrigatedCount >= 3,
            },
            {
              id: 'fields_2',
              title: '🏰 莊園大領主',
              description: '功勳卓著！成功完成並完美灌溉 10 區核心良田。',
              icon: '🏰',
              badgeColor: 'from-rose-400 to-pink-600',
              targetText: '已灌溉區',
              currentValue: irrigatedCount,
              targetValue: 10,
              isUnlocked: irrigatedCount >= 10,
            },
            {
              id: 'pet_1',
              title: '🐢 神龜守護者',
              description: '細心照料！將你培育的 C++ 烏龜升級至等級 5。',
              icon: '🐢',
              badgeColor: 'from-teal-400 to-emerald-600',
              targetText: '烏龜等級',
              currentValue: tortoise.level,
              targetValue: 5,
              isUnlocked: tortoise.level >= 5,
            },
          ];

          const standardUnlockedCount = achievementsList.filter(a => a.isUnlocked).length;
          const standardTotalCount = achievementsList.length;

          // 隱藏成就處理 (傳說殿堂)
          const unlockedMap = gameState.unlockedAchievements || {};
          const unlockedSecrets: Array<{ def: SecretAchievementDefinition; record: SecretAchievementRecord }> = [];
          const lockedSecrets: SecretAchievementDefinition[] = [];

          SECRET_ACHIEVEMENTS.forEach(def => {
            const rec = unlockedMap[def.id];
            if (rec) {
              unlockedSecrets.push({ def, record: rec });
            } else {
              lockedSecrets.push(def);
            }
          });

          // 傳說殿堂排序：神話 (Mythic) -> 傳說 (Legendary) -> 史詩 (Epic)
          const rarityOrder = { mythic: 3, legendary: 2, epic: 1 };
          unlockedSecrets.sort((a, b) => {
            const diff = (rarityOrder[b.def.rarity] || 0) - (rarityOrder[a.def.rarity] || 0);
            if (diff !== 0) return diff;
            return b.record.unlockedAt.localeCompare(a.record.unlockedAt);
          });

          const secretUnlockedCount = unlockedSecrets.length;
          const secretTotalCount = SECRET_ACHIEVEMENTS.length;
          const totalAllAchievements = standardTotalCount + secretTotalCount;
          const totalUnlockedAll = standardUnlockedCount + secretUnlockedCount;
          const totalProgressPercent = Math.round((totalUnlockedAll / totalAllAchievements) * 100);

          return (
            <div className="space-y-8 animate-fade-in font-display">
              {/* TOP SUMMARY PROGRESS BAR */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-black text-emerald-400 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400 animate-bounce" />
                      C++ 語法良田成就殿堂 & 傳說圖鑑
                    </h2>
                    <p className="text-xs text-slate-300">
                      涵蓋常規農莊發展成就與 18 頂頂級 C++ 隱藏傳說榮譽！
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-black text-emerald-300 shadow-inner">
                      🌾 常規成就：{standardUnlockedCount} / {standardTotalCount}
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 px-3.5 py-1.5 rounded-full text-xs font-black text-purple-300 shadow-inner">
                      ✨ 隱藏傳說：{secretUnlockedCount} / {secretTotalCount}
                    </div>
                  </div>
                </div>

                {/* PROGRESS BAR COMPONENT */}
                <div className="mt-5 space-y-2">
                  <div className="w-full bg-slate-950 rounded-full h-4 border border-emerald-500/20 overflow-hidden p-0.5 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                      style={{ width: `${totalProgressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>🌱 綠意萌芽</span>
                    <span className="text-emerald-400 font-bold">
                      總成就達成率 {totalProgressPercent}% ({totalUnlockedAll}/{totalAllAchievements})
                    </span>
                    <span>👑 現代 C++ 傳奇宗師</span>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 1: 🏆 傳說殿堂 (LEGENDARY HALL - UNLOCKED SECRETS) */}
              {/* ========================================================= */}
              {unlockedSecrets.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-lg">
                        🏆
                      </div>
                      <div>
                        <h3 className="text-base font-black text-purple-300 flex items-center gap-2">
                          傳說殿堂（已解鎖隱藏成就）
                          <span className="text-xs font-mono font-normal text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full">
                            {unlockedSecrets.length} 頂已揭曉
                          </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          點擊卡片可放大查看詳細歷史、銘言與解鎖記錄
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
                    {unlockedSecrets.map(({ def, record }) => {
                      const rarityCfg = RARITY_CONFIG[def.rarity];
                      return (
                        <div
                          key={def.id}
                          onClick={() => {
                            playSynthSound('click', isMuted);
                            setViewingSecretDetail({ def, record });
                          }}
                          className={`group relative rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg bg-gradient-to-br ${rarityCfg.gradient} ${rarityCfg.cardBorder} ${rarityCfg.glow}`}
                        >
                          {/* Top row: badge & rarity tag */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                                {def.badgeEmoji}
                              </div>
                              <div>
                                <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition font-display">
                                  {def.title}
                                </h4>
                                <span className={`inline-block text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full mt-1 ${rarityCfg.tagBg}`}>
                                  ✦ {rarityCfg.label}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                            {def.description}
                          </p>

                          {/* Master Quote */}
                          <blockquote className="text-[11px] text-slate-400 italic border-l-2 border-slate-700 pl-2.5 my-2 leading-relaxed">
                            {def.quote}
                          </blockquote>

                          {/* Footer info: unlocked time & reward badges */}
                          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <span>解鎖於 {record.unlockedAt.split(' ')[0]}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400 font-bold">+{def.reward.coins}🪙</span>
                              <span className="text-emerald-400 font-bold">+{def.reward.cabbages}🥬</span>
                              <span className="text-sky-400 font-bold">+{def.reward.waterBuckets}🪣</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* SECTION 2: 🌾 常規良田成就 (STANDARD ACHIEVEMENTS) */}
              {/* ========================================================= */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-lg">
                      🌾
                    </div>
                    <div>
                      <h3 className="text-base font-black text-emerald-300 flex items-center gap-2">
                        常規良田成就
                        <span className="text-xs font-mono font-normal text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          {standardUnlockedCount} / {standardTotalCount}
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        基礎農業與 C++ 語法灌溉常規挑戰
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
                  {achievementsList.map(item => {
                    const percent = Math.min(100, Math.round((item.currentValue / item.targetValue) * 100));
                    return (
                      <div 
                        key={item.id} 
                        id={`achievement-card-${item.id}`}
                        className={`relative rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between overflow-hidden shadow-sm ${
                          item.isUnlocked 
                            ? 'bg-gradient-to-br from-slate-900/90 to-[#112323]/90 border-emerald-500/30 text-white shadow-[0_4px_20px_rgba(16,185,129,0.1)]' 
                            : 'bg-slate-950/90 border-slate-800/80 text-slate-400 opacity-75'
                        }`}
                      >
                        {/* Badge / Icon top section */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.badgeColor} flex items-center justify-center text-3xl shadow-md shrink-0 ${
                            !item.isUnlocked && 'grayscale opacity-40'
                          }`}>
                            {item.icon}
                          </div>
                          <div className="space-y-1">
                            <h3 className={`text-sm font-black font-display leading-tight tracking-wide ${
                              item.isUnlocked ? 'text-emerald-300' : 'text-slate-400'
                            }`}>
                              {item.title}
                            </h3>
                            <p className="text-[11px] leading-relaxed text-slate-300">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Progress tracking section at bottom */}
                        <div className="space-y-2 mt-auto pt-2 border-t border-slate-800/50">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span>{item.targetText}</span>
                            <span className={item.isUnlocked ? "text-emerald-400 font-bold" : "text-amber-400"}>
                              {item.currentValue} / {item.targetValue}
                            </span>
                          </div>
                          
                          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800/50">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${
                                item.isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center pt-1">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${
                              item.isUnlocked 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' 
                                : 'bg-slate-800 text-slate-500'
                            }`}>
                              {item.isUnlocked ? '✓ 已解鎖' : '🔒 未解鎖'}
                            </span>
                            {!item.isUnlocked && (
                              <span className="text-[9px] text-slate-500 font-mono">
                                已完成 {percent}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 3: 🔒 探索中的隱藏成就 (SECRET ACHIEVEMENTS TO DISCOVER) */}
              {/* ========================================================= */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg">
                      🔒
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-300 flex items-center gap-2">
                        未解鎖隱藏成就（待探索）
                        <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                          {lockedSecrets.length} 頂隱藏中
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        世界上還存在著強大的 C++ 奇蹟……在良田中達到特定特殊條件後才會揭曉！
                      </p>
                    </div>
                  </div>
                </div>

                {lockedSecrets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
                    {lockedSecrets.map(def => (
                      <div
                        key={def.id}
                        className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-inner relative overflow-hidden group"
                      >
                        <div className="flex items-start gap-3.5 mb-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl text-slate-600 shrink-0">
                            🔒
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-400 font-display">
                              ??? 隱藏成就
                            </h4>
                            <span className="inline-block text-[9px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full mt-1">
                              ✦ 神秘境界
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed italic mb-3">
                          「世界上還存在你尚未發現的 C++ 傳說……達成特殊條件後才會揭曉。」
                        </p>

                        <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-mono text-slate-600">
                          <span>狀態：尚未觸發</span>
                          <span className="text-slate-500">🔒 秘密鎖定</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-purple-950/20 border border-purple-500/30 rounded-3xl p-6">
                    <span className="text-4xl block mb-2">🎉</span>
                    <h4 className="text-base font-black text-purple-300 font-display">
                      不可思議！所有 18 項隱藏成就已全數解鎖！
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      你已經掌握了現代 C++ 與農莊良田的所有奧秘，堪稱傳奇！
                    </p>
                  </div>
                )}
              </div>

            </div>
          );
        })()}

        {/* ========================================================= */}
        {/* TAB 5: 設定 (SETTINGS VIEW) */}
        {/* ========================================================= */}
        {currentTab === 'settings' && (
          <div className="max-w-xl mx-auto bg-white border border-green-100 rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in font-display">
            <div>
              <h2 className="text-lg font-black text-green-800 border-b border-gray-100 pb-2.5">系統設定與重置</h2>
              <p className="text-xs text-gray-500 mt-1">在這裡管理您的遊戲音效、重新開始或深入了解我們設計這款 C++ 農場的初衷。</p>
            </div>

            {/* Settings options row */}
            <div className="space-y-4 font-sans text-xs">
              
              {/* Sound Option */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <span className="font-bold text-gray-800 block">遊戲音效系統</span>
                  <span className="text-[10px] text-gray-400">控制作答音、升級琶音等合成音效開關。</span>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`px-4 py-2 rounded-full font-bold text-xs font-display border transition-all ${
                    !isMuted 
                      ? 'bg-green-100 text-green-700 border-green-300 shadow-sm' 
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}
                >
                  {!isMuted ? '✓ 音效已開啟' : '🔇 已靜音'}
                </button>
              </div>

              {/* Onboarding Option */}
              <div className="flex items-center justify-between p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <div>
                  <span className="font-bold text-indigo-800 block">觀看新手導覽</span>
                  <span className="text-[10px] text-gray-400">重新播放 step-by-step 互動式新手教學，掌握遊戲核心操作。</span>
                </div>
                <button
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setOpenOnboarding(true);
                    setOnboardingStep(0);
                    setCurrentTab('farm');
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full font-bold text-xs font-display shadow-sm transition-colors"
                >
                  開始導覽 🚀
                </button>
              </div>

              {/* Reset Option */}
              <div className="flex items-center justify-between p-3.5 bg-red-50/50 rounded-2xl border border-red-100">
                <div>
                  <span className="font-bold text-red-800 block">重置所有核心系統</span>
                  <span className="text-[10px] text-gray-400">這將完全清空您的 3x3 灌溉進度、烏龜等級，並重新開始。</span>
                </div>
                <button
                  onClick={handleResetGame}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold text-xs font-display shadow-sm transition-colors"
                >
                  開始重設
                </button>
              </div>

              {/* Manual section */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-900 text-xs font-display">💡 完美通關秘笈與心法：</h4>
                <ul className="list-disc list-inside space-y-1.5 text-amber-800 text-[11px] leading-relaxed">
                  <li><strong>不要怕失敗：</strong>10 題需要一口氣全部答對，中途不小心編譯錯誤沒關係，隨時可以重新發射探針同步！</li>
                  <li><strong>善用「字庫」預習：</strong>我們為您準備了「字庫」分頁，裡面有全關卡 90+ 題型的標準語法答案與解說，先去字庫預習，答題通關更輕鬆！</li>
                  <li><strong>巡視溫室烏龜：</strong>烏龜肚子餓或水分值太低，將無法執行 C++ 高階腦力特訓，記得常用灌溉得來的白菜和聖水餵飽牠。</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* 5. GORGEOUS STICKY BOTTOM NAVIGATION BAR */}
      {/* ========================================================= */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-emerald-500/20 shadow-[0_-8px_32px_rgba(0,0,0,0.8)] backdrop-blur-md z-50 py-3.5 px-6">
        <div className="max-w-xl mx-auto flex items-center justify-between relative gap-2">
          
          {/* Circular Menu button 1: 地圖 */}
          <button
            id="tab-button-farm"
            onClick={() => {
              playSynthSound('click', isMuted);
              setActiveFieldId(null);
              setCurrentTab('farm');
            }}
            className="flex flex-col items-center gap-1 group relative focus:outline-none"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentTab === 'farm' 
                ? 'bg-emerald-400 text-slate-950 border border-emerald-300 scale-110 -translate-y-2.5 shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80'
            }`}>
              <Home className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-black tracking-wide font-display ${
              currentTab === 'farm' ? 'text-emerald-400 scale-105' : 'text-slate-500'
            }`}>
              地圖
            </span>
          </button>

          {/* Circular Menu button 2: 字庫 */}
          <button
            id="tab-button-cards"
            onClick={() => {
              playSynthSound('click', isMuted);
              setActiveFieldId(null);
              setCurrentTab('cards');
            }}
            className="flex flex-col items-center gap-1 group relative focus:outline-none"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentTab === 'cards' 
                ? 'bg-emerald-400 text-slate-950 border border-emerald-300 scale-110 -translate-y-2.5 shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-black tracking-wide font-display ${
              currentTab === 'cards' ? 'text-emerald-400 scale-105' : 'text-slate-500'
            }`}>
              字庫
            </span>
          </button>

          {/* Circular Menu button 3: 溫室 (Tortoise Sanctuary) */}
          <button
            id="tab-button-pet"
            onClick={() => {
              playSynthSound('click', isMuted);
              setActiveFieldId(null);
              setCurrentTab('pet');
            }}
            className="flex flex-col items-center gap-1 group relative focus:outline-none"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentTab === 'pet' 
                ? 'bg-emerald-400 text-slate-950 border border-emerald-300 scale-110 -translate-y-2.5 shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80'
            }`}>
              <User className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-black tracking-wide font-display ${
              currentTab === 'pet' ? 'text-emerald-400 scale-105' : 'text-slate-500'
            }`}>
              溫室
            </span>
          </button>

          {/* Circular Menu button 4: 統計 */}
          <button
            id="tab-button-stats"
            onClick={() => {
              playSynthSound('click', isMuted);
              setActiveFieldId(null);
              setCurrentTab('stats');
            }}
            className="flex flex-col items-center gap-1 group relative focus:outline-none"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentTab === 'stats' 
                ? 'bg-emerald-400 text-slate-950 border border-emerald-300 scale-110 -translate-y-2.5 shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80'
            }`}>
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-black tracking-wide font-display ${
              currentTab === 'stats' ? 'text-emerald-400 scale-105' : 'text-slate-500'
            }`}>
              統計
            </span>
          </button>

          {/* Circular Menu button 4.5: 成就 */}
          <button
            id="tab-button-achievements"
            onClick={() => {
              playSynthSound('click', isMuted);
              setActiveFieldId(null);
              setCurrentTab('achievements');
            }}
            className="flex flex-col items-center gap-1 group relative focus:outline-none"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentTab === 'achievements' 
                ? 'bg-emerald-400 text-slate-950 border border-emerald-300 scale-110 -translate-y-2.5 shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80'
            }`}>
              <Award className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-black tracking-wide font-display ${
              currentTab === 'achievements' ? 'text-emerald-400 scale-105' : 'text-slate-500'
            }`}>
              成就
            </span>
          </button>

          {/* Circular Menu button 5: 設定 */}
          <button
            id="tab-button-settings"
            onClick={() => {
              playSynthSound('click', isMuted);
              setActiveFieldId(null);
              setCurrentTab('settings');
            }}
            className="flex flex-col items-center gap-1 group relative focus:outline-none"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentTab === 'settings' 
                ? 'bg-emerald-400 text-slate-950 border border-emerald-300 scale-110 -translate-y-2.5 shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800/80'
            }`}>
              <Settings className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-black tracking-wide font-display ${
              currentTab === 'settings' ? 'text-emerald-400 scale-105' : 'text-slate-500'
            }`}>
              設定
            </span>
          </button>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* 6. STEP-BY-STEP HIGHLIGHTED ONBOARDING TOUR (新手導覽遮罩) */}
      {/* ========================================================= */}
      {openOnboarding && (
        <div className="fixed inset-0 z-[99999] overflow-hidden pointer-events-auto select-none">
          {/* Highlight Hole Backdrop via pure overlay styling with dark shadow */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2.5px] transition-all duration-300 pointer-events-auto"
            onClick={() => {
              // Clicking the background can either do nothing or advance/close, let's keep it safe.
            }}
          >
            {/* Highlighted Window with elegant floating ring */}
            {highlightRect && (
              <div 
                style={{
                  position: 'absolute',
                  top: highlightRect.top - 6,
                  left: highlightRect.left - 6,
                  width: highlightRect.width + 12,
                  height: highlightRect.height + 12,
                  borderRadius: highlightRect.borderRadius,
                  boxShadow: '0 0 0 9999px rgba(3, 7, 18, 0.85), 0 0 15px rgba(52, 211, 153, 0.65)',
                  border: '2px solid rgba(52, 211, 153, 0.85)',
                }}
                className="animate-pulse-light transition-all duration-300 pointer-events-none"
              />
            )}
          </div>

          {/* Interactive Tooltip Dialog Card */}
          <div 
            style={(() => {
              if (highlightRect) {
                // If target is in the bottom half of the screen, place tooltip above it
                if (highlightRect.top > window.innerHeight / 2) {
                  return {
                    position: 'absolute',
                    bottom: window.innerHeight - highlightRect.top + 16,
                    left: Math.max(16, Math.min(window.innerWidth - 340, highlightRect.left + highlightRect.width / 2 - 150)),
                    width: '300px',
                  };
                } else {
                  // Else place tooltip below it
                  return {
                    position: 'absolute',
                    top: highlightRect.top + highlightRect.height + 16,
                    left: Math.max(16, Math.min(window.innerWidth - 340, highlightRect.left + highlightRect.width / 2 - 150)),
                    width: '300px',
                  };
                }
              } else {
                // Centered welcome/input dialog
                return {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '340px',
                  maxWidth: 'calc(100vw - 32px)',
                };
              }
            })()}
            className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 shadow-2xl transition-all duration-300 pointer-events-auto text-slate-200 select-text flex flex-col space-y-4"
          >
            {/* Steps Progress Indicator */}
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-emerald-400 font-bold border-b border-emerald-500/10 pb-2">
              <span>🚀 C++ FARM GUIDE</span>
              <span>STEP {onboardingStep + 1} / 6</span>
            </div>

            {/* Step specific illustration & title */}
            {onboardingStep === 0 && (
              <div className="space-y-3">
                <div className="flex justify-center text-5xl py-2 animate-bounce">🚜</div>
                <h3 className="text-sm font-black text-center text-emerald-400 font-display">
                  🌾 歡迎來到 C++ 科技農場！
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed text-center">
                  這是一個將 **C++ 程式語法學習** 與 **虛擬農場經營** 完美結合的科技世界！你將扮演科技農夫，透過精準解題來灌溉伺服器良田、收成作物，並餵食與升級你的 C++ 守護小綠龜！
                </p>
              </div>
            )}

            {onboardingStep === 1 && (
              <div className="space-y-2">
                <h3 className="text-sm font-black text-emerald-400 font-display flex items-center gap-1.5">
                  <span>⚙️</span> 1. 難度篩選與佈局
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  點擊這裡可以隨時篩選 **🟢 基礎**、**🟡 中階**、**🔴 進階** 的田地，控制你的學習進度。
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  右方的佈局按鈕還可以任意在 **「滑動矩陣」** 與 **「智慧網格」** 之間切換喔！
                </p>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-2">
                <h3 className="text-sm font-black text-emerald-400 font-display flex items-center gap-1.5">
                  <span>🌱</span> 2. 挑選田地進行灌溉
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  地圖上的每塊泥土（如高亮的 1 號田地）都對應了專屬的 C++ 語法挑戰。
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  點擊田地即可進入編譯灌溉挑戰。連續答對 **10 道題** 即可完成灌溉，成功收成！
                </p>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-3">
                <h3 className="text-sm font-black text-emerald-400 font-display flex items-center gap-1.5">
                  <span>✍️</span> 3. 智慧輸入與編譯除錯
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  在挑戰中，你需要仔細閱讀程式上下文，並在輸入框中寫下正確的 C++ 關鍵字（例如 `int`, `cout`, `vector` ）。
                </p>

                {/* Simulated C++ input card */}
                <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/20 text-[10px] font-mono leading-relaxed space-y-1 select-none">
                  <div className="text-slate-500">// 填充 C++ 標準輸出語法</div>
                  <div>
                    <span className="text-pink-400">std::</span>
                    <span className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-1.5 py-0.5 rounded font-bold animate-pulse">cout</span>
                    <span className="text-slate-300"> &lt;&lt; </span>
                    <span className="text-amber-300">"Hello World!"</span>
                    <span className="text-slate-300">;</span>
                  </div>
                </div>

                <p className="text-[10px] text-amber-400 leading-snug">
                  💡 *除錯心法：如果填錯了，編譯器會噴出詳盡的真實錯誤訊息，幫助你從中學習與進步喔！*
                </p>
              </div>
            )}

            {onboardingStep === 4 && (
              <div className="space-y-2">
                <h3 className="text-sm font-black text-emerald-400 font-display flex items-center gap-1.5">
                  <span>🐢</span> 4. 溫室培育與餵食烏龜
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  成功灌溉良田會獲得 **高麗菜 🥬** 以及 **聖泉水 💧**！
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  切換到下方「溫室」分頁，即可餵食你的 **C++ 助手小綠龜**。看著牠成長升級，並跟你分享更深奧的程式智慧！
                </p>
              </div>
            )}

            {onboardingStep === 5 && (
              <div className="space-y-2">
                <h3 className="text-sm font-black text-emerald-400 font-display flex items-center gap-1.5">
                  <span>🏆</span> 5. 複習字庫、成就與統計
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  - **「字庫」**：收錄了所有關卡的語法、詳盡說明與代碼，是最佳的複習字典！
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  - **「成就」**：解鎖學習里程碑（如灌溉 5 區田地），領取高麗菜和聖水補給！
                </p>
                <p className="text-[11px] text-emerald-300/90 font-bold text-center pt-2 animate-pulse">
                  🚜 科技良田準備就緒，快去挑戰吧！ 🎉
                </p>
              </div>
            )}

            {/* Bottom Controls / Action buttons */}
            <div className="flex justify-between items-center pt-2 border-t border-emerald-500/10 gap-3">
              <button
                onClick={() => {
                  playSynthSound('click', isMuted);
                  setOpenOnboarding(false);
                  localStorage.setItem('cpp_farm_onboarding_completed', 'true');
                }}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors font-display"
              >
                跳過教學 ✕
              </button>

              <div className="flex gap-2">
                {onboardingStep > 0 && (
                  <button
                    onClick={() => {
                      playSynthSound('click', isMuted);
                      setOnboardingStep(prev => prev - 1);
                    }}
                    className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-xs font-bold hover:bg-slate-700 transition"
                  >
                    ◀ 上一步
                  </button>
                )}

                <button
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    if (onboardingStep < 5) {
                      setOnboardingStep(prev => prev + 1);
                    } else {
                      // Finished tutorial
                      setOpenOnboarding(false);
                      localStorage.setItem('cpp_farm_onboarding_completed', 'true');
                      playSynthSound('levelUp', isMuted);
                    }
                  }}
                  className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-full text-xs font-black hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 font-display"
                >
                  {onboardingStep === 5 ? '完成導覽 🎉' : '下一步 ➔'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. CUSTOM USER AUTHENTICATION DIALOG (學籍登錄/存檔同步彈窗) */}
      {/* ========================================================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop with elegant blur */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsAuthModalOpen(false)}
          />

          {/* Dialog Container */}
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative z-10 flex flex-col space-y-4 animate-fade-in text-slate-200">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="inline-block text-3xl animate-bounce">🌱</div>
              <h2 className="text-base font-black tracking-wider text-white font-display">
                C++ 良田農夫學籍登入
              </h2>
              <p className="text-[10px] text-emerald-400 font-mono tracking-wide uppercase">
                CHOOSE GOOGLE OR ANONYMOUS FARMER IDENTITY
              </p>
            </div>

            {/* Tab Selector: 快速登入 (Google / 匿名) vs 密碼帳號 */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  playSynthSound('click', isMuted);
                  setAuthMethodTab('quick');
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
                className={`py-2 text-xs font-bold rounded-lg transition font-display flex items-center justify-center gap-1.5 ${
                  authMethodTab === 'quick'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>⚡ 快速授權登入</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playSynthSound('click', isMuted);
                  setAuthMethodTab('account');
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
                className={`py-2 text-xs font-bold rounded-lg transition font-display flex items-center justify-center gap-1.5 ${
                  authMethodTab === 'account'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🔒 密碼帳號</span>
              </button>
            </div>

            {/* Error and Success states */}
            {authError && (
              <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-[11px] text-center font-medium leading-relaxed">
                ⚠️ {authError}
              </div>
            )}
            {authSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] text-center font-medium leading-relaxed">
                {authSuccess}
              </div>
            )}

            {/* Tab 1: 快速授權登入 (支援建立自訂暱稱 + Google + 匿名) */}
            {authMethodTab === 'quick' && (
              <div className="space-y-4">
                {/* 暱稱建立 / 設定區域 */}
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                      <span>🏷️ 設定你的農夫暱稱</span>
                      <span className="text-[10px] text-slate-400 font-normal">(登入後可隨時更換)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        playSynthSound('click', isMuted);
                        setCustomNickname(generateRandomNickname());
                      }}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono transition bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30"
                      title="隨機生成一個有趣的農夫暱稱"
                    >
                      🎲 隨機骰一個
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={customNickname}
                      onChange={(e) => setCustomNickname(e.target.value)}
                      placeholder="例如：C++ 鋤頭宗師、指標神農"
                      maxLength={18}
                      className="w-full bg-slate-900 text-slate-100 text-xs rounded-xl py-2 px-3 border border-emerald-500/40 focus:outline-none focus:border-emerald-400 transition"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    💡 點選下方按鈕後，將以自訂的「<strong>{customNickname || '隨機暱稱'}</strong>」作為您在良田中的代表名稱！
                  </p>
                </div>

                {/* Google 登入按鈕 */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={authLoading || !!socialLoadingProvider}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold py-2.5 px-4 rounded-xl shadow-md transition border border-slate-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {socialLoadingProvider === 'google' ? (
                    <span className="text-xs text-slate-700 animate-pulse">Google 登入連線中...</span>
                  ) : (
                    <>
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                      <span className="text-xs font-display text-slate-800">
                        使用 Google 帳號授權登入
                      </span>
                    </>
                  )}
                </button>

                {/* 分隔線 */}
                <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                  <div className="flex-1 h-px bg-slate-800" />
                  <span>或快速體驗</span>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>

                {/* 匿名登入 (訪客快速進入) */}
                <button
                  type="button"
                  onClick={handleAnonymousLogin}
                  disabled={authLoading || !!socialLoadingProvider}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-display text-xs"
                >
                  {socialLoadingProvider === 'anonymous' ? (
                    <span className="animate-pulse">建立匿名農夫進度中...</span>
                  ) : (
                    <>
                      <span>👤</span>
                      <span>以「{customNickname || '匿名農夫'}」立即開始遊戲</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Tab 2: 傳統自訂密碼帳號登入 / 註冊 */}
            {authMethodTab === 'account' && (
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                {/* Username */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">
                    學籍帳號 (Username)
                  </label>
                  <input
                    type="text"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    placeholder="輸入帳號 (至少 2 個字)"
                    maxLength={20}
                    required
                    className="w-full bg-[#070b14] text-slate-200 text-xs rounded-xl py-2.5 px-3 border border-slate-700 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">
                    安全密碼 (Password)
                  </label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="輸入密碼"
                    required
                    className="w-full bg-[#070b14] text-slate-200 text-xs rounded-xl py-2.5 px-3 border border-slate-700 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                {/* Actions */}
                <button
                  type="submit"
                  disabled={authLoading || !!socialLoadingProvider}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl py-2.5 text-xs font-black hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/15 font-display disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {authLoading ? '請稍候...' : authMode === 'login' ? '登入帳號 & 雲端同步 ➔' : '立即註冊帳號 ➔'}
                </button>

                {/* Toggle mode */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      playSynthSound('click', isMuted);
                      setAuthMode(authMode === 'login' ? 'register' : 'login');
                      setAuthError(null);
                      setAuthSuccess(null);
                    }}
                    className="text-[11px] text-slate-400 hover:text-emerald-400 transition underline decoration-dotted underline-offset-4 cursor-pointer"
                  >
                    {authMode === 'login' ? '沒有帳號？點此註冊一個 ➔' : '已有帳號？切換至登入 ➔'}
                  </button>
                </div>
              </form>
            )}

            {/* Footer tips / close */}
            <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-mono">CPP_FARM_AUTH_v2.0</span>
              <button
                type="button"
                onClick={() => {
                  playSynthSound('click', isMuted);
                  setIsAuthModalOpen(false);
                }}
                className="hover:text-slate-300 transition cursor-pointer font-mono"
              >
                [ 關閉視窗 ]
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7.5. NICKNAME MODIFICATION MODAL (農夫暱稱修改視窗) */}
      {/* ========================================================= */}
      {isNicknameModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsNicknameModalOpen(false)}
          />

          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 flex flex-col space-y-4 animate-fade-in text-slate-200">
            <div className="text-center space-y-1">
              <div className="inline-block text-3xl">✏️</div>
              <h2 className="text-base font-black tracking-wider text-white font-display">
                修改農夫暱稱
              </h2>
              <p className="text-[10px] text-emerald-400 font-mono">
                UPDATE YOUR DISPLAY NICKNAME
              </p>
            </div>

            <form onSubmit={handleUpdateNickname} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-300">
                    新農夫暱稱
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      playSynthSound('click', isMuted);
                      setNewNicknameInput(generateRandomNickname());
                    }}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-mono bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30"
                  >
                    🎲 隨機產生
                  </button>
                </div>
                <input
                  type="text"
                  value={newNicknameInput}
                  onChange={(e) => setNewNicknameInput(e.target.value)}
                  placeholder="輸入新的暱稱"
                  maxLength={18}
                  required
                  className="w-full bg-[#070b14] text-slate-100 text-xs rounded-xl py-2.5 px-3 border border-slate-700 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsNicknameModalOpen(false)}
                  className="flex-1 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingNickname || !newNicknameInput.trim()}
                  className="flex-1 py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-xl transition font-display disabled:opacity-50"
                >
                  {isUpdatingNickname ? '儲存中...' : '確認修改 ➔'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7.5. DAILY C++ CHALLENGE MODAL (每日限定挑戰彈窗) */}
      {/* ========================================================= */}
      <DailyChallengeModal
        isOpen={isDailyChallengeOpen}
        onClose={() => setIsDailyChallengeOpen(false)}
        todayDateKey={todayDateKey}
        dailyChallengeQuestion={dailyChallengeQuestion}
        dailyChallengeState={gameState.dailyChallenge}
        onCompleteChallenge={handleCompleteDailyChallenge}
        playSynthSound={playSynthSound}
        isMuted={isMuted}
      />

      {/* ========================================================= */}
      {/* 8. DAILY QUESTS DIALOG (每日任務彈窗) */}
      {/* ========================================================= */}
      {isDailyQuestOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop with elegant blur */}
          <div 
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            onClick={() => setIsDailyQuestOpen(false)}
          />

          {/* Dialog Container */}
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative z-10 flex flex-col space-y-4 animate-fade-in text-slate-200">
            {/* Header */}
            <div className="text-center space-y-1 relative">
              <button
                onClick={() => {
                  playSynthSound('click', isMuted);
                  setIsDailyQuestOpen(false);
                }}
                className="absolute right-0 top-0 text-slate-400 hover:text-white transition text-xs font-bold font-mono"
              >
                [ 關閉 ]
              </button>
              <div className="inline-block text-3xl animate-pulse">📅</div>
              <h2 className="text-base font-black tracking-wider text-white font-display">
                每日任務清單
              </h2>
              <p className="text-[10px] text-emerald-400 font-mono tracking-wide uppercase">
                DAILY QUESTS - COMPLETE FOR BONUS REWARDS
              </p>
            </div>

            {/* Claim Feedback message */}
            {claimFeedback && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] text-center font-medium animate-bounce">
                {claimFeedback}
              </div>
            )}

            {/* Quest items list */}
            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {QUEST_TEMPLATES.map((quest) => {
                const progress = gameState.dailyQuestsProgress?.[quest.id] || { currentValue: 0, isClaimed: false };
                const isCompleted = progress.currentValue >= quest.targetValue;
                const isClaimed = progress.isClaimed;
                const percent = Math.min(100, (progress.currentValue / quest.targetValue) * 100);

                return (
                  <div 
                    key={quest.id}
                    className={`p-3.5 rounded-2xl border transition duration-300 ${
                      isClaimed 
                        ? 'bg-slate-950/40 border-slate-800/80 opacity-60' 
                        : isCompleted 
                          ? 'bg-emerald-950/25 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                          : 'bg-[#0b0e14] border-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl p-1 bg-slate-900 rounded-xl border border-slate-800">
                        {quest.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                            {quest.title}
                            {isCompleted && !isClaimed && (
                              <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">可領取</span>
                            )}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">
                            {progress.currentValue} / {quest.targetValue}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          {quest.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              isClaimed 
                                ? 'bg-slate-600' 
                                : isCompleted 
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                                  : 'bg-emerald-500/60'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        {/* Rewards info and action */}
                        <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-slate-800/60">
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                            <span>獎勵：</span>
                            <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                              🪙 {quest.rewardCoins}
                            </span>
                            {quest.rewardCabbages > 0 && (
                              <span className="flex items-center gap-0.5 text-green-400 font-bold">
                                🥬 {quest.rewardCabbages}
                              </span>
                            )}
                            {quest.rewardWaterBuckets > 0 && (
                              <span className="flex items-center gap-0.5 text-sky-400 font-bold">
                                🪣 {quest.rewardWaterBuckets}
                              </span>
                            )}
                          </div>

                          {isClaimed ? (
                            <span className="text-[10px] text-slate-500 font-bold font-display">
                              ✓ 已領取
                            </span>
                          ) : isCompleted ? (
                            <button
                              onClick={() => handleClaimQuestReward(quest.id)}
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 font-black text-[10px] px-3 py-1 rounded-lg transition shadow-md shadow-emerald-500/10 font-display uppercase tracking-wider"
                            >
                              🎁 領取獎勵
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-bold font-display">
                              進行中
                            </span>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer tips */}
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>每日 00:00 自動重置</span>
              <button
                onClick={() => {
                  playSynthSound('click', isMuted);
                  setIsDailyQuestOpen(false);
                }}
                className="hover:text-slate-300 transition"
              >
                [ 關閉視窗 ]
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. SECRET ACHIEVEMENT UNLOCK CELEBRATION MODAL */}
      {/* ========================================================= */}
      <SecretAchievementUnlockModal
        achievement={newlyUnlockedSecret}
        onClose={() => setNewlyUnlockedSecret(null)}
        playSynthSound={playSynthSound}
        isMuted={isMuted}
      />

      {/* ========================================================= */}
      {/* 10. SECRET ACHIEVEMENT DETAIL / LORE MODAL */}
      {/* ========================================================= */}
      <SecretAchievementDetailModal
        detail={viewingSecretDetail}
        onClose={() => setViewingSecretDetail(null)}
        playSynthSound={playSynthSound}
        isMuted={isMuted}
      />

    </div>
  );
}
