const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace("import Auth from './Auth';", "import Auth from './Auth';\nimport Landing from './Landing';");

const stateInsert = `  const [email, setEmail] = useState<string | null>(localStorage.getItem('veda_email'));
  const [name, setName] = useState<string | null>(localStorage.getItem('veda_name'));
  const [showAuth, setShowAuth] = useState(false);`;

code = code.replace("  const [email, setEmail] = useState<string | null>(localStorage.getItem('veda_email'));\n  const [name, setName] = useState<string | null>(localStorage.getItem('veda_name'));", stateInsert);

const authBlock = `  if (!email) {
    if (showAuth) {
      return <Auth onLogin={handleLogin} />;
    }
    return <Landing onStart={() => setShowAuth(true)} />;
  }`;

code = code.replace("  if (!email) {\n    return <Auth onLogin={handleLogin} />;\n  }", authBlock);

fs.writeFileSync('src/App.tsx', code);
