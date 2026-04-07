const fs = require('fs');
const glob = require('glob'); // Note: glob might not be installed, better use native fs recursive or plain list

const files = [
  "c:\\PROJECTS\\WebProject\\vetrina\\src\\components\\ui\\LightboxGallery.tsx",
  "c:\\PROJECTS\\WebProject\\vetrina\\src\\components\\home\\ServicesSection.tsx",
  "c:\\PROJECTS\\WebProject\\vetrina\\src\\components\\home\\ProjectsGrid.tsx",
  "c:\\PROJECTS\\WebProject\\vetrina\\src\\components\\home\\ProcessSection.tsx",
  "c:\\PROJECTS\\WebProject\\vetrina\\src\\components\\home\\HeroSlider.tsx",
  "c:\\PROJECTS\\WebProject\\vetrina\\src\\components\\home\\ContactSection.tsx",
  "c:\\PROJECTS\\WebProject\\vetrina\\src\\components\\home\\ClientsMarquee.tsx",
  "c:\\PROJECTS\\WebProject\\vetrina\\src\\app\\(site)\\projeler\\page.tsx"
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Replace `alt="..."` or `alt={...}` carefully. 
  // We can just match `alt={.*?}` or `alt=".*?"` if they are in SanityImage tags.
  // Actually, something like: `\s+alt=\{[^\}]+\}` or `\s+alt="[^"]+"`
  content = content.replace(/\s+alt=\{[^\}]+\}/g, '');
  content = content.replace(/\s+alt="[^"]+"/g, '');
  
  fs.writeFileSync(file, content);
  console.log('Fixed', file);
}
