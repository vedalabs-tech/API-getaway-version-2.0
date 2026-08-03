
import { LogEntry } from '../App';
import { Download } from 'lucide-react';

interface StatementsProps {
  logs: LogEntry[];
  loading: boolean;
  email: string;
}

export default function Statements({ logs, loading, email }: StatementsProps) {
  
    const generateStatement = () => {
    if(logs.length === 0) return;
    const headers = ["Timestamp", "Model Used", "Tokens", "Status"];
    const csvRows = [headers.join(",")];
    logs.forEach(l => {
      csvRows.push([
        new Date(l.timestamp).toLocaleString().replace(/,/g, ''),
        l.model,
        l.tokens,
        l.status
      ].join(","));
    });
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `veda_statement_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl overflow-hidden shadow-sm card-hover">
        
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Full Activity History</h3>
            <p className="text-sm text-gray-500 mt-1">Complete log of all requests processed by the gateway.</p>
          </div>
          <button 
            onClick={generateStatement}
            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2 no-tap-highlight shadow-sm btn-glow"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/90 dark:bg-[#16181d]/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800/60 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Timestamp</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Model Used</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Tokens</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Status Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Loading full history...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No activity recorded yet.</td></tr>
              ) : (
                logs.map((log, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c22] transition-colors">
                    <td className="px-6 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
                        {log.model || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right font-medium text-gray-900 dark:text-gray-100">{log.tokens || 0}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-center">
                      <span className={`text-xs font-semibold ${log.status == 200 || log.status == "200" ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {log.status}
                      </span>
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
