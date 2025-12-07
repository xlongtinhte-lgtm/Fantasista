import React, { useState } from 'react';
import { Formula } from '../types';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface FormulaEditorProps {
  formula: Formula;
  onSave: (updatedFormula: Formula) => void;
  onCancel: () => void;
}

const FormulaEditor: React.FC<FormulaEditorProps> = ({ formula, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Formula>({ ...formula });

  const handleChange = (field: keyof Formula, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const addStep = () => {
    setFormData(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const removeStep = (index: number) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-xl font-bold text-white">Edit Formula</h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Title */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Duration (Seconds)</label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={formData.durationSeconds}
              onChange={(e) => handleChange('durationSeconds', parseInt(e.target.value) || 0)}
              className="w-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <span className="text-sm text-slate-400">
              = {Math.floor(formData.durationSeconds / 60)}m {formData.durationSeconds % 60}s
            </span>
          </div>
        </div>

        {/* Icon Type */}
        <div>
           <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Icon Style</label>
           <select 
             value={formData.iconType}
             onChange={(e) => handleChange('iconType', e.target.value)}
             className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
           >
             <option value="heart">Heart (Pink)</option>
             <option value="shield">Shield (Emerald)</option>
             <option value="user">User (Purple)</option>
             <option value="users">Group (Blue)</option>
             <option value="zap">Energy (Amber)</option>
           </select>
        </div>

        {/* Steps */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">Steps</label>
          <div className="space-y-3">
            {formData.steps.map((step, index) => (
              <div key={index} className="flex gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center mt-2">{index + 1}</span>
                <textarea
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="flex-grow bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none text-sm resize-y"
                  rows={2}
                />
                <button 
                  onClick={() => removeStep(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg h-fit mt-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addStep}
              className="w-full py-2 border-2 border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-pink-400 hover:border-pink-500/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Plus size={16} /> Add Step
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-slate-300 hover:text-white font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-pink-900/20"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default FormulaEditor;
