import { useState } from 'react';
import logoImage from '../../logo.png';

export default function ApiDocs() {
  const [activePage, setActivePage] = useState('page-intro');

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[80vh] bg-white dark:bg-[#111216] rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm overflow-hidden animate-in fade-in duration-500">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-gray-50 dark:bg-[#16181d] border-r border-gray-100 dark:border-gray-800/60 flex flex-col shrink-0">
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800/60 flex items-center gap-3">
          <img src={logoImage} alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
          <h2 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">Veda Labs Docs</h2>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar flex md:flex-col gap-6 md:gap-4 md:block overflow-x-auto whitespace-nowrap md:whitespace-normal">
          <div className="md:mb-6 flex md:block items-center gap-2">
            <div className="text-[11px] uppercase font-bold text-gray-500 tracking-wider mb-2 hidden md:block pl-3">Getting Started</div>
            <button 
              onClick={() => setActivePage('page-intro')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'page-intro' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
            >
              Introduction
            </button>
            <button 
              onClick={() => setActivePage('page-auth')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'page-auth' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
            >
              Authentication
            </button>
          </div>

          <div className="md:mb-6 flex md:block items-center gap-2">
            <div className="text-[11px] uppercase font-bold text-gray-500 tracking-wider mb-2 hidden md:block pl-3">API Reference</div>
            <button 
              onClick={() => setActivePage('page-models')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'page-models' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
            >
              Models Overview
            </button>
            <button 
              onClick={() => setActivePage('page-endpoints')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'page-endpoints' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
            >
              Chat Completions
            </button>
            <button 
              onClick={() => setActivePage('page-vision')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'page-vision' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
            >
              Vision (Image Support)
            </button>
          </div>

          <div className="md:mb-6 flex md:block items-center gap-2">
            <div className="text-[11px] uppercase font-bold text-gray-500 tracking-wider mb-2 hidden md:block pl-3">Integration</div>
            <button 
              onClick={() => setActivePage('page-examples')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'page-examples' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
            >
              Code Examples
            </button>
            <button 
              onClick={() => setActivePage('page-errors')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === 'page-errors' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
            >
              Errors & Health
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto">
          {activePage === 'page-intro' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4 tracking-wider">v1.1.0</span>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Veda Labs API Documentation</h1>
                <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">
                  Welcome to the official developer documentation for the Veda Labs API. Our robust RESTful API provides seamless integration with the next-generation <strong className="text-gray-900 dark:text-white">Vedika AI</strong> model family, architected for enterprise-scale operations.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Base URL</h3>
                <p className="text-gray-600 dark:text-gray-400 text-[15px] mb-4">
                  All API requests should be routed through your Hugging Face Enterprise Gateway endpoint:
                </p>
                <div className="bg-[#0f172a] dark:bg-black rounded-xl p-4 overflow-x-auto shadow-sm border border-gray-800">
                  <code className="text-gray-200 font-mono text-sm">https://veda-labs-ai_stidio.hf.space/v1</code>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mt-6">
                Our API conforms to standard OpenAI SDK specifications, ensuring instantaneous migration. You can utilize standard Python, Node.js, or community-driven HTTP clients by simply pointing the base URL to our gateway.
              </p>
            </div>
          )}

          {activePage === 'page-auth' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Authentication</h1>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">
                The Veda Labs API secures endpoints using API keys. You can generate, rotate, and manage your cryptographic keys directly from the <span className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200 dark:border-gray-700">Security & Keys</span> section of your Gateway Console.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">
                All API requests must include your API key in the HTTP <span className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200 dark:border-gray-700">Authorization</span> header, formatted as a Bearer token.
              </p>
              
              <div className="bg-[#0f172a] dark:bg-black rounded-xl p-4 overflow-x-auto shadow-sm border border-gray-800 mt-4">
                <code className="text-gray-200 font-mono text-sm">
                  <span className="text-[#ff7b72]">Authorization:</span> Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
          )}

          {activePage === 'page-models' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Supported Models</h1>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-6">
                Veda Labs provides three powerful models, each fine-tuned for specific computational tasks. All current models natively support multimodal Vision capabilities.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Model ID</th>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Description</th>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Reasoning Engine</th>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Vision Support</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="font-semibold text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">Vedika-4.1-Flash</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Flagship Omni-modal AI.</strong> Extremely fast, capable of deep internal reasoning. Highly recommended as the default model.</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold tracking-wide">Supported</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold tracking-wide">Supported</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="font-semibold text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">Vedika-5.6-Pro</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Elite Enterprise Architect.</strong> Built for heavy coding, complex system architecture, and highly structured data outputs.</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold tracking-wide">Supported</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold tracking-wide">Supported</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="font-semibold text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">Vedika-2.5-Balanced</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Efficient Vision Assistant.</strong> Highly optimized for general text tasks, rapid conversational flow, and image analysis.</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2 py-1 rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold tracking-wide">Disabled</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold tracking-wide">Supported</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePage === 'page-endpoints' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Chat Completions</h1>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-4">
                Given a list of messages comprising a conversation, the model will return a generated response.
              </p>
              
              <div className="bg-[#0f172a] dark:bg-black rounded-xl p-4 overflow-x-auto shadow-sm border border-gray-800 mb-8">
                <code className="text-gray-200 font-mono text-sm">
                  <span className="text-[#a5d6ff]">POST</span> https://veda-labs-ai_stidio.hf.space/v1/chat/completions
                </code>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Request Parameters</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold w-1/4">Parameter</th>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Type</th>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <strong className="text-gray-900 dark:text-white block">model</strong>
                        <span className="text-red-500 text-[11px] font-bold uppercase tracking-wider">Required</span>
                      </td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500">string</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">ID of the model to use (e.g., <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">Vedika-4.1-Flash</span>).</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <strong className="text-gray-900 dark:text-white block">messages</strong>
                        <span className="text-red-500 text-[11px] font-bold uppercase tracking-wider">Required</span>
                      </td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500">array</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">A list of message objects (<span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">role</span> and <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">content</span>) comprising the conversation. Content can be a string or an array of text/image parts.</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <strong className="text-gray-900 dark:text-white block">stream</strong>
                        <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Optional</span>
                      </td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500">boolean</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">If set to <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">true</span>, partial message deltas will be sent as Server-Sent Events (SSE) for real-time UI rendering. Defaults to <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">false</span>.</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <strong className="text-gray-900 dark:text-white block">enable_thinking</strong>
                        <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Optional</span>
                      </td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500">boolean</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                        Activates the internal reasoning engine for supported models (<span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">Vedika-4.1-Flash</span> & <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">Vedika-5.6-Pro</span>). Defaults to <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">true</span>.
                        <div className="mt-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg text-amber-800 dark:text-amber-400 text-sm">
                          <strong className="block mb-1 text-amber-900 dark:text-amber-300">Preferred: ON for Vedika-4.1-Flash</strong>
                          We highly recommend keeping reasoning <code>true</code> for the 4.1-Flash model. Disabling the reasoning engine on this specific architecture may cause the model to output repetitive or looping text strings.
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <strong className="text-gray-900 dark:text-white block">temperature</strong>
                        <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Optional</span>
                      </td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500">number</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">Controls output randomness. Lower values (e.g., 0.2) are more deterministic. Range: 0.0 to 2.0. Defaults to 0.7.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePage === 'page-vision' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Vision (Image Support)</h1>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-4">
                All Veda Labs models natively support multimodal image processing. You can pass an image either via an external URL or as a base64 encoded string.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-8">
                To provide an image, modify the <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">content</span> of the user message to be an array of objects rather than a single string. Use the <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">image_url</span> type to pass the image data.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example: Passing an Image URL</h3>
              <div className="bg-[#0f172a] dark:bg-black rounded-xl p-5 overflow-x-auto shadow-sm border border-gray-800 mb-8">
<pre className="text-gray-300 font-mono text-[13px] leading-relaxed m-0 p-0 bg-transparent"><code>{`{
  "`}<span className="text-[#a5d6ff]">model</span>{`": "`}<span className="text-[#a5d6ff]">Vedika-4.1-Flash</span>{`",
  "`}<span className="text-[#a5d6ff]">messages</span>{`": [
    {
      "`}<span className="text-[#a5d6ff]">role</span>{`": "`}<span className="text-[#a5d6ff]">user</span>{`",
      "`}<span className="text-[#a5d6ff]">content</span>{`": [
        {
          "`}<span className="text-[#a5d6ff]">type</span>{`": "`}<span className="text-[#a5d6ff]">text</span>{`",
          "`}<span className="text-[#a5d6ff]">text</span>{`": "`}<span className="text-[#a5d6ff]">Analyze the data in this chart.</span>{`"
        },
        {
          "`}<span className="text-[#a5d6ff]">type</span>{`": "`}<span className="text-[#a5d6ff]">image_url</span>{`",
          "`}<span className="text-[#a5d6ff]">image_url</span>{`": {
            "`}<span className="text-[#a5d6ff]">url</span>{`": "`}<span className="text-[#a5d6ff]">https://example.com/chart-data.png</span>{`"
          }
        }
      ]
    }
  ]
}`}</code></pre>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example: Passing a Base64 Image</h3>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-4">
                If you prefer to upload the image directly without hosting it, convert your image to a base64 string and append the appropriate data URI prefix (<span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">data:image/jpeg;base64,</span>).
              </p>
              <div className="bg-[#0f172a] dark:bg-black rounded-xl p-5 overflow-x-auto shadow-sm border border-gray-800">
<pre className="text-gray-300 font-mono text-[13px] leading-relaxed m-0 p-0 bg-transparent"><code>{`{
  "`}<span className="text-[#a5d6ff]">type</span>{`": "`}<span className="text-[#a5d6ff]">image_url</span>{`",
  "`}<span className="text-[#a5d6ff]">image_url</span>{`": {
    "`}<span className="text-[#a5d6ff]">url</span>{`": "`}<span className="text-[#a5d6ff]">data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/...</span>{`"
  }
}`}</code></pre>
              </div>
            </div>
          )}

          {activePage === 'page-examples' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Code Examples</h1>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Standard Chat Request (cURL)</h3>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-4">
                A basic request using <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">Vedika-5.6-Pro</span> with streaming enabled.
              </p>
              <div className="bg-[#0f172a] dark:bg-black rounded-xl p-5 overflow-x-auto shadow-sm border border-gray-800 mb-10">
<pre className="text-gray-300 font-mono text-[13px] leading-relaxed m-0 p-0 bg-transparent"><code><span className="text-[#ff7b72]">curl</span> -X POST "https://veda-labs-ai_stidio.hf.space/v1/chat/completions" \
     -H <span className="text-[#a5d6ff]">"Content-Type: application/json"</span> \
     -H <span className="text-[#a5d6ff]">"Authorization: Bearer YOUR_API_KEY"</span> \
     -d <span className="text-[#a5d6ff]">'{`{
       "model": "Vedika-5.6-Pro",
       "stream": true,
       "messages": [
         {"role": "user", "content": "Write a scalable system architecture document."}
       ]
     }`}</span>'</code></pre>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Advanced: Reasoning & Vision (Python)</h3>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-4">
                Using <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">Vedika-4.1-Flash</span> with <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">enable_thinking</span> explicitly set to <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200">True</span> to analyze an image alongside complex logical instructions.
              </p>
              <div className="bg-[#0f172a] dark:bg-black rounded-xl p-5 overflow-x-auto shadow-sm border border-gray-800">
<pre className="text-gray-300 font-mono text-[13px] leading-relaxed m-0 p-0 bg-transparent"><code><span className="text-[#ff7b72]">import</span> requests

url = <span className="text-[#a5d6ff]">"https://veda-labs-ai_stidio.hf.space/v1/chat/completions"</span>
headers = {"{"}
    <span className="text-[#a5d6ff]">"Authorization"</span>: <span className="text-[#a5d6ff]">"Bearer YOUR_API_KEY"</span>,
    <span className="text-[#a5d6ff]">"Content-Type"</span>: <span className="text-[#a5d6ff]">"application/json"</span>
{"}"}

payload = {"{"}
    <span className="text-[#a5d6ff]">"model"</span>: <span className="text-[#a5d6ff]">"Vedika-4.1-Flash"</span>,
    <span className="text-[#a5d6ff]">"messages"</span>: [
        {"{"}
            <span className="text-[#a5d6ff]">"role"</span>: <span className="text-[#a5d6ff]">"user"</span>,
            <span className="text-[#a5d6ff]">"content"</span>: [
                {"{"}<span className="text-[#a5d6ff]">"type"</span>: <span className="text-[#a5d6ff]">"text"</span>, <span className="text-[#a5d6ff]">"text"</span>: <span className="text-[#a5d6ff]">"Calculate the exact dimensions needed for the structure in this blueprint."</span>{"}"},
                {"{"}<span className="text-[#a5d6ff]">"type"</span>: <span className="text-[#a5d6ff]">"image_url"</span>, <span className="text-[#a5d6ff]">"image_url"</span>: {"{"}<span className="text-[#a5d6ff]">"url"</span>: <span className="text-[#a5d6ff]">"https://example.com/blueprint.png"</span>{"}"}{"}"}
            ]
        {"}"}
    ],
    <span className="text-[#a5d6ff]">"enable_thinking"</span>: <span className="text-[#ff7b72]">True</span>, <span className="text-[#8b949e] italic"># Highly recommended for 4.1-Flash</span>
    <span className="text-[#a5d6ff]">"temperature"</span>: <span className="text-[#a5d6ff]">0.3</span>
{"}"}

response = requests.<span className="text-[#d2a8ff]">post</span>(url, headers=headers, json=payload)
<span className="text-[#d2a8ff]">print</span>(response.json())</code></pre>
              </div>
            </div>
          )}

          {activePage === 'page-errors' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Errors & Health Score</h1>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-6">
                Your API Gateway Dashboard actively monitors HTTP response codes to calculate your <strong className="text-gray-900 dark:text-white">System Health Score</strong>.
              </p>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Status Code</th>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Meaning</th>
                      <th className="p-4 border-b-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-bold">Health Impact</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2.5 py-1 rounded-md bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-bold text-[11px] tracking-wide">200 - OK</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">Everything worked as expected.</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-300 font-medium">Positive (Increases Score)</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2.5 py-1 rounded-md bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 font-bold text-[11px] tracking-wide">401 - Unauthorized</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">Missing or invalid API Key.</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-300 font-medium">Negative (Lowers Score)</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2.5 py-1 rounded-md bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 font-bold text-[11px] tracking-wide">403 - Forbidden</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">Your API Key is Suspended or Account Deleted.</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-300 font-medium">Negative (Lowers Score)</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800"><span className="inline-block px-2.5 py-1 rounded-md bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 font-bold text-[11px] tracking-wide">500 - Server Error</span></td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">Gateway or upstream model timeout.</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-300 font-medium">Negative (Lowers Score)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-[14px]">
                <strong className="text-gray-900 dark:text-white">Note:</strong> High error rates ({">"}25%) may result in temporary rate limiting. Please monitor your System Health via the Gateway Console.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
