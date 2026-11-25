const sharp = require('sharp');
const fs = require('fs');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  const portraitSize = 500;
  const portraitRadius = portraitSize / 2;

  // Mask portrait as a circle
  const circleMask = Buffer.from(`
    <svg width="${portraitSize}" height="${portraitSize}">
      <circle cx="${portraitRadius}" cy="${portraitRadius}" r="${portraitRadius}" fill="white"/>
    </svg>
  `);

  const resizedPortrait = await sharp('public/images/ashraf-turdialiyev-studio.png')
    .resize(portraitSize, portraitSize)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .toBuffer();

  // SVG overlay
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGradient" cx="75%" cy="50%" r="80%">
          <stop offset="0%" stop-color="#18233C" />
          <stop offset="45%" stop-color="#0F172A" />
          <stop offset="100%" stop-color="#070B14" />
        </radialGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.35" />
          <stop offset="60%" stop-color="#B99A5B" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="50%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#B48628" />
        </linearGradient>
        <linearGradient id="borderGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="100%" stop-color="#927220" />
        </linearGradient>
      </defs>

      <rect width="${width}" height="${height}" fill="url(#bgGradient)" />

      <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="url(#borderGold)" stroke-width="1.5" stroke-opacity="0.4" />

      <circle cx="910" cy="315" r="310" fill="url(#goldGlow)" />
      <circle cx="910" cy="315" r="258" fill="none" stroke="url(#borderGold)" stroke-width="4" />
      <circle cx="910" cy="315" r="264" fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="6 6" stroke-opacity="0.6" />

      <g transform="translate(80, 85)">
        <rect width="340" height="38" rx="19" fill="rgba(212, 175, 55, 0.12)" stroke="#D4AF37" stroke-width="1.2" />
        <circle cx="22" cy="19" r="5" fill="#10B981" />
        <text x="38" y="24" fill="#E2E8F0" font-family="Arial, sans-serif" font-size="14" font-weight="bold" letter-spacing="1.5">OFFICIAL PERSONAL PLATFORM</text>
      </g>

      <text x="80" y="215" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="56" font-weight="800" letter-spacing="-0.5">Ashraf Turdialiyev</text>
      <text x="80" y="270" fill="url(#goldText)" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="0.5">Global Explorer &amp; Academic Scholar</text>

      <line x1="80" y1="310" x2="320" y2="310" stroke="url(#borderGold)" stroke-width="2" />

      <g transform="translate(80, 360)">
        <text x="0" y="0" fill="#CBD5E1" font-family="Arial, sans-serif" font-size="20" font-weight="400">&#x2726; 3D Interactive Earth Globe &amp; Expeditions</text>
        <text x="0" y="38" fill="#CBD5E1" font-family="Arial, sans-serif" font-size="20" font-weight="400">&#x2726; Scholarly Research &amp; Academic Publications</text>
        <text x="0" y="76" fill="#CBD5E1" font-family="Arial, sans-serif" font-size="20" font-weight="400">&#x2726; International Diplomatic &amp; Leadership Forums</text>
      </g>

      <g transform="translate(80, 500)">
        <rect width="320" height="48" rx="12" fill="rgba(15, 23, 42, 0.8)" stroke="url(#borderGold)" stroke-width="1.5" />
        <text x="24" y="31" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="20" font-weight="bold" letter-spacing="0.5">&#x1F310; ashrafturdialiyev.uz</text>
      </g>
    </svg>
  `);

  await sharp(svgOverlay)
    .composite([
      {
        input: resizedPortrait,
        top: 65,
        left: 660
      }
    ])
    .jpeg({ quality: 92 })
    .toFile('public/images/og-image.jpg');

  fs.copyFileSync('public/images/og-image.jpg', 'public/og-image.jpg');
  console.log('SUCCESS');
}

createOgImage().catch(console.error);
