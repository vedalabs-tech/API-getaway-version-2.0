import fs from 'fs';

let content = fs.readFileSync('src/Auth.tsx', 'utf8');

content = content.replace(
  /mask-image-radial-gradient/g,
  "[mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
);

fs.writeFileSync('src/Auth.tsx', content);
