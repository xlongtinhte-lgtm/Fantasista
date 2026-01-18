
import React, { useState } from 'react';
import { Formula } from '../types';
import { GripVertical, Save, X, Info } from 'lucide-react';

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
    // Hiệu ứng ghost image cho trình duyệt
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
    
    // Xóa mục đang kéo và chèn vào vị trí mới
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
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
          <p className="text-xs text-slate-500 mt-1">Nắm và kéo các mục để thay đổi vị trí xuất hiện</p>
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
            className={`flex items-center gap-4 p-4 bg-slate-800/50 border rounded-2xl transition-all cursor-move select-none ${
              draggedIndex === index 
                ? 'border-pink-500 bg-pink-500/10 shadow-lg scale-[1.02] z-10' 
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="text-slate-500 hover:text-pink-400">
              <GripVertical size={20} />
            </div>
            
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
              {index + 1}
            </div>

            <div className="flex-grow">
              <h4 className="text-slate-200 font-bold text-sm leading-tight">{formula.title}</h4>
              <p className="text-slate-500 text-xs truncate max-w-[250px]">{formula.subtitle}</p>
            </div>

            <div className="text-[10px] font-mono bg-slate-900 px-2 py-1 rounded text-slate-500 border border-slate-800">
              ID: {formula.id.split('-').pop()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 bg-pink-500/5 rounded-2xl border border-pink-500/10 mb-6">
        <div className="flex items-center gap-2 text-pink-400">
          <Info size={16} />
          <span className="text-xs font-medium">Thứ tự này sẽ được lưu ngay lập tức vào bộ nhớ máy.</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 text-slate-400 hover:text-white font-bold transition-colors"
        >
          Hủy bỏ
        </button>
        <button
          onClick={() => onSave(items)}
          className="px-8 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-pink-900/20 transition-all active:scale-95"
        >
          <Save size={18} />
          Lưu thứ tự
        </button>
      </div>
    </div>
  );
};

export default ReorderList;
