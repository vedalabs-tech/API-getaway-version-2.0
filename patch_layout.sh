cat << 'INNER_EOF' > src/Layout.tsx
import { useState, useEffect } from 'react';
import { LayoutDashboard, BarChart3, Key, FileText, BookOpen, LogOut, Moon, Sun, Menu, Gauge, Sparkles } from 'lucide-react';
import logoImage from '../logo.png';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  setCurrentView: (view: string) => void;
  userName: string;
  onLogout: () => void;
}

export default function Layout({ children, currentView, setCurrentView, userName, onLogout }: LayoutProps) {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('veda_theme') === 'dark' || 
    (!localStorage.getItem('veda_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('veda_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('veda_theme', 'light');
    }
  }, [isDark]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'changelog', label: 'Changelog', icon: Sparkles },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'security', label: 'Security & Keys', icon: Key },
    { id: 'statements', label: 'Statements', icon: FileText },
    { id: 'ratelimits', label: 'Rate Limits', icon: Gauge },
    { id: 'docs', label: 'API Documentation', icon: BookOpen },
    { id: 'legal', label: 'Legal & Info', icon: FileText },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const currentTitle = navItems.find(n => n.id === currentView)?.label || 'Console';

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0a0a0c] text-gray-900 dark:text-gray-100 overflow-hidden font-sans transition-colors duration-300">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#111216] border-r border-gray-200 dark:border-gray-800/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex flex-col shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800/60">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Veda Labs Logo" className="h-7 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300" />
            <span className="text-[17px] font-bold tracking-tight text-gray-900 dark:text-white">Veda <span className="text-blue-600 dark:text-blue-500">Labs</span></span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {navItems.map(item => {
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentView(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 outline-none focus:ring-0 focus:outline-none hover:scale-[1.02] active:scale-[0.98]
                  ${active 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-[#1a1c22]'
                  }
                `}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <item.icon size={18} strokeWidth={active ? 2 : 1.5} className={active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800/60 space-y-2">
          {/* Theme Toggle moved to Sidebar */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1c22] transition-all outline-none focus:ring-0 focus:outline-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="flex items-center gap-3">
              {isDark ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <div className={`w-8 h-4 rounded-full transition-colors ${isDark ? 'bg-blue-500' : 'bg-gray-300'} relative`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${isDark ? 'translate-x-4' : ''}`}></div>
            </div>
          </button>

          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all outline-none focus:ring-0 focus:outline-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <LogOut size={18} strokeWidth={1.5} />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800/60 bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-md sticky top-0 z-30 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-white lg:hidden outline-none focus:ring-0 transition-colors"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
            <h1 className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-white hidden sm:block">{currentTitle}</h1>
          </div>
          <div className="flex items-center gap-5 sm:gap-8">
            <div className="text-right flex flex-col items-end">
              <div className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">{getGreeting()}</div>
              <div className="text-[15px] font-medium tracking-tight text-gray-900 dark:text-gray-100">{userName}</div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 animate-in fade-in duration-500">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
}
INNER_EOF
