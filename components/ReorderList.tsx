
// Add missing React and useState imports to fix "Cannot find namespace 'React'" and "Cannot find name 'useState'" errors
import React, { useState } from 'react';
import { Formula } from '../types';
import { GripVertical, Save, X, Info, ChevronUp, ChevronDown } from 'lucide-react';

interface ReorderListProps {
  formulas: Formula[];
  onSave: (newOrder: Formula[]) => void;
  onCancel: () => void;
}

const ReorderList: React.FC<ReorderListProps> = ({ formulas, onSave, onCancel }) => {
  const [items, setItems] = useState<Formula[]>([...formulas]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '0.4';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '1';
    setDraggedIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setItems(newItems);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const item = newItems.splice(index, 1)[0];
    newItems.splice(index - 1, 0, item);
    setItems(newItems);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const item = newItems.splice(index, 1)[0];
    newItems.splice(index + 1, 0, item);
    setItems(newItems);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GripVertical className="text-pink-500" />
            Sắp xếp thứ tự
          </h2>
          <p className="text-xs text-slate-500 mt-1">Kéo thả hoặc dùng mũi tên để thay đổi vị trí</p>
        </div>
        <button onClick={onCancel} className="p-2 text-slate-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-2 mb-8">
        {items.map((formula, index) => (
          <div
            key={formula.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            className={`flex items-center gap-3 p-3 bg-slate-800/50 border rounded-2xl transition-all ${
              draggedIndex === index 
                ? 'border-pink-500 bg-pink-500/10 shadow-lg scale-[1.02] z-10' 
                : 'border-slate-700'
            }`}
          >
            {/* Handle for Desktop Drag */}
            <div className="hidden md:block text-slate-600 cursor-move hover:text-pink-400 p-1">
              <GripVertical size={20} />
            </div>
            
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
              {index + 1}
            </div>

            <div className="flex-grow min-w-0">
              <h4 className="text-slate-200 font-bold text-sm leading-tight truncate">{formula.title}</h4>
              <p className="text-slate-500 text-[10px] truncate">{formula.subtitle}</p>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className={`p-2 rounded-lg transition-colors ${index === 0 ? 'text-slate-700' : 'text-slate-400 bg-slate-800 hover:text-pink-400 hover:bg-slate-700'}`}
                title="Lên"
              >
                <ChevronUp size={18} />
              </button>
              <button 
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className={`p-2 rounded-lg transition-colors ${index === items.length - 1 ? 'text-slate-700' : 'text-slate-400 bg-slate-800 hover:text-pink-400 hover:bg-slate-700'}`}
                title="Xuống"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 bg-pink-500/5 rounded-2xl border border-pink-500/10 mb-6">
        <div className="flex items-center gap-2 text-pink-400">
          <Info size={16} className="flex-shrink-0" />
          <span className="text-[10px] font-medium">Bấm "Lưu thứ tự" để xác nhận các thay đổi của bạn.</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-slate-400 hover:text-white font-bold text-sm transition-colors"
        >
          Hủy bỏ
        </button>
        <button
          onClick={() => onSave(items)}
          className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-pink-900/20 transition-all active:scale-95 text-sm"
        >
          <Save size={18} />
          Lưu thứ tự
        </button>
      </div>
    </div>
  );
};

export default ReorderList;
