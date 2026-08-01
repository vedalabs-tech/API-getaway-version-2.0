import { useState } from 'react';
import { LogEntry } from '../App';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { BarChart2, PieChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics({ logs }: { logs: LogEntry[] }) {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  // Process data for Bar chart (Trends)
  const dateMap: Record<string, number> = {};
  [...logs].reverse().forEach(log => {
    const d = new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    dateMap[d] = (dateMap[d] || 0) + 1;
  });
  const barData = {
    labels: Object.keys(dateMap),
    datasets: [
      {
        label: 'API Requests',
        data: Object.values(dateMap),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4,
      }
    ]
  };

  // Process data for Pie chart (Models)
  const modelMap: Record<string, number> = {};
  logs.forEach(log => {
    const m = log.model || 'Unknown';
    modelMap[m] = (modelMap[m] || 0) + 1;
  });
  const pieData = {
    labels: Object.keys(modelMap),
    datasets: [
      {
        data: Object.values(modelMap),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderWidth: 0,
      }
    ]
  };

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#e5e7eb' : '#374151';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { display: false } },
      y: { ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' as const, labels: { color: textColor } }
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm card-hover">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Usage Visualizations</h3>
            <p className="text-sm text-gray-500 mt-1">Analyze your API traffic patterns</p>
          </div>
          
          <div className="flex bg-gray-100 dark:bg-[#1a1c22] p-1 rounded-xl">
            <button
              onClick={() => setChartType('bar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all no-tap-highlight ${
                chartType === 'bar' 
                  ? 'bg-white dark:bg-[#252830] text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <BarChart2 size={16} /> Trends
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all no-tap-highlight ${
                chartType === 'pie' 
                  ? 'bg-white dark:bg-[#252830] text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <PieChart size={16} /> Models
            </button>
          </div>
        </div>

        <div className="h-[400px] w-full">
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              No data available for visualization.
            </div>
          ) : (
            chartType === 'bar' 
              ? <Bar data={barData} options={barOptions} />
              : <Doughnut data={pieData} options={pieOptions} />
          )}
        </div>

      </div>
    </div>
  );
}
