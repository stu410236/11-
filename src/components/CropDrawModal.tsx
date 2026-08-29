import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BarChart2, Check, ArrowRight, X } from 'lucide-react';
import { CROPS, CropData, RARITY_CONFIG, CropRarity, drawCropWeighted, getCropById } from '../data/crops';
import { CropProbabilityModal } from './CropProbabilityModal';

interface CropDrawModalProps {
  isOpen: boolean;
  fieldId: number;
  fieldName: string;
  userKey?: string;
  isMuted?: boolean;
  onDrawComplete: (drawnCrop: CropData) => void;
  onPostpone: () => void;
  onClose: () => void;
}

// 播放抽取與揭曉專屬合成音效
function playCropDrawSynth(type: 'spin' | 'common' | 'rare' | 'epic' | 'legendary' | 'mythic', isMuted?: boolean) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (type === 'spin') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'common') {
      [392, 523.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.06, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } else if (type === 'rare') {
      [440, 554.37, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } else if (type === 'epic') {
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.09, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.5);
      });
    } else if (type === 'legendary' || type === 'mythic') {
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type === 'mythic' ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(type === 'mythic' ? 0.06 : 0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    }
  } catch (e) {}
}

export const CropDrawModal: React.FC<CropDrawModalProps> = ({
  isOpen,
  fieldId,
  fieldName,
  userKey = 'guest',
  isMuted = false,
  onDrawComplete,
  onPostpone,
  onClose
}) => {
  const [stage, setStage] = useState<'idle' | 'drawing' | 'revealing' | 'result'>('idle');
  const [displayedCropIndex, setDisplayedCropIndex] = useState<number>(0);
  const [drawnCrop, setDrawnCrop] = useState<CropData | null>(null);
  const [isProbabilityOpen, setIsProbabilityOpen] = useState<boolean>(false);
  const [isDrawingDisabled, setIsDrawingDisabled] = useState<boolean>(false);

  const animationTimerRef = useRef<any>(null);

  // 當彈窗開啟或 fieldId 改變時，重置為 idle
  useEffect(() => {
    if (isOpen) {
      setStage('idle');
      setDrawnCrop(null);
      setIsDrawingDisabled(false);
      setDisplayedCropIndex(0);
    }
    return () => {
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    };
  }, [isOpen, fieldId]);

  if (!isOpen) return null;

  // 玩家點擊「🌱 開始抽取」
  const handleStartDraw = () => {
    if (isDrawingDisabled || stage !== 'idle') return;
    setIsDrawingDisabled(true);
    setStage('drawing');

    // 依據玩家 UID + fieldId + 版本 seed 進行安全抽取
    const seed = `${userKey}:${fieldId}:crop_v1`;
    const finalCrop = drawCropWeighted(seed);
    setDrawnCrop(finalCrop);

    // 啟動快速旋轉輪播動畫 (約 2 秒)
    let speed = 60; // ms
    let currentIdx = 0;
    let ticks = 0;
    const maxTicks = 25; // 總輪播次數

    const runCarousel = () => {
      currentIdx = (currentIdx + 1) % CROPS.length;
      setDisplayedCropIndex(currentIdx);
      playCropDrawSynth('spin', isMuted);
      ticks++;

      if (ticks < maxTicks) {
        if (ticks > 15) {
          speed += 25; // 慢下來
        }
        animationTimerRef.current = setTimeout(runCarousel, speed);
      } else {
        // 停止輪播，鎖定目標作物
        setDisplayedCropIndex(CROPS.findIndex(c => c.id === finalCrop.id));
        setStage('revealing');

        // 播放稀有度專屬揭曉音效
        playCropDrawSynth(finalCrop.rarity, isMuted);

        // 揭曉動畫延遲後進入結果畫面
        const revealDuration = finalCrop.rarity === 'mythic' ? 1800 : 1200;
        setTimeout(() => {
          setStage('result');
          // 呼叫父層持久化寫入 state 與 Firestore
          onDrawComplete(finalCrop);
        }, revealDuration);
      }
    };

    runCarousel();
  };

  const currentCropInfo = stage === 'drawing' 
    ? CROPS[displayedCropIndex] 
    : (drawnCrop || CROPS[displayedCropIndex]);

  const rarityMeta = RARITY_CONFIG[currentCropInfo.rarity];

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, type: 'spring', damping: 20 }}
          className={`w-full max-w-md bg-gradient-to-b ${
            stage === 'result' && drawnCrop
              ? RARITY_CONFIG[drawnCrop.rarity].bgGradient
              : 'from-[#0d1629] to-[#080d19]'
          } border-2 ${
            stage === 'result' && drawnCrop
              ? RARITY_CONFIG[drawnCrop.rarity].borderColor
              : 'border-emerald-500/30'
          } rounded-3xl p-6 text-center text-slate-100 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-auto`}
        >
          {/* Background Ambient Glow */}
          <div
            className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-[90px] pointer-events-none opacity-40"
            style={{ backgroundColor: rarityMeta.color }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full blur-[90px] pointer-events-none opacity-30"
            style={{ backgroundColor: rarityMeta.color }}
          />

          {/* Close button (only available before draw starts or after completed) */}
          {(stage === 'idle' || stage === 'result') && (
            <button
              onClick={stage === 'result' ? onClose : onPostpone}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800/60 transition z-20"
              title="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* ── STAGE: IDLE (等待玩家手動點擊開始抽取) ── */}
          {stage === 'idle' && (
            <div className="space-y-6 relative z-10 py-2">
              {/* Header Badge & Title */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black font-display tracking-wider">
                  <span>🌾</span> 農田灌溉完成！
                </div>
                <h3 className="text-xl font-black text-slate-100 font-display">
                  第 {fieldId} 區良田土地已就緒
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  恭喜完成 10 題 C++ 語法編譯挑戰！現在可以手動抽取這塊農田將要永久種植的作物。
                </p>
              </div>

              {/* Center Mysterious Soil Box */}
              <div className="w-32 h-32 mx-auto rounded-3xl bg-slate-950/80 border-2 border-emerald-500/40 flex flex-col items-center justify-center relative shadow-[inset_0_0_20px_rgba(16,185,129,0.2)] group">
                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="text-5xl filter drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                >
                  🌱
                </motion.div>
                <span className="text-[10px] font-black font-mono text-emerald-400 mt-1 uppercase tracking-widest">
                  MYSTERY CROP
                </span>
                {/* Floating sparkles */}
                <div className="absolute -top-1 -right-1 text-xs animate-bounce">✨</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* Main Draw Button */}
                <button
                  onClick={handleStartDraw}
                  id="start-crop-draw-btn"
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-black text-sm py-3.5 px-6 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>🌱 開始抽取作物</span>
                </button>

                {/* Secondary Actions Row */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsProbabilityOpen(true)}
                    className="flex-1 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-700/80 transition flex items-center justify-center gap-1.5 font-display"
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>📊 機率一覽</span>
                  </button>

                  <button
                    onClick={onPostpone}
                    className="flex-1 bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-800 transition font-display"
                  >
                    稍後再抽
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE: DRAWING (輪播動畫中) ── */}
          {stage === 'drawing' && (
            <div className="space-y-6 relative z-10 py-6">
              <div className="space-y-1">
                <span className="text-xs text-emerald-400 font-mono font-bold animate-pulse">
                  [ PROBABILITY SYSTEM ENGAGED ]
                </span>
                <h3 className="text-lg font-black text-slate-100 font-display">
                  正在為第 {fieldId} 區良田選定作物...
                </h3>
              </div>

              {/* Spinning Carousel Display */}
              <div className="w-36 h-36 mx-auto rounded-3xl bg-slate-950 border-2 border-emerald-400/80 flex flex-col items-center justify-center relative shadow-[0_0_35px_rgba(16,185,129,0.4)]">
                <motion.div
                  key={currentCropInfo.id}
                  initial={{ scale: 0.7, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.05 }}
                  className="text-6xl"
                >
                  {currentCropInfo.icon}
                </motion.div>
                <div className="text-xs font-bold text-slate-300 mt-1 font-display truncate max-w-[100px]">
                  {currentCropInfo.name}
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                抽取中，請稍候...
              </div>
            </div>
          )}

          {/* ── STAGE: REVEALING (揭曉稀有度特效) ── */}
          {stage === 'revealing' && drawnCrop && (
            <div className="space-y-6 relative z-10 py-6">
              {/* Mythic Screen Dim / Burst effect */}
              {drawnCrop.rarity === 'mythic' && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -m-6 z-0 animate-pulse pointer-events-none" />
              )}

              <div className="space-y-1 relative z-10">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`inline-block text-xs font-black px-3 py-1 rounded-full border ${rarityMeta.borderColor} ${rarityMeta.textColor} bg-slate-950/80`}
                >
                  {rarityMeta.badge}
                </motion.span>
                <h3 className="text-lg font-black text-slate-100 font-display">
                  {drawnCrop.rarity === 'mythic'
                    ? '🌈 神話級至尊作物降臨！！'
                    : drawnCrop.rarity === 'legendary'
                    ? '✨ 傳奇稀世作物現身！'
                    : '🎉 作物破土熟成！'}
                </h3>
              </div>

              <motion.div
                initial={{ scale: 0.2, rotate: -20 }}
                animate={{ scale: [0.2, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 220 }}
                className="w-36 h-36 mx-auto rounded-3xl bg-slate-950/90 border-2 border-white/20 flex flex-col items-center justify-center relative shadow-[0_0_40px_rgba(255,255,255,0.3)] z-10"
              >
                <span className="text-7xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                  {drawnCrop.icon}
                </span>
              </motion.div>
            </div>
          )}

          {/* ── STAGE: RESULT (結果卡片) ── */}
          {stage === 'result' && drawnCrop && (
            <div className="space-y-5 relative z-10 py-2">
              {/* Header Title */}
              <div className="space-y-1">
                <span className="text-[11px] font-black tracking-widest text-emerald-400 font-mono uppercase block">
                  🌱 CROP DISCOVERED!
                </span>
                <h3 className="text-xl font-black text-slate-100 font-display">
                  收成確定！新作物加入良田
                </h3>
              </div>

              {/* Crop Main Card */}
              <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-5 space-y-3 shadow-inner">
                {/* Big Icon */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-7xl mx-auto filter drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] my-1"
                >
                  {drawnCrop.icon}
                </motion.div>

                {/* Names */}
                <div>
                  <h4 className="text-2xl font-black text-white font-display">
                    {drawnCrop.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
                    {drawnCrop.englishName}
                  </p>
                </div>

                {/* Rarity Pill & Probability */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className={`text-xs font-black font-display px-3 py-1 rounded-full border ${rarityMeta.borderColor} ${rarityMeta.textColor} bg-slate-900`}>
                    {rarityMeta.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                    出現機率 {drawnCrop.probability}%
                  </span>
                </div>

                {/* Crop Flavor Description */}
                <p className="text-xs text-slate-300 leading-relaxed pt-1 max-w-xs mx-auto">
                  {drawnCrop.description}
                </p>

                {/* Field Location Tag */}
                <div className="text-[11px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-500/20 py-1.5 px-3 rounded-xl inline-block">
                  已永久種植於第 <strong className="text-white font-black">{fieldId}</strong> 號良田
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black py-3 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 font-display"
                >
                  <Check className="w-4 h-4" />
                  <span>確定收下</span>
                </button>

                <button
                  onClick={() => setIsProbabilityOpen(true)}
                  className="w-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-bold text-xs py-2 rounded-xl border border-slate-800 transition flex items-center justify-center gap-1 font-display"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>查看機率一覽</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Probability Modal */}
      <CropProbabilityModal
        isOpen={isProbabilityOpen}
        onClose={() => setIsProbabilityOpen(false)}
      />
    </>
  );
};
