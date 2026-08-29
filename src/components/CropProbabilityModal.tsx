import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { CROPS, RARITY_CONFIG, getCropsByRarity, CropRarity } from '../data/crops';

interface CropProbabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CropProbabilityModal: React.FC<CropProbabilityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const groupedCrops = getCropsByRarity();
  const raritiesOrder: CropRarity[] = ['common', 'rare', 'epic', 'legendary', 'mythic'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-[#0b1324] border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.2)] text-slate-100 relative my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <div>
                <h3 className="text-base font-black text-emerald-400 font-display">
                  農田作物抽取機率一覽
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">
                  全 15 種作物 · 純機率公平抽取 · 總機率 100%
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition"
              title="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto space-y-4 pr-1 scrollbar-cyber flex-grow">
            {raritiesOrder.map(rarityKey => {
              const meta = RARITY_CONFIG[rarityKey];
              const crops = groupedCrops[rarityKey];

              return (
                <div
                  key={rarityKey}
                  className={`rounded-2xl border p-3.5 bg-gradient-to-b ${meta.bgGradient} ${meta.borderColor} space-y-2`}
                >
                  {/* Rarity Group Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black font-display px-2 py-0.5 rounded-full border ${meta.borderColor} ${meta.textColor} bg-slate-950/60`}>
                        {meta.badge}
                      </span>
                      <span className="text-xs text-slate-300 font-bold">
                        {meta.label} 系列 ({crops.length} 種)
                      </span>
                    </div>
                    <span className={`text-xs font-black font-mono ${meta.textColor}`}>
                      總計 {meta.totalProbability}%
                    </span>
                  </div>

                  {/* Crops in this rarity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {crops.map(crop => (
                      <div
                        key={crop.id}
                        className="flex items-center justify-between bg-slate-950/60 border border-white/5 rounded-xl px-3 py-2 hover:border-emerald-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-2xl shrink-0">{crop.icon}</span>
                          <div className="truncate">
                            <div className="text-xs font-black text-slate-200 truncate">
                              {crop.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono truncate">
                              {crop.englishName}
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs font-black font-mono ml-2 shrink-0 ${meta.textColor}`}>
                          {crop.probability}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Total Summary Footer Box */}
            <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold">
                ✨ 15 種作物加總機率
              </span>
              <span className="text-emerald-400 font-black text-sm">
                50% + 30% + 15% + 4% + 1% = 100%
              </span>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-900/60 rounded-xl p-3 border border-slate-800 leading-relaxed">
              <strong className="text-emerald-400 block mb-0.5">📌 抽取規則說明：</strong>
              • 每塊農田完美通過 10/10 題後，即可手動抽取 1 次作物。<br />
              • 所有玩家、所有關卡均享有完全一致的公平機率，不因答題次數改變。<br />
              • 抽取完成後作物將永久綁定該塊農田，無法重複抽取。
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-emerald-500/20 mt-2 shrink-0">
            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition border border-slate-700 font-display"
            >
              了解，關閉機率表
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
