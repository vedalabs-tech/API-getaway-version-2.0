const fs = require('fs');

const code = `import { useState } from 'react';
import { Book, Download, Loader2, Languages } from 'lucide-react';
import logoImage from '../../logo.png';
import html2pdf from 'html2pdf.js';

export default function Legal() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    
    const wrapper = document.createElement('div');
    wrapper.style.padding = '40px';
    wrapper.style.color = '#111';
    wrapper.style.backgroundColor = '#fff';
    wrapper.style.fontFamily = 'sans-serif';
    
    const logoImg = document.createElement('img');
    logoImg.src = logoImage;
    logoImg.style.height = '40px';
    logoImg.style.marginBottom = '30px';
    wrapper.appendChild(logoImg);
    
    const title = document.createElement('h1');
    title.innerText = lang === 'en' ? 'User Manual' : 'उपयोगकर्ता मैनुअल';
    title.style.fontSize = '24px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    wrapper.appendChild(title);
    
    const subtitle = document.createElement('p');
    subtitle.innerText = 'Veda Labs API Gateway';
    subtitle.style.fontSize = '14px';
    subtitle.style.color = '#555';
    subtitle.style.marginBottom = '30px';
    wrapper.appendChild(subtitle);
    
    const content = lang === 'en' ? [
      { t: '1. Dashboard Overview', d: 'Monitor your API health, incoming requests, and token usage in real-time. Use the dashboard to get a high-level view of your system.' },
      { t: '2. Security & Keys', d: 'Manage your API keys safely. Never share them in public repositories. You can regenerate or suspend your keys if they are compromised.' },
      { t: '3. Rate Limits', d: 'Check your API quotas and limits to ensure your applications run smoothly without hitting rate limit errors (429).' },
      { t: '4. Analytics & Logs', d: 'View detailed logs of your API calls, including timestamps, token consumption, and status codes to debug issues quickly.' }
    ] : [
      { t: '1. डैशबोर्ड अवलोकन', d: 'वास्तविक समय में अपने API स्वास्थ्य, आने वाले अनुरोधों और टोकन उपयोग की निगरानी करें। अपने सिस्टम का उच्च-स्तरीय दृश्य प्राप्त करने के लिए डैशबोर्ड का उपयोग करें।' },
      { t: '2. सुरक्षा और कुंजियाँ', d: 'अपनी API कुंजियों को सुरक्षित रूप से प्रबंधित करें। उन्हें कभी भी सार्वजनिक रिपॉजिटरी में साझा न करें। यदि वे समझौता किए जाते हैं तो आप अपनी कुंजियों को फिर से बना सकते हैं या निलंबित कर सकते हैं।' },
      { t: '3. दर सीमाएँ', d: 'यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन दर सीमा त्रुटियों (429) को हिट किए बिना सुचारू रूप से चलते हैं, अपने API कोटा और सीमाओं की जांच करें।' },
      { t: '4. एनालिटिक्स और लॉग', d: 'समस्याओं को जल्दी से डिबग करने के लिए अपने API कॉल के विस्तृत लॉग देखें, जिनमें टाइमस्टैम्प, टोकन खपत और स्थिति कोड शामिल हैं।' }
    ];
    
    content.forEach(item => {
      const h = document.createElement('h2');
      h.innerText = item.t;
      h.style.fontSize = '16px';
      h.style.fontWeight = 'bold';
      h.style.marginTop = '20px';
      h.style.marginBottom = '8px';
      wrapper.appendChild(h);
      
      const p = document.createElement('p');
      p.innerText = item.d;
      p.style.fontSize = '14px';
      p.style.lineHeight = '1.6';
      p.style.marginBottom = '16px';
      wrapper.appendChild(p);
    });

    const footer = document.createElement('div');
    footer.style.marginTop = '50px';
    footer.style.paddingTop = '20px';
    footer.style.borderTop = '1px solid #eee';
    footer.style.fontSize = '12px';
    footer.style.color = '#777';
    footer.innerHTML = \`Proudly developed in India, made for Bharat.<br/>Developed by Veda Labs | Divy Patel\`;
    wrapper.appendChild(footer);
    
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '800px';
    document.body.appendChild(wrapper);
    
    const opt = {
      margin:       15,
      filename:     \`User_Manual_\${lang}.pdf\`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, windowWidth: 800 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(wrapper).save().then(() => {
        document.body.removeChild(wrapper);
        setIsDownloading(false);
    }).catch(() => {
        document.body.removeChild(wrapper);
        setIsDownloading(false);
    });
  };

  const currentContent = lang === 'en' ? [
      { t: '1. Dashboard Overview', d: 'Monitor your API health, incoming requests, and token usage in real-time. Use the dashboard to get a high-level view of your system.' },
      { t: '2. Security & Keys', d: 'Manage your API keys safely. Never share them in public repositories. You can regenerate or suspend your keys if they are compromised.' },
      { t: '3. Rate Limits', d: 'Check your API quotas and limits to ensure your applications run smoothly without hitting rate limit errors (429).' },
      { t: '4. Analytics & Logs', d: 'View detailed logs of your API calls, including timestamps, token consumption, and status codes to debug issues quickly.' }
  ] : [
      { t: '1. डैशबोर्ड अवलोकन', d: 'वास्तविक समय में अपने API स्वास्थ्य, आने वाले अनुरोधों और टोकन उपयोग की निगरानी करें। अपने सिस्टम का उच्च-स्तरीय दृश्य प्राप्त करने के लिए डैशबोर्ड का उपयोग करें।' },
      { t: '2. सुरक्षा और कुंजियाँ', d: 'अपनी API कुंजियों को सुरक्षित रूप से प्रबंधित करें। उन्हें कभी भी सार्वजनिक रिपॉजिटरी में साझा न करें। यदि वे समझौता किए जाते हैं तो आप अपनी कुंजियों को फिर से बना सकते हैं या निलंबित कर सकते हैं।' },
      { t: '3. दर सीमाएँ', d: 'यह सुनिश्चित करने के लिए कि आपके एप्लिकेशन दर सीमा त्रुटियों (429) को हिट किए बिना सुचारू रूप से चलते हैं, अपने API कोटा और सीमाओं की जांच करें।' },
      { t: '4. एनालिटिक्स और लॉग', d: 'समस्याओं को जल्दी से डिबग करने के लिए अपने API कॉल के विस्तृत लॉग देखें, जिनमें टाइमस्टैम्प, टोकन खपत और स्थिति कोड शामिल हैं।' }
  ];

  return (
    <div className="animate-in fade-in duration-500 min-h-[70vh]">
      <div className="bg-white dark:bg-[#111216] p-6 sm:p-10 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
              <Book size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">
                {lang === 'en' ? 'User Manual' : 'उपयोगकर्ता मैनुअल'}
              </h2>
              <p className="text-gray-500 text-sm mt-1 m-0">Veda Labs Gateway</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors outline-none focus:ring-0"
            >
              <Languages size={16} />
              {lang === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors outline-none focus:ring-0 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {lang === 'en' ? 'Download PDF' : 'पीडीएफ डाउनलोड करें'}
            </button>
          </div>
        </div>

        <div className="space-y-8 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {currentContent.map((item, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-[#16181d] border border-gray-100 dark:border-gray-800 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mb-2">
                {item.t}
              </h3>
              <p>{item.d}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400">
           Proudly developed in India, made for Bharat.<br/>
           Developed by Veda Labs | Divy Patel
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/views/Legal.tsx', code);
