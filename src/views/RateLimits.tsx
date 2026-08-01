import { Gauge, Zap, Infinity, Check, Eye, Video, BrainCircuit } from 'lucide-react';

export default function RateLimits() {
  const models = [
    {
      id: 'Vedika-4.1-Flash',
      description: 'Flagship Omni-modal AI.',
      features: [
        { name: 'Vision Support', available: true, icon: Eye },
        { name: 'Video Support', available: true, icon: Video },
        { name: 'Reasoning Engine', available: true, icon: BrainCircuit },
      ]
    },
    {
      id: 'Vedika-5.6-Pro',
      description: 'Elite Enterprise Architect.',
      features: [
        { name: 'Vision Support', available: true, icon: Eye },
        { name: 'Video Support', available: true, icon: Video },
        { name: 'Reasoning Engine', available: true, icon: BrainCircuit },
      ]
    },
    {
      id: 'Vedika-2.5-Balanced',
      description: 'Efficient Vision Assistant.',
      features: [
        { name: 'Vision Support', available: true, icon: Eye },
        { name: 'Video Support', available: true, icon: Video },
        { name: 'Reasoning Engine', available: false, icon: BrainCircuit },
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Rate Limits & Quotas</h2>
        <p className="text-gray-500 mt-2">Manage your API consumption limits and view supported model capabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm flex flex-col items-start card-hover">
          <div className="p-2 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg mb-4">
            <Check size={20} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pricing Tier</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Free</h3>
        </div>

        <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm flex flex-col items-start card-hover">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg mb-4">
            <Infinity size={20} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Monthly Limit</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Unlimited</h3>
        </div>

        <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm flex flex-col items-start card-hover">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg mb-4">
            <Infinity size={20} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">API Request Limit</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Unlimited</h3>
        </div>

        <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm flex flex-col items-start card-hover">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg mb-4">
            <Infinity size={20} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Requests Per Day (RPD)</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Unlimited</h3>
        </div>

        <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm flex flex-col items-start card-hover">
          <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg mb-4">
            <Gauge size={20} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Requests Per Minute (RPM)</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">40</h3>
        </div>

        <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm flex flex-col items-start card-hover">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg mb-4">
            <Zap size={20} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tokens Per Minute</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">32,000</h3>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Model Capabilities</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map(model => (
          <div key={model.id} className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm card-hover">
            <h4 className="font-mono font-medium text-gray-900 dark:text-white mb-1">{model.id}</h4>
            <p className="text-sm text-gray-500 mb-6">{model.description}</p>
            <div className="space-y-3">
              {model.features.map(feature => (
                <div key={feature.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <feature.icon size={16} strokeWidth={1.5} className="text-gray-400" />
                    {feature.name}
                  </div>
                  {feature.available ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      Supported
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400">
                      Disabled
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
