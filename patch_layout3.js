import fs from 'fs';

let content = fs.readFileSync('src/Layout.tsx', 'utf8');

if (!content.includes("{ id: 'docs', label: 'Documentation'")) {
  content = content.replace(
    "{ id: 'legal', label: 'User Manual', icon: BookOpen },",
    "{ id: 'legal', label: 'User Manual', icon: BookOpen },\n    { id: 'docs', label: 'Documentation', icon: FileText },"
  );
}

// Since I used FileText twice, let me change icon for docs to BookOpen and legal to something else? 
// No, I'll just use BookOpen for Documentation, and something else for User Manual, wait, I can just import FileCode or something.
if (!content.includes("FileCode")) {
    content = content.replace("BookOpen", "BookOpen, FileCode");
    content = content.replace(
      "{ id: 'docs', label: 'Documentation', icon: FileText }", 
      "{ id: 'docs', label: 'Documentation', icon: FileCode }"
    );
}

fs.writeFileSync('src/Layout.tsx', content);
