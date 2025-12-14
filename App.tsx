
import React, { useState, useEffect } from 'react';
import { Formula } from './types';
import { DEFAULT_FORMULAS } from './services/defaultData';
import TimerWidget from './components/TimerWidget';
import FormulaCard from './components/FormulaCard';
import FormulaEditor from './components/FormulaEditor';
import CompletionModal from './components/CompletionModal';
import { Heart, ArrowLeft, Settings, Edit, Wind } from 'lucide-react';

const STORAGE_KEY = 'nlg_formulas_v5_clean_reset_7'; // Updated key to force load new data

const App: React.FC = () => {
  // --- STATE ---
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [view, setView] = useState<'grid' | 'detail' | 'edit'>('grid');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  // --- EFFECTS ---

  // Load data
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

  // --- ACTIONS ---

  const handleSelectFormula = (id: string) => {
    setSelectedFormulaId(id);
    setView('detail');
    setShowCompletion(false);
  };

  const handleBack = () => {
    setView('grid');
    setSelectedFormulaId(null);
    setShowCompletion(false);
  };

  const handleEdit = () => {
    setView('edit');
  };

  const handleSaveFormula = (updated: Formula) => {
    const newFormulas = formulas.map(f => f.id === updated.id ? updated : f);
    setFormulas(newFormulas);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFormulas));
    setView('detail');
  };

  const handleTimerComplete = () => {
    setShowCompletion(true);
  };

  // --- RENDER HELPERS ---

  const currentFormula = formulas.find(f => f.id === selectedFormulaId);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 selection:bg-pink-500/30 selection:text-pink-100 font-inter">
      
      {/* Header with Video Background (Keep Screen On Hack) */}
      <header className="flex-shrink-0 h-14 relative overflow-hidden border-b border-white/10 z-30 sticky top-0 bg-slate-950">
        
        {/* Video Banner Layer - Keeps screen awake and adds aesthetic */}
        <div className="absolute inset-0 z-0 opacity-40">
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="w-full h-full object-cover"
             poster="https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?auto=format&fit=crop&w=800&q=80"
           >
             {/* Using a lightweight abstract video loop */}
             <source src="https://cdn.pixabay.com/video/2019/04/23/23011-332483109_tiny.mp4" type="video/mp4" />
           </video>
           {/* Dark overlay to ensure text contrast */}
           <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-3">
            {view !== 'grid' && (
              <button 
                onClick={handleBack}
                className="p-1.5 rounded-full hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors border border-transparent hover:border-slate-600"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="flex items-center gap-2 text-stone-100 font-bold text-lg tracking-tight cursor-pointer" onClick={() => setView('grid')}>
              <div className="relative">
                 <div className="absolute inset-0 bg-pink-500 blur-lg opacity-40"></div>
                 <Heart className="text-pink-500 relative z-10 fill-pink-500/20" size={20} />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300">
                NLG Practice
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`p-1.5 rounded-full transition-all ${isAdminMode ? 'text-pink-400 bg-pink-900/20' : 'text-slate-500 hover:text-slate-300'}`}
                title="Chế độ chỉnh sửa (Admin)"
              >
                <Settings size={18} />
              </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto scroll-smooth bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-4xl mx-auto min-h-full pb-10">
            
            {/* VIEW: GRID (Library) */}
            {view === 'grid' && (
              <div className="animate-fade-in p-6">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-200 mb-2">Thư viện công thức</h1>
                  <p className="text-slate-500 text-sm">Chọn một công thức để bắt đầu thực hành.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formulas.map(formula => (
                    <FormulaCard 
                      key={formula.id} 
                      formula={formula} 
                      onClick={() => handleSelectFormula(formula.id)} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: DETAIL (Practice) */}
            {view === 'detail' && currentFormula && (
              <div className="animate-fade-in flex flex-col">
                
                {/* Sticky Timer Section */}
                <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl">
                   <div className="max-w-4xl mx-auto px-4 md:px-6 py-2">
                     <TimerWidget 
                       initialDuration={currentFormula.durationSeconds} 
                       autoStart={false} 
                       onComplete={handleTimerComplete}
                     />
                   </div>
                </div>

                {/* Info Section (Scrollable) */}
                <div className="p-4 md:p-6 space-y-6">
                  <div className="bg-slate-900/50 rounded-2xl p-4 md:p-8 border border-slate-800 shadow-xl relative">
                    {isAdminMode && (
                      <button 
                        onClick={handleEdit}
                        className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-pink-600 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                      >
                        <Edit size={16} /> Sửa nội dung
                      </button>
                    )}

                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-slate-200 mb-2">
                      {currentFormula.title}
                    </h2>
                    <p className="text-pink-400/80 font-medium text-base md:text-lg mb-6 border-b border-white/5 pb-4">
                      {currentFormula.subtitle}
                    </p>
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-slate-200 uppercase tracking-wide">Hướng dẫn thực hiện:</h3>
                      {currentFormula.steps.map((step, idx) => {
                        const isWarning = step.startsWith('CẢNH BÁO');
                        const isNote = step.startsWith('LƯU Ý') || step.startsWith('***');
                        
                        return (
                          <div key={idx} className={`flex gap-4 ${isWarning || isNote ? 'bg-slate-800/60 p-5 rounded-xl border border-white/5' : 'py-2'}`}>
                            {!isWarning && !isNote && (
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-900/30 text-pink-400 border border-pink-500/20 flex items-center justify-center font-bold text-lg shadow-inner mt-1">
                                {idx + 1}
                              </div>
                            )}
                            {/* LARGE TEXT SIZE APPLIED HERE */}
                            <p className={`leading-relaxed whitespace-pre-line ${
                              isWarning 
                                ? 'text-red-300 font-bold text-base md:text-lg' 
                                : (isNote 
                                    ? 'text-amber-200 font-medium text-base md:text-lg' 
                                    : 'text-slate-200 text-lg md:text-xl font-medium tracking-wide')
                            }`}>
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: EDIT (Admin) */}
            {view === 'edit' && currentFormula && (
              <div className="p-6">
                <FormulaEditor 
                  formula={currentFormula} 
                  onSave={handleSaveFormula} 
                  onCancel={() => setView('detail')} 
                />
              </div>
            )}

        </div>
      </main>

      {/* Completion Modal */}
      <CompletionModal 
        isOpen={showCompletion} 
        onClose={() => setShowCompletion(false)} 
        title={currentFormula?.title || ''} 
      />

    </div>
  );
};

export default App;
