
import { LogEntry } from '../App';
import { Activity, Zap, ShieldAlert, AlertTriangle, Infinity } from 'lucide-react';

interface DashboardProps {
  logs: LogEntry[];
  loading: boolean;
  userName: string;
  healthScore: number;
}

export default function Dashboard({ logs, loading, userName, healthScore }: DashboardProps) {
  const requests = logs.length;
  const tokens = logs.reduce((acc, log) => acc + (parseInt(log.tokens as string) || 0), 0);
  const errors = logs.filter(l => l.status != 200 && l.status != "200").length;
  // Use the healthScore passed from the backend if available
  const health = healthScore;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="mb-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {getGreeting()}, {userName}
        </h2>
        <p className={`mt-2 ${loading ? 'shining-wave font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
          {loading ? 'Aggregating gateway metrics...' : 'Monitor your gateway health, token consumption, and API requests.'}
        </p>
      </div>

      {errors > 0 && (
        <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-4 flex items-start gap-4">
          <div className="mt-0.5 text-amber-600 dark:text-amber-400"><AlertTriangle size={20} /></div>
          <div>
            <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">API Anomalies Detected</h4>
            <p className="text-sm text-amber-700/80 dark:text-amber-400/80 mt-1">
              You have encountered {errors} error(s) recently. Please review your payload configuration or check your system health.
            </p>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Requests" 
          value={loading ? '-' : requests.toLocaleString()} 
          icon={<Activity size={20} />} 
          color="blue"
        />
        <MetricCard 
          title="Tokens Consumed" 
          value={loading ? '-' : tokens.toLocaleString()} 
          icon={<Zap size={20} />} 
          color="indigo"
        />
        <MetricCard 
          title="System Health" 
          value={loading ? '-' : `${health.toFixed(1)}%`} 
          icon={<ShieldAlert size={20} />} 
          color={health >= 95 ? 'emerald' : health >= 75 ? 'amber' : 'red'}
        />
      </div>

      {/* Monthly Quotas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm card-hover flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Token Consumption</h3>
            <p className="text-sm text-gray-500 mt-1">Monthly limit: Unlimited</p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '-' : tokens.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-2">used</span>
            </div>
          </div>
          <div className="w-20 h-20 rounded-full border-[6px] border-indigo-50 dark:border-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center bg-indigo-50/50 dark:bg-indigo-500/5">
            <Infinity size={32} strokeWidth={2} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm card-hover flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">API Requests</h3>
            <p className="text-sm text-gray-500 mt-1">Monthly limit: Unlimited</p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '-' : requests.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-2">used</span>
            </div>
          </div>
          <div className="w-20 h-20 rounded-full border-[6px] border-blue-50 dark:border-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center bg-blue-50/50 dark:bg-blue-500/5">
            <Infinity size={32} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl overflow-hidden shadow-sm card-hover">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800/60">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-[#16181d] border-b border-gray-100 dark:border-gray-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Timestamp</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Model</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Tokens</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Loading metrics...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No activity recorded yet.</td></tr>
              ) : (
                logs.slice(0, 10).map((log, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c22] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {new Date(log.timestamp).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md font-mono text-xs border border-gray-200 dark:border-gray-700">
                        {log.model || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900 dark:text-gray-100">{log.tokens || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {(log.status == 200 || log.status == "200") 
                        ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20">200 OK</span>
                        : <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-200/50 dark:border-red-500/20">{log.status} ERR</span>
                      }
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function MetricCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10',
    red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10',
  };
  
  return (
    <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group card-hover">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</p>
          <h3 className={`text-3xl font-bold tracking-tight ${color === 'emerald' || color === 'amber' || color === 'red' ? colors[color].split(' ')[0] : 'text-gray-900 dark:text-white'}`}>
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {icon}
        </div>
      </div>
      {/* Subtle border accent */}
      <div className={`absolute bottom-0 left-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity ${colors[color].split(' ')[2]}`}></div>
    </div>
  );
}

