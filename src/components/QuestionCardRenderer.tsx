import React from 'react';
import { CPlusPlusCard, QuestionType } from '../types';
import { 
  Code2, 
  Bug, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Zap,
  Check
} from 'lucide-react';

interface QuestionCardRendererProps {
  question: CPlusPlusCard;
  typedAnswer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onNext: () => void;
  isAnswered: boolean;
  isAnswerCorrect: boolean;
  showHint: boolean;
  onShowHint: () => void;
  isLastQuestion?: boolean;
  isReviewMode?: boolean;
  hintTickets?: number;
  onUseHintTicket?: () => void;
}

export const getQuestionTypeMeta = (type?: QuestionType) => {
  switch (type) {
    case 'debug':
      return {
        label: '程式除錯',
        tag: 'BUG FIX',
        emoji: '🐞',
        color: 'text-rose-400 bg-rose-950/60 border-rose-500/30',
        badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
        icon: Bug,
        promptLabel: '請輸入修正後的 C++ 語法或關鍵字：',
        inputPlaceholder: '例如：i < n、return 0;、sum += i...'
      };
    case 'application':
      return {
        label: '情境應用',
        tag: 'APPLICATION',
        emoji: '🧮',
        color: 'text-sky-400 bg-sky-950/60 border-sky-500/30',
        badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
        icon: Calculator,
        promptLabel: '請輸入計算公式或核心表達式：',
        inputPlaceholder: '例如：(a + b) / 2.0、length * width...'
      };
    case 'predict_output':
      return {
        label: '預測輸出',
        tag: 'PREDICT OUTPUT',
        emoji: '📺',
        color: 'text-purple-400 bg-purple-950/60 border-purple-500/30',
        badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-400/30',
        icon: Terminal,
        promptLabel: '請預測終端機執行後的 stdout 輸出結果：',
        inputPlaceholder: '例如：15、Hello C++、true...'
      };
    case 'complete_code':
      return {
        label: '核心邏輯',
        tag: 'COMPLETE LOGIC',
        emoji: '⚡',
        color: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
        badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
        icon: Zap,
        promptLabel: '請填入缺少的演算法或運算邏輯：',
        inputPlaceholder: '輸入完成程式的語法...'
      };
    case 'code_reading':
      return {
        label: '程式閱讀',
        tag: 'CODE READING',
        emoji: '📖',
        color: 'text-teal-400 bg-teal-950/60 border-teal-500/30',
        badgeBg: 'bg-teal-500/15 text-teal-300 border-teal-400/30',
        icon: BookOpen,
        promptLabel: '請選擇正確的選項 (點擊選項或輸入 A/B/C/D)：',
        inputPlaceholder: '點選下方選項或輸入 A / B / C / D'
      };
    case 'fill_blank':
    default:
      return {
        label: '語法填空',
        tag: 'FILL BLANK',
        emoji: '📝',
        color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
        badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
        icon: Code2,
        promptLabel: '請填入空格處缺少的 C++ 關鍵字或符號：',
        inputPlaceholder: '例如：cout、vector<int>、cin >>...'
      };
  }
};

export const QuestionCardRenderer: React.FC<QuestionCardRendererProps> = ({
  question,
  typedAnswer,
  onAnswerChange,
  onSubmit,
  onNext,
  isAnswered,
  isAnswerCorrect,
  showHint,
  onShowHint,
  isLastQuestion = false,
  isReviewMode = false,
  hintTickets = 0,
  onUseHintTicket
}) => {
  const [showTicketConfirm, setShowTicketConfirm] = React.useState(false);
  const meta = getQuestionTypeMeta(question.type);
  const TypeIcon = meta.icon;
  const isMultipleChoice = question.type === 'code_reading' && question.options && question.options.length > 0;

  const handleHintClick = () => {
    if (showHint) return;
    if (hintTickets > 0 && onUseHintTicket) {
      setShowTicketConfirm(true);
    } else {
      onShowHint();
    }
  };

  const handleConfirmUseTicket = () => {
    setShowTicketConfirm(false);
    if (onUseHintTicket) {
      onUseHintTicket();
    }
    onShowHint();
  };

  return (
    <div className="bg-[#0b101c] border-2 border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden relative text-slate-100 flex flex-col font-sans transition-all duration-300">
      
      {/* Top Banner with Type Badge & Question Metadata */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0e1726] to-slate-950 px-5 py-3.5 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black font-display border shadow-sm ${meta.badgeBg}`}>
            <span>{meta.emoji}</span>
            <span>{meta.label}</span>
            <span className="text-[9px] font-mono font-bold opacity-75 hidden sm:inline">[{meta.tag}]</span>
          </span>
          <span className="text-xs font-bold text-white font-display">
            {question.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {question.difficulty && (
            <span className="text-[10px] text-amber-300/80 font-mono flex items-center gap-0.5 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded-full">
              {'★'.repeat(question.difficulty)}{'☆'.repeat(Math.max(0, 5 - question.difficulty))}
            </span>
          )}
          {isReviewMode && (
            <span className="text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              ✓ 複習模式
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Question Goal / Scenario Box */}
        <div className="space-y-1.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider font-bold">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <TypeIcon className="w-3.5 h-3.5" />
              <span>【 挑戰目標與情境說明 】</span>
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            {question.chineseDescription}
          </p>
        </div>

        {/* Code Snippet / Workspace Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>C++ SOURCE CODE STREAM</span>
            </span>
            <span className="text-[10px] text-slate-500">C++20 Standard</span>
          </div>

          <div className="bg-[#050811] rounded-2xl p-4 sm:p-5 border border-emerald-500/25 text-emerald-200 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre relative shadow-inner">
            {question.codeTemplate}
          </div>
        </div>

        {/* Interaction Area: Multiple Choice OR Code/Output Input */}
        {isMultipleChoice ? (
          /* Multiple Choice Selection Grid */
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-display">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>{meta.promptLabel}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {question.options!.map((opt, idx) => {
                const optLetter = String.fromCharCode(65 + idx); // 'A', 'B', 'C', 'D'
                const isSelected = typedAnswer.toUpperCase() === optLetter || typedAnswer.toLowerCase() === opt.toLowerCase();
                const isCorrectOption = question.correctOption === idx;

                let optionStyles = 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:border-teal-400/80 hover:bg-slate-800/80';
                
                if (isAnswered) {
                  if (isCorrectOption) {
                    optionStyles = 'bg-emerald-950/70 border-2 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.25)]';
                  } else if (isSelected && !isCorrectOption) {
                    optionStyles = 'bg-rose-950/70 border-2 border-rose-500 text-rose-200';
                  } else {
                    optionStyles = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyles = 'bg-teal-950/60 border-2 border-teal-400 text-teal-100 shadow-[0_0_12px_rgba(20,184,166,0.25)]';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => {
                      onAnswerChange(optLetter);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer group active:scale-[0.99] ${optionStyles}`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 font-mono transition ${
                      isSelected || (isAnswered && isCorrectOption)
                        ? 'bg-teal-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}>
                      {optLetter}
                    </span>
                    <span className="text-xs sm:text-sm font-mono leading-relaxed pt-0.5">
                      {opt.replace(/^[A-D]\.\s*/i, '')}
                    </span>
                    {isAnswered && isCorrectOption && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Text / Code / Value Input Box */
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between font-display">
              <span className="flex items-center gap-1.5">
                <TypeIcon className="w-4 h-4 text-emerald-400" />
                <span>{meta.promptLabel}</span>
              </span>
              {question.type === 'predict_output' && (
                <span className="text-[10px] text-purple-400 font-mono">標準輸出比對</span>
              )}
            </label>

            <div className="relative">
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => onAnswerChange(e.target.value)}
                disabled={isAnswered}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (isAnswered) {
                      onNext();
                    } else if (typedAnswer.trim()) {
                      onSubmit();
                    }
                  }
                }}
                id="code-input"
                placeholder={meta.inputPlaceholder}
                className={`w-full bg-[#050811] text-slate-100 font-mono text-sm sm:text-base rounded-2xl py-3.5 px-4 border-2 transition-all focus:outline-none ${
                  isAnswered
                    ? isAnswerCorrect
                      ? 'border-emerald-500 bg-emerald-950/30 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'border-rose-500 bg-rose-950/30 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    : 'border-slate-700/80 focus:border-emerald-400 ring-emerald-400/20 focus:ring-2'
                }`}
                autoFocus
              />

              {isAnswered && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {isAnswerCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-500/30 font-display">
                      <CheckCircle2 className="w-4 h-4" /> 通過
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/80 px-2 py-1 rounded-lg border border-rose-500/30 font-display">
                      <XCircle className="w-4 h-4" /> 錯誤
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Controls & Hint Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div>
            {!isAnswered ? (
              <button
                type="button"
                onClick={handleHintClick}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold font-display transition bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 rounded-full cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" /> 烏龜提示 {hintTickets > 0 && <span className="text-[10px] bg-amber-500/20 px-1 rounded text-amber-300">💡×{hintTickets}</span>}
              </button>
            ) : (
              <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 flex-wrap">
                <span>標準解答：</span>
                <code className="text-emerald-300 bg-slate-900 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-bold select-all">
                  {question.expectedAnswer}
                </code>
              </div>
            )}
          </div>

          <div className="w-full sm:w-auto font-display">
            {!isAnswered ? (
              <button
                type="button"
                onClick={onSubmit}
                disabled={!typedAnswer.trim()}
                id="submit-answer-btn"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 px-7 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
              >
                <span>送出編譯驗證 ➔</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-7 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{isLastQuestion ? '結算灌溉結果 🏆' : '下一題 ➔'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Hint Ticket Confirmation Prompt */}
        {showTicketConfirm && !isAnswered && (
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-xs text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <div>
                <span className="font-bold text-amber-300">是否使用 1 張提示券？</span>
                <span className="text-[11px] text-amber-200/80 block">
                  消耗 1 張提示券獲得小綠龜智慧提點（目前持有：💡 ×{hintTickets}）
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setShowTicketConfirm(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirmUseTicket}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow transition"
              >
                💡 確認使用提示券
              </button>
            </div>
          </div>
        )}

        {/* Hint Box */}
        {showHint && !isAnswered && (
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans shadow-inner space-y-1 animate-fade-in">
            <div className="font-bold flex items-center gap-1.5 text-amber-300 font-display">
              <Sparkles className="w-4 h-4" />
              <span>小綠龜智慧提點：</span>
            </div>
            <p className="pl-5">{question.hint}</p>
          </div>
        )}

        {/* Post-Answer Explanation Box */}
        {isAnswered && (
          <div className={`p-4 sm:p-5 rounded-2xl border font-sans space-y-2 animate-fade-in ${
            isAnswerCorrect 
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.08)]' 
              : 'bg-rose-950/30 border-rose-500/40 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.08)]'
          }`}>
            <div className="flex items-center gap-2">
              {isAnswerCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-wider font-display text-emerald-300">
                    編譯成功！純淨聖水滋潤良田。
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-xs font-black uppercase tracking-wider font-display text-rose-300">
                    編譯失敗！請參閱下方除錯解析。
                  </span>
                </>
              )}
            </div>
            
            <div className="space-y-1.5 text-xs sm:text-sm pt-2 border-t border-slate-800">
              <div className="font-bold text-amber-300 font-display flex items-center gap-1">
                <span>📖 核心知識點剖析：</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {question.explanation}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
