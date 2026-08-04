import React from 'react';

export default function TermsOfService() {
  return (
    <div className="bg-white dark:bg-[#111216] p-8 md:p-12 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
      <p className="text-gray-500 mb-8">Last updated: August 2026</p>
      
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p className="mb-4 font-medium text-gray-900 dark:text-gray-100">These terms govern your access and use of the Veda Labs API Gateway.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">1. Acceptable Use</h2>
          <p className="mb-4">You agree not to use the API to generate unlawful, harmful, or abusive content. Veda Labs reserves the right to suspend access upon violation.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">2. Rate Limits and Quotas</h2>
          <p className="mb-4">You must adhere to assigned limits. Sustained spikes threatening infrastructural integrity will be throttled (HTTP 429).</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">3. API Key Security</h2>
          <p className="mb-4">You are fully responsible for maintaining the confidentiality of your API keys. We are not liable for losses arising from compromised credentials.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">4. Licensing</h2>
          <p className="mb-4">Subject to these Terms, Veda Labs grants you a non-exclusive, non-transferable, revocable license to access and use the API for your internal business purposes.</p>
        </section>
      </div>
    </div>
  );
}
