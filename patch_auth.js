import fs from 'fs';

let content = fs.readFileSync('src/Auth.tsx', 'utf8');

// 1. Remove FooterBranding definition
content = content.replace(/  const FooterBranding = \(\) => \([\s\S]*?  \);\n/, '');

// 2. Add the footer box inside the auth box, replacing <FooterBranding />
content = content.replace(/      <\/div>\n\n      <FooterBranding \/>/, `        <div className="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-800/60 w-full animate-in fade-in duration-700 delay-300">
          <div className="bg-gray-50/80 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800/60 p-4 text-center">
             <p className="text-[13px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest mb-1.5 flex flex-col sm:flex-row items-center justify-center gap-1.5">
               <span className="bg-gradient-to-r from-orange-500 via-gray-600 to-green-600 dark:from-orange-400 dark:via-gray-400 dark:to-green-500 bg-clip-text text-transparent">PROUDLY DEVELOPED IN INDIA</span>
               <span className="hidden sm:inline-block text-gray-300 dark:text-gray-700">•</span>
               <span className="bg-gradient-to-r from-orange-500 via-gray-600 to-green-600 dark:from-orange-400 dark:via-gray-400 dark:to-green-500 bg-clip-text text-transparent">MADE FOR BHARAT</span>
             </p>
             <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mt-1">
               Developed by Veda Labs | Divy Patel
             </p>
          </div>
        </div>
      </div>`);

// 3. Update the max-width of the auth box
content = content.replace(/className="w-full max-w-xl p-8 sm:p-12/g, 'className="w-full max-w-2xl p-8 sm:p-12');

// 4. Add some visual flair to the background
content = content.replace(/<div className="absolute top-\[-20%\] left-\[-10%\] w-\[60%\] h-\[60%\] rounded-full bg-blue-400\/20 dark:bg-blue-600\/20 mix-blend-multiply blur-\[120px\] pointer-events-none animate-pulse duration-\[5000ms\]" \/>/g, `<div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/20 dark:from-blue-600/30 dark:to-indigo-600/20 mix-blend-multiply blur-[120px] pointer-events-none animate-pulse duration-[5000ms]" />`);

content = content.replace(/<div className="absolute bottom-\[-20%\] right-\[-10%\] w-\[60%\] h-\[60%\] rounded-full bg-purple-400\/20 dark:bg-purple-600\/20 mix-blend-multiply blur-\[120px\] pointer-events-none animate-pulse duration-\[7000ms\]" \/>/g, `<div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-purple-400/30 to-fuchsia-500/20 dark:from-purple-600/30 dark:to-fuchsia-600/20 mix-blend-multiply blur-[120px] pointer-events-none animate-pulse duration-[7000ms]" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-400/10 dark:bg-emerald-500/10 mix-blend-multiply blur-[100px] pointer-events-none" />
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mask-image-radial-gradient"></div>
`);

fs.writeFileSync('src/Auth.tsx', content);
