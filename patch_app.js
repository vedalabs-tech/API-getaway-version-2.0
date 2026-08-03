import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes("import ApiDocs from './views/ApiDocs';")) {
  content = content.replace(
    "import Legal from './views/Legal';",
    "import Legal from './views/Legal';\nimport ApiDocs from './views/ApiDocs';"
  );
}

if (!content.includes("case 'docs': return <ApiDocs />;")) {
  content = content.replace(
    "case 'legal': return <Legal />;",
    "case 'legal': return <Legal />;\n      case 'docs': return <ApiDocs />;"
  );
}

fs.writeFileSync('src/App.tsx', content);
