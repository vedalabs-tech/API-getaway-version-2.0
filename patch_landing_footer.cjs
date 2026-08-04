const fs = require('fs');
let code = fs.readFileSync('src/Landing.tsx', 'utf8');

const search = `      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
        <p>Proudly developed in India, made for Bharat 🇮🇳</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Veda Labs. All rights reserved.</p>
      </footer>`;

const replace = `      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p>Proudly developed in India, made for Bharat 🇮🇳</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Veda Labs. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms of Service</a>
        </div>
      </footer>`;

code = code.replace(search, replace);
fs.writeFileSync('src/Landing.tsx', code);
