import { useState, useEffect } from 'react';
import { LayoutDashboard, BarChart3, Key, FileText, BookOpen, LogOut, Moon, Sun, Menu, Gauge, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  setCurrentView: (view: string) => void;
  userName: string;
  onLogout: () => void;
}

export default function Layout({ children, currentView, setCurrentView, userName, onLogout }: LayoutProps) {
  const [isDark, setIsDark] = useState(localStorage.getItem('veda_theme') === 'dark' || (!localStorage.getItem('veda_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches));
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
    <div className="flex h-screen bg-white dark:bg-[#0a0a0c] text-gray-900 dark:text-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#fcfcfc] dark:bg-[#111216] border-r border-gray-100 dark:border-gray-800/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800/60">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Veda Labs Logo" className="h-7 w-auto object-contain dark:invert-[0.9] dark:hue-rotate-180" style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all outline-none focus:ring-0 focus:outline-none
                  ${active 
                    ? 'bg-gray-100 dark:bg-[#1f2127] text-gray-900 dark:text-white' 
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

        <div className="p-4 border-t border-gray-100 dark:border-gray-800/60">
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
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative gateway-bg">
        
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800/60 bg-white/50 dark:bg-[#0a0a0c]/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-white lg:hidden outline-none focus:ring-0"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
            <h1 className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-white hidden sm:block">{currentTitle}</h1>
          </div>

          <div className="flex items-center gap-5 sm:gap-8">
            <div className="text-right hidden sm:block">
              <div className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">{getGreeting()}</div>
              <div className="text-[15px] font-medium tracking-tight text-gray-900 dark:text-gray-100">{userName}</div>
            </div>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#1a1c22] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#252830] transition-colors outline-none focus:ring-0"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
