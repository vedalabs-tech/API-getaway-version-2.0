import fs from 'fs';

const code = `import { useState, useEffect, useRef } from 'react';
import { callAPI } from './api';
import { Loader2, ArrowRight, Mail, Moon, Sun, CheckSquare, Square, FileText, ChevronRight, ShieldCheck, Scale, Quote } from 'lucide-react';
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
  
  // Terms state
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const termsContentRef = useRef<HTMLDivElement>(null);
  const [canProceedStep, setCanProceedStep] = useState(false);
  const [termStep, setTermStep] = useState(0); // 0: Privacy, 1: Terms, 2: DPDP
  
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
    if (!termsAccepted) return setError('You must accept the terms, privacy policy, and DPDP act.');
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
    if (!termsAccepted) return setError('You must accept the terms, privacy policy, and DPDP act.');
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

  const handleTermsScroll = () => {
    if (termsContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsContentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setCanProceedStep(true);
      }
    }
  };

  const handleCheckboxClick = () => {
    if (!termsAccepted) {
      setTermStep(0);
      setCanProceedStep(false);
      setShowTermsModal(true);
    } else {
      setTermsAccepted(false);
    }
  };

  const handleNextStep = () => {
    setTermStep(prev => prev + 1);
    setCanProceedStep(false);
    if (termsContentRef.current) {
      termsContentRef.current.scrollTop = 0;
    }
  };

  const acceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
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
    } else {
      payload.device = navigator.userAgent;
      payload.ip = "Client";
    }
    
    const res = await callAPI(payload);
    setLoading(false);
    if (res?.status === "success") {
      onLogin(email, res.name || name || "Developer");
    } else {
      setError(res?.message || 'Connection error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-white dark:bg-[#050505]">
      
      {/* Theme Toggle Button */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center bg-gray-100/80 dark:bg-gray-900/80 text-gray-800 dark:text-gray-200 hover:scale-110 shadow-sm backdrop-blur-md transition-all duration-300 outline-none focus:ring-0 z-50 border border-gray-200/50 dark:border-gray-800/50"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun size={20} className="animate-in spin-in-12 duration-500" /> : <Moon size={20} className="animate-in spin-in-12 duration-500" />}
      </button>

      {/* Left Panel: Branding & Visuals (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative bg-gray-50 dark:bg-[#0a0a0c] flex-col items-center justify-between p-12 overflow-hidden border-r border-gray-200/80 dark:border-gray-800/80 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/10 dark:from-blue-600/20 dark:to-indigo-600/10 mix-blend-multiply blur-[120px] pointer-events-none animate-pulse duration-[5000ms]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-purple-400/20 to-fuchsia-500/10 dark:from-purple-600/20 dark:to-fuchsia-600/10 mix-blend-multiply blur-[120px] pointer-events-none animate-pulse duration-[7000ms]" />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]"></div>

        <div className="w-full flex justify-start relative z-10 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-800">
              <img src={logoImage} alt="Veda Labs Logo" className="h-10 w-auto object-contain" />
            </div>
            <span className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Veda <span className="text-blue-600 dark:text-blue-500">Labs</span></span>
          </div>
        </div>
        
        <div className="relative z-10 w-full max-w-lg mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
           <Quote className="text-blue-500/20 w-24 h-24 absolute -top-8 -left-8 -z-10" />
           <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
             The sovereign gateway for next-generation AI infrastructure.
           </h1>
           <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
             Secure, reliable, and compliant access to state-of-the-art models for developers building the future.
           </p>
        </div>

        <div className="w-full relative z-10 mt-auto pt-12 animate-in fade-in duration-700 delay-500">
          <div className="inline-flex flex-col items-start">
             <p className="text-sm font-bold text-gray-900 dark:text-white tracking-widest uppercase mb-1">
               PROUDLY DEVELOPED IN INDIA, MADE FOR BHARAT
             </p>
             <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 tracking-wider">
               Developed by Veda Labs | Divy Patel
             </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Authentication Form */}
      <div className="w-full lg:w-[55%] xl:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 bg-white dark:bg-[#050505]">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="flex flex-col items-center mb-10 lg:hidden relative z-10 w-full pt-8">
          <div className="flex items-center justify-center gap-4 mb-5 animate-in slide-in-from-top-4 duration-500">
            <div className="p-2.5 bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
              <img src={logoImage} alt="Veda Labs Logo" className="h-8 w-auto object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Veda <span className="text-blue-600 dark:text-blue-500">Labs</span></span>
          </div>
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800">
            Gateway Authentication
          </h2>
        </div>

        {/* The Auth Container */}
        <div className="w-full max-w-md">
          
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              {screen === 'login' && 'Welcome back'}
              {screen === 'register' && 'Create your account'}
              {screen === 'otp' && 'Verify your identity'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {screen === 'login' && 'Enter your developer email to access the console.'}
              {screen === 'register' && 'Apply for access to the Veda Labs API Gateway.'}
              {screen === 'otp' && 'Check your inbox for the authentication code.'}
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400 text-sm rounded-2xl font-semibold flex items-center gap-3 animate-in shake duration-300 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
              {error}
            </div>
          )}

          {screen === 'login' && (
            <form onSubmit={requestLoginOTP} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 pl-1">Developer Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#111216] border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all text-base"
                  required
                />
              </div>
              
              <div className="bg-gray-50 dark:bg-[#111216] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-start gap-4 transition-colors hover:border-blue-300 dark:hover:border-blue-800 cursor-pointer group" onClick={handleCheckboxClick}>
                <button
                  type="button"
                  className="mt-0.5 outline-none focus:ring-0 text-blue-600 dark:text-blue-500 flex-shrink-0"
                >
                  {termsAccepted ? <CheckSquare size={20} className="animate-in zoom-in" /> : <Square size={20} className="text-gray-400 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />}
                </button>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-left font-medium leading-relaxed">
                  I hereby accept that I must comply with the <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-200 dark:decoration-blue-800/50 underline-offset-2">terms and conditions</span>, <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-200 dark:decoration-blue-800/50 underline-offset-2">privacy policy</span>, and <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-200 dark:decoration-blue-800/50 underline-offset-2">DPDP act</span>.
                </span>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] text-base mt-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Continue <ArrowRight size={20} /></>}
              </button>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-900 text-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-500">New developer? </span>
                <button type="button" onClick={() => { setScreen('register'); setError(''); }} className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline underline-offset-4 transition-colors ml-1 py-2">
                  Apply for Access
                </button>
              </div>
            </form>
          )}

          {screen === 'register' && (
            <form onSubmit={requestRegisterOTP} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 pl-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#111216] border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 pl-1">Work Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-[#111216] border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all text-base"
                  required
                />
              </div>

              <div className="bg-gray-50 dark:bg-[#111216] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-start gap-4 transition-colors hover:border-blue-300 dark:hover:border-blue-800 cursor-pointer group" onClick={handleCheckboxClick}>
                <button
                  type="button"
                  className="mt-0.5 outline-none focus:ring-0 text-blue-600 dark:text-blue-500 flex-shrink-0"
                >
                  {termsAccepted ? <CheckSquare size={20} className="animate-in zoom-in" /> : <Square size={20} className="text-gray-400 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />}
                </button>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-left font-medium leading-relaxed">
                  I hereby accept that I must comply with the <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-200 dark:decoration-blue-800/50 underline-offset-2">terms and conditions</span>, <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-200 dark:decoration-blue-800/50 underline-offset-2">privacy policy</span>, and <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-200 dark:decoration-blue-800/50 underline-offset-2">DPDP act</span>.
                </span>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] text-base mt-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Request Access <ArrowRight size={20} /></>}
              </button>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-900 text-center">
                <button type="button" onClick={() => { setScreen('login'); setError(''); }} className="text-gray-600 dark:text-gray-400 font-bold text-sm hover:text-gray-900 dark:hover:text-white transition-colors py-2">
                  &larr; Back to Login
                </button>
              </div>
            </form>
          )}

          {screen === 'otp' && (
            <form onSubmit={verifyOTP} className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gray-50 dark:bg-[#111216] border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center mx-auto mb-5 relative shadow-sm">
                  <Mail className="w-8 h-8 text-gray-800 dark:text-gray-200" />
                  <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 border-2 border-white dark:border-[#050505] rounded-full animate-ping"></span>
                  <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 border-2 border-white dark:border-[#050505] rounded-full"></span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">We sent a 6-digit verification code to<br/>
                  <strong className="text-gray-900 dark:text-white mt-2 block text-base bg-gray-50 dark:bg-[#111216] py-1.5 px-3 rounded-xl inline-block border border-gray-200 dark:border-gray-800 shadow-sm">{email}</strong>
                </p>
              </div>
              
              <div>
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\\D/g, '').slice(0,6))}
                  placeholder="• • • • • •"
                  className="w-full px-5 py-5 bg-gray-50 dark:bg-[#111216] border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:bg-white dark:focus:bg-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all text-center text-4xl font-mono tracking-[0.5em] font-bold placeholder:font-sans placeholder:tracking-normal placeholder:font-normal placeholder:text-2xl placeholder:text-gray-300 dark:placeholder:text-gray-700"
                  required
                />
              </div>
              
              <button type="submit" disabled={loading || otp.length < 6} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] text-base mt-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify Identity'}
              </button>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-900 text-center">
                <button type="button" onClick={() => { setScreen(authContext); setOtp(''); setError(''); }} className="text-gray-500 dark:text-gray-400 font-semibold text-sm hover:text-gray-900 dark:hover:text-white transition-colors py-2">
                  Cancel Authentication
                </button>
              </div>
            </form>
          )}

          {/* Mobile Footer Branding */}
          <div className="lg:hidden mt-12 pt-8 border-t border-gray-100 dark:border-gray-900 text-center">
            <p className="text-xs font-bold text-gray-900 dark:text-white tracking-widest uppercase mb-1">
              PROUDLY DEVELOPED IN INDIA, MADE FOR BHARAT
            </p>
            <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-500 tracking-wider">
              Developed by Veda Labs | Divy Patel
            </p>
          </div>

        </div>
      </div>

      {/* Multi-Step Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#111216] border border-gray-200 dark:border-gray-800 w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300 overflow-hidden">
            
            {/* Modal Header & Stepper */}
            <div className="p-6 sm:px-8 border-b border-gray-100 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-900/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                  {termStep === 0 && <ShieldCheck size={22} />}
                  {termStep === 1 && <FileText size={22} />}
                  {termStep === 2 && <Scale size={22} />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {termStep === 0 && "Privacy Policy"}
                  {termStep === 1 && "Terms and Conditions"}
                  {termStep === 2 && "DPDP Act, 2023"}
                </h3>
              </div>
              
              {/* Progress Stepper */}
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                <span className={termStep >= 0 ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}>Privacy</span>
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-700"/>
                <span className={termStep >= 1 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-600"}>Terms</span>
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-700"/>
                <span className={termStep >= 2 ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-600"}>DPDP Act</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500 ease-out" 
                  style={{ width: \`\${((termStep + 1) / 3) * 100}%\` }}
                ></div>
              </div>
            </div>

            {/* Modal Body */}
            <div 
              ref={termsContentRef}
              onScroll={handleTermsScroll}
              className="p-6 sm:p-8 overflow-y-auto text-sm text-gray-600 dark:text-gray-300 space-y-5 flex-1 custom-scrollbar"
            >
              {termStep === 0 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">At Veda Labs, we prioritize your data privacy. By using our gateway, you acknowledge our data practices.</p>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">1. Information We Collect</strong>When you register, we collect your name and email. API usage collects timestamps, latency, errors, and token counts.</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">2. Zero-Training Policy</strong>We explicitly do NOT use your API payloads, prompts, or completions to train or improve our foundational models. Your data remains yours.</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">3. Data Retention</strong>Transaction logs and telemetry data are retained for a rolling 90-day period for operational transparency and billing accuracy before being permanently deleted.</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">4. Third-Party Sharing</strong>We do not sell, rent, or trade your personal data or API usage metrics to third parties. Information may only be disclosed if legally obligated.</div>
                </div>
              )}
              
              {termStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">These terms govern your access and use of the Veda Labs API Gateway.</p>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">1. Acceptable Use</strong>You agree not to use the API to generate unlawful, harmful, or abusive content. Veda Labs reserves the right to suspend access upon violation.</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">2. Rate Limits and Quotas</strong>You must adhere to assigned limits. Sustained spikes threatening infrastructural integrity will be throttled (HTTP 429).</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">3. API Key Security</strong>You are fully responsible for maintaining the confidentiality of your API keys. We are not liable for losses arising from compromised credentials.</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">4. Licensing</strong>Subject to these Terms, Veda Labs grants you a non-exclusive, non-transferable, revocable license to access and use the API for your internal business purposes.</div>
                </div>
              )}

              {termStep === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">Compliance with the Digital Personal Data Protection (DPDP) Act, 2023.</p>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">1. Notice and Consent</strong>By proceeding, you give explicit, informed, and unconditional consent to Veda Labs (Data Fiduciary) to process your personal data strictly for providing API services.</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">2. Rights of Data Principal</strong>You possess the right to access, correct, erase, and nominate a representative for your personal data stored within our systems.</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">3. Security Safeguards</strong>Veda Labs has implemented robust technical and organizational measures to prevent personal data breaches, adhering to sovereign compliance standards.</div>
                  <div><strong className="text-gray-900 dark:text-white block mb-1">4. Grievance Redressal</strong>A designated Data Protection Officer (DPO) is available for resolving any grievances related to personal data processing within the stipulated time frame.</div>
                </div>
              )}

              <div className="pt-12 pb-4 text-center">
                <span className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-xs font-bold text-blue-600 dark:text-blue-400 animate-pulse border border-blue-100 dark:border-blue-800/50">
                  ↓ Scroll to bottom to accept
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:px-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-[#1a1c22] rounded-b-[2rem] flex flex-col sm:flex-row justify-between items-center gap-4">
              <button 
                onClick={() => { setShowTermsModal(false); setTermStep(0); setCanProceedStep(false); }}
                className="w-full sm:w-auto px-5 py-3 text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-900 dark:hover:text-white transition-colors outline-none focus:ring-0 order-2 sm:order-1"
              >
                Cancel
              </button>
              
              {termStep < 2 ? (
                <button 
                  onClick={handleNextStep}
                  disabled={!canProceedStep}
                  className={\`w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 outline-none focus:ring-0 order-1 sm:order-2 \${
                    canProceedStep 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-95' 
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  }\`}
                >
                  Next <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  onClick={acceptTerms}
                  disabled={!canProceedStep}
                  className={\`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-all outline-none focus:ring-0 order-1 sm:order-2 \${
                    canProceedStep 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-95' 
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  }\`}
                >
                  I understood. Please implement that change.
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
`;

fs.writeFileSync('src/Auth.tsx', code);
