import fs from 'fs';

let content = fs.readFileSync('src/views/Security.tsx', 'utf8');

const search = `      wrapper.appendChild(p);
    });
        
    wrapper.style.position = 'absolute';`;

const replace = `      wrapper.appendChild(p);
    });

    const footer = document.createElement('div');
    footer.style.marginTop = '50px';
    footer.style.paddingTop = '20px';
    footer.style.borderTop = '1px solid #eee';
    footer.style.fontSize = '12px';
    footer.style.color = '#777';
    footer.innerHTML = "Proudly developed in India, made for Bharat.<br/>Developed by Veda Labs | Divy Patel";
    wrapper.appendChild(footer);
        
    wrapper.style.position = 'absolute';`;

content = content.replace(search, replace);
fs.writeFileSync('src/views/Security.tsx', content);
