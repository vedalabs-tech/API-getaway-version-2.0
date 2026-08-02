import { useState } from 'react';
import { KeyRound, ShieldCheck, Copy, CheckCircle2, RotateCw, Loader2, FileText, Download } from 'lucide-react';
import logoImage from '../../logo.png';
import html2pdf from 'html2pdf.js';
import { callAPI } from '../api';

export default function Security({ email }: { email: string }) {
  const [key, setKey] = useState('sk_live_********************************');
  const [isRevealed, setIsRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; action: string; title: string; message: string; onConfirm: () => void } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const revealKey = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await callAPI({ action: "view_api_key", email });
      setLoading(false);
      if (res?.status === "success" && res.api_key) {
        setKey(res.api_key);
        setIsRevealed(true);
      } else {
        setErrorMsg(res?.message || 'Failed to retrieve API key');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('An error occurred while retrieving your key');
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmAction = () => {
    setConfirmModal({
      isOpen: true,
      action: 'regen',
      title: 'Regenerate API Key',
      message: 'Are you sure you want to regenerate your API key? Your current key will be immediately invalidated and any applications using it will lose access.',
      onConfirm: async () => {
        setConfirmModal(null);
        setActionLoading('regen');
        setErrorMsg(null);
        try {
          const res = await callAPI({ action: "regenerate_key", email });
          setActionLoading(null);
          if (res?.status === "success") {
            setKey('sk_live_********************************');
            setIsRevealed(false);
          } else {
            setErrorMsg(res?.message || 'Failed to regenerate key');
          }
        } catch (err) {
          setActionLoading(null);
          setErrorMsg('An error occurred while regenerating your key');
        }
      }
    });
  };

  const handleDownloadPdf = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    
    const wrapper = document.createElement('div');
    wrapper.style.padding = '40px';
    wrapper.style.color = '#111';
    wrapper.style.backgroundColor = '#fff';
    wrapper.style.fontFamily = 'sans-serif';
    
    const logoImg = document.createElement('img');
    logoImg.src = logoImage;
    logoImg.style.height = '40px';
    logoImg.style.marginBottom = '30px';
    wrapper.appendChild(logoImg);
    
    const title = document.createElement('h1');
    title.innerText = 'Security Best Practices Guide';
    title.style.fontSize = '24px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    wrapper.appendChild(title);
    
    const subtitle = document.createElement('p');
    subtitle.innerText = 'Veda Labs API Gateway';
    subtitle.style.fontSize = '14px';
    subtitle.style.color = '#555';
    subtitle.style.marginBottom = '30px';
    wrapper.appendChild(subtitle);
    
    const sections = [
      {
        title: '1. API Key Protection',
        content: 'Your API key is a highly sensitive credential that grants programmatic access to Veda Labs services. Treat it with the same level of security as a password. Never commit your API key to public repositories (such as GitHub), and avoid hardcoding it directly into your source files.'
      },
      {
        title: '2. Environment Variables',
        content: 'Store your API keys securely in environment variables (.env files) and ensure your .env file is included in your .gitignore. In production environments, use secure secret management services (like AWS Secrets Manager, Google Secret Manager, or Vercel Environment Variables) to inject keys dynamically at runtime.'
      },
      {
        title: '3. Client-Side Constraints',
        content: 'Do not expose your API key in client-side code (e.g., in React, Vue, or Angular applications running in the browser). Instead, create a secure backend proxy server that stores the API key and communicates with the Veda Labs API. Your frontend should only communicate with your backend.'
      },
      {
        title: '4. Regular Key Rotation',
        content: 'We recommend rotating your API keys periodically. If you suspect your key has been compromised, regenerate it immediately from the Security Dashboard. The previous key will be instantly invalidated.'
      },
      {
        title: '5. Monitor Usage',
        content: 'Regularly monitor your API usage on the Veda Labs Dashboard. Unexpected spikes in traffic or usage from unknown IP addresses may indicate a compromised key. Set up billing alerts to notify you of unusual consumption patterns.'
      }
    ];
    
    sections.forEach(sec => {
      const h2 = document.createElement('h2');
      h2.innerText = sec.title;
      h2.style.fontSize = '18px';
      h2.style.fontWeight = 'bold';
      h2.style.marginTop = '20px';
      h2.style.marginBottom = '10px';
      wrapper.appendChild(h2);
      
      const p = document.createElement('p');
      p.innerText = sec.content;
      p.style.fontSize = '14px';
      p.style.marginBottom = '15px';
      p.style.lineHeight = '1.6';
      wrapper.appendChild(p);
    });
    
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '800px';
    document.body.appendChild(wrapper);
    
    const opt = {
      margin:       15,
      filename:     `Security_Talks_Guide.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, windowWidth: 800 },
      jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };
    
    html2pdf().set(opt).from(wrapper).save().then(() => {
        document.body.removeChild(wrapper);
        setIsDownloading(false);
    }).catch(() => {
        document.body.removeChild(wrapper);
        setIsDownloading(false);
    });
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl relative">
      <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-8 shadow-sm card-hover mb-8">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
            <KeyRound size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">API Key Management</h3>
            <p className="text-sm text-gray-500 mt-1">Keep your API key secure. Do not share it in publicly accessible areas.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm rounded-xl font-medium flex items-center gap-3 animate-in shake duration-300">
            {errorMsg}
          </div>
        )}

        <div className="bg-gray-50 dark:bg-[#16181d] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center justify-between mb-8 overflow-hidden group">
          <code className="font-mono text-sm tracking-wider text-gray-700 dark:text-gray-300 break-all select-all">
            {key}
          </code>
          <div className="flex-shrink-0 ml-4">
            {!isRevealed ? (
              <button 
                onClick={revealKey} 
                disabled={loading}
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2 outline-none focus:ring-0 focus:outline-none btn-glow"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : 'Reveal Key'}
              </button>
            ) : (
              <button 
                onClick={copyKey}
                className={`px-4 py-2 border text-sm font-medium rounded-lg transition-colors flex items-center gap-2 outline-none focus:ring-0 focus:outline-none shadow-sm btn-glow ${
                  copied 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                    : 'bg-white dark:bg-[#252830] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />} 
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
        </div>
        
        {isRevealed && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-800/50 rounded-xl flex items-start gap-3 animate-in fade-in duration-300">
            <ShieldCheck size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Save it somewhere, it will not be shown next time.</p>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80 mt-1">An API key is stored in our database for security.</p>
            </div>
          </div>
        )}

        <div>
          <button 
            onClick={() => handleConfirmAction()}
            disabled={!!actionLoading}
            className="px-5 py-2.5 bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-[#252830] transition-colors flex items-center gap-2 outline-none focus:ring-0 shadow-sm btn-glow"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {actionLoading === 'regen' ? <Loader2 size={16} className="animate-spin" /> : <RotateCw size={16} strokeWidth={1.5} />}
            Regenerate API Key
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-8 shadow-sm card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl">
            <ShieldCheck size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Security Talks Guide</h3>
            <p className="text-sm text-gray-500 mt-1">Learn how to properly secure your API key in production applications.</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#16181d] border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white dark:bg-[#252830] rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-red-500 shadow-sm">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Security Best Practices (PDF)</h4>
              <p className="text-xs text-gray-500 mt-0.5">Updated Recently</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 outline-none focus:ring-0 shadow-sm btn-glow"
          >
            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} 
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#16181d] border border-gray-100 dark:border-gray-800 w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{confirmModal.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{confirmModal.message}</p>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setConfirmModal(null)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 outline-none focus:ring-0"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmModal.onConfirm}
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white outline-none focus:ring-0 bg-blue-600 hover:bg-blue-700`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
