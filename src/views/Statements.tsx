
import { LogEntry } from '../App';
import { Download } from 'lucide-react';

interface StatementsProps {
  logs: LogEntry[];
  loading: boolean;
  email: string;
}

export default function Statements({ logs, loading, email }: StatementsProps) {
  
  const generateStatement = () => {
    if(logs.length === 0) return alert("No data to export");
    const printWin = window.open('', '_blank');
    if (!printWin) return;
    
    const rows = logs.map(l => `
      <tr>
        <td style="padding:12px; border-bottom:1px solid #e2e8f0; color:#475569;">${new Date(l.timestamp).toLocaleString()}</td>
        <td style="padding:12px; border-bottom:1px solid #e2e8f0; font-family:monospace; color:#0f172a;">${l.model}</td>
        <td style="padding:12px; border-bottom:1px solid #e2e8f0; color:#0f172a;">${l.tokens}</td>
        <td style="padding:12px; border-bottom:1px solid #e2e8f0; color:#0f172a;">${l.status}</td>
      </tr>
    `).join('');
    
    const html = `
      <html>
        <head>
          <title>Veda Labs - Statement</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 24px; margin-bottom: 32px; }
            h2 { margin: 0; font-size: 24px; font-weight: 600; }
            p { margin: 4px 0 0 0; color: #64748b; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; }
            th { background: #f8fafc; padding: 12px; border-bottom: 1px solid #cbd5e1; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; font-size: 11px; }
            .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h2>Veda Labs Gateway</h2>
              <p>Official API Usage Statement</p>
            </div>
            <div style="text-align:right; font-size: 14px;">
              <strong>Account:</strong> ${email}<br>
              <strong>Date Generated:</strong> ${new Date().toLocaleDateString()}
            </div>
          </div>
          <table>
            <thead><tr><th>Timestamp</th><th>Model Used</th><th>Tokens</th><th>Status</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="footer">System Generated Report — Veda Labs API Infrastructure</div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;
    printWin.document.write(html);
    printWin.document.close();
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
            <Download size={16} /> Export PDF
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
