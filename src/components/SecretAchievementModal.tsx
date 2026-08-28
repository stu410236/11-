import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, X, Shield, Award, Flame, Check } from 'lucide-react';
import { SecretAchievementDefinition, RARITY_CONFIG } from '../data/secretAchievements';
import { SecretAchievementRecord } from '../types';

interface UnlockModalProps {
  achievement: SecretAchievementDefinition | null;
  onClose: () => void;
}

/**
 * 隱藏成就解鎖慶祝彈窗（分階段震撼解鎖體驗）
 */
export const SecretAchievementUnlockModal: React.FC<UnlockModalProps> = ({ achievement, onClose }) => {
  const [phase, setPhase] = useState<'signal' | 'reveal'>('signal');

  useEffect(() => {
    if (!achievement) return;
    setPhase('signal');
    const timer = setTimeout(() => {
      setPhase('reveal');
    }, 600);
    return () => clearTimeout(timer);
  }, [achievement]);

  if (!achievement) return null;

  const rarityConfig = RARITY_CONFIG[achievement.rarity];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className={`relative z-10 w-full max-w-md bg-gradient-to-b ${rarityConfig.gradient} border-2 ${rarityConfig.cardBorder} ${rarityConfig.glow} rounded-3xl p-6 text-slate-100 font-display overflow-hidden shadow-2xl`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Phase 1: Unknown Signal */}
          {phase === 'signal' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
              <span className="text-4xl animate-bounce">⚠️</span>
              <p className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase">
                UNKNOWN SIGNAL DETECTED...
              </p>
              <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-amber-400 animate-pulse" />
              </div>
            </div>
          )}

          {/* Phase 2: Full Reveal */}
          {phase === 'reveal' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-5 text-center"
            >
              {/* Header Label */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-black tracking-wider uppercase shadow-inner">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
                  SECRET ACHIEVEMENT UNLOCKED!
                </div>
                <p className="text-[10px] text-slate-400 font-mono">傳說成就已永久解鎖並同步至雲端</p>
              </div>

              {/* Central Badge & Icon */}
              <div className="relative py-2 flex justify-center">
                <div className="relative">
                  {/* Glowing background ring */}
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 ${rarityConfig.border} flex items-center justify-center text-5xl shadow-2xl`}>
                    {achievement.badgeEmoji}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md">
                    {rarityConfig.badgeText}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-wide text-white font-display">
                  {achievement.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  {achievement.description}
                </p>
                <p className="text-[11px] text-emerald-400/90 italic font-mono bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  {achievement.quote}
                </p>
              </div>

              {/* Rewards Claimed */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex justify-around text-xs font-mono">
                <div className="text-center">
                  <span className="text-slate-400 block text-[9px] uppercase">Gold Reward</span>
                  <span className="font-bold text-amber-400">🪙 +{achievement.reward.coins}</span>
                </div>
                {achievement.reward.cabbages > 0 && (
                  <div className="text-center border-l border-slate-800 pl-3">
                    <span className="text-slate-400 block text-[9px] uppercase">Cabbage</span>
                    <span className="font-bold text-green-400">🥬 +{achievement.reward.cabbages}</span>
                  </div>
                )}
                {achievement.reward.waterBuckets > 0 && (
                  <div className="text-center border-l border-slate-800 pl-3">
                    <span className="text-slate-400 block text-[9px] uppercase">Spring Water</span>
                    <span className="font-bold text-blue-400">🪣 +{achievement.reward.waterBuckets}</span>
                  </div>
                )}
              </div>

              {/* Confirm Button */}
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black rounded-2xl text-xs transition shadow-lg shadow-emerald-500/25 active:scale-[0.98]"
              >
                收下榮譽與獎勵 🌟
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface DetailModalProps {
  achievement: SecretAchievementDefinition | null;
  record: SecretAchievementRecord | null;
  onClose: () => void;
}

/**
 * 隱藏成就詳情展示彈窗 (點擊已解鎖卡片時查看)
 */
export const SecretAchievementDetailModal: React.FC<DetailModalProps> = ({ achievement, record, onClose }) => {
  if (!achievement) return null;

  const rarityConfig = RARITY_CONFIG[achievement.rarity];

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative z-10 w-full max-w-md bg-gradient-to-b ${rarityConfig.gradient} border-2 ${rarityConfig.cardBorder} rounded-3xl p-6 text-slate-100 font-display shadow-2xl space-y-5 animate-fade-in`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3">
          <div className={`w-16 h-16 rounded-2xl bg-slate-900 border-2 ${rarityConfig.border} flex items-center justify-center text-3xl shrink-0 shadow-lg`}>
            {achievement.badgeEmoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-white">{achievement.title}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${rarityConfig.tagBg}`}>
                {rarityConfig.badgeText}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              Badge ID: <span className="text-emerald-400">{achievement.badgeId}</span>
            </p>
          </div>
        </div>

        {/* Description & Quote */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-3 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">成就達成條件</span>
            <p className="text-slate-200 leading-relaxed font-sans">{achievement.description}</p>
          </div>

          <div className="border-t border-slate-800/80 pt-2 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">語法箴言</span>
            <p className="text-emerald-300 italic font-mono text-[11px] leading-relaxed">{achievement.quote}</p>
          </div>
        </div>

        {/* Unlock Date & Status */}
        <div className="flex justify-between items-center bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">解鎖時間</span>
          <span className="text-slate-200 font-bold">
            {record?.unlockedAt || '已解鎖'}
          </span>
        </div>

        {/* Rewards Summary */}
        <div className="flex justify-around bg-slate-950/80 p-3 rounded-xl border border-slate-800/60 text-xs font-mono text-center">
          <div>
            <span className="text-slate-400 block text-[9px]">獎勵金幣</span>
            <span className="text-amber-400 font-bold">🪙 {achievement.reward.coins}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px]">獎勵高麗菜</span>
            <span className="text-green-400 font-bold">🥬 {achievement.reward.cabbages}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px]">獎勵聖泉水</span>
            <span className="text-blue-400 font-bold">🪣 {achievement.reward.waterBuckets}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition"
        >
          關閉
        </button>
      </div>
    </div>
  );
};
