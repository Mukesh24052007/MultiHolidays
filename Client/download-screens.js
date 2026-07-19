const fs = require('fs');
const https = require('https');
const path = require('path');

const screens = [
  { name: 'profile-desktop', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NmYwOGEwNDExZTUwOTI1ZDQ4YTFhMmIxMWFjEgsSBxCz8PTKoQgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDYyMjc2NjYzNDAzNDg1MTYzNg&filename=&opi=89354086' },
  { name: 'profile-mobile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NmYwOWFkZTc2NWMwOTI1Yzc2YzE5MDhiMmZjEgsSBxCz8PTKoQgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDYyMjc2NjYzNDAzNDg1MTYzNg&filename=&opi=89354086' },
  { name: 'login-desktop', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NmYwOGEzOTY2YWYwMmQzYzZhNDIyMjY5YjIxEgsSBxCz8PTKoQgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDYyMjc2NjYzNDAzNDg1MTYzNg&filename=&opi=89354086' },
  { name: 'login-mobile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NmYwOWE3NGFhOGQwNDczNTg5MDdlMDcxYzVjEgsSBxCz8PTKoQgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDYyMjc2NjYzNDAzNDg1MTYzNg&filename=&opi=89354086' },
  { name: 'dashboard-desktop', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NmYwOGEyODM3M2QwMzM4NTkxNzEzMDAwMmU0EgsSBxCz8PTKoQgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDYyMjc2NjYzNDAzNDg1MTYzNg&filename=&opi=89354086' },
  { name: 'dashboard-mobile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NmYwOWI4YjAyYjkwOTI1ZDM0YmQ0MmQzOTc0EgsSBxCz8PTKoQgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDYyMjc2NjYzNDAzNDg1MTYzNg&filename=&opi=89354086' },
  { name: 'calendar-desktop', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NmYwOGFhMGU3YTIwMzkyY2E3NTIxMDg0ZWQ3EgsSBxCz8PTKoQgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDYyMjc2NjYzNDAzNDg1MTYzNg&filename=&opi=89354086' },
  { name: 'calendar-mobile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NmYwOWIyZTFiZmIwMzM4NWI4OTcyMGIxNGI5EgsSBxCz8PTKoQgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDYyMjc2NjYzNDAzNDg1MTYzNg&filename=&opi=89354086' }
];

const dir = path.join(__dirname, 'html-screens');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

screens.forEach(screen => {
  const file = fs.createWriteStream(path.join(dir, `${screen.name}.html`));
  https.get(screen.url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      console.log(`Downloaded ${screen.name}`);
    });
  });
});
