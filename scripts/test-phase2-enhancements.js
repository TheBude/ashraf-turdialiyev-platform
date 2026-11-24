/**
 * Test script for Step 2 enhancements (Globe and Media Library APIs)
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function testEnhancements() {
  console.log(`\n=== Testing Step 2 Database & Media System Enhancements at ${BASE_URL} ===\n`);
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Authenticate as admin
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@ashrafturdialiyev.com',
        password: 'AshrafAdmin2026!Secure',
      }),
    });
    const setCookie = loginRes.headers.get('set-cookie');
    const cookieHeader = setCookie ? setCookie.split(';')[0] : '';
    assert(loginRes.status === 200, 'Admin login succeeded');

    // 2. Test GET /api/globe
    const globeListRes = await fetch(`${BASE_URL}/api/globe`);
    assert(globeListRes.status === 200, 'GET /api/globe returns 200 OK');
    const globeLocations = await globeListRes.json();
    assert(Array.isArray(globeLocations) && globeLocations.length >= 8, `Globe locations returned (${globeLocations.length} locations)`);

    // 3. Test Invalid Coordinates validation
    const badCoordRes = await fetch(`${BASE_URL}/api/globe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        title: 'Invalid Coord Test',
        country: 'Test',
        latitude: 120, // invalid: max 90
        longitude: 45,
        description: 'Test',
      }),
    });
    assert(badCoordRes.status === 400, 'Invalid latitude (>90) correctly rejected with 400');

    // 4. Test Valid POST /api/globe
    const createGlobeRes = await fetch(`${BASE_URL}/api/globe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        title: 'Himalayan Ridge Expedition',
        country: 'Nepal',
        countryCode: 'NP',
        city: 'Kathmandu',
        latitude: 27.7172,
        longitude: 85.3240,
        description: 'High-altitude research outpost and acclimatization baseline.',
        category: 'ALPINE',
      }),
    });
    assert(createGlobeRes.status === 201, 'POST /api/globe creates location with 201 Created');
    const createdLocation = await createGlobeRes.json();
    const locId = createdLocation.id;

    // 5. Test PUT /api/globe/[id]
    const updateGlobeRes = await fetch(`${BASE_URL}/api/globe/${locId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({ title: 'Himalayan Ridge Expedition (Updated)' }),
    });
    assert(updateGlobeRes.status === 200, 'PUT /api/globe/[id] updates location (200 OK)');

    // 6. Test DELETE /api/globe/[id]
    const deleteGlobeRes = await fetch(`${BASE_URL}/api/globe/${locId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    assert(deleteGlobeRes.status === 200, 'DELETE /api/globe/[id] deletes location (200 OK)');

    // 7. Test Media Library API
    const mediaListRes = await fetch(`${BASE_URL}/api/media`, {
      headers: { Cookie: cookieHeader },
    });
    assert(mediaListRes.status === 200, 'GET /api/media returns 200 OK');

    console.log(`\n===============================================================`);
    console.log(`   ENHANCEMENT TESTS: ${passed} PASSED, ${failed} FAILED`);
    console.log(`===============================================================\n`);

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error('Enhancement test failed:', err);
    process.exit(1);
  }
}

testEnhancements();
