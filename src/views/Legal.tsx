import { useState } from 'react';
import { ShieldAlert, FileText, Book } from 'lucide-react';

export default function Legal() {
  const [activeSection, setActiveSection] = useState('manual');

  const sections = [
    { id: 'manual', label: 'User Manual', icon: Book },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldAlert },
  ];

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

      <div className="flex-1 max-w-4xl pb-16">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {activeSection === 'manual' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                <Book className="text-blue-500" size={28} />
                <h2 className="text-2xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">User Manual</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Welcome to the Veda Labs API Gateway. This manual provides a comprehensive overview of how to navigate and utilize the dashboard.</p>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <div className="bg-gray-50 dark:bg-[#16181d] p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">1. Dashboard Overview</h3>
                  <p className="text-sm">Monitor your API health, latest requests, and token usage in real time. The dashboard provides an at-a-glance view of your integration status.</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#16181d] p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">2. Security & Keys</h3>
                  <p className="text-sm">Manage your cryptographic API keys. You can reveal, copy, or regenerate your keys. Use the Danger Zone carefully to suspend or delete your account if compromised.</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#16181d] p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">3. Rate Limits</h3>
                  <p className="text-sm">Review your allocated quota and limits. The Gateway utilizes dynamic throttling based on your tier to ensure stability.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'terms' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                <FileText className="text-emerald-500" size={28} />
                <h2 className="text-2xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">Terms & Conditions</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Last Updated: August 2026</p>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                <p>These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Veda Labs ("we", "us", or "our"), concerning your access to and use of the Veda Gateway and its associated machine learning APIs and models.</p>
                <p>Please read these Terms carefully. By utilizing the Veda Gateway, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms. If you do not agree, you are expressly prohibited from using the Gateway and must discontinue use immediately.</p>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">1. API Usage & Licensing</h3>
                <p>Subject to these Terms, Veda Labs grants you a non-exclusive, non-transferable, revocable license to access and use the API for your internal business purposes or consumer-facing applications. This license does not include any right to resell or redistribute our models. You may not reverse engineer, decompile, or attempt to derive the source code or underlying architecture of any Veda Labs models.</p>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">2. Acceptable Use Policy</h3>
                <p>You agree not to use the API to generate unlawful, harmful, or abusive content. Veda Labs reserves the right to suspend or terminate access immediately upon violation of this policy. You are strictly prohibited from using the API for:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Generating hate speech, harassment, or discriminatory content.</li>
                  <li>Facilitating cyberattacks, malware creation, or unauthorized system access.</li>
                  <li>Impersonating individuals or generating non-consensual deepfakes.</li>
                  <li>Generating spam, political disinformation, or automated manipulation of social media.</li>
                </ul>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">3. Quotas and Rate Limiting</h3>
                <p>Veda Labs enforces dynamic rate limiting to maintain stability across the Gateway. While enterprise tiers may reflect "Unlimited" monthly quotas, fair usage policies still apply. Sustained spikes that threaten infrastructural integrity will be temporarily throttled. We reserve the right to modify rate limits and tier structures at any time.</p>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">4. Data Security and Confidentiality</h3>
                <p>You are responsible for maintaining the confidentiality of your API keys and credentials. You agree to notify Veda Labs immediately of any unauthorized use of your keys. We are not liable for any loss or damage arising from your failure to protect your credentials.</p>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">5. Limitation of Liability</h3>
                <p>In no event shall Veda Labs, its directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the API, even if Veda Labs has been advised of the possibility of such damages.</p>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">6. Governing Law</h3>
                <p>These Terms shall be governed by and defined following the laws of our operating jurisdiction. Veda Labs and yourself irrevocably consent that the courts of the operating jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                <ShieldAlert className="text-purple-500" size={28} />
                <h2 className="text-2xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">Privacy Policy</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Last Updated: August 2026</p>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                <p>At Veda Labs, we take your privacy and data security seriously. This Privacy Policy outlines how we collect, use, and protect your information when you interact with our API Gateway and associated services. We are committed to maintaining the trust and confidence of our developers.</p>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">1. Information We Collect</h3>
                <p>When you register for the Veda Gateway, we collect your name and email address. When you utilize the API, we collect essential operational data including API request timestamps, request origins, error logs, token consumption metrics, and latency measurements.</p>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">2. How We Use Your Data</h3>
                <p>The operational data we collect is used strictly for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Maintaining service reliability and preventing fraud.</li>
                  <li>Calculating billing and usage quotas accurately.</li>
                  <li>Improving gateway routing and reducing model latency.</li>
                  <li>Providing you with detailed analytics on your dashboard.</li>
                </ul>
                <p className="font-medium text-gray-900 dark:text-gray-100 mt-4">Zero-Training Policy: We explicitly do NOT use your proprietary API payloads, prompts, or completions to train, retrain, or improve our foundational machine learning models.</p>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">3. Data Security and Storage</h3>
                <p>All transaction logs and telemetry data are encrypted in transit using TLS 1.3 and encrypted at rest using AES-256. Data is stored in secure, sovereign cloud infrastructure with strict access controls. We regularly perform penetration testing and security audits to ensure your data remains protected against unauthorized access.</p>
                
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">4. Data Retention and Deletion</h3>
                <p>We retain your API logs for a rolling period of 90 days for operational transparency. You have the right to request deletion of your telemetry data or your entire account at any time via the Security dashboard. Upon an account deletion request, all personal data and associated logs are permanently purged from our primary systems within 72 hours.</p>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">5. Third-Party Sharing</h3>
                <p>We do not sell, rent, or trade your personal data or API usage metrics to third parties. Information may only be disclosed if we are legally obligated to do so, such as in response to a valid court order or subpoena. In such cases, we will attempt to notify you prior to disclosure, unless prohibited by law.</p>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mt-6">6. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
