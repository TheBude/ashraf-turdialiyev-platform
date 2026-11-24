/**
 * Phase 2 Automated API Test Suite
 * Tests all authentication, authorization, and CRUD endpoints against real local server.
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function runTests() {
  console.log(`\n=== Starting Phase 2 Backend API Verification at ${BASE_URL} ===\n`);
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Test Login with Invalid Credentials
    console.log('--- Test 1: Invalid Login Rejection ---');
    const badLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ashrafturdialiyev.com', password: 'WrongPassword!' }),
    });
    assert(badLoginRes.status === 401, 'Invalid credentials returns 401 Unauthorized');

    // 2. Test Login with Valid Credentials
    console.log('\n--- Test 2: Valid Admin Authentication ---');
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@ashrafturdialiyev.com',
        password: 'AshrafAdmin2026!Secure',
      }),
    });
    assert(loginRes.status === 200, 'Valid login returns 200 OK');
    const loginData = await loginRes.json();
    assert(loginData.success === true && loginData.user.email === 'admin@ashrafturdialiyev.com', 'User profile returned in login response');

    // Extract auth cookie
    const setCookie = loginRes.headers.get('set-cookie');
    assert(Boolean(setCookie && setCookie.includes('ashraf_admin_token')), 'HTTP-only auth cookie received');
    const cookieHeader = setCookie ? setCookie.split(';')[0] : '';

    // 3. Test Protected Endpoint without Auth
    console.log('\n--- Test 3: Protected Route Rejection without Auth ---');
    const unauthRes = await fetch(`${BASE_URL}/api/destinations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Unauthorized Test', country: 'Test', countryCode: 'TT', description: 'Test' }),
    });
    assert(unauthRes.status === 401, 'Mutation without auth token rejected with 401');

    // 4. Test /api/auth/me
    console.log('\n--- Test 4: Verify Session via /api/auth/me ---');
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: cookieHeader },
    });
    assert(meRes.status === 200, '/api/auth/me with cookie returns 200 OK');
    const meData = await meRes.json();
    assert(meData.authenticated === true && meData.user.name === 'Ashraf Turdialiyev', 'Session verifies admin identity');

    // 5. Test Destinations CRUD
    console.log('\n--- Test 5: Destinations CRUD ---');
    const newDestRes = await fetch(`${BASE_URL}/api/destinations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        title: 'Bukhara Ancient Citadel Expedition',
        titleUz: "Buxoro Ark qadimiy qal'asi ekspeditsiyasi",
        titleRu: 'Экспедиция к древней цитадели Арк в Бухаре',
        titleTr: 'Buhara Antik Ark Kalesi Keşfi',
        country: 'Uzbekistan',
        countryCode: 'UZ',
        city: 'Bukhara',
        coordinates: '39.7758,64.4132',
        description: 'Exploring Islamic golden age architecture and ancient desert trade caravans.',
        photos: ['https://images.unsplash.com/photo-1596484552829-9e8c07c29377'],
        status: 'PUBLISHED',
        featured: true,
      }),
    });
    assert(newDestRes.status === 201, 'Create Destination returns 201 Created');
    const newDest = await newDestRes.json();
    const destId = newDest.id;
    assert(Boolean(destId), `Created Destination ID: ${destId}`);

    // Update Destination
    const updateDestRes = await fetch(`${BASE_URL}/api/destinations/${destId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({ title: 'Bukhara Ancient Citadel Expedition (Updated)' }),
    });
    assert(updateDestRes.status === 200, 'Update Destination returns 200 OK');
    const updatedDest = await updateDestRes.json();
    assert(updatedDest.title.includes('(Updated)'), 'Destination title updated successfully');

    // 6. Test Visited Country for Interactive Map
    console.log('\n--- Test 6: World Map Country CRUD ---');
    const newCountryRes = await fetch(`${BASE_URL}/api/countries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        isoCode: 'AZ',
        countryName: 'Azerbaijan',
        countryNameUz: 'Ozarbayjon',
        countryNameRu: 'Азербайджан',
        countryNameTr: 'Azerbaycan',
        visitedYear: 2023,
        notes: 'Baku Caspian energy corridor and Silk Road historical center.',
        flag: '🇦🇿',
        coordinates: '40.4093,49.8671',
      }),
    });
    assert(newCountryRes.status === 201, 'Add Country to map returns 201 Created');
    const newCountry = await newCountryRes.json();
    const countryId = newCountry.id;

    // 7. Test Timeline Event CRUD
    console.log('\n--- Test 7: Timeline Event CRUD ---');
    const newTimelineRes = await fetch(`${BASE_URL}/api/timeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        year: 2025,
        date: 'Winter 2025',
        title: 'Central Eurasia Sustainable Transport Summit',
        category: 'ACHIEVEMENT',
        description: 'Chaired the international session on regional infrastructure resilience.',
        location: 'Tashkent, Uzbekistan',
      }),
    });
    assert(newTimelineRes.status === 201, 'Create Timeline Event returns 201 Created');
    const newTimeline = await newTimelineRes.json();
    const timelineId = newTimeline.id;

    // 8. Test Certificate CRUD
    console.log('\n--- Test 8: Certificate Vault CRUD ---');
    const newCertRes = await fetch(`${BASE_URL}/api/certificates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        title: 'Master of International Environmental Law and Governance',
        issuer: 'The Hague Academy of International Law',
        imageUrl: 'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b',
        category: 'ACADEMIC',
      }),
    });
    assert(newCertRes.status === 201, 'Create Certificate returns 201 Created');
    const newCert = await newCertRes.json();
    const certId = newCert.id;

    // 9. Test Publication CRUD
    console.log('\n--- Test 9: Scientific Publication CRUD ---');
    const newPubRes = await fetch(`${BASE_URL}/api/publications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        title: 'Renewable Power Integration across the Trans-Caspian Corridor',
        authors: 'Ashraf Turdialiyev',
        journal: 'Global Energy Transition Quarterly, Vol. 8',
        year: 2025,
        abstract: 'Assessing cross-border solar and wind transmission interconnectors between Central Asia and the South Caucasus.',
        tags: ['Energy', 'Sustainability', 'Caucasus'],
      }),
    });
    assert(newPubRes.status === 201, 'Create Publication returns 201 Created');
    const newPub = await newPubRes.json();
    const pubId = newPub.id;

    // 10. Test Audience Stats Telemetry Update
    console.log('\n--- Test 10: Audience Counter Telemetry ---');
    const updateAudienceRes = await fetch(`${BASE_URL}/api/audience`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        stats: [
          { key: 'countries_visited', value: 43 },
          { key: 'global_audience', value: 395000, isSimulated: true, incrementRate: 0.3 },
        ],
      }),
    });
    assert(updateAudienceRes.status === 200, 'Update Audience Telemetry returns 200 OK');

    // 11. Test Public Contact Submission
    console.log('\n--- Test 11: Public Contact Submission & Admin Inbox ---');
    const contactRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Dr. Marcus Vance',
        email: 'vance@cambridge-institute.org',
        subject: 'Keynote Invitation: International Silk Road Forum 2026',
        message: 'Dear Ashraf, We would be honored to invite you as keynote speaker at our annual symposium.',
      }),
    });
    assert(contactRes.status === 201, 'Public contact submission returns 201 Created');
    const contactData = await contactRes.json();
    const messageId = contactData.id;

    // Admin fetch inbox
    const inboxRes = await fetch(`${BASE_URL}/api/contact`, {
      headers: { Cookie: cookieHeader },
    });
    assert(inboxRes.status === 200, 'Admin can fetch inbox messages (200 OK)');
    const messages = await inboxRes.json();
    const receivedMsg = messages.find((m) => m.id === messageId);
    assert(Boolean(receivedMsg && receivedMsg.name === 'Dr. Marcus Vance'), 'New message appears in admin inbox');

    // Mark as read
    const markReadRes = await fetch(`${BASE_URL}/api/contact/${messageId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({ isRead: true }),
    });
    assert(markReadRes.status === 200, 'Admin mark as read returns 200 OK');

    // 12. Cleanup created test items
    console.log('\n--- Test 12: Cleanup Test Records ---');
    const delDest = await fetch(`${BASE_URL}/api/destinations/${destId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    assert(delDest.status === 200, 'Delete test Destination returns 200 OK');

    const delCountry = await fetch(`${BASE_URL}/api/countries/${countryId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    assert(delCountry.status === 200, 'Delete test Country returns 200 OK');

    const delTimeline = await fetch(`${BASE_URL}/api/timeline/${timelineId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    assert(delTimeline.status === 200, 'Delete test Timeline Event returns 200 OK');

    const delCert = await fetch(`${BASE_URL}/api/certificates/${certId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    assert(delCert.status === 200, 'Delete test Certificate returns 200 OK');

    const delPub = await fetch(`${BASE_URL}/api/publications/${pubId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    assert(delPub.status === 200, 'Delete test Publication returns 200 OK');

    const delMsg = await fetch(`${BASE_URL}/api/contact/${messageId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    assert(delMsg.status === 200, 'Delete test Contact message returns 200 OK');

    // 13. Test Logout
    console.log('\n--- Test 13: Admin Logout ---');
    const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: cookieHeader },
    });
    assert(logoutRes.status === 200, 'Logout returns 200 OK');

    console.log(`\n========================================`);
    console.log(`Phase 2 Test Summary: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTests();
