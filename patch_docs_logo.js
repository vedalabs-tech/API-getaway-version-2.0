import fs from 'fs';

let content = fs.readFileSync('src/views/ApiDocs.tsx', 'utf8');
content = content.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport logoImage from '../../logo.png';");
// Wait, the path from src/views/ApiDocs.tsx to root is ../../logo.png
content = content.replace('<img src="/logo.png"', '<img src={logoImage}');
fs.writeFileSync('src/views/ApiDocs.tsx', content);
