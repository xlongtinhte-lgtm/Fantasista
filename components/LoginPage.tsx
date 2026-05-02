
import React, { useState } from 'react';
import { Lock, ChevronRight, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1102') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 font-inter">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 mb-6 group">
            <Lock className="text-pink-500 group-hover:scale-110 transition-transform" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">NLG LQVT KNM</h1>
          <p className="text-slate-400">Vui lòng nhập mật khẩu để tiếp tục</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              className={`w-full bg-slate-900/50 border ${error ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-800 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20'} text-white rounded-xl py-4 px-5 outline-none transition-all placeholder:text-slate-600 text-center tracking-[0.5em] text-xl font-mono`}
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm animate-shake">
              <AlertCircle size={16} />
              <span>Mật khẩu không chính xác</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-semibold py-4 rounded-xl shadow-lg shadow-pink-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Đăng nhập
            <ChevronRight size={20} />
          </button>
        </form>

        <div className="mt-12 text-center text-slate-600">
          <p className="text-xs uppercase tracking-widest font-medium">Băng Tần 13+ • Văn Minh Kỷ Cương</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
