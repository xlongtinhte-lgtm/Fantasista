import React from 'react';
import { X, CheckCircle } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-pink-500/30 rounded-3xl p-8 max-w-sm w-full shadow-2xl shadow-pink-900/20 transform transition-all scale-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-900/30">
            <CheckCircle size={32} className="text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">Hoàn thành!</h3>
          <p className="text-slate-400 mb-6">
            Bạn đã hoàn thành bài tập: <br/>
            <span className="text-pink-300 font-medium">{title}</span>
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors border border-slate-700"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;