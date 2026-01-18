
import React from 'react';
import { X, Bell, CheckCircle } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flash-bg {
          0%, 100% { background-color: rgba(2, 6, 23, 0.95); }
          50% { background-color: rgba(127, 29, 29, 0.8); }
        }
        @keyframes modal-pop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes border-flash {
          0%, 100% { border-color: #ef4444; box-shadow: 0 0 30px rgba(239, 68, 68, 0.6); }
          50% { border-color: #fde047; box-shadow: 0 0 60px rgba(253, 224, 71, 0.8); }
        }
        .animate-flash-bg { animation: flash-bg 0.8s infinite; }
        .animate-modal-pop { animation: modal-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-border-flash { animation: border-flash 0.4s infinite; }
      `}} />

      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-md animate-flash-bg cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-slate-900 border-8 animate-border-flash rounded-[40px] p-10 max-w-sm w-full z-50 animate-modal-pop">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white bg-slate-800 p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce">
            <Bell size={48} className="text-white fill-white/20" />
          </div>
          
          <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">HẾT GIỜ!</h3>
          
          <div className="bg-slate-800/80 rounded-2xl p-4 mb-8 w-full border border-slate-700">
            <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">Bài tập hoàn thành:</p>
            <p className="text-yellow-400 font-black text-xl leading-tight">
              {title}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-2xl font-black text-2xl transition-all shadow-[0_10px_30px_rgba(220,38,38,0.5)] active:scale-95 border-b-8 border-red-800 active:border-b-0"
          >
            TUYỆT VỜI
          </button>
          
          <p className="mt-6 text-slate-500 text-sm font-medium animate-pulse">
            Nhấn để quay lại màn hình chính
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
