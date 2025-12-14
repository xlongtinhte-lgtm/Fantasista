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
  const audioContextRef = useRef<AudioContext | null>(null);
  const wakeLockRef = useRef<any>(null); // Ref for Wake Lock
  
  // Update internal state when props change
  useEffect(() => {
    setTimeLeft(initialDuration);
    setTotalTime(initialDuration);
    if (autoStart) {
        setIsActive(true);
    } else {
        setIsActive(false);
    }
  }, [initialDuration, autoStart]);

  const presets = [
    { label: '1:30', seconds: 90 },
    { label: '3:30', seconds: 210 },
    { label: '5:30', seconds: 330 },
  ];

  // Initialize/Resume Audio Context (Must be done on user gesture)
  const initAudio = () => {
    if (!audioContextRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (Ctx) {
        audioContextRef.current = new Ctx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(err => console.error("Audio resume failed", err));
    }
  };

  // --- WAKE LOCK LOGIC ---
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        // Only request if not already active to avoid redundant calls
        if (!wakeLockRef.current) {
           wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        //    console.log('Screen Wake Lock active');
        }
      }
    } catch (err: any) {
      // Gracefully handle permission errors
      if (err.name !== 'NotAllowedError') {
        console.error(`Wake Lock error: ${err.name}, ${err.message}`);
      }
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        // console.log('Screen Wake Lock released');
      } catch (err: any) {
        console.error(`Wake Lock release error: ${err.name}, ${err.message}`);
      }
    }
  };

  useEffect(() => {
    // Handle visibility change to re-acquire lock
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (isActive) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    
    // Cleanup on unmount or when isActive changes
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseWakeLock();
    };
  }, [isActive]);
  // -----------------------

  // Play Cricket Sound using Web Audio API (Approx 6 seconds, Louder)
  const playCricketSound = () => {
    try {
      if (!audioContextRef.current) {
         initAudio();
      }
      
      const ctx = audioContextRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;
      
      // Helper to create a single pulse (part of a chirp)
      const playPulse = (time: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Cricket sound is typically high pitched (4000-5000Hz)
        osc.frequency.value = 4500; 
        osc.type = 'sine'; // Sine or triangle works well
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        // Short envelope: Attack -> Decay
        gain.gain.setValueAtTime(0, time);
        // INCREASED VOLUME: 0.1 -> 0.8
        gain.gain.linearRampToValueAtTime(0.8, time + 0.01); // Quick attack
        gain.gain.linearRampToValueAtTime(0, time + 0.04); // Quick decay
        
        osc.start(time);
        osc.stop(time + 0.05);
      };

      // Create a "Chirp" (a trill of multiple pulses)
      const playChirp = (startTime: number) => {
         // A chirp consists of ~3-5 pulses in quick succession
         for(let i = 0; i < 4; i++) {
             playPulse(startTime + (i * 0.05)); // 50ms spacing
         }
      };

      // Play pattern: Chirps spaced 0.7s apart
      // Extended to cover ~6 seconds
      const intervals = [0, 0.7, 1.4, 2.1, 2.8, 3.5, 4.2, 4.9, 5.6];
      intervals.forEach(timeOffset => playChirp(now + timeOffset));
      
    } catch (e) {
      console.error("Audio play error", e);
    }
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                // Timer finished
                setIsActive(false);
                playCricketSound(); // Cricket sound
                if (onComplete) onComplete();
                return 0;
            }
            return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => {
    if (!isActive) {
      initAudio(); // Initialize audio on start
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalTime);
  };

  const setManualPreset = (seconds: number) => {
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm border border-rose-900/30 rounded-2xl p-5 mb-6 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-4 text-pink-300 font-medium relative z-10">
        <TimerIcon size={20} className="text-pink-400" />
        <span>Thời gian thực hiện</span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Timer Display */}
        <div className="relative flex items-center justify-center flex-shrink-0">
             {/* Progress Ring Background */}
             <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-800"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={364}
                  strokeDashoffset={364 - (364 * progress) / 100}
                  strokeLinecap="round"
                  className={`text-pink-500 transition-all duration-1000 ease-linear ${isActive ? 'opacity-100' : 'opacity-80'}`}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-white tabular-nums tracking-wider">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Còn lại</span>
              </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 w-full md:w-auto flex-1">
          {/* Presets */}
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setManualPreset(preset.seconds)}
                className={`py-2 px-1 text-sm rounded-xl font-semibold transition-all duration-200 border ${
                  totalTime === preset.seconds
                    ? 'bg-pink-600 text-white border-pink-500 shadow-lg shadow-pink-900/50 scale-105'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-pink-500/50 hover:text-pink-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Play/Pause/Reset */}
          <div className="flex gap-3">
            <button
              onClick={toggleTimer}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-bold transition-all shadow-lg active:scale-95 ${
                isActive 
                  ? 'bg-orange-500 hover:bg-orange-400 shadow-orange-900/20' 
                  : 'bg-pink-600 hover:bg-pink-500 shadow-pink-900/30'
              }`}
            >
              {isActive ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              {isActive ? 'Tạm dừng' : 'Bắt đầu'}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 rounded-full bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
              title="Đặt lại"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;