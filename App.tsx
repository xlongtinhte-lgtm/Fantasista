
import React, { useState, useEffect } from 'react';
import { Formula } from './types';
import { DEFAULT_FORMULAS } from './services/defaultData';
import TimerWidget from './components/TimerWidget';
import FormulaCard from './components/FormulaCard';
import FormulaEditor from './components/FormulaEditor';
import CompletionModal from './components/CompletionModal';
import ReorderList from './components/ReorderList';
import { Heart, ArrowLeft, Settings, Edit, ListOrdered, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'nlg_formulas_v5_clean_reset_7';

const App: React.FC = () => {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [view, setView] = useState<'grid' | 'detail' | 'edit' | 'reorder'>('grid');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [stopSignal, setStopSignal] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormulas(JSON.parse(saved));
      } catch (e) {
        setFormulas(DEFAULT_FORMULAS);
      }
    } else {
      setFormulas(DEFAULT_FORMULAS);
    }
  }, []);

  const handleSelectFormula = (id: string) => {
    setSelectedFormulaId(id);
    setView('detail');
    setShowCompletion(false);
  };

  const handleBack = () => {
    setView('grid');
    setSelectedFormulaId(null);
    setShowCompletion(false);
    setStopSignal(s => s + 1);
  };

  const handleEdit = () => {
    setView('edit');
  };

  const saveToStorage = (newFormulas: Formula[]) => {
    setFormulas(newFormulas);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFormulas));
  };

  const handleSaveFormula = (updated: Formula) => {
    const newFormulas = formulas.map(f => f.id === updated.id ? updated : f);
    saveToStorage(newFormulas);
    setView('detail');
  };

  const handleReorder = (newOrder: Formula[]) => {
    saveToStorage(newOrder);
    setView('grid');
  };

  const handleTimerComplete = () => {
    setShowCompletion(true);
  };

  const handleCloseCompletion = () => {
    setShowCompletion(false);
    setStopSignal(s => s + 1);
  };

  const handleUpdateApp = async () => {
    const confirmUpdate = window.confirm(
      "Bạn có muốn cập nhật ứng dụng? Thao tác này sẽ xóa cache, reset dữ liệu về mặc định và tải lại phiên bản mới nhất."
    );
    
    if (!confirmUpdate) return;

    setIsUpdating(true);
    
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }

      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
          await registration.unregister();
        }
      }

      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error);
      setIsUpdating(false);
      alert("Cập nhật thất bại. Vui lòng thử lại sau.");
    }
  };

  const currentFormula = formulas.find(f => f.id === selectedFormulaId);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 selection:bg-pink-500/30 selection:text-pink-100 font-inter">
      <header className="flex-shrink-0 min-h-[70px] md:min-h-[90px] relative overflow-hidden border-b border-white/10 z-30 sticky top-0 bg-slate-950 flex flex-col justify-center">
        <div className="absolute inset-0 z-0 opacity-40">
           <video autoPlay loop muted playsInline className="w-full h-full object-cover" poster="https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?auto=format&fit=crop&w=800&q=80">
             <source src="https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-between px-4 w-full">
          <div className="flex items-center gap-3 md:gap-6 flex-grow overflow-hidden py-2">
            {view !== 'grid' && (
              <button onClick={handleBack} className="flex-shrink-0 p-2 rounded-full hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors border border-transparent hover:border-slate-600">
                <ArrowLeft size={24} />
              </button>
            )}
            
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 overflow-hidden" onClick={() => handleBack()}>
              <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                <div className="relative">
                   <div className="absolute inset-0 bg-pink-500 blur-lg opacity-40"></div>
                   <Heart className="text-pink-500 relative z-10 fill-pink-500/20" size={24} />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300 font-black text-xl md:text-2xl tracking-tighter uppercase whitespace-nowrap">NLG</span>
              </div>
              
              <div className="flex flex-col justify-center animate-fade-in">
                <p className="text-[9px] md:text-[11px] leading-[1.2] font-bold text-pink-400 tracking-wide uppercase drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]">
                  NĂNG LƯỢNG TÌNH THƯƠNG TRÍ TUỆ HIỂU BIẾT TỪ TRÁI TIM LINH HỒN
                </p>
                <p className="text-[8px] md:text-[10px] leading-[1.2] font-medium text-pink-300/80 uppercase tracking-wider">
                  CỦA ĐẤNG TẠO HÓA BAN NLG LINH QUANG VŨ TRỤ KỶ NGUYÊN MỚI
                </p>
                <p className="text-[8px] md:text-[10px] leading-[1.2] font-medium text-pink-200/60 uppercase tracking-widest italic">
                  CHO TOÀN THỂ NHÂN SINH VÀ MUÔN LOÀI VẠN VẬT
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <button 
                onClick={handleUpdateApp} 
                disabled={isUpdating}
                className={`p-2 rounded-full text-slate-500 hover:text-white hover:bg-slate-800/50 transition-all ${isUpdating ? 'animate-spin text-pink-500' : ''}`}
                title="Cập nhật ứng dụng & Xóa cache"
              >
                <RefreshCw size={20} />
              </button>
              {isAdminMode && view === 'grid' && (
                <button 
                  onClick={() => setView('reorder')} 
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-all"
                >
                  <ListOrdered size={18} />
                  Sắp xếp
                </button>
              )}
              <button onClick={() => setIsAdminMode(!isAdminMode)} className={`p-2 rounded-full transition-all ${isAdminMode ? 'text-pink-400 bg-pink-900/20 shadow-[0_0_10px_rgba(219,39,119,0.3)]' : 'text-slate-500 hover:text-slate-300'}`} title="Chế độ quản trị">
                <Settings size={20} />
              </button>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto scroll-smooth bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-4xl mx-auto min-h-full pb-10">
            {view === 'grid' && (
              <div className="animate-fade-in p-6">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-200 mb-2">Thư viện công thức</h1>
                  <p className="text-slate-500 text-sm">{isAdminMode ? 'Bạn đang ở chế độ chỉnh sửa. Nhấn nút "Sắp xếp" để thay đổi thứ tự.' : 'Chọn một công thức để bắt đầu thực hành.'}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formulas.map((formula) => (
                    <FormulaCard key={formula.id} formula={formula} onClick={() => handleSelectFormula(formula.id)} isAdminMode={false} />
                  ))}
                </div>
              </div>
            )}

            {view === 'detail' && currentFormula && (
              <div className="animate-fade-in flex flex-col">
                <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl">
                   <div className="max-w-4xl mx-auto px-4 md:px-6 py-2">
                     <TimerWidget initialDuration={currentFormula.durationSeconds} autoStart={false} onComplete={handleTimerComplete} forceStopSignal={stopSignal} />
                   </div>
                </div>
                <div className="p-4 md:p-6 space-y-6">
                  <div className="bg-slate-900/50 rounded-2xl p-4 md:p-8 border border-slate-800 shadow-xl relative">
                    {isAdminMode && (
                      <button onClick={handleEdit} className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-pink-600 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-sm">
                        <Edit size={16} /> Sửa nội dung
                      </button>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-slate-200 mb-2">{currentFormula.title}</h2>
                    <p className="text-pink-400/80 font-medium text-base md:text-lg mb-6 border-b border-white/5 pb-4">{currentFormula.subtitle}</p>
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-slate-200 uppercase tracking-wide">Hướng dẫn thực hiện:</h3>
                      {currentFormula.steps.map((step, idx) => {
                        const isWarning = step.startsWith('CẢNH BÁO');
                        const isNote = step.startsWith('LƯU Ý') || step.startsWith('***');
                        return (
                          <div key={idx} className={`flex gap-4 ${isWarning || isNote ? 'bg-slate-800/60 p-5 rounded-xl border border-white/5' : 'py-2'}`}>
                            {!isWarning && !isNote && (
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-900/30 text-pink-400 border border-pink-500/20 flex items-center justify-center font-bold text-lg shadow-inner mt-1">{idx + 1}</div>
                            )}
                            <p className={`leading-relaxed whitespace-pre-line ${isWarning ? 'text-red-300 font-bold text-base md:text-lg' : (isNote ? 'text-amber-200 font-medium text-base md:text-lg' : 'text-slate-200 text-lg md:text-xl font-medium tracking-wide')}`}>{step}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === 'edit' && currentFormula && (
              <div className="p-6">
                <FormulaEditor formula={currentFormula} onSave={handleSaveFormula} onCancel={() => setView('detail')} />
              </div>
            )}

            {view === 'reorder' && (
              <div className="p-6">
                <ReorderList formulas={formulas} onSave={handleReorder} onCancel={() => setView('grid')} />
              </div>
            )}
        </div>
      </main>
      <CompletionModal isOpen={showCompletion} onClose={handleCloseCompletion} title={currentFormula?.title || ''} />
    </div>
  );
};

export default App;
