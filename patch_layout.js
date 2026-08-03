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

const replace = `          <div className="max-w-6xl mx-auto w-full">
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

content = content.replace(search, replace);
fs.writeFileSync('src/Layout.tsx', content);
