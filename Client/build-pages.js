const fs = require('fs');
const path = require('path');

const screens = [
  { name: 'login', mobile: 'login-mobile', desktop: 'login-desktop', route: 'src/app/page.tsx' },
  { name: 'dashboard', mobile: 'dashboard-mobile', desktop: 'dashboard-desktop', route: 'src/app/dashboard/page.tsx' },
  { name: 'profile', mobile: 'profile-mobile', desktop: 'profile-desktop', route: 'src/app/profile/page.tsx' },
  { name: 'calendar', mobile: 'calendar-mobile', desktop: 'calendar-desktop', route: 'src/app/leave-calendar/page.tsx' }
];

function extractBody(htmlStr) {
  const bodyMatch = htmlStr.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let content = bodyMatch[1];
  
  // Remove script tags from body
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  return content;
}

function processHtmlToJsx(html) {
  let jsx = html;
  
  // Remove HTML comments
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
  
  // Convert class= to className=
  jsx = jsx.replace(/class=/g, 'className=');
  
  // Strip dark: classes to prevent dark mode leakage when user's browser is in dark mode
  jsx = jsx.replace(/\bdark:[^\s"]+/g, '');
  
  // Replace conflicting Tailwind v4 max-w spacing overrides
  jsx = jsx.replace(/\bmax-w-sm\b/g, 'max-w-[384px]');
  jsx = jsx.replace(/\bmax-w-md\b/g, 'max-w-[448px]');
  jsx = jsx.replace(/\bmax-w-lg\b/g, 'max-w-[512px]');
  jsx = jsx.replace(/\bmax-w-xl\b/g, 'max-w-[576px]');
  
  // Make inputs and buttons slimmer and more professional
  jsx = jsx.replace(/(<(input|button)[^>]*className="[^"]*)\bpy-md\b/g, '$1py-3');
  jsx = jsx.replace(/(<(input|button)[^>]*className="[^"]*)\bpy-sm\b/g, '$1py-2.5');
  
  // Fix boolean attributes
  jsx = jsx.replace(/required=""/g, 'required');
  jsx = jsx.replace(/disabled=""/g, 'disabled');
  jsx = jsx.replace(/checked=""/g, 'defaultChecked');
  
  // Remove onclick attributes
  jsx = jsx.replace(/onclick="[^"]*"/g, '');
  
  // Convert for= to htmlFor=
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  
  // Convert SVG and common HTML attributes to camelCase
  const attributesToCamelCase = [
    'tabindex', 'autocomplete', 'readonly', 'maxlength', 'minlength',
    'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
    'clip-rule', 'fill-rule', 'stroke-miterlimit', 'clip-path', 'fill-opacity',
    'stroke-opacity', 'stop-color', 'stop-opacity', 'viewbox', 'xmlns:xlink'
  ];

  attributesToCamelCase.forEach(attr => {
    // Generate camelCase version of the attribute
    const camelCaseAttr = attr.replace(/[-:]+([a-z])/g, (g) => g[g.length - 1].toUpperCase());
    // Create a regular expression for the attribute (case insensitive for cases like viewBox)
    const regex = new RegExp(`\\b${attr.replace(/:/g, '\\\\:')}=`, 'gi');
    jsx = jsx.replace(regex, `${camelCaseAttr}=`);
  });

  // Make sure viewBox is specifically handled if it's already camelCased in HTML but we just want to ensure it's correct
  jsx = jsx.replace(/viewbox=/gi, 'viewBox=');
  
  // Convert style="..." to style={{...}}
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
    const styles = styleStr.split(';').filter(s => s.trim() !== '');
    const styleObj = {};
    styles.forEach(s => {
      let [key, val] = s.split(':');
      if (key && val) {
        key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        val = val.trim().replace(/'/g, '"');
        styleObj[key] = val;
      }
    });
    
    const objStr = Object.entries(styleObj).map(([k, v]) => `${k}: '${v}'`).join(', ');
    return `style={{ ${objStr} }}`;
  });
  
  // Close void tags: img, input, br, hr
  jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?:\/?)>/g, '<$1$2 />');
  
  // Fix multiple slashes in void tags just in case
  jsx = jsx.replace(/ \/\s*\/>/g, ' />');
  
  // Wrap with <> ... </>
  return `<>\n${jsx}\n</>`;
}

function extractBodyClass(htmlStr) {
  const bodyMatch = htmlStr.match(/<body([^>]*)>/i);
  if (!bodyMatch) return '';
  const classMatch = bodyMatch[1].match(/class="([^"]*)"/i);
  return classMatch ? classMatch[1] : '';
}

function extractStyles(htmlStr) {
  const styleMatches = htmlStr.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  if (!styleMatches) return '';
  return styleMatches.map(match => {
    return match.replace(/<\/?style[^>]*>/gi, '');
  }).join('\n');
}

screens.forEach(screen => {
  const mobileHtml = fs.readFileSync(path.join('html-screens', `${screen.mobile}.html`), 'utf8');
  const desktopHtml = fs.readFileSync(path.join('html-screens', `${screen.desktop}.html`), 'utf8');
  
  const mobileJsx = processHtmlToJsx(extractBody(mobileHtml));
  const desktopJsx = processHtmlToJsx(extractBody(desktopHtml));
  
  const mobileBodyClass = extractBodyClass(mobileHtml);
  const desktopBodyClass = extractBodyClass(desktopHtml);
  
  const mobileStyles = extractStyles(mobileHtml);
  const desktopStyles = extractStyles(desktopHtml);
  
  const componentName = screen.name.charAt(0).toUpperCase() + screen.name.slice(1);
  
  const pageContent = `
import React from 'react';

export default function ${componentName}Page() {
  return (
    <div className="w-full h-full min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: \`
        ${mobileStyles}
        ${desktopStyles}
      \` }} />
      <div className="block md:hidden">
        <div className="${mobileBodyClass}">
          ${mobileJsx}
        </div>
      </div>
      <div className="hidden md:block">
        <div className="${desktopBodyClass}">
          ${desktopJsx}
        </div>
      </div>
    </div>
  );
}
`;

  // Create directory if doesn't exist
  const dir = path.dirname(screen.route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(screen.route, pageContent);
  console.log(`Generated ${screen.route}`);
});
