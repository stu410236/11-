import React, { useState } from 'react';
import { CPlusPlusCard, FieldPlot } from '../types';
import { PESTS, WeeklyPestEvent } from '../data/pests';
import { getCropById, RARITY_CONFIG } from '../data/crops';
import { Shield, Sparkles, AlertTriangle } from 'lucide-react';

interface WeeklyPestDefenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  weeklyPest?: WeeklyPestEvent | null;
  pestEvent?: WeeklyPestEvent | null;
  targetField?: FieldPlot | null;
  fields?: FieldPlot[];
  challengeQuestion?: CPlusPlusCard | null;
  question?: CPlusPlusCard | null;
  isMuted?: boolean;
  pesticides?: number;
  onDefenseSuccess: () => void;
  onDefenseFailure: () => void;
  onPestNetTriggered?: (fieldId: number) => void;
  onUsePesticide?: () => void;
  playSynthSound?: (type: 'click' | 'correct' | 'wrong' | 'levelUp' | 'irrigate', muted: boolean) => void;
}

export const WeeklyPestDefenseModal: React.FC<WeeklyPestDefenseModalProps> = ({
  isOpen,
  onClose,
  weeklyPest,
  pestEvent,
  targetField,
  fields,
  challengeQuestion,
  question,
  isMuted = false,
  pesticides = 0,
  onDefenseSuccess,
  onDefenseFailure,
  onPestNetTriggered,
  onUsePesticide,
  playSynthSound,
}) => {
  const [typedAnswer, setTypedAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultState, setResultState] = useState<'idle' | 'success' | 'failure'>('idle');
  
  // 防具與道具挽救狀態
  const [hasNetProtected, setHasNetProtected] = useState<boolean | null>(null);
  const [netBlockedFeedback, setNetBlockedFeedback] = useState<string | null>(null);
  const [showPesticidePrompt, setShowPesticidePrompt] = useState(false);
  const [hasUsedPesticide, setHasUsedPesticide] = useState(false);
  const [isPesticideActionPending, setIsPesticideActionPending] = useState(false);

  const activePestEvent = weeklyPest || pestEvent;
  const activeTargetField = targetField || (fields && activePestEvent ? fields.find(f => f.id === activePestEvent.fieldId) : null) || (fields && fields.length > 0 ? fields[0] : null);
  const activeQuestion = challengeQuestion || question;

  // 初始化或追蹤該農田是否有防蟲網
  const isNetEquipped = hasNetProtected !== null 
    ? hasNetProtected 
    : (activeTargetField?.pestNetEquipped ?? false);

  if (!isOpen || !activePestEvent || !activeTargetField || !activeQuestion) return null;

  const pestId = activePestEvent.pestId || 'caterpillar';
  const pest = PESTS[pestId] || PESTS.caterpillar;
  const crop = activeTargetField.cropId ? getCropById(activeTargetField.cropId) : null;
  const rarityMeta = crop ? RARITY_CONFIG[crop.rarity] : null;

  // 驗證答案是否正確
  const checkAnswer = (): boolean => {
    if (activeQuestion.type === 'code_reading' && activeQuestion.correctOption !== undefined) {
      return selectedOption === activeQuestion.correctOption;
    }

    const cleanInput = typedAnswer.trim();
    const expected = (activeQuestion.expectedAnswer || '').trim();
    if (!cleanInput) return false;

    if (cleanInput.toLowerCase() === expected.toLowerCase()) return true;

    if (activeQuestion.acceptedAnswers && activeQuestion.acceptedAnswers.length > 0) {
      return activeQuestion.acceptedAnswers.some(
        ans => ans.trim().toLowerCase() === cleanInput.toLowerCase()
      );
    }

    return false;
  };

  const handleDefenseSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting || resultState !== 'idle' || showPesticidePrompt) return;

    if (activeQuestion.type === 'code_reading' && selectedOption === null) {
      return;
    }
    if (activeQuestion.type !== 'code_reading' && !typedAnswer.trim()) {
      return;
    }

    setIsSubmitting(true);
    const isCorrect = checkAnswer();

    if (isCorrect) {
      if (playSynthSound) playSynthSound('irrigate', isMuted);
      setResultState('success');
      setTimeout(() => {
        onDefenseSuccess();
      }, 1600);
    } else {
      if (playSynthSound) playSynthSound('wrong', isMuted);

      // 第一優先：如果該農田裝備有防蟲網，先消耗防蟲網抵擋本次失誤
      if (isNetEquipped) {
        setHasNetProtected(false);
        if (onPestNetTriggered) {
          onPestNetTriggered(activeTargetField.id);
        }
        setNetBlockedFeedback('🛡️ 防蟲網擋住了害蟲！你的作物暫時安全，獲得一次重新防衛機會。');
        setIsSubmitting(false);
        setTypedAnswer('');
        setSelectedOption(null);
        return;
      }

      // 第二順位：如果沒有防蟲網（或已被消耗），檢查是否擁有除蟲劑且本場尚未消耗過
      if (pesticides > 0 && !hasUsedPesticide) {
        setIsSubmitting(false);
        setShowPesticidePrompt(true);
        return;
      }

      // 無法挽救：防衛失敗
      setResultState('failure');
      setTimeout(() => {
        onDefenseFailure();
      }, 2000);
    }
  };

  // 確定使用除蟲劑
  const handleConfirmUsePesticide = () => {
    if (isPesticideActionPending || pesticides <= 0) return;
    setIsPesticideActionPending(true);

    if (onUsePesticide) {
      onUsePesticide();
    }
    setHasUsedPesticide(true);
    setShowPesticidePrompt(false);
    setNetBlockedFeedback('🧪 已施放除蟲劑！害蟲攻勢被暫時壓制，獲得最後一次防衛作答機會！');
    setTypedAnswer('');
    setSelectedOption(null);
    setIsSubmitting(false);
    setIsPesticideActionPending(false);
  };

  // 放棄使用除蟲劑
  const handleDeclinePesticide = () => {
    setShowPesticidePrompt(false);
    setResultState('failure');
    setTimeout(() => {
      onDefenseFailure();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#181112] via-[#0d141e] to-[#0a0f18] border-2 border-red-500/60 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Warning Banner Header */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-red-950/90 via-orange-950/70 to-red-950/90 border-b border-red-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">⚠️</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black tracking-widest uppercase bg-red-600 text-white rounded-md shadow-sm">
                  WEEKLY PEST DEFENSE
                </span>
                <span className="text-xs text-red-300 font-mono">每週害蟲入侵防衛戰</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-red-200 mt-0.5 flex items-center gap-2">
                <span>{pest.icon}</span>
                <span>{pest.name}正在攻擊 第 {activeTargetField.id} 號農田！</span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-slate-200">
          
          {/* Target & Pest Status Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pest Card */}
            <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-500/30 flex items-center gap-3">
              <div className="text-4xl p-2 bg-red-900/40 rounded-2xl border border-red-500/30 shrink-0">
                {pest.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-red-300">{pest.name}</span>
                  <span className="text-[10px] font-mono text-red-400">({pest.englishName})</span>
                </div>
                <p className="text-[11px] text-red-200/80 mt-1 leading-snug">
                  {pest.threatDescription}
                </p>
              </div>
            </div>

            {/* Victim Crop Card */}
            <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center gap-3 relative">
              <div className="text-4xl p-2 bg-amber-900/30 rounded-2xl border border-amber-500/30 shrink-0">
                {crop?.icon || '🌱'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-200">{activeTargetField.name}</span>
                  {rarityMeta && (
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${rarityMeta.borderColor} ${rarityMeta.textColor} bg-black/50`}>
                      {rarityMeta.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-amber-200/80 mt-1 leading-snug">
                  受害作物：<strong>{crop?.name || activeTargetField.cropName}</strong>（答對題目即可施放代碼驅逐！）
                </p>
                {isNetEquipped && (
                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/40 text-[10px] text-blue-300 font-bold">
                    <Shield className="w-3 h-3" />
                    <span>🛡️ 已裝備防蟲網（可抵擋 1 次失誤）</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rescue Feedback Message (Net or Pesticide) */}
          {netBlockedFeedback && (
            <div className="p-3.5 rounded-2xl bg-blue-950/80 border-2 border-blue-400 text-blue-200 flex items-center gap-3 animate-fadeIn shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Shield className="w-6 h-6 text-blue-400 shrink-0 animate-bounce" />
              <div className="text-xs sm:text-sm font-bold">
                {netBlockedFeedback}
              </div>
            </div>
          )}

          {/* Question Presentation */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg">
                  防衛代碼驗證
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {activeQuestion.title}
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                難度 ★{activeQuestion.difficulty || 3}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {activeQuestion.chineseDescription}
            </p>

            {/* Scenario if present */}
            {activeQuestion.scenario && (
              <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
                💡 <strong>情境描述：</strong> {activeQuestion.scenario}
              </div>
            )}

            {/* Code Block */}
            <div className="relative rounded-xl bg-black/90 border border-slate-800 p-3.5 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto shadow-inner">
              <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-mono select-none">
                C++
              </div>
              <pre className="whitespace-pre leading-relaxed">
                {activeQuestion.codeTemplate || activeQuestion.buggyCode}
              </pre>
            </div>

            {/* Answer Input Section */}
            {activeQuestion.type === 'code_reading' && activeQuestion.options ? (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-400">請選擇正確輸出或答案選項：</div>
                <div className="grid grid-cols-1 gap-2">
                  {activeQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitting || resultState !== 'idle' || showPesticidePrompt}
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
              <form onSubmit={handleDefenseSubmit} className="pt-2 space-y-2">
                <label className="block text-xs font-bold text-slate-400">
                  請在此輸入精準的 C++ 答案 / 修正代碼：
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    disabled={isSubmitting || resultState !== 'idle' || showPesticidePrompt}
                    placeholder="請輸入程式碼或答案..."
                    className="flex-1 px-4 py-3 rounded-xl bg-black border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 shadow-inner"
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

            {/* Hint Box */}
            {showHint && activeQuestion.hint && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 animate-fadeIn">
                <strong>💡 防衛提示：</strong> {activeQuestion.hint}
              </div>
            )}
          </div>

          {/* Dynamic Result Feedback Overlay / Banner */}
          {resultState === 'success' && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 flex items-center gap-3 animate-bounce">
              <span className="text-3xl">✅</span>
              <div>
                <h5 className="font-black text-sm sm:text-base text-emerald-300">防衛成功！害蟲已全數驅逐！</h5>
                <p className="text-xs text-emerald-200/90">【{activeTargetField.name}】作物安全無虞，良田恢復平靜！</p>
              </div>
            </div>
          )}

          {resultState === 'failure' && (
            <div className="p-4 rounded-2xl bg-red-950/80 border-2 border-red-500 text-red-200 flex items-center gap-3 animate-shake">
              <span className="text-3xl">💥</span>
              <div>
                <h5 className="font-black text-sm sm:text-base text-red-300">防衛失敗！害蟲突破了防線...</h5>
                <p className="text-xs text-red-200/90">作物暫時枯萎，但不用灰心！你可以隨時進行 C++ 複習題進行復育！</p>
              </div>
            </div>
          )}

        </div>

        {/* Pesticide Rescue Confirmation Modal Popup */}
        {showPesticidePrompt && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 border-2 border-purple-500 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-[0_0_40px_rgba(168,85,247,0.4)] text-center">
              <div className="text-5xl animate-bounce">🧪</div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono font-black text-purple-400 tracking-wider">
                  PESTICIDE RESCUE OPPORTUNITY
                </span>
                <h4 className="text-lg font-black text-white">⚠️ 防衛失敗！是否使用除蟲劑？</h4>
              </div>

              <div className="p-3 bg-purple-900/30 border border-purple-500/30 rounded-2xl text-xs text-purple-200 leading-relaxed">
                是否使用 <strong>1 瓶除蟲劑</strong>，獲得一次最後的重新防衛機會？
                <div className="mt-2 text-sm font-mono font-bold text-amber-300">
                  目前持有：🧪 除蟲劑 ×{pesticides}
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  type="button"
                  disabled={isPesticideActionPending}
                  onClick={handleDeclinePesticide}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                >
                  放棄
                </button>
                <button
                  type="button"
                  disabled={isPesticideActionPending || pesticides <= 0}
                  onClick={handleConfirmUsePesticide}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs shadow-lg shadow-purple-500/30 transition disabled:opacity-50"
                >
                  {isPesticideActionPending ? '使用中...' : '🧪 使用除蟲劑'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting || resultState !== 'idle' || showPesticidePrompt}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs font-bold"
          >
            稍後再戰
          </button>

          <button
            type="button"
            onClick={() => handleDefenseSubmit()}
            disabled={isSubmitting || resultState !== 'idle' || showPesticidePrompt}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? '防衛驗證中...' : '⚔️ 施放除蟲代碼'}
          </button>
        </div>

      </div>
    </div>
  );
};
