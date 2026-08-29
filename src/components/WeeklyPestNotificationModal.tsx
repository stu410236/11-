import React from 'react';
import { FieldPlot } from '../types';
import { PESTS, WeeklyPestEvent } from '../data/pests';
import { getCropById, RARITY_CONFIG } from '../data/crops';

interface WeeklyPestNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  weeklyPest?: WeeklyPestEvent | null;
  pestEvent?: WeeklyPestEvent | null;
  targetField?: FieldPlot | null;
  fields?: FieldPlot[];
  onStartDefense?: () => void;
  onGoDefense?: () => void;
  playSynthSound?: (type: 'click' | 'correct' | 'wrong' | 'levelUp' | 'irrigate', muted: boolean) => void;
  isMuted?: boolean;
}

export const WeeklyPestNotificationModal: React.FC<WeeklyPestNotificationModalProps> = ({
  isOpen,
  onClose,
  weeklyPest,
  pestEvent,
  targetField,
  fields,
  onStartDefense,
  onGoDefense,
  playSynthSound,
  isMuted = false,
}) => {
  const activePestEvent = weeklyPest || pestEvent;
  const activeTargetField = targetField || (fields && activePestEvent ? fields.find(f => f.id === activePestEvent.fieldId) : null) || (fields && fields.length > 0 ? fields[0] : null);

  if (!isOpen || !activePestEvent || !activeTargetField) return null;

  const pestId = activePestEvent.pestId || 'caterpillar';
  const pest = PESTS[pestId] || PESTS.caterpillar;
  const crop = activeTargetField.cropId ? getCropById(activeTargetField.cropId) : null;
  const rarityMeta = crop ? RARITY_CONFIG[crop.rarity] : null;

  const handleStart = () => {
    if (playSynthSound) playSynthSound('click', isMuted);
    if (onStartDefense) onStartDefense();
    else if (onGoDefense) onGoDefense();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#200e10] via-[#14121a] to-[#0d141e] border-2 border-red-500/70 rounded-3xl shadow-[0_0_60px_rgba(239,68,68,0.35)] overflow-hidden flex flex-col">
        
        {/* Glowing Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-red-950 via-orange-950 to-red-950 border-b border-red-500/40 text-center relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-600/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-full text-red-300 text-xs font-black tracking-wider uppercase mb-2 shadow-inner">
            <span className="animate-ping w-2 h-2 rounded-full bg-red-400" />
            ⚠️ EMERGENCY WARNING
          </div>
          
          <h3 className="text-2xl font-black text-white tracking-wide flex items-center justify-center gap-2">
            <span>{pest.icon}</span>
            <span>每週害蟲突襲入侵！</span>
          </h3>
          <p className="text-xs text-red-200/90 mt-1">
            台灣時間每週六 19:30 常態事件已觸發
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-slate-200">
          
          <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2.5 bg-red-900/50 rounded-2xl border border-red-500/40 shadow-inner shrink-0">
                {pest.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-red-300">{pest.name}</h4>
                  <span className="text-xs font-mono text-red-400">({pest.englishName})</span>
                </div>
                <p className="text-xs text-red-200/80 mt-0.5 leading-relaxed">
                  {pest.description}
                </p>
              </div>
            </div>
            <p className="text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30 leading-relaxed font-mono">
              ⚠️ {pest.threatDescription}
            </p>
          </div>

          {/* Under Attack Field Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 bg-slate-950 rounded-xl border border-slate-800">
                {crop?.icon || '🌱'}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">第 {activeTargetField.id} 區良田</span>
                  {rarityMeta && (
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${rarityMeta.borderColor} ${rarityMeta.textColor} bg-black/60`}>
                      {rarityMeta.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  作物：<strong className="text-slate-200">{crop?.name || activeTargetField.cropName}</strong>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-red-400 font-mono bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20">
                遭攻擊中
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed">
            施展 C++ 防衛挑戰以保護你的作物！若防衛失敗，作物將暫時枯萎（可透過複習 5 題復育）。
          </p>

        </div>

        {/* Buttons */}
        <div className="p-5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              playSynthSound('click', isMuted);
              onClose();
            }}
            className="px-4 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs font-bold"
          >
            稍後處理
          </button>

          <button
            type="button"
            onClick={handleStart}
            className="flex-1 px-6 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all active:scale-95 cursor-pointer"
          >
            ⚔️ 前往防衛農田
          </button>
        </div>

      </div>
    </div>
  );
};
