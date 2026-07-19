const fs = require('fs');

const configStr = fs.readFileSync('html-screens/profile-desktop.html', 'utf8');
const match = configStr.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*<\/script>/);

if (match) {
  // Use Function to safely evaluate the object string since it's JS, not strict JSON
  const getConfig = new Function(`return ${match[1]}`);
  const config = getConfig();
  
  const extend = config.theme.extend;
  
  let css = '\n@theme {\n';
  
  for (const [key, val] of Object.entries(extend.colors)) {
    css += `  --color-${key}: ${val};\n`;
  }
  
  for (const [key, val] of Object.entries(extend.borderRadius)) {
    const suffix = key === 'DEFAULT' ? '' : `-${key}`;
    css += `  --radius${suffix}: ${val};\n`;
  }
  
  for (const [key, val] of Object.entries(extend.spacing)) {
    css += `  --spacing-${key}: ${val};\n`;
  }
  
  for (const [key, val] of Object.entries(extend.fontFamily)) {
    // val is an array like ['Inter']
    css += `  --font-${key}: '${val[0]}', sans-serif;\n`;
  }
  
  for (const [key, val] of Object.entries(extend.fontSize)) {
    // val is like ['14px', { lineHeight: '20px', ... }]
    css += `  --text-${key}: ${val[0]};\n`;
    css += `  --text-${key}--line-height: ${val[1].lineHeight};\n`;
    if (val[1].letterSpacing) css += `  --text-${key}--letter-spacing: ${val[1].letterSpacing};\n`;
    if (val[1].fontWeight) css += `  --text-${key}--font-weight: ${val[1].fontWeight};\n`;
  }
  
  css += '}\n';
  
  fs.appendFileSync('src/app/globals.css', css);
  console.log('Appended to globals.css');
} else {
  console.log('No tailwind config found');
}
