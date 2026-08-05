const fs = require('fs');
let about = fs.readFileSync('src/components/About.tsx', 'utf8');

// Remove the newly added div
about = about.replace(/<div className="mb-8 rounded-3xl overflow-hidden shadow-lg border border-brand-beige\/50">[\s\S]*?<\/div>\s*/, '');

// Update the main image src
about = about.replace(/src="\/IMG_8192\.JPG\.jpeg"/, 'src="https://res.cloudinary.com/de7gefkxl/image/upload/v1783361980/IMG_8192.JPG_gmr2zc.jpg"');

fs.writeFileSync('src/components/About.tsx', about);
console.log('About updated and fixed');
