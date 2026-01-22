
import React from 'react';

interface FormulaStepProps {
  index: number;
  text: string;
  isActive: boolean;
  onPlay: () => void;
}

const FormulaStep: React.FC<FormulaStepProps> = ({ index, text, isActive, onPlay }) => {
  const isWarning = text.startsWith('CẢNH BÁO');
  const isNote = text.startsWith('LƯU Ý') || text.startsWith('***');

  return (
    <button
      onClick={onPlay}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group active:scale-[0.98] ${
        isActive 
          ? 'bg-pink-600/20 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.25)]' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
      } ${isWarning ? 'border-red-900/50 bg-red-900/10' : ''}`}
    >
      <div className="flex gap-4 relative z-10">
        {!isWarning && !isNote && (
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 ${
            isActive ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50 scale-110' : 'bg-slate-800 text-slate-400'
          }`}>
            {index + 1}
          </div>
        )}
        
        <div className="flex-grow">
          <p className={`leading-relaxed text-lg transition-colors duration-300 ${
            isWarning ? 'text-red-300 font-bold' : (isNote ? 'text-amber-200 font-medium italic' : (isActive ? 'text-white font-medium' : 'text-slate-300'))
          }`}>
            {text}
          </p>
        </div>
      </div>

      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
      )}
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </button>
  );
};

export default FormulaStep;
