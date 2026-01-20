
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Loader2, Play } from 'lucide-react';
import { generateSpeech } from '../services/geminiService';

interface FormulaStepProps {
  index: number;
  text: string;
  isActive: boolean;
  onPlay: () => void;
}

// Utility functions for Audio Decoding
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const FormulaStep: React.FC<FormulaStepProps> = ({ index, text, isActive, onPlay }) => {
  const isWarning = text.startsWith('CẢNH BÁO');
  const isNote = text.startsWith('LƯU Ý') || text.startsWith('***');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (isActive) {
      handleSpeak();
    } else {
      stopSpeak();
    }
    return () => stopSpeak();
  }, [isActive]);

  const stopSpeak = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {}
      sourceNodeRef.current = null;
    }
    setIsSpeaking(false);
    setIsLoading(false);
  };

  const handleSpeak = async () => {
    stopSpeak();
    setIsLoading(true);

    // 1. Chuẩn hóa văn bản gửi cho Gemini
    let processedText = text
      .replace(/[*#]/g, '')
      .replace(/LQNB/g, 'Linh Quang Não Bộ')
      .replace(/NLG/g, 'en eo gi')
      .replace(/(\d+)p(\d+)s/g, '$1 phút $2 giây')
      .replace(/(\d+)p/g, '$1 phút')
      .replace(/(\d+)s/g, '$1 giây')
      .replace(/VMNKG/g, 'Văn minh kỷ cương')
      .trim();

    // Thêm cảm xúc nhẹ nhàng cho AI
    const promptText = `Đọc diễn cảm, chậm rãi và thư giãn hướng dẫn thực hành sau: ${processedText}`;

    // 2. Gọi Gemini TTS API
    const base64Audio = await generateSpeech(promptText);

    if (!base64Audio) {
      console.error("Failed to get audio from Gemini");
      setIsLoading(false);
      return;
    }

    try {
      // 3. Khởi tạo Audio Context nếu chưa có
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();

      // 4. Giải mã PCM Raw Data
      const audioBytes = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);

      // 5. Phát âm thanh
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        setIsSpeaking(false);
      };

      sourceNodeRef.current = source;
      setIsLoading(false);
      setIsSpeaking(true);
      source.start();

    } catch (error) {
      console.error("Audio Playback Error:", error);
      setIsLoading(false);
      setIsSpeaking(false);
    }
  };

  return (
    <button
      onClick={onPlay}
      disabled={isLoading}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group active:scale-[0.98] ${
        isActive 
          ? 'bg-pink-600/20 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.25)]' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
      } ${isWarning ? 'border-red-900/50 bg-red-900/10' : ''} ${isLoading ? 'cursor-wait' : ''}`}
    >
      <div className="flex gap-4 relative z-10">
        {!isWarning && !isNote && (
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 ${
            isActive ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50 scale-110' : 'bg-slate-800 text-slate-400'
          }`}>
            {index + 1}
          </div>
        )}
        
        <div className="flex-grow">
          <p className={`leading-relaxed text-lg transition-colors duration-300 ${
            isWarning ? 'text-red-300 font-bold' : (isNote ? 'text-amber-200 font-medium italic' : (isActive ? 'text-white font-medium' : 'text-slate-300'))
          }`}>
            {text}
          </p>
        </div>

        <div className={`flex-shrink-0 self-center transition-all duration-300 ${isActive ? 'scale-125 opacity-100' : 'opacity-20 group-hover:opacity-100'}`}>
          {isLoading ? (
            <Loader2 size={24} className="text-pink-400 animate-spin" />
          ) : isSpeaking ? (
            <div className="flex gap-1 items-end h-6 px-1">
              <div className="w-1.5 bg-pink-400 rounded-full animate-[bounce_0.6s_infinite]"></div>
              <div className="w-1.5 bg-pink-400 rounded-full animate-[bounce_0.8s_infinite] delay-75"></div>
              <div className="w-1.5 bg-pink-400 rounded-full animate-[bounce_1s_infinite] delay-150"></div>
            </div>
          ) : (
            <div className={`p-2.5 rounded-full transition-colors ${isActive ? 'bg-pink-500 text-white shadow-md' : 'bg-slate-800 text-slate-400'}`}>
              <Volume2 size={20} />
            </div>
          )}
        </div>
      </div>

      {(isSpeaking || isLoading) && (
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${isLoading ? 'via-slate-500/5' : 'via-pink-500/5'} to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none`} />
      )}
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </button>
  );
};

export default FormulaStep;
