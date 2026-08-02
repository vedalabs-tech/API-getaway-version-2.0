import { useState } from 'react';
import { ShieldAlert, FileText, Book, Download, CheckCircle, Activity, Key, Gauge, ArrowRight, Loader2 } from 'lucide-react';
import logoImage from '../../logo.png';
import html2pdf from 'html2pdf.js';

export default function Legal() {
  const [activeSection, setActiveSection] = useState('manual');
  const [isDownloading, setIsDownloading] = useState(false);

  const sections = [
    { id: 'manual', label: 'User Manual', icon: Book },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldAlert },
  ];

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    const sourceElement = document.getElementById(`pdf-content-${activeSection}`);
    if (!sourceElement) {
       setIsDownloading(false);
       return;
    }
    
    const wrapper = document.createElement('div');
    wrapper.style.padding = '20px';
    wrapper.style.color = '#111';
    wrapper.style.backgroundColor = '#fff';
    
    const logoImg = document.createElement('img');
    logoImg.src = logoImage;
    logoImg.style.height = '40px';
    logoImg.style.marginBottom = '30px';
    wrapper.appendChild(logoImg);
    
    const clonedContent = sourceElement.cloneNode(true) as HTMLElement;
    
    wrapper.appendChild(clonedContent);
    
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '800px'; // Give it a fixed width for good rendering
    document.body.appendChild(wrapper);
    
    // Force light mode styles for the clone to ensure black text on white background in PDF
    wrapper.classList.remove('dark');
    const allEls = wrapper.querySelectorAll('*');
    allEls.forEach((el: any) => {
        // Strip out dark mode classes to ensure it renders light
        const classesToRemove = Array.from(el.classList).filter((c: any) => c.startsWith('dark:'));
        classesToRemove.forEach((c: any) => el.classList.remove(c));
    });

    const opt = {
      margin:       15,
      filename:     `Veda_Labs_${activeSection}.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, windowWidth: 800 },
      jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };
    
    html2pdf().set(opt).from(wrapper).save().then(() => {
        document.body.removeChild(wrapper);
        setIsDownloading(false);
    }).catch(() => {
        document.body.removeChild(wrapper);
        setIsDownloading(false);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-500 min-h-[70vh]">
      <div className="md:w-64 flex-shrink-0 border-r border-gray-100 dark:border-gray-800/60 pr-4">
        <div className="sticky top-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Legal & Info</h3>
          <nav className="space-y-1">
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors outline-none focus:ring-0 ${
                  activeSection === sec.id
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1c22] hover:text-gray-900 dark:hover:text-gray-200'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <sec.icon size={16} strokeWidth={activeSection === sec.id ? 2 : 1.5} />
                {sec.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 max-w-4xl pb-16">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="px-4 py-2 bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-[#252830] transition-colors flex items-center gap-2 outline-none focus:ring-0 shadow-sm btn-glow"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} strokeWidth={1.5} />}
            {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
          </button>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          {activeSection === 'manual' && (
            <div id="pdf-content-manual" className="animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                  <Book size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">User Manual</h2>
                  <p className="text-gray-500 text-sm mt-1 m-0">Visual guide to navigating the Veda Labs API Gateway.</p>
                </div>
              </div>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex flex-col sm:flex-row gap-6 items-start bg-white dark:bg-[#111216] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm card-hover relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center border border-blue-100 dark:border-blue-900/30 font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0 mb-2 flex items-center gap-2">
                      <Activity size={18} className="text-blue-500" />
                      Dashboard Overview
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      Monitor your API health, latest requests, and token usage in real time. The dashboard provides an at-a-glance view of your integration status.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-gray-50 dark:bg-[#1a1c22] p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                        <CheckCircle size={14} className="text-emerald-500 mb-1" />
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">System Health</div>
                        <div className="text-xs text-gray-500">Track 200 OKs vs Errors</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-[#1a1c22] p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                        <CheckCircle size={14} className="text-emerald-500 mb-1" />
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">Token Usage</div>
                        <div className="text-xs text-gray-500">Monitor limits in real-time</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col sm:flex-row gap-6 items-start bg-white dark:bg-[#111216] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm card-hover relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -z-10"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center border border-amber-100 dark:border-amber-900/30 font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0 mb-2 flex items-center gap-2">
                      <Key size={18} className="text-amber-500" />
                      Security & API Keys
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      Manage your cryptographic API keys. You can reveal, copy, or regenerate your keys. Use the Danger Zone carefully to suspend or delete your account if compromised.
                    </p>
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-3 rounded-lg flex items-center gap-3">
                      <ShieldAlert size={16} className="text-amber-600 dark:text-amber-500 flex-shrink-0" />
                      <span className="text-xs font-medium text-amber-800 dark:text-amber-400">Remember to copy your key immediately; it will be hidden after the first reveal.</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col sm:flex-row gap-6 items-start bg-white dark:bg-[#111216] p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm card-hover relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -z-10"></div>
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center border border-purple-100 dark:border-purple-900/30 font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0 mb-2 flex items-center gap-2">
                      <Gauge size={18} className="text-purple-500" />
                      Rate Limits
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      Review your allocated quota and limits. The Gateway utilizes dynamic throttling based on your tier to ensure stability across the network. Exceeding limits will result in 429 Too Many Requests errors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'terms' && (
            <div id="pdf-content-terms" className="animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
                  <FileText size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">Terms & Conditions</h2>
                  <p className="text-gray-500 text-sm mt-1 m-0">Last Updated: August 2026</p>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed bg-white dark:bg-[#111216] p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
                <p className="font-medium text-gray-900 dark:text-gray-100">These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Veda Labs ("we", "us", or "our"), concerning your access to and use of the Veda Gateway and its associated machine learning APIs and models.</p>
                <p>Please read these Terms carefully. By utilizing the Veda Gateway, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms. If you do not agree, you are expressly prohibited from using the Gateway and must discontinue use immediately.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-blue-500" /> 1. API Usage & Licensing
                </h3>
                <p>Subject to these Terms, Veda Labs grants you a non-exclusive, non-transferable, revocable license to access and use the API for your internal business purposes or consumer-facing applications. This license does not include any right to resell or redistribute our models. You may not reverse engineer, decompile, or attempt to derive the source code or underlying architecture of any Veda Labs models.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-blue-500" /> 2. Acceptable Use Policy
                </h3>
                <p>You agree not to use the API to generate unlawful, harmful, or abusive content. Veda Labs reserves the right to suspend or terminate access immediately upon violation of this policy. You are strictly prohibited from using the API for:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 list-none pl-0">
                  <li className="bg-gray-50 dark:bg-[#1a1c22] p-3 rounded-lg border border-gray-100 dark:border-gray-800 text-xs flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                    Generating hate speech, harassment, or discriminatory content.
                  </li>
                  <li className="bg-gray-50 dark:bg-[#1a1c22] p-3 rounded-lg border border-gray-100 dark:border-gray-800 text-xs flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                    Facilitating cyberattacks, malware creation, or unauthorized access.
                  </li>
                  <li className="bg-gray-50 dark:bg-[#1a1c22] p-3 rounded-lg border border-gray-100 dark:border-gray-800 text-xs flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                    Impersonating individuals or generating non-consensual deepfakes.
                  </li>
                  <li className="bg-gray-50 dark:bg-[#1a1c22] p-3 rounded-lg border border-gray-100 dark:border-gray-800 text-xs flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                    Generating spam, political disinformation, or automated manipulation.
                  </li>
                </ul>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-blue-500" /> 3. Quotas, Rate Limiting & Billing
                </h3>
                <p>Veda Labs enforces dynamic rate limiting to maintain stability across the Gateway. While enterprise tiers may reflect "Unlimited" monthly quotas, fair usage policies still apply. Sustained spikes that threaten infrastructural integrity will be temporarily throttled. We reserve the right to modify rate limits and tier structures at any time. Any changes to billing structure will be communicated with 30 days notice.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-blue-500" /> 4. Data Security and Confidentiality
                </h3>
                <p>You are responsible for maintaining the confidentiality of your API keys and credentials. You agree to notify Veda Labs immediately of any unauthorized use of your keys. We are not liable for any loss or damage arising from your failure to protect your credentials. We strongly advise using environment variables to store keys in production environments.</p>

                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-blue-500" /> 5. Service Level Agreement (SLA)
                </h3>
                <p>We strive for 99.9% uptime for the Gateway, however, due to the experimental nature of some cutting-edge models, occasional downtime may occur during maintenance windows. We will communicate major updates or expected downtime via the dashboard.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-blue-500" /> 6. Limitation of Liability
                </h3>
                <p>In no event shall Veda Labs, its directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the API, even if Veda Labs has been advised of the possibility of such damages.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-blue-500" /> 7. Governing Law
                </h3>
                <p>These Terms shall be governed by and defined following the laws of our operating jurisdiction. Veda Labs and yourself irrevocably consent that the courts of the operating jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div id="pdf-content-privacy" className="animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center">
                  <ShieldAlert size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">Privacy Policy</h2>
                  <p className="text-gray-500 text-sm mt-1 m-0">Last Updated: August 2026</p>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed bg-white dark:bg-[#111216] p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
                <p>At Veda Labs, we take your privacy and data security seriously. This Privacy Policy outlines how we collect, use, and protect your information when you interact with our API Gateway and associated services. We are committed to maintaining the trust and confidence of our developers.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-purple-500" /> 1. Information We Collect
                </h3>
                <p>When you register for the Veda Gateway, we collect your name and email address. When you utilize the API, we collect essential operational data including API request timestamps, request origins, error logs, token consumption metrics, and latency measurements.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-purple-500" /> 2. How We Use Your Data
                </h3>
                <p>The operational data we collect is used strictly for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Maintaining service reliability and preventing fraud.</li>
                  <li>Calculating billing and usage quotas accurately.</li>
                  <li>Improving gateway routing and reducing model latency.</li>
                  <li>Providing you with detailed analytics on your dashboard.</li>
                </ul>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-xl mt-4">
                  <p className="font-semibold text-purple-900 dark:text-purple-300 m-0">Zero-Training Policy</p>
                  <p className="text-purple-800 dark:text-purple-400 mt-1 m-0">We explicitly do NOT use your proprietary API payloads, prompts, or completions to train, retrain, or improve our foundational machine learning models.</p>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-purple-500" /> 3. Data Security and Storage
                </h3>
                <p>All transaction logs and telemetry data are encrypted in transit using TLS 1.3 and encrypted at rest using AES-256. Data is stored in secure, sovereign cloud infrastructure with strict access controls. We regularly perform penetration testing and security audits to ensure your data remains protected against unauthorized access.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-purple-500" /> 4. Data Retention and Deletion
                </h3>
                <p>We retain your API logs for a rolling period of 90 days for operational transparency. You have the right to request deletion of your telemetry data or your entire account at any time via the Security dashboard. Upon an account deletion request, all personal data and associated logs are permanently purged from our primary systems within 72 hours.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-purple-500" /> 5. Third-Party Sharing
                </h3>
                <p>We do not sell, rent, or trade your personal data or API usage metrics to third parties. Information may only be disclosed if we are legally obligated to do so, such as in response to a valid court order or subpoena. In such cases, we will attempt to notify you prior to disclosure, unless prohibited by law.</p>
                
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mt-8 mb-3 flex items-center gap-2">
                  <ArrowRight size={16} className="text-purple-500" /> 6. Changes to This Policy
                </h3>
                <p>We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
