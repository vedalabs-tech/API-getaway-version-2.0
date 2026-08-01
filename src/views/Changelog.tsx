import { Sparkles, Image as ImageIcon, Video, ArrowRight } from 'lucide-react';

export default function Changelog() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          <Sparkles className="text-blue-500" size={28} />
          Changelog & Roadmap
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          Discover the latest updates to Veda Gateway and a sneak peek into what's next.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
        
        {/* Item 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#0a0a0c] bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
            <ImageIcon size={18} strokeWidth={2} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-[#111216] p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-lg shadow-blue-500/5 card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md">Coming Soon</span>
              <span className="text-sm text-gray-400">Q3 2026</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Image Models Integration</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Get ready to experience the next evolution in multimodal AI. Our upcoming flagship Image Models will allow seamless, zero-latency visual reasoning and hyper-realistic generative capabilities directly through your Veda Gateway. 
            </p>
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all no-tap-highlight">
              Read the preview <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#0a0a0c] bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
            <Video size={18} strokeWidth={2} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-[#111216] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-2 py-1 rounded-md">Coming Soon</span>
              <span className="text-sm text-gray-400">Q4 2026</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Video Generative Models</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Pushing the boundaries of temporal AI, our upcoming Video Generative suite will bring cinema-grade, prompt-to-video architectures directly into your ecosystem. Unprecedented control, fluidity, and realism.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
