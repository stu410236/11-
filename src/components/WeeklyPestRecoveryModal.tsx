import React, { useState } from 'react';
import { CPlusPlusCard, FieldPlot } from '../types';
import { getCropById, RARITY_CONFIG } from '../data/crops';
import { WeeklyPestEvent } from '../data/pests';

interface WeeklyPestRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetField?: FieldPlot | null;
  field?: FieldPlot | null;
  pestEvent?: WeeklyPestEvent | null;
  weeklyPest?: WeeklyPestEvent | null;
  recoveryQuestions?: CPlusPlusCard[];
  questions?: CPlusPlusCard[];
  initialProgress?: number; // 0 to 5
  isMuted?: boolean;
  onProgressUpdate?: (newProgress: number) => void;
  onRecoveryComplete: () => void;
  playSynthSound?: (type: 'click' | 'correct' | 'wrong' | 'levelUp' | 'irrigate', muted: boolean) => void;
}

export const WeeklyPestRecoveryModal: React.FC<WeeklyPestRecoveryModalProps> = ({
  isOpen,
  onClose,
  targetField,
  field,
  pestEvent,
  weeklyPest,
  recoveryQuestions,
  questions,
  initialProgress,
  isMuted = false,
  onProgressUpdate,
  onRecoveryComplete,
  playSynthSound,
}) => {
  const activeTargetField = targetField || field;
  const activeQuestions = recoveryQuestions || questions || [];
  const startProgress = initialProgress ?? pestEvent?.recoveryProgress ?? weeklyPest?.recoveryProgress ?? 0;

  const [currentStep, setCurrentStep] = useState(Math.min(4, Math.max(0, startProgress)));
  const [typedAnswer, setTypedAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen || !activeTargetField || activeQuestions.length === 0) return null;

  const currentQ = activeQuestions[currentStep] || activeQuestions[0];
  const crop = activeTargetField.cropId ? getCropById(activeTargetField.cropId) : null;
  const rarityMeta = crop ? RARITY_CONFIG[crop.rarity] : null;

  const checkAnswer = (): boolean => {
    if (currentQ.type === 'code_reading' && currentQ.correctOption !== undefined) {
      return selectedOption === currentQ.correctOption;
    }

    const cleanInput = typedAnswer.trim();
    const expected = (currentQ.expectedAnswer || '').trim();
    if (!cleanInput) return false;

    if (cleanInput.toLowerCase() === expected.toLowerCase()) return true;

    if (currentQ.acceptedAnswers && currentQ.acceptedAnswers.length > 0) {
      return currentQ.acceptedAnswers.some(
        ans => ans.trim().toLowerCase() === cleanInput.toLowerCase()
      );
    }

    return false;
  };

  const handleStepSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (feedbackMessage?.isCorrect || isCompleted) return;

    if (currentQ.type === 'code_reading' && selectedOption === null) {
      return;
    }
    if (currentQ.type !== 'code_reading' && !typedAnswer.trim()) {
      return;
    }

    const isCorrect = checkAnswer();

    if (isCorrect) {
      if (playSynthSound) playSynthSound('correct', isMuted);
      const nextStep = currentStep + 1;
      if (onProgressUpdate) onProgressUpdate(nextStep);

      if (nextStep >= 5) {
        setIsCompleted(true);
        if (playSynthSound) playSynthSound('irrigate', isMuted);
        setTimeout(() => {
          onRecoveryComplete();
        }, 1800);
      } else {
        setFeedbackMessage({ text: '🎉 答對了！田地復育養分正在快速注入！', isCorrect: true });
        setTimeout(() => {
          setFeedbackMessage(null);
          setCurrentStep(nextStep);
          setTypedAnswer('');
          setSelectedOption(null);
          setShowHint(false);
        }, 900);
      }
    } else {
      if (playSynthSound) playSynthSound('wrong', isMuted);
      setFeedbackMessage({ 
        text: `❌ 答案不正確，請參考提示或說明後再次嘗試（進度不會倒退）！`, 
        isCorrect: false 
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0e1814] via-[#0d141e] to-[#0a0f18] border-2 border-emerald-500/60 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-emerald-950/90 via-teal-950/70 to-emerald-950/90 border-b border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">🌱</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black tracking-widest uppercase bg-emerald-600 text-white rounded-md shadow-sm">
                  CROP RECOVERY MODE
                </span>
                <span className="text-xs text-emerald-300 font-mono">農田複習復育模式</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-emerald-200 mt-0.5 flex items-center gap-2">
                <span>🥀 救回 第 {activeTargetField.id} 號【{activeTargetField.name}】枯萎作物</span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Progress Tracker Bar */}
        <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300 font-mono">
              復育進度：<strong className="text-emerald-400">{currentStep}</strong> / 5 題
            </span>
          </div>
          <div className="flex-1 max-w-xs h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/80">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-slate-200">
          
          {/* Crop Info Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="text-4xl p-2 bg-slate-950 rounded-2xl border border-slate-800 shrink-0 opacity-70">
              {crop?.icon || '🥀'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">{activeTargetField.name}</span>
                {rarityMeta && (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${rarityMeta.borderColor} ${rarityMeta.textColor} bg-black/50`}>
                    {rarityMeta.badge}
                  </span>
                )}
                <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                  🥀 枯萎中
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                完成 5 道 C++ 核心複習題後，原本的<strong>【{crop?.name || activeTargetField.cropName}】</strong>將完全恢復生機（保留原本稀有度）！
              </p>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-black bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg font-mono">
                  複習第 {currentStep + 1} 題
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {currentQ.title}
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                ★{currentQ.difficulty || 2}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {currentQ.chineseDescription}
            </p>

            {/* Scenario */}
            {currentQ.scenario && (
              <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
                💡 <strong>情境描述：</strong> {currentQ.scenario}
              </div>
            )}

            {/* Code Block */}
            <div className="relative rounded-xl bg-black/90 border border-slate-800 p-3.5 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto shadow-inner">
              <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-mono select-none">
                C++
              </div>
              <pre className="whitespace-pre leading-relaxed">
                {currentQ.codeTemplate || currentQ.buggyCode}
              </pre>
            </div>

            {/* Input / Choice Area */}
            {currentQ.type === 'code_reading' && currentQ.options ? (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-400">請選擇正確選項：</div>
                <div className="grid grid-cols-1 gap-2">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={feedbackMessage?.isCorrect || isCompleted}
                      onClick={() => {
                        if (playSynthSound) playSynthSound('click', isMuted);
                        setSelectedOption(idx);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-mono transition-all flex items-center gap-3 ${
                        selectedOption === idx
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        selectedOption === idx ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleStepSubmit} className="pt-2 space-y-2">
                <label className="block text-xs font-bold text-slate-400">
                  請輸入代碼或答案：
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    disabled={feedbackMessage?.isCorrect || isCompleted}
                    placeholder="請輸入答案..."
                    className="flex-1 px-4 py-3 rounded-xl bg-black border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 shadow-inner"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="px-3 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all shrink-0"
                  >
                    💡 提示
                  </button>
                </div>
              </form>
            )}

            {/* Hint */}
            {showHint && currentQ.hint && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 animate-fadeIn">
                <strong>💡 複習提示：</strong> {currentQ.hint}
              </div>
            )}
          </div>

          {/* Feedback Message */}
          {feedbackMessage && (
            <div className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fadeIn ${
              feedbackMessage.isCorrect
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                : 'bg-red-950/80 border-red-500 text-red-200'
            }`}>
              <span>{feedbackMessage.isCorrect ? '✅' : '⚠️'}</span>
              <span>{feedbackMessage.text}</span>
            </div>
          )}

          {/* All 5 Done Celebration */}
          {isCompleted && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border-2 border-emerald-400 text-emerald-200 flex items-center gap-3 animate-bounce">
              <span className="text-4xl">🌱✨</span>
              <div>
                <h5 className="font-black text-sm sm:text-base text-emerald-300">
                  🎉 復育完成！作物完全復活！
                </h5>
                <p className="text-xs text-emerald-200/90">
                  恭喜救回【{activeTargetField.name}】的<strong>【{crop?.name || activeTargetField.cropName}】</strong>，田地恢復茂盛生機！
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs font-bold"
          >
            稍後再復育
          </button>

          <button
            type="button"
            onClick={() => handleStepSubmit()}
            disabled={feedbackMessage?.isCorrect || isCompleted}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95 disabled:opacity-50"
          >
            {isCompleted ? '復育完成！' : `送出第 ${currentStep + 1} 題答案`}
          </button>
        </div>

      </div>
    </div>
  );
};
