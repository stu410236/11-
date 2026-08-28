import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Trophy, Award, CheckCircle2, XCircle, Code2, ArrowRight } from 'lucide-react';
import { CPlusPlusCard, DailyChallengeState } from '../types';
import { 
  DAILY_CHALLENGE_REWARD, 
  getTaiwanDisplayDate, 
  verifyDailyChallengeAnswer 
} from '../utils/dailyChallenge';
import { getChapterForField } from '../data/cppCards';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  todayDateKey: string;
  dailyChallengeQuestion: {
    question: CPlusPlusCard;
    chapterInfo: ReturnType<typeof getChapterForField>;
    questionIndex: number;
  };
  dailyChallengeState?: DailyChallengeState;
  onCompleteChallenge: (questionId: string) => void;
  playSynthSound: (type: 'correct' | 'wrong' | 'click' | 'levelUp', isMuted: boolean) => void;
  isMuted: boolean;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  todayDateKey,
  dailyChallengeQuestion,
  dailyChallengeState,
  onCompleteChallenge,
  playSynthSound,
  isMuted
}) => {
  const [answerInput, setAnswerInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { question, chapterInfo } = dailyChallengeQuestion;
  const isCompletedToday = dailyChallengeState?.lastCompletedDate === todayDateKey;

  // 當打開 Modal 時重設狀態
  useEffect(() => {
    if (isOpen) {
      setAnswerInput(isCompletedToday ? question.expectedAnswer : '');
      if (isCompletedToday) {
        setFeedback({
          type: 'success',
          message: '🎉 今日限定挑戰已完成！明日凌晨 00:00 (UTC+8) 將換下一題。'
        });
      } else {
        setFeedback(null);
      }
    }
  }, [isOpen, isCompletedToday, question.expectedAnswer]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isCompletedToday) {
      onClose();
      return;
    }
    if (!answerInput.trim()) {
      playSynthSound('wrong', isMuted);
      setFeedback({ type: 'error', message: '請先輸入您的 C++ 程式碼答案！' });
      return;
    }

    setIsSubmitting(true);
    const isCorrect = verifyDailyChallengeAnswer(answerInput, question.expectedAnswer);

    if (isCorrect) {
      playSynthSound('correct', isMuted);
      playSynthSound('levelUp', isMuted);
      setFeedback({
        type: 'success',
        message: '🎉 DAILY CHALLENGE COMPLETE! 今日限定挑戰完成！'
      });
      onCompleteChallenge(question.id);
    } else {
      playSynthSound('wrong', isMuted);
      setFeedback({
        type: 'error',
        message: '❌ 編譯失敗，再檢查一次語法！請注意大小寫與符號細節。'
      });
    }
    setIsSubmitting(false);
  };

  const streak = dailyChallengeState?.streak || (isCompletedToday ? 1 : 0);
  const bestStreak = dailyChallengeState?.bestStreak || streak;
  const totalCompleted = dailyChallengeState?.totalCompleted || (isCompletedToday ? 1 : 0);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Container */}
      <motion.div 
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-slate-900 border-2 border-emerald-500/50 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] text-slate-100 z-10 flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Glowing cyber header banner */}
        <div className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-5 border-b border-emerald-500/30 shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📅</span>
                <h2 className="text-lg sm:text-xl font-black tracking-wider text-white font-display flex items-center gap-2">
                  今日 C++ 限定挑戰
                  {isCompletedToday && (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                      已完成
                    </span>
                  )}
                </h2>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-400 font-mono tracking-wider flex items-center gap-1.5">
                <span>DAILY C++ CHALLENGE</span>
                <span>•</span>
                <span className="text-emerald-300 font-bold">{getTaiwanDisplayDate(todayDateKey)} (UTC+8)</span>
              </p>
            </div>

            <button
              onClick={() => {
                playSynthSound('click', isMuted);
                onClose();
              }}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition text-sm font-mono"
              title="關閉視窗"
            >
              ✕
            </button>
          </div>

          {/* Streak & Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-500/20">
            <div className="bg-slate-950/60 border border-amber-500/30 rounded-2xl p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-[11px] font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-400/20" />
                <span>連續完成</span>
              </div>
              <p className="text-sm font-black text-amber-300 font-mono mt-0.5">
                {streak} <span className="text-[10px] font-normal text-amber-400/70">天</span>
              </p>
            </div>

            <div className="bg-slate-950/60 border border-purple-500/30 rounded-2xl p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-400 text-[11px] font-bold">
                <Trophy className="w-3.5 h-3.5 fill-purple-400/20" />
                <span>最佳紀錄</span>
              </div>
              <p className="text-sm font-black text-purple-300 font-mono mt-0.5">
                {bestStreak} <span className="text-[10px] font-normal text-purple-400/70">天</span>
              </p>
            </div>

            <div className="bg-slate-950/60 border border-teal-500/30 rounded-2xl p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-teal-400 text-[11px] font-bold">
                <Award className="w-3.5 h-3.5 fill-teal-400/20" />
                <span>累積通關</span>
              </div>
              <p className="text-sm font-black text-teal-300 font-mono mt-0.5">
                {totalCompleted} <span className="text-[10px] font-normal text-teal-400/70">次</span>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Chapter & Topic Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 rounded-full text-[11px] font-bold">
              {chapterInfo.emoji} 第 {chapterInfo.chapter} 章：{chapterInfo.topic}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-[10px] font-mono">
              良田 #{question.fieldId}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
              chapterInfo.stage === '高中核心' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : chapterInfo.stage === '高中進階' 
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
            }`}>
              {chapterInfo.stage}
            </span>
          </div>

          {/* Question title & Chinese description */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>{question.title}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {question.chineseDescription}
            </p>
          </div>

          {/* Terminal-like Code Template */}
          <div className="bg-[#070b14] border border-emerald-500/30 rounded-2xl overflow-hidden shadow-inner font-mono">
            {/* Terminal Window Bar */}
            <div className="bg-slate-950 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-400 text-[10px]">daily_challenge.cpp</span>
              </div>
              <span className="text-[10px] text-emerald-400/80">C++20</span>
            </div>

            {/* Code Body */}
            <div className="p-4 text-xs sm:text-sm text-emerald-200/90 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto selection:bg-emerald-500/30">
              {question.codeTemplate}
            </div>
          </div>

          {/* Input Box & Submit Area */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                <span>⌨️ 請輸入 <code className="text-amber-300 font-mono">___</code> 處的正確 C++ 語法：</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  disabled={isCompletedToday || isSubmitting}
                  placeholder={isCompletedToday ? question.expectedAnswer : "輸入你的程式碼答案..."}
                  className={`w-full bg-[#070b14] text-slate-100 text-xs sm:text-sm rounded-xl py-3 px-3.5 border transition-all font-mono focus:outline-none ${
                    isCompletedToday 
                      ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300 cursor-not-allowed'
                      : feedback?.type === 'error'
                        ? 'border-rose-500 focus:border-rose-400 ring-1 ring-rose-500/30'
                        : 'border-emerald-500/40 focus:border-emerald-400 ring-emerald-500/20 focus:ring-2'
                  }`}
                  autoFocus={!isCompletedToday}
                />
                {isCompletedToday && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400 flex items-center gap-1 font-display">
                    <CheckCircle2 className="w-4 h-4" /> 正確答案
                  </span>
                )}
              </div>
            </div>

            {/* Feedback Message */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold">{feedback.message}</p>
                    {feedback.type === 'success' && question.explanation && (
                      <p className="text-[11px] text-emerald-300/80 mt-1 pt-1 border-t border-emerald-500/20">
                        💡 <strong>解析：</strong>{question.explanation}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reward Preview Bar */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">🏆 今日挑戰獎勵：</span>
              <div className="flex items-center gap-2.5 font-bold font-mono">
                <span className="text-amber-400 flex items-center gap-0.5">
                  🪙 +{DAILY_CHALLENGE_REWARD.coins}
                </span>
                <span className="text-green-400 flex items-center gap-0.5">
                  🥬 +{DAILY_CHALLENGE_REWARD.cabbages}
                </span>
                <span className="text-sky-400 flex items-center gap-0.5">
                  🪣 +{DAILY_CHALLENGE_REWARD.waterBuckets}
                </span>
                <span className="text-emerald-400 flex items-center gap-0.5">
                  🐢 +{DAILY_CHALLENGE_REWARD.tortoiseXp} XP
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  playSynthSound('click', isMuted);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition font-display"
              >
                {isCompletedToday ? '關閉視窗' : '稍後再做'}
              </button>

              {!isCompletedToday ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black transition shadow-lg shadow-emerald-500/20 font-display flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-50"
                >
                  <span>🚀 提交驗證答案</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-[2] py-2.5 px-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition font-display"
                >
                  ✓ 今日已領取獎勵
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

