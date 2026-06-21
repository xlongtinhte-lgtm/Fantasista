
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

interface TimerWidgetProps {
  initialDuration?: number;
  autoStart?: boolean;
  onComplete?: () => void;
  forceStopSignal?: number;
}

const TimerWidget: React.FC<TimerWidgetProps> = ({ initialDuration = 210, autoStart = false, onComplete, forceStopSignal = 0 }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [isActive, setIsActive] = useState(autoStart);
  const [totalTime, setTotalTime] = useState(initialDuration);
  const [isFinished, setIsFinished] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const stopAlarmRef = useRef<boolean>(false);
  const prevDurationRef = useRef<number>(initialDuration);
  
  useEffect(() => {
    if (prevDurationRef.current !== initialDuration) {
      setTimeLeft(initialDuration);
      setTotalTime(initialDuration);
      setIsFinished(false);
      setIsActive(autoStart);
      stopAlarmRef.current = true;
      prevDurationRef.current = initialDuration;
    }
  }, [initialDuration, autoStart]);

  useEffect(() => {
    if (forceStopSignal > 0) {
      stopAlarmRef.current = true;
      setIsFinished(false);
    }
  }, [forceStopSignal]);

  const presets = [
    { label: '5 giây', seconds: 5 },
    { label: '1 phút 30 giây', seconds: 90 },
    { label: '3 phút 30 giây', seconds: 210 },
    { label: '5 phút 30 giây', seconds: 330 },
  ];

  const initAudio = () => {
    try {
      if (!audioContextRef.current) {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        if (Ctx) {
          audioContextRef.current = new Ctx();
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch (e) {
      console.error("Failed to init audio:", e);
    }
  };

  const playCricketSound = async () => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    stopAlarmRef.current = false;
    let count = 0;
    const maxCycles = 40; 

    const playChirp = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(2800, time);
      osc.frequency.exponentialRampToValueAtTime(3200, time + 0.05);
      osc.type = 'triangle'; 
      gain.connect(ctx.destination);
      osc.connect(gain);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.8, time + 0.01); 
      gain.gain.linearRampToValueAtTime(0, time + 0.06);
      osc.start(time);
      osc.stop(time + 0.07);
    };

    const nextCycle = () => {
      if (stopAlarmRef.current || count >= maxCycles) return;
      const now = ctx.currentTime;
      for(let j = 0; j < 4; j++) {
        playChirp(now + (j * 0.1));
      }
      count++;
      setTimeout(nextCycle, 800);
    };
    nextCycle();
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
    initAudio();
    stopAlarmRef.current = true;
    setIsActive(!isActive);
    setIsFinished(false);
  };

  const resetTimer = () => {
    initAudio(); 
    stopAlarmRef.current = true;
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
    <div className={`bg-slate-900/60 backdrop-blur-md border transition-all duration-300 rounded-2xl p-4 shadow-xl relative overflow-hidden ${isFinished ? 'border-red-500 animate-urgent-blink bg-red-900/20' : 'border-white/5'}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes urgent-blink {
          0%, 100% { border-color: #ef4444; box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); background-color: rgba(127, 29, 29, 0.1); }
          50% { border-color: #f59e0b; box-shadow: 0 0 30px rgba(245, 158, 11, 0.5); background-color: rgba(120, 53, 15, 0.3); }
        }
        .animate-urgent-blink {
          animation: urgent-blink 0.5s infinite;
        }
      `}} />

      <div className="flex flex-col gap-3 relative z-10">
        {/* Row 1: Timer and Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Circular time block */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full border-2 transition-colors duration-300 ${isFinished ? 'bg-red-500 border-white text-white' : 'bg-slate-850 border-pink-500/40 text-pink-400 font-extrabold shadow-[0_0_15px_rgba(236,72,153,0.1)]'}`}>
               <span className="text-lg font-black tabular-nums">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex flex-col min-w-0">
               <span className={`text-[10px] uppercase tracking-widest font-black leading-none ${isFinished ? 'text-red-400' : 'text-slate-400'}`}>
                 {isFinished ? 'ĐÃ HẾT GIỜ' : 'THỰC HÀNH'}
               </span>
               <span className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                 {isFinished ? 'Nhấn Đặt lại' : 'Năng lượng gốc'}
               </span>
            </div>
          </div>

          {/* Play/Pause & Reset buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button 
              onClick={toggleTimer} 
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white transition-all shadow-lg active:scale-90 hover:brightness-110 ${isActive ? 'bg-orange-500 shadow-orange-500/20' : 'bg-pink-600 shadow-pink-600/20'}`}
              title={isActive ? 'Tạm dừng' : 'Bắt đầu'}
            >
              {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
            </button>
            <button 
              onClick={resetTimer} 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white border border-white/5 transition-all active:scale-90 hover:bg-slate-700"
              title="Đặt lại"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Row 2: Presets options */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 whitespace-nowrap">Hẹn giờ:</span>
          <div className="flex gap-1 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
            {presets.map((preset) => (
              <button 
                key={preset.label} 
                onClick={() => {
                  initAudio(); 
                  setTotalTime(preset.seconds); 
                  setTimeLeft(preset.seconds); 
                  setIsActive(false); 
                  setIsFinished(false); 
                  stopAlarmRef.current = true;
                }} 
                className={`px-2.5 py-1 text-[10px] rounded-lg font-bold transition-all border whitespace-nowrap ${totalTime === preset.seconds ? 'bg-pink-600/20 text-pink-400 border-pink-500/40 shadow-[0_0_10px_rgba(236,72,153,0.15)] font-extrabold' : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:border-pink-500/20'}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thinner progress bar */}
        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mt-0.5 border border-white/5">
          <div 
            className={`h-full transition-all duration-1000 ease-linear ${isFinished ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-r from-pink-600 to-rose-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
