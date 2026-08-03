import fs from 'fs';

let content = fs.readFileSync('src/views/ApiDocs.tsx', 'utf8');

// We have curly braces inside the python code that aren't valid JSX.
// Let's replace the whole python block with a properly escaped one.
const oldPython = `headers = {
    <span className="text-[#a5d6ff]">"Authorization"</span>: <span className="text-[#a5d6ff]">"Bearer YOUR_API_KEY"</span>,
    <span className="text-[#a5d6ff]">"Content-Type"</span>: <span className="text-[#a5d6ff]">"application/json"</span>
}

payload = {
    <span className="text-[#a5d6ff]">"model"</span>: <span className="text-[#a5d6ff]">"Vedika-4.1-Flash"</span>,
    <span className="text-[#a5d6ff]">"messages"</span>: [
        {
            <span className="text-[#a5d6ff]">"role"</span>: <span className="text-[#a5d6ff]">"user"</span>,
            <span className="text-[#a5d6ff]">"content"</span>: [
                {<span className="text-[#a5d6ff]">"type"</span>: <span className="text-[#a5d6ff]">"text"</span>, <span className="text-[#a5d6ff]">"text"</span>: <span className="text-[#a5d6ff]">"Calculate the exact dimensions needed for the structure in this blueprint."</span>},
                {<span className="text-[#a5d6ff]">"type"</span>: <span className="text-[#a5d6ff]">"image_url"</span>, <span className="text-[#a5d6ff]">"image_url"</span>: {<span className="text-[#a5d6ff]">"url"</span>: <span className="text-[#a5d6ff]">"https://example.com/blueprint.png"</span>}}
            ]
        }
    ],
    <span className="text-[#a5d6ff]">"enable_thinking"</span>: <span className="text-[#ff7b72]">True</span>, <span className="text-[#8b949e] italic"># Highly recommended for 4.1-Flash</span>
    <span className="text-[#a5d6ff]">"temperature"</span>: <span className="text-[#a5d6ff]">0.3</span>
}`;

const newPython = `headers = {"{"}
    <span className="text-[#a5d6ff]">"Authorization"</span>: <span className="text-[#a5d6ff]">"Bearer YOUR_API_KEY"</span>,
    <span className="text-[#a5d6ff]">"Content-Type"</span>: <span className="text-[#a5d6ff]">"application/json"</span>
{"}"}

payload = {"{"}
    <span className="text-[#a5d6ff]">"model"</span>: <span className="text-[#a5d6ff]">"Vedika-4.1-Flash"</span>,
    <span className="text-[#a5d6ff]">"messages"</span>: [
        {"{"}
            <span className="text-[#a5d6ff]">"role"</span>: <span className="text-[#a5d6ff]">"user"</span>,
            <span className="text-[#a5d6ff]">"content"</span>: [
                {"{"}<span className="text-[#a5d6ff]">"type"</span>: <span className="text-[#a5d6ff]">"text"</span>, <span className="text-[#a5d6ff]">"text"</span>: <span className="text-[#a5d6ff]">"Calculate the exact dimensions needed for the structure in this blueprint."</span>{"}"},
                {"{"}<span className="text-[#a5d6ff]">"type"</span>: <span className="text-[#a5d6ff]">"image_url"</span>, <span className="text-[#a5d6ff]">"image_url"</span>: {"{"}<span className="text-[#a5d6ff]">"url"</span>: <span className="text-[#a5d6ff]">"https://example.com/blueprint.png"</span>{"}"}{"}"}
            ]
        {"}"}
    ],
    <span className="text-[#a5d6ff]">"enable_thinking"</span>: <span className="text-[#ff7b72]">True</span>, <span className="text-[#8b949e] italic"># Highly recommended for 4.1-Flash</span>
    <span className="text-[#a5d6ff]">"temperature"</span>: <span className="text-[#a5d6ff]">0.3</span>
{"}"}`;

content = content.replace(oldPython, newPython);

// Also need to check if we have any other unescaped braces, like the >25% in errors text?
content = content.replace("({'>'}25%)", "(>25%)"); // Wait, > in text needs to be > or {">"}. I already used {'>'} which is fine.

fs.writeFileSync('src/views/ApiDocs.tsx', content);
