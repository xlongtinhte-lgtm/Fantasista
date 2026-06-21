
import React, { useState, useEffect } from 'react';
import { Formula } from './types';
import { DEFAULT_FORMULAS } from './services/defaultData';
import TimerWidget from './components/TimerWidget';
import FormulaCard from './components/FormulaCard';
import FormulaEditor from './components/FormulaEditor';
import CompletionModal from './components/CompletionModal';
import ReorderList from './components/ReorderList';
import FormulaStep from './components/FormulaStep';
import LoginPage from './components/LoginPage';
import { Heart, ArrowLeft, Settings, Edit, ListOrdered, Search, X, LogOut, RefreshCw, Wind } from 'lucide-react';

const STORAGE_KEY = 'nlg_formulas_v5_clean_reset_9';

const App: React.FC = () => {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [view, setView] = useState<'grid' | 'detail' | 'edit' | 'reorder'>('grid');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [stopSignal, setStopSignal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'self' | 'environment'>('self');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('nlg_auth_status');
    setIsAuthenticated(authStatus === 'true');
    
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
    setActiveStepIndex(null);
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

  const currentFormula = formulas.find(f => f.id === selectedFormulaId);

  const handleLogout = () => {
    localStorage.removeItem('nlg_auth_status');
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    localStorage.setItem('nlg_auth_status', 'true');
    setIsAuthenticated(true);
  };

  if (isAuthenticated === null) return null;
  if (!isAuthenticated) return <LoginPage onLogin={handleLoginSuccess} />;

  const removeAccents = (str: string) => {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  };

  const filteredFormulas = formulas.filter(f => {
    const isEnv = f.category === 'environment';
    if (activeTab === 'self' && isEnv) return false;
    if (activeTab === 'environment' && !isEnv) return false;

    const searchTarget = removeAccents(f.title + ' ' + f.subtitle);
    const query = removeAccents(searchQuery);
    return searchTarget.includes(query);
  });

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
                <div className="flex flex-col items-start leading-none">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 font-black text-xl md:text-2xl tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_12px_rgba(236,72,153,0.3)] transition-all duration-300 hover:brightness-115">NLG</span>
                </div>
              </div>
              
              <div className="flex flex-col justify-center animate-fade-in ml-1 gap-0.5">
                <p className="text-[8px] md:text-[10px] leading-tight font-bold text-pink-400 tracking-wider uppercase">
                  PHẦN II NLG LQVT KNM BẰNG TẦN 13+
                </p>
                <p className="text-[8px] md:text-[10px] font-semibold text-pink-300 tracking-wide uppercase">
                  THỰC HIỆN VĂN MINH KỶ CƯƠNG
                </p>
                <div className="space-y-0 text-[7px] md:text-[9px] font-medium uppercase">
                  <p className="text-pink-200/90">NÂNG CẤP TRÍ TUỆ HIỂU BIẾT TÌNH THƯƠNG</p>
                  <p className="text-pink-100/80">KIẾN TẠO HOÀ BÌNH HẠNH PHÚC SỨC SỐNG THANH XUÂN TRƯỜNG THỌ</p>
                  <p className="text-white/60 italic tracking-widest text-[6px] md:text-[8px]">CHO NHÂN SINH VÀ MUÔN LOÀI VẠN VẬT TRÊN TOÀN CẦU</p>
                  <p className="text-[7px] md:text-[9px] text-pink-400 font-mono mt-1 opacity-80">CẬP NHẬT: 01/05/2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
              <button 
                onClick={() => window.location.reload()}
                className="p-3 text-slate-400 hover:text-white transition-colors animate-pulse-slow active:scale-90"
                title="Cập nhật ứng dụng"
              >
                <RefreshCw size={24} />
              </button>
              <button 
                onClick={handleLogout}
                className="p-3 text-slate-400 hover:text-white transition-colors active:scale-90"
                title="Đăng xuất"
              >
                <LogOut size={24} />
              </button>
              <button 
                onClick={() => setIsAdminMode(!isAdminMode)} 
                className={`p-3 rounded-full transition-all active:scale-90 ${isAdminMode ? 'text-pink-400 bg-pink-900/20' : 'text-slate-400 hover:text-white'}`}
              >
                <Settings size={24} />
              </button>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto bg-slate-950">
        <div className="max-w-4xl mx-auto min-h-full pb-10">
            {view === 'grid' && (
              <div className="animate-fade-in p-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-slate-200 mb-2">Thư viện công thức</h1>
                  <p className="text-slate-500 text-sm">Chọn một công thức để bắt đầu thực hành.</p>
                </div>

                <div className="mb-4 relative max-w-md mx-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm công thức..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-800 text-slate-200 rounded-xl py-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all placeholder:text-slate-600 font-medium"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="flex justify-center gap-2 mb-6 max-w-md mx-auto">
                  <button
                    onClick={() => setActiveTab('self')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border ${
                      activeTab === 'self'
                        ? 'bg-gradient-to-r from-pink-600/20 to-rose-600/20 text-pink-400 border-pink-500/30 shadow-[0_0_15px_rgba(235,53,153,0.15)] font-extrabold'
                        : 'bg-slate-900/30 text-slate-500 border-slate-900 hover:text-slate-300 hover:bg-slate-900/50'
                    }`}
                  >
                    <Heart size={16} className={activeTab === 'self' ? 'fill-pink-500/10' : ''} />
                    Bản thân
                  </button>
                  <button
                    onClick={() => setActiveTab('environment')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border ${
                      activeTab === 'environment'
                        ? 'bg-gradient-to-r from-pink-600/20 to-rose-600/20 text-pink-400 border-pink-500/30 shadow-[0_0_15px_rgba(235,53,153,0.15)] font-extrabold'
                        : 'bg-slate-900/30 text-slate-500 border-slate-900 hover:text-slate-300 hover:bg-slate-900/50'
                    }`}
                  >
                    <Wind size={16} className={activeTab === 'environment' ? 'animate-pulse' : ''} />
                    Môi trường
                  </button>
                </div>

                {isAdminMode && (
                   <div className="mb-6 flex justify-center">
                     <button onClick={() => setView('reorder')} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700">
                       <ListOrdered size={18} /> Sắp xếp công thức
                     </button>
                   </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFormulas.map((formula) => (
                    <FormulaCard key={formula.id} formula={formula} onClick={() => handleSelectFormula(formula.id)} />
                  ))}
                  {filteredFormulas.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-slate-500 italic">Không tìm thấy công thức nào phù hợp.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {view === 'detail' && currentFormula && (
              <div className="animate-fade-in flex flex-col">
                <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl">
                   <div className="max-w-4xl mx-auto px-4 py-2">
                     <TimerWidget initialDuration={currentFormula.durationSeconds} onComplete={handleTimerComplete} forceStopSignal={stopSignal} />
                   </div>
                </div>
                
                <div className="p-4 md:p-6 space-y-4">
                  <div className="flex items-center justify-between px-2 mb-1">
                    <div className="flex flex-col">
                      <h2 className="text-xl md:text-2xl font-black text-white leading-tight">{currentFormula.title}</h2>
                      <p className="text-pink-400 font-bold uppercase text-[10px] tracking-widest">{currentFormula.subtitle}</p>
                    </div>
                    {isAdminMode && (
                      <button onClick={handleEdit} className="p-3 bg-slate-800 hover:bg-pink-600 text-slate-400 hover:text-white rounded-2xl transition-all shadow-lg">
                        <Edit size={20} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4 pb-20">
                    {currentFormula.steps.map((step, idx) => (
                      <FormulaStep 
                        key={idx} 
                        index={idx} 
                        text={step} 
                        isActive={activeStepIndex === idx}
                        onPlay={() => setActiveStepIndex(idx)}
                      />
                    ))}
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
