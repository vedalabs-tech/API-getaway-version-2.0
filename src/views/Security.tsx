import { useState } from 'react';
import { callAPI } from '../api';
import { KeyRound, Copy, RotateCw, AlertOctagon, Loader2, Trash2, CheckCircle2, Lightbulb } from 'lucide-react';

interface SecurityProps {
  email: string;
  onLogout: () => void;
}

export default function Security({ email, onLogout }: SecurityProps) {
  const [key, setKey] = useState('************************************');
  const [loading, setLoading] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; action: string; title: string; message: string; onConfirm: () => void } | null>(null);

  const revealKey = async () => {
    setLoading(true);
    const res = await callAPI({ action: "view_api_key", email });
    setLoading(false);
    if (res?.status === "success" && res.api_key) {
      setKey(res.api_key);
      setIsRevealed(true);
    } else {
      // Inline error instead of alert
      setKey('Error: Unable to fetch key');
    }
  };

  const copyKey = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(key);
      } else {
        // Fallback for iframe restrictions
        const textArea = document.createElement("textarea");
        textArea.value = key;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const regenerateKey = async () => {
    setActionLoading('regen');
    const res = await callAPI({ action: "regenerate_key", email });
    setActionLoading(null);
    if (res?.status === "success") {
      setKey('************************************');
      setIsRevealed(false);
    }
  };

  const suspendAccess = async () => {
    setActionLoading('suspend');
    const res = await callAPI({ action: "suspend_key", email });
    setActionLoading(null);
    if (res?.status === "success") {
      onLogout();
    }
  };

  const deleteAccount = async () => {
    setActionLoading('delete');
    const res = await callAPI({ action: "delete_account", email });
    setActionLoading(null);
    if (res?.status === "success") {
      onLogout();
    }
  };

  const handleConfirmAction = (actionType: string) => {
    switch (actionType) {
      case 'regen':
        setConfirmModal({
          isOpen: true,
          action: 'regen',
          title: 'Regenerate API Key',
          message: 'Are you sure you want to regenerate your API Key? Your current key will stop working immediately.',
          onConfirm: () => { setConfirmModal(null); regenerateKey(); }
        });
        break;
      case 'suspend':
        setConfirmModal({
          isOpen: true,
          action: 'suspend',
          title: 'Suspend Access',
          message: 'Are you sure you want to suspend your access? This will instantly block your API access and log you out.',
          onConfirm: () => { setConfirmModal(null); suspendAccess(); }
        });
        break;
      case 'delete':
        setConfirmModal({
          isOpen: true,
          action: 'delete',
          title: 'Delete Account',
          message: 'CRITICAL: This permanently deletes your account and logs. This action cannot be undone.',
          onConfirm: () => { setConfirmModal(null); deleteAccount(); }
        });
        break;
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl relative">
      <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-8 shadow-sm card-hover">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
            <KeyRound size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">API Key Management</h3>
            <p className="text-sm text-gray-500 mt-1">Keep your API key secure. Do not share it in publicly accessible areas.</p>
          </div>
        </div>

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

        <div className="mb-10">
          <button 
            onClick={() => handleConfirmAction('regen')}
            disabled={!!actionLoading}
            className="px-5 py-2.5 bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-[#252830] transition-colors flex items-center gap-2 outline-none focus:ring-0 shadow-sm btn-glow"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {actionLoading === 'regen' ? <Loader2 size={16} className="animate-spin" /> : <RotateCw size={16} strokeWidth={1.5} />}
            Regenerate API Key
          </button>
        </div>

        <hr className="border-t border-gray-100 dark:border-gray-800/60 mb-8" />

        <div>
          <h3 className="text-base font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
            <AlertOctagon size={18} strokeWidth={1.5} /> Danger Zone
          </h3>
          <p className="text-sm text-gray-500 mb-6">Irreversible actions that affect your gateway access.</p>
          
          <div className="mb-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-4 rounded-xl flex items-start gap-3">
            <div className="mt-0.5 text-amber-600 dark:text-amber-400">
              <Lightbulb size={20} strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">If you want to delete your previous API key, simply click "Regenerate API Key" above.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-900/30 p-4 rounded-xl gap-4">
              <div>
                <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Suspend Access</h4>
                <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">Suspends the User Account (not the API). Once an account is suspended, it CANNOT be recovered.</p>
              </div>
              <button 
                onClick={() => handleConfirmAction('suspend')}
                disabled={!!actionLoading}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 text-sm font-medium rounded-lg transition-colors outline-none focus:ring-0 flex-shrink-0 btn-glow w-full sm:w-auto"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {actionLoading === 'suspend' ? 'Suspending...' : 'Suspend Access'}
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 dark:border-gray-800 p-4 rounded-xl gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Delete Account</h4>
                <p className="text-sm text-gray-500 mt-1">Permanently deletes the account. Unlike suspension, a deleted account CAN be recovered later.</p>
              </div>
              <button 
                onClick={() => handleConfirmAction('delete')}
                disabled={!!actionLoading}
                className="px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-medium rounded-lg transition-colors flex justify-center items-center gap-2 outline-none focus:ring-0 flex-shrink-0 btn-glow w-full sm:w-auto"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {actionLoading === 'delete' ? 'Deleting...' : <><Trash2 size={16} strokeWidth={1.5} /> Delete Account</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal to avoid window.confirm iframe blocks */}
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white outline-none focus:ring-0 ${
                    confirmModal.action === 'regen' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
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
