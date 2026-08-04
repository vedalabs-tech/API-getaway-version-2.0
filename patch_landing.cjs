const fs = require('fs');
let code = fs.readFileSync('src/Landing.tsx', 'utf8');

const search = `        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Enterprise API Gateway <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            for Foundation Models
          </span>
        </h1>`;

const replace = `        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-tight">
          Veda Labs
        </h1>
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
          Enterprise API Gateway <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            for Foundation Models
          </span>
        </h2>`;

code = code.replace(search, replace);
fs.writeFileSync('src/Landing.tsx', code);
