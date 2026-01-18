
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

interface TimerWidgetProps {
  initialDuration?: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

const TimerWidget: React.FC<TimerWidgetProps> = ({ initialDuration = 210, autoStart = false, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [isActive, setIsActive] = useState(autoStart);
  const [totalTime, setTotalTime] = useState(initialDuration);
  const [isFinished, setIsFinished] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const wakeLockRef = useRef<any>(null);
  
  useEffect(() => {
    setTimeLeft(initialDuration);
    setTotalTime(initialDuration);
    setIsFinished(false);
    setIsActive(autoStart);
  }, [initialDuration, autoStart]);

  const presets = [
    { label: '5 giây', seconds: 5 }, // Nút test 5 giây
    { label: '1:30', seconds: 90 },
    { label: '3:30', seconds: 210 },
    { label: '5:30', seconds: 330 },
  ];

  const initAudio = () => {
    if (!audioContextRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (Ctx) {
        audioContextRef.current = new Ctx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playCricketSound = () => {
    try {
      initAudio();
      const ctx = audioContextRef.current;
      if (!ctx) return;

      const playChirp = (time: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        // Tần số cao đặc trưng của tiếng dế
        osc.frequency.setValueAtTime(4500, time);
        osc.frequency.exponentialRampToValueAtTime(4800, time + 0.04);
        osc.type = 'sine';
        
        gain.connect(ctx.destination);
        osc.connect(gain);
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(1, time + 0.01);
        gain.gain.linearRampToValueAtTime(0, time + 0.05);
        
        osc.start(time);
        osc.stop(time + 0.05);
      };

      const now = ctx.currentTime;
      // Phát 15 hồi tiếng dế, mỗi hồi có 4 tiếng "chít chít"
      for(let i = 0; i < 15; i++) {
        const cycleStart = now + (i * 0.6);
        for(let j = 0; j < 4; j++) {
          playChirp(cycleStart + (j * 0.08));
        }
      }
    } catch (e) { console.error("Audio error:", e); }
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                setIsActive(false);
                setIsFinished(true);
                playCricketSound();
                if (onComplete) onComplete();
                return 0;
            }
            return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    initAudio(); // Đảm bảo audio context được kích hoạt khi người dùng tương tác
    setIsActive(!isActive);
    setIsFinished(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalTime);
    setIsFinished(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className={`bg-slate-900/60 backdrop-blur-sm border transition-all duration-300 rounded-2xl p-5 mb-6 shadow-2xl relative overflow-hidden ${isFinished ? 'border-red-500 animate-urgent-blink bg-red-900/20' : 'border-rose-900/30'}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes urgent-blink {
          0%, 100% { border-color: #ef4444; box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); background-color: rgba(127, 29, 29, 0.2); }
          50% { border-color: #f59e0b; box-shadow: 0 0 40px rgba(245, 158, 11, 0.6); background-color: rgba(120, 53, 15, 0.4); }
        }
        .animate-urgent-blink {
          animation: urgent-blink 0.5s infinite;
        }
      `}} />

      <div className="flex items-center gap-2 mb-4 text-pink-300 font-medium relative z-10">
        <TimerIcon size={20} className={isFinished ? 'text-white animate-bounce' : 'text-pink-400'} />
        <span className={isFinished ? 'text-white font-black text-xl' : ''}>
          {isFinished ? '⚠️ ĐÃ HẾT GIỜ! ⚠️' : 'Thời gian thực hiện'}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="relative flex items-center justify-center flex-shrink-0">
             <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * progress) / 100} strokeLinecap="round" className={`${isFinished ? 'text-white' : 'text-pink-500'} transition-all duration-1000 ease-linear`} />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-4xl font-bold tabular-nums tracking-wider ${isFinished ? 'text-white scale-110' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
                <span className={`text-xs mt-1 uppercase tracking-widest font-semibold ${isFinished ? 'text-white' : 'text-slate-500'}`}>
                   {isFinished ? 'HOÀN TẤT' : 'Còn lại'}
                </span>
              </div>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto flex-1">
          <div className="grid grid-cols-4 gap-2">
            {presets.map((preset) => (
              <button 
                key={preset.label} 
                onClick={() => {setTotalTime(preset.seconds); setTimeLeft(preset.seconds); setIsActive(false); setIsFinished(false);}} 
                className={`py-2 px-1 text-xs rounded-xl font-bold transition-all duration-200 border ${totalTime === preset.seconds ? 'bg-pink-600 text-white border-pink-400 shadow-lg' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-pink-500/50'}`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={toggleTimer} className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full text-white font-black text-lg transition-all shadow-xl active:scale-95 ${isActive ? 'bg-orange-500 hover:bg-orange-400' : 'bg-pink-600 hover:bg-pink-500'}`}>
              {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              {isActive ? 'TẠM DỪNG' : 'BẮT ĐẦU'}
            </button>
            <button onClick={resetTimer} className="p-4 rounded-full bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:bg-slate-700">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
