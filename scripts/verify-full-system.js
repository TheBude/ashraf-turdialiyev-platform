const http = require('http');

const BASE_URL = 'http://127.0.0.1:3000';
let adminCookie = '';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: {
        ...(options.headers || {}),
      },
    };

    if (options.cookie) {
      reqOptions.headers['Cookie'] = options.cookie;
    }

    if (options.body) {
      if (typeof options.body === 'object') {
        reqOptions.headers['Content-Type'] = 'application/json';
      }
    }

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data,
          json: () => {
            try {
              return JSON.parse(data);
            } catch {
              return null;
            }
          },
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'object' ? JSON.stringify(options.body) : options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('   ASHRAF TURDIALIYEV PLATFORM — END-TO-END AUDIT   ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function assert(desc, fn) {
    try {
      await fn();
      console.log(`  [PASS] ${desc}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${desc} -> ${err.message}`);
      failed++;
    }
  }

  // 1. PUBLIC ROUTES & LOCALIZATION
  console.log('1. Testing Public Localized Pages...');
  const routes = [
    '/uz',
    '/en',
    '/ru',
    '/tr',
    '/uz/about',
    '/uz/travels',
    '/uz/globe',
    '/uz/journey',
    '/uz/research',
    '/uz/certificates',
    '/uz/experience',
    '/uz/audience',
    '/uz/contact',
  ];

  for (const r of routes) {
    await assert(`Route ${r} returns 200 OK`, async () => {
      const res = await request(r);
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!res.data.includes('Ashraf') && !res.data.includes('Turdialiyev')) {
        throw new Error('Missing expected content');
      }
    });
  }

  // 2. PUBLIC API CHECKS
  console.log('\n2. Testing Public REST APIs...');
  await assert('GET /api/globe returns published locations with coordinates', async () => {
    const res = await request('/api/globe');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = res.json();
    if (!Array.isArray(json) || json.length === 0) throw new Error('No globe locations returned');
    const first = json[0];
    if (typeof first.latitude !== 'number' || typeof first.longitude !== 'number') {
      throw new Error('Coordinates missing or invalid type');
    }
  });

  await assert('POST /api/contact submits inquiry form successfully', async () => {
    const res = await request('/api/contact', {
      method: 'POST',
      body: {
        name: 'Verification Bot',
        email: 'verify@ashrafturdialiyev.com',
        subject: 'Academic Collaboration Inquiry',
        message: 'Automated end-to-end verification message transmission.',
      },
    });
    if (res.status !== 200 && res.status !== 201) throw new Error(`Status ${res.status}: ${res.data}`);
    const json = res.json();
    if (!json.success) throw new Error('Response did not indicate success');
  });

  // 3. ADMIN AUTHENTICATION
  console.log('\n3. Testing Admin Security & Authentication...');
  await assert('POST /api/auth/login authenticates admin & sets secure cookie', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      body: {
        email: 'admin@ashrafturdialiyev.com',
        password: 'AshrafAdmin2026!Secure',
      },
    });
    if (res.status !== 200) throw new Error(`Login failed with status ${res.status}`);
    const cookies = res.headers['set-cookie'];
    if (!cookies || cookies.length === 0) throw new Error('No Set-Cookie header returned');
    adminCookie = cookies.map((c) => c.split(';')[0]).join('; ');
  });

  await assert('GET /api/auth/me verifies session with adminCookie', async () => {
    const res = await request('/api/auth/me', { cookie: adminCookie });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = res.json();
    if (json.user?.email !== 'admin@ashrafturdialiyev.com') {
      throw new Error(`Unexpected user: ${JSON.stringify(json)}`);
    }
  });

  // 4. ADMIN GLOBE CRUD WORKFLOW
  console.log('\n4. Testing 3D Globe Visual Coordinates CRUD Workflow...');
  let createdLocationId = '';

  await assert('POST /api/globe creates location with coordinate validation', async () => {
    const payload = {
      title: 'Pik Lenin High-Altitude Expedition',
      titleUz: 'Lenin cho\'qqisi ekspeditsiyasi',
      titleRu: 'Экспедиция на Пик Ленина',
      titleTr: 'Lenin Zirvesi Keşfi',
      country: 'Kyrgyzstan',
      countryCode: 'KGZ',
      city: 'Pamir Mountains',
      latitude: 39.3467,
      longitude: 72.8808,
      visitDate: '2024-07-15T00:00:00.000Z',
      description: 'High altitude alpine acclimatization and crest climb in the Pamirs.',
      category: 'ALPINE',
      coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      photos: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb'],
      status: 'PUBLISHED',
      featured: true,
    };

    const res = await request('/api/globe', {
      method: 'POST',
      cookie: adminCookie,
      body: payload,
    });

    if (res.status !== 200 && res.status !== 201) throw new Error(`Status ${res.status}: ${res.data}`);
    const json = res.json();
    if (!json.id) throw new Error('No location ID returned');
    createdLocationId = json.id;
  });

  await assert('PUT /api/globe/[id] updates location record', async () => {
    const res = await request(`/api/globe/${createdLocationId}`, {
      method: 'PUT',
      cookie: adminCookie,
      body: {
        title: 'Pik Lenin High-Altitude Expedition (Updated)',
        country: 'Kyrgyzstan',
        latitude: 39.3467,
        longitude: 72.8808,
        description: 'Successfully reached Camp 3 at 6,100 meters.',
      },
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.data}`);
    const json = res.json();
    if (json.title !== 'Pik Lenin High-Altitude Expedition (Updated)') {
      throw new Error('Title was not updated');
    }
  });

  await assert('DELETE /api/globe/[id] safely removes location record', async () => {
    const res = await request(`/api/globe/${createdLocationId}`, {
      method: 'DELETE',
      cookie: adminCookie,
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.data}`);
  });

  // 5. ADMIN MEDIA LIBRARY
  console.log('\n5. Testing Admin Media Library APIs...');
  await assert('GET /api/media returns media asset inventory', async () => {
    const res = await request('/api/media', { cookie: adminCookie });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const json = res.json();
    if (!Array.isArray(json)) throw new Error('Expected array of media assets');
  });

  // 6. EXPERIENCE CRUD & SECURITY AUDIT
  console.log('\n6. Testing Experience API & Security Guarding...');
  let createdExpId = '';
  await assert('POST /api/experience creates new appointment with auth', async () => {
    const res = await request('/api/experience', {
      method: 'POST',
      cookie: adminCookie,
      body: {
        period: '2025 — 2026',
        role: 'Visiting Chair in Geopolitics',
        roleUz: 'Geosiyosat bo‘yicha taklif etilgan kafedra mudiri',
        organization: 'International Academy of Science',
        location: 'Geneva, Switzerland',
        description: 'Delivering keynote lectures and steering research colloquiums.',
        type: 'ACADEMIC',
        order: 10,
      },
    });
    if (res.status !== 200 && res.status !== 201) throw new Error(`Status ${res.status}: ${res.data}`);
    const json = res.json();
    if (!json.id) throw new Error('No ID returned');
    createdExpId = json.id;
  });

  await assert('DELETE /api/experience/[id] removes appointment', async () => {
    const res = await request(`/api/experience/${createdExpId}`, {
      method: 'DELETE',
      cookie: adminCookie,
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  await assert('GET /api/settings is protected and rejects unauthenticated request (401)', async () => {
    const res = await request('/api/settings');
    if (res.status !== 401) throw new Error(`Expected 401 Unauthorized, got ${res.status}`);
  });

  // 7. ADMIN MODULAR ROUTES
  console.log('\n7. Testing Admin Modular Management Routes...');
  const adminRoutes = [
    '/admin',
    '/admin/globe',
    '/admin/media',
    '/admin/travels',
    '/admin/experience',
    '/admin/timeline',
    '/admin/research',
    '/admin/certificates',
    '/admin/audience',
    '/admin/messages',
    '/admin/settings',
  ];

  for (const ar of adminRoutes) {
    await assert(`Admin route ${ar} renders with authenticated session`, async () => {
      const res = await request(ar, { cookie: adminCookie });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
    });
  }

  console.log('\n====================================================');
  console.log(`RESULTS: ${passed} PASSED / ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
