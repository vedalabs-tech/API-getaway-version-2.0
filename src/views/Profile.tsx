import { useState } from 'react';
import { User, AlertOctagon, Trash2, LogOut } from 'lucide-react';
import { callAPI } from '../api';

export default function Profile({ email, onLogout }: { email: string, onLogout: () => void }) {
  const [actionLoading, setActionLoading] = useState<'suspend' | 'delete' | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: 'suspend' | 'delete';
    onConfirm: () => void;
  } | null>(null);

  const suspendAccess = async () => {
    setActionLoading('suspend');
    await callAPI({ action: "suspend_key", email });
    setActionLoading(null);
    onLogout();
  };

  const deleteAccount = async () => {
    setActionLoading('delete');
    await callAPI({ action: "delete_account", email });
    setActionLoading(null);
    onLogout();
  };

  const handleConfirmAction = (action: 'suspend' | 'delete') => {
    switch (action) {
      case 'suspend':
        setConfirmModal({
          isOpen: true,
          title: "Suspend Access",
          message: "Are you sure you want to suspend your access? You will be logged out and cannot recover the account.",
          action: 'suspend',
          onConfirm: () => { setConfirmModal(null); suspendAccess(); }
        });
        break;
      case 'delete':
        setConfirmModal({
          isOpen: true,
          title: "Delete Account",
          message: "Are you sure you want to permanently delete your account?",
          action: 'delete',
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
            <User size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Profile Settings</h3>
            <p className="text-sm text-gray-500 mt-1">Manage your account and profile details.</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#16181d] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center justify-between mb-10 group">
          <div className="flex flex-col">
             <span className="text-xs uppercase font-semibold text-gray-500 mb-1">Email Address</span>
             <code className="font-mono text-sm tracking-wider text-gray-700 dark:text-gray-300">
               {email}
             </code>
          </div>
          <button 
             onClick={onLogout}
             className="px-4 py-2 bg-white dark:bg-[#252830] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 outline-none focus:ring-0 focus:outline-none shadow-sm btn-glow"
             style={{ WebkitTapHighlightColor: 'transparent' }}
           >
             <LogOut size={16} /> Logout
           </button>
        </div>

        <div>
          <h3 className="text-base font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
            <AlertOctagon size={18} strokeWidth={1.5} /> Danger Zone
          </h3>
          <p className="text-sm text-gray-500 mb-6">Irreversible actions that affect your gateway access.</p>
          
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white outline-none focus:ring-0 bg-red-600 hover:bg-red-700`}
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
