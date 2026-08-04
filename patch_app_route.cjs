const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const authBlock = `  if (!email) {
    if (showAuth) {
      return <Auth onLogin={handleLogin} />;
    }
    return <Landing onStart={() => setShowAuth(true)} />;
  }`;

const routeBlock = `  const path = window.location.pathname;
  if (path === '/privacy' || path === '/terms') {
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
  }

  if (!email) {
    if (showAuth) {
      return <Auth onLogin={handleLogin} />;
    }
    return <Landing onStart={() => setShowAuth(true)} />;
  }`;

code = code.replace(authBlock, routeBlock);
fs.writeFileSync('src/App.tsx', code);
