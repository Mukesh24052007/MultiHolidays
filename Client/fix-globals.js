const fs = require('fs');
let content = fs.readFileSync('src/app/globals.css', 'utf8');
const imports = `@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');\n\n`;
const styles = `\n.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
body { background-color: var(--color-background); font-family: var(--font-body-md); }
.active-nav-transition { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n`;
content = imports + content + styles;
fs.writeFileSync('src/app/globals.css', content);
