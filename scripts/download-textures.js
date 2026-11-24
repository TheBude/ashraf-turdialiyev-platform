const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'textures');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const textures = [
  {
    name: 'earth_daymap.jpg',
    url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
  },
  {
    name: 'earth_specular.jpg',
    url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'
  },
  {
    name: 'earth_normal.jpg',
    url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
  },
  {
    name: 'earth_clouds.png',
    url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  },
  {
    name: 'earth_nightmap.jpg',
    url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Status ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading Earth textures to', targetDir);
  for (const t of textures) {
    const dest = path.join(targetDir, t.name);
    try {
      console.log(`Downloading ${t.name}...`);
      await download(t.url, dest);
      const stat = fs.statSync(dest);
      console.log(`Downloaded ${t.name} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.warn(`Could not download ${t.name}:`, err.message);
    }
  }
}

main();
