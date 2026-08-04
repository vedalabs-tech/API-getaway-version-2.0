import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white dark:bg-[#111216] p-8 md:p-12 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: August 2026</p>
      
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">1. Information We Collect</h2>
          <p className="mb-4">At Veda Labs, we prioritize your data privacy. By using our gateway, you acknowledge our data practices. When you register, we collect your name and email. API usage collects timestamps, latency, errors, and token counts.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">2. Zero-Training Policy</h2>
          <p className="mb-4">We explicitly do NOT use your API payloads, prompts, or completions to train or improve our foundational models. Your data remains yours.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">3. Data Retention</h2>
          <p className="mb-4">Transaction logs and telemetry data are retained for a rolling 90-day period for operational transparency and billing accuracy before being permanently deleted.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">4. Third-Party Sharing</h2>
          <p className="mb-4">We do not sell, rent, or trade your personal data or API usage metrics to third parties. Information may only be disclosed if legally obligated.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">5. Compliance with DPDP Act, 2023</h2>
          <p className="mb-4">By proceeding, you give explicit, informed, and unconditional consent to Veda Labs (Data Fiduciary) to process your personal data strictly for providing API services. You possess the right to access, correct, erase, and nominate a representative for your personal data stored within our systems. Veda Labs has implemented robust technical and organizational measures to prevent personal data breaches, adhering to sovereign compliance standards. A designated Data Protection Officer (DPO) is available for resolving any grievances related to personal data processing within the stipulated time frame.</p>
        </section>
      </div>
    </div>
  );
}
