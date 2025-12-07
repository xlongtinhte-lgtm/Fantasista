import React, { useState } from 'react';
import { Message, MessageRole } from '../types';
import { User, Sparkles, Clock, Heart } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  // Format timestamp
  const timeString = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full mb-6 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-slate-700' 
            : 'bg-pink-600 shadow-[0_0_15px_rgba(219,39,119,0.4)]'
        }`}>
          {isUser ? <User size={18} className="text-slate-300" /> : <Heart size={18} className="text-white fill-white" />}
        </div>

        {/* Bubble Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 md:px-6 md:py-4 rounded-2xl text-sm md:text-base shadow-lg leading-relaxed whitespace-pre-wrap ${
            isUser 
              ? 'bg-slate-800 text-slate-200 rounded-tr-sm' 
              : 'bg-slate-900/80 text-pink-50 border border-pink-900/30 rounded-tl-sm shadow-pink-900/10'
          }`}>
            {/* Image attachment if exists */}
            {message.image && (
              <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={message.image} 
                  alt="User upload" 
                  className="max-h-60 w-auto object-cover"
                />
              </div>
            )}
            
            {/* Text Content */}
            {message.text}
          </div>
          
          <div className="flex items-center gap-1 mt-1 px-1 opacity-50 text-xs text-slate-500">
            <Clock size={10} />
            <span>{timeString}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;