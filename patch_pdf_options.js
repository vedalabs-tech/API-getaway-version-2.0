import fs from 'fs';

let content = fs.readFileSync('src/views/Legal.tsx', 'utf8');
content = content.replace(
  /image:        \{ type: 'jpeg', quality: 0\.98 \},/g,
  "image:        { type: 'jpeg' as const, quality: 0.98 },"
);
content = content.replace(
  /jsPDF:        \{ unit: 'mm', format: 'a4', orientation: 'portrait' \}/g,
  "jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }"
);
fs.writeFileSync('src/views/Legal.tsx', content);

