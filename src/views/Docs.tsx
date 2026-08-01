import { useState } from 'react';
import { Book, Code, Shield, Image as ImageIcon, Zap, AlertTriangle } from 'lucide-react';

export default function Docs() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: 'Introduction', icon: Book },
    { id: 'auth', label: 'Authentication', icon: Shield },
    { id: 'models', label: 'Supported Models', icon: Zap },
    { id: 'chat', label: 'Chat Completions', icon: Code },
    { id: 'vision', label: 'Vision & Video', icon: ImageIcon },
    { id: 'errors', label: 'Errors & Health', icon: AlertTriangle },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-500 min-h-[70vh]">
      
      {/* Docs Sidebar */}
      <div className="md:w-64 flex-shrink-0 border-r border-gray-100 dark:border-gray-800/60 pr-4">
        <div className="sticky top-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Documentation</h3>
          <nav className="space-y-1">
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors no-tap-highlight ${
                  activeSection === sec.id
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1c22] hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <sec.icon size={16} />
                {sec.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Docs Content */}
      <div className="flex-1 max-w-4xl pb-16">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          
          {activeSection === 'intro' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md font-mono text-xs font-semibold border border-blue-200/50 dark:border-blue-800/30">v1.1.0</span>
                <h2 className="text-3xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">Veda Labs API</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8">
                Welcome to the official developer documentation for the Veda Labs API. Our robust RESTful API provides seamless integration with the next-generation <strong>Vedika AI</strong> model family, architected for enterprise-scale operations.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Base URL</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">All API requests should be routed through your Hugging Face Enterprise Gateway endpoint:</p>
              <pre className="bg-gray-900 dark:bg-[#0c0d10] text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner border border-gray-800"><code>https://veda-labs-ai_stidio.hf.space/v1</code></pre>
              
              <p className="text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
                Our API conforms to standard OpenAI SDK specifications, ensuring instantaneous migration. You can utilize standard Python, Node.js, or community-driven HTTP clients by simply pointing the base URL to our gateway.
              </p>
            </div>
          )}

          {activeSection === 'auth' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Authentication</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                The Veda Labs API secures endpoints using API keys. You can generate, rotate, and manage your cryptographic keys directly from the <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-800 dark:text-gray-200 font-mono text-xs">Security & Keys</span> section of your Gateway Console.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                All API requests must include your API key in the HTTP <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-800 dark:text-gray-200 font-mono text-xs">Authorization</span> header, formatted as a Bearer token.
              </p>
              <pre className="bg-gray-900 dark:bg-[#0c0d10] text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner border border-gray-800">
                <code><span className="text-pink-400">Authorization:</span> Bearer YOUR_API_KEY</code>
              </pre>
            </div>
          )}

          {activeSection === 'models' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Supported Models</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Veda Labs provides three powerful models, each fine-tuned for specific computational tasks. All current models natively support multimodal Vision capabilities.
              </p>
              
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                <table className="w-full text-left text-sm m-0">
                  <thead className="bg-gray-50 dark:bg-[#16181d] text-gray-600 dark:text-gray-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Model ID</th>
                      <th className="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Description</th>
                      <th className="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800 text-center">Reasoning</th>
                      <th className="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800 text-center">Vision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 bg-white dark:bg-[#111216]">
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-gray-900 dark:text-white">Vedika-4.1-Flash</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><strong>Flagship Omni-modal AI.</strong> Extremely fast, capable of deep internal reasoning.</td>
                      <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Supported</span></td>
                      <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Supported</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-gray-900 dark:text-white">Vedika-5.6-Pro</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><strong>Elite Enterprise Architect.</strong> Built for heavy coding and complex logic.</td>
                      <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Supported</span></td>
                      <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Supported</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-gray-900 dark:text-white">Vedika-2.5-Balanced</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400"><strong>Efficient Vision Assistant.</strong> Highly optimized for general text tasks.</td>
                      <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Disabled</span></td>
                      <td className="px-4 py-3 text-center"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Supported</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'chat' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Chat Completions</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Given a list of messages comprising a conversation, the model will return a generated response.</p>
              
              <pre className="bg-gray-900 dark:bg-[#0c0d10] text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner border border-gray-800 mb-8">
                <code><span className="text-blue-400 font-bold">POST</span> https://veda-labs-ai_stidio.hf.space/v1/chat/completions</code>
              </pre>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Request Parameters</h3>
              <div className="space-y-6">
                
                <div className="pb-4 border-b border-gray-100 dark:border-gray-800/60">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">model</code>
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">Required</span>
                    <span className="text-xs text-gray-500">string</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID of the model to use (e.g., <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Vedika-4.1-Flash</code>).</p>
                </div>

                <div className="pb-4 border-b border-gray-100 dark:border-gray-800/60">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">messages</code>
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">Required</span>
                    <span className="text-xs text-gray-500">array</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">A list of message objects (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">role</code> and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">content</code>).</p>
                </div>

                <div className="pb-4 border-b border-gray-100 dark:border-gray-800/60">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">enable_thinking</code>
                    <span className="text-xs font-medium text-gray-500">Optional</span>
                    <span className="text-xs text-gray-500">boolean</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Activates the internal reasoning engine for supported models. Defaults to true.</p>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 p-3 rounded-lg flex gap-3">
                    <AlertTriangle className="text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" size={16} />
                    <div className="text-sm text-amber-800 dark:text-amber-300">
                      <strong>Preferred: ON for Vedika-4.1-Flash</strong><br/>
                      Disabling the reasoning engine on this specific architecture may cause the model to output repetitive or looping text strings.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeSection === 'vision' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Vision & Video Support</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All Veda Labs models natively support multimodal image and video processing. You can pass an image or video either via an external URL or as a base64 encoded string.
              </p>
              
              <h3 className="text-base font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100">Example: Passing an Image URL</h3>
              <pre className="bg-gray-900 dark:bg-[#0c0d10] text-gray-300 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner border border-gray-800 mb-8"><code>{`{
  "model": "Vedika-4.1-Flash",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "Analyze the data in this chart." },
        { "type": "image_url", "image_url": { "url": "https://example.com/chart-data.png" } }
      ]
    }
  ]
}`}</code></pre>

              <h3 className="text-base font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100">Example: Passing a Video File</h3>
              <pre className="bg-gray-900 dark:bg-[#0c0d10] text-gray-300 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner border border-gray-800"><code>{`{
  "model": "Vedika-4.1-Flash",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "What is happening in this video?" },
        { "type": "video_url", "video_url": { "url": "https://example.com/sample-video.mp4" } }
      ]
    }
  ]
}`}</code></pre>
            </div>
          )}

          {activeSection === 'errors' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">Errors & Health</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Your API Gateway Dashboard actively monitors HTTP response codes to calculate your <strong>System Health Score</strong>.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#16181d] border border-gray-100 dark:border-gray-800/60">
                  <span className="w-16 text-center py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-md text-xs font-bold">200</span>
                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">Everything worked as expected.</div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#16181d] border border-gray-100 dark:border-gray-800/60">
                  <span className="w-16 text-center py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-md text-xs font-bold">401</span>
                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">Unauthorized - Missing or invalid API Key.</div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#16181d] border border-gray-100 dark:border-gray-800/60">
                  <span className="w-16 text-center py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-md text-xs font-bold">403</span>
                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">Forbidden - Your API Key is Suspended or Account Deleted.</div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#16181d] border border-gray-100 dark:border-gray-800/60">
                  <span className="w-16 text-center py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-md text-xs font-bold">500</span>
                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">Server Error - Gateway or upstream model timeout.</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
