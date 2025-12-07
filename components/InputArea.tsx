import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { Send, Image as ImageIcon, X, Loader2 } from 'lucide-react';

interface InputAreaProps {
  onSend: (text: string, imageFile: File | null) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = () => {
    if ((!text.trim() && !selectedImage) || isLoading) return;
    
    onSend(text, selectedImage);
    
    // Reset state
    setText('');
    clearImage();
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-2 shadow-2xl ring-1 ring-white/5">
        
        {/* Image Preview Area */}
        {previewUrl && (
          <div className="absolute bottom-full left-4 mb-2 p-2 bg-slate-800 border border-slate-700 rounded-xl shadow-lg animate-fade-in">
            <div className="relative">
              <img src={previewUrl} alt="Preview" className="h-24 w-auto rounded-lg object-cover" />
              <button 
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-sm transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* File Input Trigger */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className={`p-3 rounded-full transition-colors flex-shrink-0 mb-1 ${
              selectedImage 
              ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
            title="Upload Image"
          >
            <ImageIcon size={20} />
          </button>
          
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask Gemini something or analyze an image..."
            className="flex-grow bg-transparent text-slate-100 placeholder-slate-500 resize-none py-3 px-2 max-h-[150px] focus:outline-none focus:ring-0 text-base"
            rows={1}
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={(!text.trim() && !selectedImage) || isLoading}
            className={`p-3 rounded-full mb-1 transition-all duration-200 flex-shrink-0 ${
              (!text.trim() && !selectedImage) || isLoading
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="text-center mt-3 text-xs text-slate-500">
        Powered by Gemini 2.5 Flash • AI can make mistakes.
      </div>
    </div>
  );
};

export default InputArea;