
import React from 'react';
import { Formula } from '../types';
import { Heart, Shield, User, Users, Zap, Clock, ChevronRight } from 'lucide-react';

interface FormulaCardProps {
  formula: Formula;
  onClick: () => void;
  isAdminMode?: boolean;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'heart': return <Heart className="text-pink-500" size={24} />;
    case 'shield': return <Shield className="text-emerald-500" size={24} />;
    case 'users': return <Users className="text-blue-500" size={24} />;
    case 'user': return <User className="text-purple-500" size={24} />;
    case 'zap': return <Zap className="text-amber-500" size={24} />;
    default: return <Heart className="text-pink-500" size={24} />;
  }
};

const formatDurationFull = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (secs === 0) return `${mins} phút`;
  return `${mins} phút ${secs} giây`;
};

const FormulaCard: React.FC<FormulaCardProps> = ({ formula, onClick }) => {
  return (
    <div className="relative group h-full">
      <button 
        onClick={onClick}
        className="flex flex-col items-start text-left w-full h-full bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/10 overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-950/50 px-2 py-1 rounded-md">
              <Clock size={12} />
              {formatDurationFull(formula.durationSeconds)}
          </div>
        </div>

        <div className="mb-4 p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-pink-500/20 group-hover:scale-110 transition-all duration-300">
          {getIcon(formula.iconType)}
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-1 leading-tight group-hover:text-pink-400 transition-colors">
          {formula.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {formula.subtitle}
        </p>

        <div className="mt-auto w-full flex items-center justify-between text-xs font-medium text-pink-500/80 uppercase tracking-wider">
          <span>Bắt đầu thực hành</span>
          <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </div>
  );
};

export default FormulaCard;
