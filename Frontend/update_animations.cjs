const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace initial offsets
  content = content.replace(/y:\s*150/g, 'y: "100vh"');
  content = content.replace(/x:\s*-150/g, 'x: "-100vw"');
  content = content.replace(/x:\s*150/g, 'x: "100vw"');
  content = content.replace(/y:\s*20/g, 'y: "100vh"'); // Just in case any are left
  content = content.replace(/y:\s*30/g, 'y: "100vh"');
  content = content.replace(/x:\s*-20/g, 'x: "-100vw"');
  content = content.replace(/x:\s*30/g, 'x: "100vw"');
  content = content.replace(/x:\s*50/g, 'x: "100vw"');

  // Replace transitions for smoothness
  content = content.replace(/transition=\{\{ duration: 0\.[4568](, delay: [^}]+)? \}\}/g, (match, p1) => {
    return `transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1]${p1 || ''} }}`;
  });

  // For transitions that only have delay, e.g., transition={{ delay: 0.1 }}
  content = content.replace(/transition=\{\{ delay: ([^}]+) \}\}/g, 'transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: $1 }}');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
