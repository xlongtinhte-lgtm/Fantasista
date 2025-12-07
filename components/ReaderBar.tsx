import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square, PlayCircle, AlertCircle } from 'lucide-react';

interface ReaderBarProps {
  textToRead: string;
}

const ReaderBar: React.FC<ReaderBarProps> = ({ textToRead }) => {
  const [isReading, setIsReading] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Keep a reference to the utterance to prevent garbage collection bugs in Chrome
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setErrorMsg("Trình duyệt không hỗ trợ đọc văn bản.");
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      if (availableVoices.length > 0) {
        setVoicesLoaded(true);
        // Prioritize "Google Tiếng Việt" or any voice starting with 'vi'
        const vnVoice = availableVoices.find(v => v.name === 'Google Tiếng Việt') || 
                        availableVoices.find(v => v.lang.startsWith('vi'));
        
        if (vnVoice) {
          setVoice(vnVoice);
          setErrorMsg(null);
        } else {
          // Fallback to null but voices loaded
          // We will rely on default browser behavior for 'vi-VN'
        }
      }
    };

    loadVoices();
    
    // Chrome/Safari voices load asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleToggleRead = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    // Cancel any previous speaking
    window.speechSynthesis.cancel();

    const newUtterance = new SpeechSynthesisUtterance(textToRead);
    
    // Explicitly set language
    newUtterance.lang = 'vi-VN'; 
    
    if (voice) {
      newUtterance.voice = voice;
    }

    newUtterance.rate = 0.9; // Slightly slower for meditation/instruction
    newUtterance.pitch = 1.0;

    newUtterance.onstart = () => {
      setIsReading(true);
      setErrorMsg(null);
    };

    newUtterance.onend = () => {
      setIsReading(false);
    };

    newUtterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      // 'interrupted' or 'canceled' are normal when user clicks stop
      if (event.error === 'interrupted' || event.error === 'canceled') {
        setIsReading(false);
        return;
      }
      
      console.error("TTS Error:", event.error);
      // Fallback error message
      setErrorMsg(`Lỗi đọc: ${event.error}`);
      setIsReading(false);
    };

    utteranceRef.current = newUtterance;
    window.speechSynthesis.speak(newUtterance);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-3xl p-4 shadow-2xl ring-1 ring-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
          <div className={`p-3 rounded-full flex-shrink-0 transition-colors ${isReading ? 'bg-pink-500/20 text-pink-400 animate-pulse' : 'bg-slate-700/50 text-slate-400'}`}>
             {errorMsg ? <AlertCircle size={24} className="text-red-400" /> : <Volume2 size={24} />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-slate-200 font-semibold text-sm truncate">
              {errorMsg || "Đọc công thức mẫu"}
            </span>
            <span className="text-slate-500 text-xs truncate">
              {voice ? `Giọng: ${voice.name}` : (voicesLoaded ? 'Giọng mặc định (Tiếng Việt)' : 'Đang tải giọng đọc...')}
            </span>
          </div>
        </div>

        <button
          onClick={handleToggleRead}
          disabled={!!errorMsg && errorMsg !== "Lỗi đọc: canceled"}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-lg transition-all active:scale-95 ${
             isReading 
             ? 'bg-slate-700 hover:bg-slate-600 border border-slate-600' 
             : 'bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {isReading ? (
            <>
              <Square size={18} fill="currentColor" />
              <span>Dừng đọc</span>
            </>
          ) : (
            <>
              <PlayCircle size={18} />
              <span>Đọc ngay</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReaderBar;