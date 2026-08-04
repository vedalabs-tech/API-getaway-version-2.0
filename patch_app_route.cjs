const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add the imports
const imports = `import PrivacyPolicy from './views/PrivacyPolicy';
import TermsOfService from './views/TermsOfService';`;
code = code.replace("import Legal from './views/Legal';", "import Legal from './views/Legal';\n" + imports);

// Replace the route block
const searchRoute = `  if (path === '/privacy' || path === '/terms') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0c] text-gray-900 dark:text-gray-100 flex flex-col font-['Inter',sans-serif]">
        <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">Veda Labs</a>
        </nav>
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
          <Legal />
        </main>
      </div>
    );
  }`;

const replaceRoute = `  if (path === '/privacy') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0c] text-gray-900 dark:text-gray-100 flex flex-col font-['Inter',sans-serif]">
        <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">Veda Labs</a>
        </nav>
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
          <PrivacyPolicy />
        </main>
      </div>
    );
  }

  if (path === '/terms') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0c] text-gray-900 dark:text-gray-100 flex flex-col font-['Inter',sans-serif]">
        <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">Veda Labs</a>
        </nav>
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
          <TermsOfService />
        </main>
      </div>
    );
  }`;

code = code.replace(searchRoute, replaceRoute);

fs.writeFileSync('src/App.tsx', code);
