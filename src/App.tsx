import { useState, useEffect } from 'react';
import Auth from './Auth';
import Layout from './Layout';
import Dashboard from './views/Dashboard';
import Analytics from './views/Analytics';
import Security from './views/Security';
import Statements from './views/Statements';
import RateLimits from './views/RateLimits';
import Legal from './views/Legal';
import ApiDocs from './views/ApiDocs';
import Changelog from './views/Changelog';
import Profile from './views/Profile';
import { callAPI } from './api';

export type LogEntry = {
  timestamp: string;
  model: string;
  tokens: string | number;
  status: string | number;
};

export default function App() {
  const [email, setEmail] = useState<string | null>(localStorage.getItem('veda_email'));
  const [name, setName] = useState<string | null>(localStorage.getItem('veda_name'));
  const [currentView, setCurrentView] = useState('dashboard');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [healthScore, setHealthScore] = useState<number>(100);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    if (email) {
      loadLogs();
      loadHealthScore();
    }
  }, [email]);

  const loadLogs = async () => {
    setLoadingLogs(true);
    const res = await callAPI({ action: "get_full_logs", email });
    if (res?.status === "success" && res.logs) {
      setLogs(res.logs.reverse());
    } else {
      setLogs([]);
    }
    setLoadingLogs(false);
  };

  const loadHealthScore = async () => {
    const res = await callAPI({ action: "get_health_score", email });
    if (res?.status === "success" && typeof res.health_score === 'number') {
      setHealthScore(res.health_score);
    }
  };

  const handleLogin = (userEmail: string, userName: string) => {
    localStorage.setItem('veda_email', userEmail);
    localStorage.setItem('veda_name', userName);
    setEmail(userEmail);
    setName(userName);
  };

  const handleLogout = async () => {
    if (email) {
      callAPI({ 
        action: "log_out", 
        email, 
        device: navigator.userAgent, 
        ip: "Client" // IP usually handled server-side if not using an external service, we just pass Client for now
      }).catch(console.error);
    }
    localStorage.clear();
    setEmail(null);
    setName(null);
    setLogs([]);
  };

  if (!email) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard logs={logs} loading={loadingLogs} userName={name || "Developer"} healthScore={healthScore} />;
      case 'changelog': return <Changelog />;
      case 'analytics': return <Analytics logs={logs} />;
      case 'security': return <Security email={email} />;
      case 'statements': return <Statements logs={logs} loading={loadingLogs} email={email} />;
      case 'ratelimits': return <RateLimits />;
      case 'legal': return <Legal />;
      case 'docs': return <ApiDocs />;
      case 'profile': return <Profile email={email} onLogout={handleLogout} />;
      default: return <Dashboard logs={logs} loading={loadingLogs} userName={name || "Developer"} healthScore={healthScore} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setCurrentView={setCurrentView} 
      userName={name || 'Developer'} 
      onLogout={handleLogout}
    >
      {renderView()}
    </Layout>
  );
}
