import fs from 'fs';

let content = fs.readFileSync('src/Layout.tsx', 'utf8');

const search = `          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}`;

const search2 = `          <div className="max-w-6xl mx-auto w-full">
            {children}
            <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500 pb-8">
              Proudly developed in India, made for Bharat.<br/>
              Developed by Veda Labs | Divy Patel
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}`;

const replace = `          <div className="max-w-6xl mx-auto w-full">
            {children}
            <div className="mt-16 mb-8 text-center flex flex-col items-center">
               <div className="px-6 py-3 bg-white/60 dark:bg-[#111216]/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm inline-block transition-transform hover:scale-[1.02]">
                 <p className="text-sm font-bold bg-gradient-to-r from-orange-500 via-gray-600 to-green-600 dark:from-orange-400 dark:via-gray-400 dark:to-green-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
                   Proudly developed in India, made for Bharat <span className="text-lg" role="img" aria-label="India">🇮🇳</span>
                 </p>
                 <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                   Developed by Veda Labs | Divy Patel
                 </p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}`;

if (content.includes(search)) {
    content = content.replace(search, replace);
} else if (content.includes(search2)) {
    content = content.replace(search2, replace);
}

fs.writeFileSync('src/Layout.tsx', content);
