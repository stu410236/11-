import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Trophy, 
  History, 
  HelpCircle, 
  Package, 
  ArrowRight, 
  X, 
  Check, 
  RotateCw,
  Info,
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';
import { 
  GameState, 
  LotteryTier, 
  LotteryTierId, 
  LotteryPrizeBundle, 
  LotteryHistoryRecord,
  LotteryRewardItem
} from '../types';
import { 
  LOTTERY_TIERS, 
  LOTTERY_PRIZES, 
  LOTTERY_ITEMS_META, 
  weightedRandomLotteryTier, 
  selectPrizeFromTier,
  formatPrizeItemsSummary 
} from '../data/lottery';

interface HarvestFukubikiModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  onExecuteDraw: (tier: LotteryTier, prize: LotteryPrizeBundle) => void;
  onAddTestTicket?: () => void;
  playSynthSound: (type: 'correct' | 'wrong' | 'click' | 'irrigate' | 'feed' | 'water' | 'pet' | 'levelUp', isMuted: boolean) => void;
  isMuted: boolean;
}

export const HarvestFukubikiModal: React.FC<HarvestFukubikiModalProps> = ({
  isOpen,
  onClose,
  gameState,
  onExecuteDraw,
  onAddTestTicket,
  playSynthSound,
  isMuted
}) => {
  const [activeSubView, setActiveSubView] = useState<'main' | 'odds' | 'history' | 'inventory'>('main');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [revealedResult, setRevealedResult] = useState<{
    tier: LotteryTier;
    prize: LotteryPrizeBundle;
  } | null>(null);

  // 測試專用強制獎級 (僅在 DEV 模式生效)
  const [forceTierDev, setForceTierDev] = useState<LotteryTierId | undefined>(undefined);

  const lotteryTickets = gameState.lotteryTickets ?? 0;
  const historyList = gameState.lotteryHistory ?? [];
  const stats = gameState.lotteryStats ?? {
    totalDraws: 0,
    specialWins: 0,
    firstWins: 0,
    secondWins: 0,
    thirdWins: 0
  };

  // 當關閉或打開時重設內部子分頁
  useEffect(() => {
    if (isOpen) {
      setActiveSubView('main');
      setRevealedResult(null);
      setIsDrawing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 執行福引抽獎
  const handleStartDraw = (forcedTier?: LotteryTierId) => {
    if (isDrawing || lotteryTickets <= 0) {
      if (lotteryTickets <= 0) {
        playSynthSound('wrong', isMuted);
      }
      return;
    }

    setIsDrawing(true);
    playSynthSound('click', isMuted);

    // 1. 立即計算結果 (純演算法亂數，無 AI 介入)
    const targetTier = weightedRandomLotteryTier(forcedTier || forceTierDev);
    const selectedPrize = selectPrizeFromTier(targetTier.id);

    // 2. 立即將結果寫入狀態與存檔（防止重整作弊）
    onExecuteDraw(targetTier, selectedPrize);

    // 3. 旋轉木製八角抽選箱動畫 (約 2.2 秒)
    setRotationAngle(prev => prev + 720 + Math.floor(Math.random() * 360));

    // 旋轉期間播放音效提示
    const soundTimer1 = setTimeout(() => {
      playSynthSound('irrigate', isMuted);
    }, 400);
    const soundTimer2 = setTimeout(() => {
      playSynthSound('click', isMuted);
    }, 1200);

    // 4. 動畫結束後揭曉結果
    const finishTimer = setTimeout(() => {
      setIsDrawing(false);
      setRevealedResult({
        tier: targetTier,
        prize: selectedPrize
      });

      // 依獎級播放音效
      if (targetTier.id === 'special') {
        playSynthSound('levelUp', isMuted);
      } else if (targetTier.id === 'first') {
        playSynthSound('levelUp', isMuted);
      } else if (targetTier.id === 'second') {
        playSynthSound('correct', isMuted);
      } else {
        playSynthSound('correct', isMuted);
      }
    }, 2200);

    return () => {
      clearTimeout(soundTimer1);
      clearTimeout(soundTimer2);
      clearTimeout(finishTimer);
    };
  };

  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (!isDrawing) onClose();
        }}
      />

      {/* 主彈窗容器 */}
      <motion.div 
        initial={{ scale: 0.93, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative w-full max-w-lg bg-slate-900 border-2 border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.18)] text-slate-100 z-10 flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* 日式福引所風格頂部橫幅 (紅白飾紋 + Cyber Emerald) */}
        <div className="relative bg-gradient-to-r from-[#1c0f14] via-slate-900 to-[#0e211a] p-4 sm:p-5 border-b border-emerald-500/30 shrink-0">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-white via-red-500 via-white to-red-500 opacity-60" />
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-pulse">🌾</span>
                <h2 className="text-lg sm:text-xl font-black tracking-wider text-white font-display flex items-center gap-2">
                  豐收福引所
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-mono">
                    永久常駐
                  </span>
                </h2>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-400 font-mono tracking-widest flex items-center gap-1.5">
                <span>HARVEST FUKUBIKI</span>
                <span>•</span>
                <span className="text-amber-300">C++ 語法良田抽選處</span>
              </p>
            </div>

            <button
              onClick={() => {
                if (!isDrawing) {
                  playSynthSound('click', isMuted);
                  onClose();
                }
              }}
              disabled={isDrawing}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition text-sm font-mono disabled:opacity-30"
              title="關閉福引所"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 子導航切換列 */}
          <div className="flex items-center gap-1 mt-3 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                playSynthSound('click', isMuted);
                setActiveSubView('main');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                activeSubView === 'main'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🎟️ 福引抽選</span>
            </button>
            <button
              onClick={() => {
                playSynthSound('click', isMuted);
                setActiveSubView('odds');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                activeSubView === 'odds'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>📊 獎項與機率</span>
            </button>
            <button
              onClick={() => {
                playSynthSound('click', isMuted);
                setActiveSubView('inventory');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                activeSubView === 'inventory'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🎒 道具背包</span>
            </button>
            <button
              onClick={() => {
                playSynthSound('click', isMuted);
                setActiveSubView('history');
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                activeSubView === 'history'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>📜 抽獎紀錄</span>
            </button>
          </div>
        </div>

        {/* 內容區域 */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 scrollbar-cyber">
          {/* ========================================================================= */}
          {/* 視圖 1: 主抽選畫面 */}
          {/* ========================================================================= */}
          {activeSubView === 'main' && (
            <div className="space-y-5">
              {/* 福引券與統計資訊列 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-3.5 rounded-2xl border-2 border-amber-500/40 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
                    🎟️
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">持有福引券</div>
                    <div className="text-xl font-black text-white font-mono flex items-baseline gap-1">
                      <span>{lotteryTickets}</span>
                      <span className="text-xs font-normal text-slate-400">張</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-3.5 rounded-2xl border border-slate-700/60 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl shrink-0">
                    🏆
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">累計抽選次數</div>
                    <div className="text-xl font-black text-white font-mono flex items-baseline gap-1">
                      <span>{stats.totalDraws}</span>
                      <span className="text-xs font-normal text-slate-400">次</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 日式木製八角抽選箱與展示舞台 */}
              <div className="relative bg-gradient-to-b from-slate-950 via-[#111622] to-slate-950 border-2 border-emerald-500/30 rounded-3xl p-6 flex flex-col items-center justify-center overflow-hidden min-h-[240px]">
                {/* 舞台背景光效 */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />

                {/* 抽選箱主體 */}
                <div className="relative my-3 flex flex-col items-center">
                  {/* 木製八角抽選箱輪盤 */}
                  <motion.div
                    animate={{ rotate: rotationAngle }}
                    transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-36 h-36 relative flex items-center justify-center cursor-pointer select-none"
                    onClick={() => {
                      if (!isDrawing && lotteryTickets > 0) handleStartDraw();
                    }}
                  >
                    {/* 木製八角輪廓 */}
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-[#633a1e] via-[#8f562b] to-[#452714] border-4 border-[#d49b6a] shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center relative transform rotate-12">
                      {/* 金屬轉軸與飾條 */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border-2 border-amber-100 shadow-md flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#3d2010]" />
                      </div>
                      
                      {/* 抽選球出球口 */}
                      <div className="absolute -top-1 right-3 w-5 h-5 rounded-full bg-slate-950 border-2 border-amber-300/80 shadow-inner flex items-center justify-center">
                        <div className={`w-2.5 h-2.5 rounded-full ${isDrawing ? 'bg-amber-300 animate-ping' : 'bg-amber-400'}`} />
                      </div>

                      {/* 和風木紋飾線 */}
                      <div className="absolute inset-2 border border-amber-200/20 rounded-2xl pointer-events-none" />
                    </div>

                    {/* 金屬搖桿 */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-3 bg-amber-400 rounded-r-md border border-amber-200 shadow-sm flex items-center justify-end pr-0.5">
                      <div className="w-3 h-6 rounded-sm bg-red-700 border border-red-500 shadow-sm" />
                    </div>
                  </motion.div>

                  {/* 抽選箱木質底座 */}
                  <div className="w-44 h-5 bg-gradient-to-r from-[#452714] via-[#754422] to-[#452714] rounded-lg border-t-2 border-[#b07848] shadow-lg flex items-center justify-center -mt-2">
                    <span className="text-[9px] text-amber-200/60 font-mono tracking-widest">HARVEST FUKUBIKI</span>
                  </div>

                  {/* 旋轉狀態標籤 */}
                  {isDrawing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-2 bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)] flex items-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>抽選轉動中...</span>
                    </motion.div>
                  )}
                </div>

                <p className="text-xs text-slate-400 text-center mt-2">
                  {lotteryTickets > 0 ? (
                    <span className="text-emerald-300 font-medium">✨ 每次福引消耗 1 張福引券，100% 獲得精選獎項！</span>
                  ) : (
                    <span className="text-slate-400">目前福引券不足，可透過種植農田、每日限定題或成就解鎖取得。</span>
                  )}
                </p>
              </div>

              {/* 核心抽獎操作按鈕 */}
              <div className="space-y-2">
                <button
                  id="lottery-draw-button"
                  onClick={() => handleStartDraw()}
                  disabled={isDrawing || lotteryTickets <= 0}
                  className={`w-full py-4 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
                    lotteryTickets > 0
                      ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-[1.01] active:scale-[0.98] cursor-pointer'
                      : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
                  }`}
                >
                  <span className="text-xl">🎟️</span>
                  <span>
                    {isDrawing 
                      ? '福引轉動揭曉中...' 
                      : lotteryTickets > 0 
                        ? '開始福引（消耗 1 張券）' 
                        : '福引券不足（需 1 張）'}
                  </span>
                  {lotteryTickets > 0 && !isDrawing && <Sparkles className="w-5 h-5 text-slate-950 animate-bounce" />}
                </button>

                {/* 快捷取得說明 */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
                  <div className="font-bold text-slate-300 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-emerald-400" />
                    <span>福引券常駐取得管道：</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-400 pl-1">
                    <li>🌾 每種植 <strong>5 塊不同農田</strong>，即可領取 <strong>🎟️ 福引券 ×1</strong>（全滿 150 區共可得 30 張）。</li>
                    <li>📅 每日限定挑戰 <strong>第 1 次答對</strong>，額外獲得 <strong>🎟️ 福引券 ×1</strong>（每日限定 1 張）。</li>
                    <li>🏆 成功解鎖 <strong>新成就或隱藏成就</strong>，每項皆獲得 <strong>🎟️ 福引券 ×1</strong>。</li>
                  </ul>
                </div>
              </div>

              {/* 僅限 DEV / 測試環境的測試輔助面板 */}
              {((import.meta as any).env?.DEV || process.env.NODE_ENV !== 'production') && (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>[DEV 測試專用面板]</span>
                    </span>
                    <button
                      onClick={onAddTestTicket}
                      className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 border border-amber-400/40 px-2 py-0.5 rounded text-[10px] font-mono transition"
                    >
                      +1 測試券
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-[10px]">
                    <button
                      onClick={() => handleStartDraw('special')}
                      disabled={isDrawing || lotteryTickets <= 0}
                      className="bg-rose-900/50 hover:bg-rose-800/80 border border-rose-500/50 text-rose-200 py-1 rounded font-bold transition disabled:opacity-40"
                    >
                      強制 特等 (2%)
                    </button>
                    <button
                      onClick={() => handleStartDraw('first')}
                      disabled={isDrawing || lotteryTickets <= 0}
                      className="bg-amber-900/50 hover:bg-amber-800/80 border border-amber-500/50 text-amber-200 py-1 rounded font-bold transition disabled:opacity-40"
                    >
                      強制 一等 (8%)
                    </button>
                    <button
                      onClick={() => handleStartDraw('second')}
                      disabled={isDrawing || lotteryTickets <= 0}
                      className="bg-slate-700/50 hover:bg-slate-600/80 border border-slate-400/50 text-slate-200 py-1 rounded font-bold transition disabled:opacity-40"
                    >
                      強制 二等 (25%)
                    </button>
                    <button
                      onClick={() => handleStartDraw('third')}
                      disabled={isDrawing || lotteryTickets <= 0}
                      className="bg-emerald-900/50 hover:bg-emerald-800/80 border border-emerald-500/50 text-emerald-200 py-1 rounded font-bold transition disabled:opacity-40"
                    >
                      強制 三等 (65%)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 視圖 2: 獎項與機率說明 */}
          {/* ========================================================================= */}
          {activeSubView === 'odds' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>福引獎級與機率公開</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    機率總和 100%
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  福引券皆由玩家學習收穫獲得，絕無銘謝惠顧或落空，每次抽選保證獲得以下獎級之實用資源！
                </p>
              </div>

              {/* 獎級清單 */}
              <div className="space-y-3">
                {LOTTERY_TIERS.map(tier => {
                  const prizes = LOTTERY_PRIZES[tier.id] || [];
                  return (
                    <div 
                      key={tier.id}
                      className="bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-3.5 space-y-2.5 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{tier.emoji}</span>
                          <div>
                            <span className="font-bold text-sm text-white">{tier.name}</span>
                            <span className="text-[10px] text-slate-400 ml-2">{tier.description}</span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-black font-mono ${tier.badgeBg}`}>
                          {tier.probability}%
                        </span>
                      </div>

                      {/* 該獎級包含的組合清單 */}
                      <div className="bg-slate-900/80 rounded-xl p-2.5 space-y-1.5 border border-slate-800/80 text-xs">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">可能獲得獎項組合：</div>
                        <div className="space-y-1">
                          {prizes.map((p, idx) => (
                            <div key={p.id} className="flex items-start gap-1.5 text-slate-300">
                              <span className="text-emerald-400 font-mono font-bold">#{idx + 1}</span>
                              <span className="font-medium text-slate-200">{p.title}：</span>
                              <span className="text-slate-400">{formatPrizeItemsSummary(p.items)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 視圖 3: 道具背包 */}
          {/* ========================================================================= */}
          {activeSubView === 'inventory' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span>農夫專屬道具背包</span>
                </h3>
                <p className="text-xs text-slate-400">
                  點擊或查看各道具功能，於遊戲各系統中使用發揮強大效果。
                </p>
              </div>

              {/* 道具九宮格 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. 金幣 */}
                <div className="bg-slate-950/60 border border-amber-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-amber-500/10 rounded-xl shrink-0">🪙</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-amber-200">金幣 (Coins)</span>
                      <span className="text-sm font-black font-mono text-white">{gameState.coins}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">語法良田基礎通用貨幣，用於灌溉與各項解鎖。</p>
                  </div>
                </div>

                {/* 2. 鑽石 */}
                <div className="bg-slate-950/60 border border-cyan-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-cyan-500/10 rounded-xl shrink-0">💎</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-cyan-200">鑽石 (Diamonds)</span>
                      <span className="text-sm font-black font-mono text-cyan-300">{gameState.diamonds ?? 0}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">稀有珍貴貨幣，未來可用於特殊兌換與外觀解鎖。</p>
                  </div>
                </div>

                {/* 3. 提示券 */}
                <div className="bg-slate-950/60 border border-yellow-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-yellow-500/10 rounded-xl shrink-0">💡</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-yellow-200">提示券 (Hint Tickets)</span>
                      <span className="text-sm font-black font-mono text-yellow-300">{gameState.hintTickets ?? 0}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">答題遇到困難時可免費取得精準 C++ 語法提示。</p>
                  </div>
                </div>

                {/* 4. 除蟲劑 */}
                <div className="bg-slate-950/60 border border-purple-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-purple-500/10 rounded-xl shrink-0">🧪</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-purple-200">除蟲劑 (Pesticide)</span>
                      <span className="text-sm font-black font-mono text-purple-300">{gameState.pesticides ?? 0}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">害蟲防衛答錯時，可消耗 1 瓶獲得重新回答機會。</p>
                  </div>
                </div>

                {/* 5. 防蟲網 */}
                <div className="bg-slate-950/60 border border-blue-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-blue-500/10 rounded-xl shrink-0">🛡️</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-blue-200">防蟲網 (Pest Net)</span>
                      <span className="text-sm font-black font-mono text-blue-300">{gameState.pestNets ?? 0}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">可以事先保護農田，降低蟲害造成的作物枯萎損失。</p>
                  </div>
                </div>

                {/* 6. 復甦肥料 */}
                <div className="bg-slate-950/60 border border-emerald-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-emerald-500/10 rounded-xl shrink-0">🌱</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-200">復甦肥料 (Recovery)</span>
                      <span className="text-sm font-black font-mono text-emerald-300">{gameState.recoveryFertilizers ?? 0}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">作物枯萎時使用，可大幅減少復育所需的復習題數。</p>
                  </div>
                </div>

                {/* 7. 烏龜點心 */}
                <div className="bg-slate-950/60 border border-teal-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-teal-500/10 rounded-xl shrink-0">🐢</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-teal-200">烏龜點心 (Tortoise Treat)</span>
                      <span className="text-sm font-black font-mono text-teal-300">{gameState.tortoiseTreats ?? 0}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">小綠龜最愛的營養零嘴，可增加小綠龜經驗值（XP）。</p>
                  </div>
                </div>

                {/* 8. 聖泉水 */}
                <div className="bg-slate-950/60 border border-sky-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-sky-500/10 rounded-xl shrink-0">💧</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-sky-200">聖泉水 (Water)</span>
                      <span className="text-sm font-black font-mono text-sky-300">{gameState.waterBuckets}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">滋潤良田的高純度能量泉水，用於作物成長。</p>
                  </div>
                </div>

                {/* 9. 高麗菜 */}
                <div className="bg-slate-950/60 border border-green-500/30 rounded-2xl p-3 flex items-start gap-3">
                  <span className="text-2xl p-2 bg-green-500/10 rounded-xl shrink-0">🥬</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-green-200">高麗菜 (Cabbage)</span>
                      <span className="text-sm font-black font-mono text-green-300">{gameState.cabbages}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">小綠龜最喜愛的飽食主食，餵食增加飽足感。</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 視圖 4: 抽獎歷史紀錄 */}
          {/* ========================================================================= */}
          {activeSubView === 'history' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <History className="w-4 h-4 text-emerald-400" />
                    <span>最近福引紀錄 (最多 30 筆)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    記錄玩家在豐收福引所抽中的幸運獎勵歷史。
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">特等次數</div>
                  <div className="text-sm font-black text-rose-400 font-mono">{stats.specialWins} 次</div>
                </div>
              </div>

              {historyList.length === 0 ? (
                <div className="bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs">
                  尚無福引紀錄，前往【福引抽選】開始抽取您的第一份豐收大獎吧！
                </div>
              ) : (
                <div className="space-y-2">
                  {historyList.map(record => {
                    const tierMeta = LOTTERY_TIERS.find(t => t.id === record.tier) || LOTTERY_TIERS[3];
                    return (
                      <div 
                        key={record.id}
                        className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`px-2 py-0.5 rounded-full font-black text-[10px] shrink-0 ${tierMeta.badgeBg}`}>
                            {tierMeta.emoji} {tierMeta.name}
                          </span>
                          <div className="truncate">
                            <span className="font-bold text-slate-200">{record.prizeTitle}</span>
                            <div className="text-[10px] text-slate-400 truncate">{record.itemsSummary}</div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0">
                          {record.drawnAt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 揭曉結果動畫卡片 (Result Modal Overlay) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {revealedResult && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* 結果專用背景調暗 */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 backdrop-blur-md transition-all ${
                revealedResult.tier.id === 'special' 
                  ? 'bg-slate-950/95' 
                  : 'bg-slate-950/85'
              }`}
            />

            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 280 }}
              className={`relative w-full max-w-sm rounded-3xl p-6 text-center text-white z-20 overflow-hidden shadow-2xl border-2 ${
                revealedResult.tier.id === 'special'
                  ? 'bg-gradient-to-b from-slate-900 via-[#260f1e] to-slate-950 border-rose-400 shadow-[0_0_60px_rgba(244,63,94,0.4)]'
                  : revealedResult.tier.id === 'first'
                    ? 'bg-gradient-to-b from-slate-900 via-[#261e0e] to-slate-950 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.3)]'
                    : revealedResult.tier.id === 'second'
                      ? 'bg-gradient-to-b from-slate-900 via-[#18202b] to-slate-950 border-slate-300 shadow-[0_0_30px_rgba(203,213,225,0.2)]'
                      : 'bg-gradient-to-b from-slate-900 via-[#0e211a] to-slate-950 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
              }`}
            >
              {/* 特等光彩背景 */}
              {revealedResult.tier.id === 'special' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(244,63,94,0.25),transparent_70%)] animate-pulse pointer-events-none" />
              )}

              {/* 獎級標題與 Emoji */}
              <div className="relative space-y-2">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
                  className="text-5xl my-2 inline-block animate-bounce"
                >
                  {revealedResult.tier.emoji}
                </motion.div>

                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${revealedResult.tier.badgeBg}`}>
                    {revealedResult.tier.name}！！
                  </span>
                  <h3 className="text-xl font-black text-white mt-1 font-display">
                    {revealedResult.prize.title}
                  </h3>
                </div>

                {/* 獲獎道具清單 */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 my-4 space-y-2 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">🎉 獲得獎勵清單：</div>
                  <div className="space-y-1.5">
                    {revealedResult.prize.items.map((item, idx) => {
                      const meta = LOTTERY_ITEMS_META[item.type];
                      return (
                        <div key={idx} className="flex items-center justify-between bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{meta?.emoji || '🎁'}</span>
                            <span className="text-xs font-bold text-slate-200">{meta?.name || item.type}</span>
                          </div>
                          <span className={`text-sm font-black font-mono ${meta?.color || 'text-white'}`}>
                            +{item.amount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 確定按鈕 */}
                <button
                  onClick={() => {
                    playSynthSound('click', isMuted);
                    setRevealedResult(null);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition active:scale-95 cursor-pointer"
                >
                  🎉 確定收下
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
