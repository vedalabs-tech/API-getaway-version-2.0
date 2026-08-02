cat << 'INNER_EOF' > src/Auth.tsx
import { useState, useEffect } from 'react';
import { callAPI } from './api';
import { Loader2, ArrowRight, Mail, Moon, Sun } from 'lucide-react';
import logoImage from '../logo.png';

interface AuthProps {
  onLogin: (email: string, name: string) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [screen, setScreen] = useState<'login' | 'register' | 'otp'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authContext, setAuthContext] = useState<'login' | 'register'>('login');
  
  const [isDark, setIsDark] = useState(
    localStorage.getItem('veda_theme') === 'dark' || 
    (!localStorage.getItem('veda_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('veda_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('veda_theme', 'light');
    }
  }, [isDark]);

  const requestLoginOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError('Enter email');
    setLoading(true); setError('');
    const res = await callAPI({ action: "request_login_otp", email });
    setLoading(false);
    if (res?.status === "success") {
      setAuthContext('login');
      setScreen('otp');
    } else {
      setError(res?.message || 'Connection error');
    }
  };

  const requestRegisterOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return setError('Fill all fields');
    setLoading(true); setError('');
    const res = await callAPI({ action: "request_register_otp", email });
    setLoading(false);
    if (res?.status === "success") {
      setAuthContext('register');
      setScreen('otp');
    } else {
      setError(res?.message || 'Connection error');
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return setError('Enter 6-digit OTP');
    setLoading(true); setError('');
    const payload: any = { 
      action: authContext === "login" ? "verify_login" : "verify_register", 
      email, 
      otp 
    };
    if (authContext === "register") {
      payload.name = name;
      payload.role = "Developer";
      payload.organization = "N/A";
    }
    const res = await callAPI(payload);
    setLoading(false);
    if (res?.status === "success") {
      onLogin(email, res.name || name || "Developer");
    } else {
      setError(res?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gray-50 dark:bg-[#09090b] transition-colors duration-500 font-sans">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-60 dark:opacity-40"
        style={{
          backgroundImage: \`url("\${isDark ? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop'}")\`,
        }}
      />
      <div className="absolute inset-0 bg-white/50 dark:bg-black/70 backdrop-blur-sm transition-colors duration-500"></div>

      {/* Theme Toggle Button */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/80 dark:bg-black/50 text-gray-800 dark:text-gray-200 hover:scale-110 hover:bg-white dark:hover:bg-black/70 shadow-lg backdrop-blur-md transition-all duration-300 outline-none focus:ring-0 z-50"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun size={20} className="animate-in spin-in-12 duration-500" /> : <Moon size={20} className="animate-in spin-in-12 duration-500" />}
      </button>

      <div className="w-full max-w-md p-8 sm:p-10 bg-white/70 dark:bg-[#111216]/80 backdrop-blur-xl border border-white/50 dark:border-gray-800/50 rounded-3xl shadow-2xl relative z-10 transition-all duration-500 transform hover:scale-[1.01]">
        
        <div className="flex flex-col items-center mb-10 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-5 animate-in slide-in-from-top-4 duration-500">
            <img src={logoImage} alt="Veda Labs Logo" className="h-10 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300" />
            <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Veda <span className="text-blue-600 dark:text-blue-500">Labs</span></span>
          </div>
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-400 animate-in fade-in duration-700">Gateway Authentication</h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm rounded-xl font-medium flex items-center gap-3 animate-in shake duration-300">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {error}
          </div>
        )}

        {screen === 'login' && (
          <form onSubmit={requestLoginOTP} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 pl-1">Developer Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3.5 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-black/60 text-gray-900 dark:text-white transition-all shadow-sm"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Continue <ArrowRight size={18} className="animate-pulse" /></>}
            </button>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
              New developer? <button type="button" onClick={() => { setScreen('register'); setError(''); }} className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors">Apply for Access</button>
            </div>
          </form>
        )}

        {screen === 'register' && (
          <form onSubmit={requestRegisterOTP} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 pl-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-3.5 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-black/60 text-gray-900 dark:text-white transition-all shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 pl-1">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3.5 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-black/60 text-gray-900 dark:text-white transition-all shadow-sm"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Request Access <ArrowRight size={18} /></>}
            </button>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
              <button type="button" onClick={() => { setScreen('login'); setError(''); }} className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors">Back to Login</button>
            </div>
          </form>
        )}

        {screen === 'otp' && (
          <form onSubmit={verifyOTP} className="space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-8 text-sm text-gray-600 dark:text-gray-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p>We sent a 6-digit code to</p>
              <strong className="text-gray-900 dark:text-white font-semibold text-base mt-1 block">{email}</strong>
            </div>
            <div>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
                placeholder="000000"
                className="w-full px-4 py-4 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-black/60 text-gray-900 dark:text-white transition-all text-center text-3xl font-mono tracking-[0.5em] shadow-sm"
                required
              />
            </div>
            <button type="submit" disabled={loading || otp.length < 6} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify Identity'}
            </button>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
              <button type="button" onClick={() => { setScreen(authContext); setOtp(''); setError(''); }} className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
INNER_EOF
