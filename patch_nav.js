import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/import Docs from '\.\/views\/Docs';\n/g, '');
app = app.replace(/      case 'docs': return <Docs \/>;\n/g, '');
fs.writeFileSync('src/App.tsx', app);

let layout = fs.readFileSync('src/Layout.tsx', 'utf8');
layout = layout.replace(/    \{ id: 'docs', label: 'API Documentation', icon: BookOpen \},\n/g, '');
layout = layout.replace(/    \{ id: 'legal', label: 'Legal & Info', icon: FileText \},\n/g, `    { id: 'legal', label: 'User Manual', icon: BookOpen },\n`);
fs.writeFileSync('src/Layout.tsx', layout);
