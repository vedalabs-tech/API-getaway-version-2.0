import { useState } from 'react';
import { callAPI } from './api';
import { Loader2, ArrowRight, Mail, Moon, Sun, X } from 'lucide-react';
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
  
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [isLocalDark, setIsLocalDark] = useState(false);
  
  // Track global theme to show correct icon initially
  const isGlobalDark = document.documentElement.classList.contains('dark');
  const isDark = isGlobalDark || isLocalDark;

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

  const setGlobalDark = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('veda_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('veda_theme', 'light');
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative bg-gray-50 dark:bg-[#09090b] transition-colors duration-500"
        style={{
          backgroundImage: `url("${isDark ? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm transition-colors duration-500"></div>

        {/* Theme Toggle Button */}
        <button 
          onClick={() => setThemeModalOpen(true)}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 shadow-lg hover:scale-105 transition-all outline-none focus:ring-0"
        >
          {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
        </button>

        <div className="max-w-md w-full bg-white/70 dark:bg-[#111216]/85 backdrop-blur-2xl border border-white/60 dark:border-gray-700/50 rounded-3xl shadow-2xl p-8 sm:p-10 relative overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-700 slide-in-from-bottom-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-[70px] pointer-events-none"></div>
          
          <div className="flex flex-col items-center mb-8 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logoImage} alt="Veda Labs Logo" className="h-10 w-auto object-contain dark:invert-[0.9] dark:hue-rotate-180" style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
              <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Veda <span className="text-blue-600 dark:text-blue-500">Labs</span></span>
            </div>
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">Veda Gateway</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enterprise API Access</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}

          {screen === 'login' && (
            <form onSubmit={requestLoginOTP} className="space-y-5 relative z-10">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Developer Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl outline-none focus:border-blue-500 focus:bg-white/80 dark:focus:bg-black/60 text-gray-900 dark:text-white transition-all no-tap-highlight placeholder:text-gray-400/80 shadow-sm"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-2 no-tap-highlight btn-glow disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Continue <ArrowRight size={16} /></>}
              </button>
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                New developer? <button type="button" onClick={() => { setScreen('register'); setError(''); }} className="text-gray-900 dark:text-white font-medium hover:underline no-tap-highlight">Apply for Access</button>
              </div>
            </form>
          )}

        {screen === 'register' && (
          <form onSubmit={requestRegisterOTP} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl outline-none focus:border-blue-500 focus:bg-white/80 dark:focus:bg-black/60 text-gray-900 dark:text-white transition-all no-tap-highlight placeholder:text-gray-400/80 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl outline-none focus:border-blue-500 focus:bg-white/80 dark:focus:bg-black/60 text-gray-900 dark:text-white transition-all no-tap-highlight placeholder:text-gray-400/80 shadow-sm"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-2 no-tap-highlight btn-glow disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Request Access <ArrowRight size={16} /></>}
            </button>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <button type="button" onClick={() => { setScreen('login'); setError(''); }} className="text-gray-900 dark:text-white font-medium hover:underline no-tap-highlight">Back to Login</button>
            </div>
          </form>
        )}

        {screen === 'otp' && (
          <form onSubmit={verifyOTP} className="space-y-5 relative z-10">
            <div className="text-center mb-6 text-sm text-gray-500 dark:text-gray-400">
              <Mail className="w-8 h-8 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
              We sent a 6-digit code to<br/><strong className="text-gray-900 dark:text-white font-medium">{email}</strong>
            </div>
            <div>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
                placeholder="000000"
                className="w-full px-4 py-4 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl outline-none focus:border-blue-500 focus:bg-white/80 dark:focus:bg-black/60 text-gray-900 dark:text-white transition-all no-tap-highlight placeholder:text-gray-400/80 text-center text-2xl font-mono tracking-[0.5em] shadow-sm"
                required
              />
            </div>
            <button type="submit" disabled={loading || otp.length < 6} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-2 no-tap-highlight btn-glow disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify Identity'}
            </button>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <button type="button" onClick={() => { setScreen(authContext); setOtp(''); setError(''); }} className="text-gray-900 dark:text-white font-medium hover:underline no-tap-highlight">Cancel</button>
            </div>
          </form>
        )}
      </div>

      {/* Theme Selection Modal */}
      {themeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#16181d] border border-gray-100 dark:border-gray-800 w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Dark Theme Setup</h4>
                <button onClick={() => setThemeModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white outline-none">
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Turn the whole site to Dark Theme, or only this Login Page?
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setIsLocalDark(true);
                    setGlobalDark(false);
                    setThemeModalOpen(false);
                  }}
                  className="px-4 py-3 bg-gray-50 dark:bg-[#1a1c22] border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#252830] text-gray-900 dark:text-white rounded-xl text-sm font-medium transition-colors outline-none focus:ring-0 text-left flex items-center justify-between"
                >
                  Only Login Page
                  <Moon size={16} className="text-gray-400" />
                </button>
                <button 
                  onClick={() => {
                    setIsLocalDark(false);
                    setGlobalDark(true);
                    setThemeModalOpen(false);
                  }}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors outline-none focus:ring-0 text-left flex items-center justify-between shadow-sm btn-glow"
                >
                  Whole Site
                  <Sun size={16} className="text-blue-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
