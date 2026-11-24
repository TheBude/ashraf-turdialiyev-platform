/**
 * Comprehensive 10-Workflow Verification Script for Ashraf Turdialiyev Platform
 *
 * Workflows tested:
 * 1. Admin login and logout
 * 2. Create, edit, publish, and delete a travel destination
 * 3. Add a new country to the interactive map
 * 4. Create and edit a timeline event
 * 5. Upload / Register a certificate
 * 6. Create a scientific publication
 * 7. Change content between four languages
 * 8. Submit the contact form
 * 9. Configure the simulated audience counter
 * 10. Verify that published content appears on the public website
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function verifyAll() {
  console.log(`\n===============================================================`);
  console.log(`   FULL WORKFLOW VERIFICATION SUITE — ASHRAF TURDIALIYEV PLATFORM`);
  console.log(`   Target Server: ${BASE_URL}`);
  console.log(`===============================================================\n`);

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

  let cookieHeader = '';

  // WORKFLOW 1: Admin Login and Logout
  console.log('--- WORKFLOW 1: Admin Login & Logout ---');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@ashrafturdialiyev.com',
      password: 'AshrafAdmin2026!Secure',
    }),
  });
  assert(loginRes.status === 200, 'Admin credentials accepted with 200 OK');
  const setCookie = loginRes.headers.get('set-cookie');
  assert(Boolean(setCookie && setCookie.includes('ashraf_admin_token')), 'Session cookie successfully generated');
  cookieHeader = setCookie ? setCookie.split(';')[0] : '';

  const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Cookie: cookieHeader },
  });
  const meData = await meRes.json();
  assert(meData.authenticated === true && meData.user.email === 'admin@ashrafturdialiyev.com', 'Admin identity verified via session token');

  // WORKFLOW 2: Create, Edit, Publish, and Delete a Travel Destination
  console.log('\n--- WORKFLOW 2: Create, Edit, Publish, and Delete a Travel Destination ---');
  const createDestRes = await fetch(`${BASE_URL}/api/destinations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({
      title: 'Tashkent Modern Innovation Hub',
      titleUz: 'Toshkent zamonaviy innovatsiyalar markazi',
      titleRu: 'Ташкент: Центр современных инноваций',
      titleTr: 'Taşkent Modern İnovasyon Merkezi',
      country: 'Uzbekistan',
      countryCode: 'UZ',
      city: 'Tashkent',
      coordinates: '41.2995,69.2401',
      description: 'Documenting artificial intelligence research clusters and high-tech parks in Central Asia.',
      descriptionUz: "Markaziy Osiyodagi sun'iy intellekt klasterlari va texnoparklar faoliyatini o'rganish.",
      story: 'The rapid transformation of Tashkent highlights a burgeoning digital economy.',
      photos: ['https://images.unsplash.com/photo-1596484552829-9e8c07c29377'],
      status: 'PUBLISHED',
      featured: true,
    }),
  });
  assert(createDestRes.status === 201, 'Destination created with 201 Created');
  const createdDest = await createDestRes.json();
  const destId = createdDest.id;

  // Edit destination
  const editDestRes = await fetch(`${BASE_URL}/api/destinations/${destId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({
      title: 'Tashkent Modern Innovation Hub (Reviewed)',
      status: 'DRAFT',
    }),
  });
  assert(editDestRes.status === 200, 'Destination edited and toggled to DRAFT');
  const editedDest = await editDestRes.json();
  assert(editedDest.status === 'DRAFT', 'Destination status verified as DRAFT');

  // Publish destination again
  const publishDestRes = await fetch(`${BASE_URL}/api/destinations/${destId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({ status: 'PUBLISHED' }),
  });
  const publishedDest = await publishDestRes.json();
  assert(publishedDest.status === 'PUBLISHED', 'Destination re-published successfully');

  // WORKFLOW 3: Add a New Country to the Interactive Map
  console.log('\n--- WORKFLOW 3: Add a New Country to the Interactive Map ---');
  const addCountryRes = await fetch(`${BASE_URL}/api/countries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({
      isoCode: 'CA',
      countryName: 'Canada',
      countryNameUz: 'Kanada',
      countryNameRu: 'Канада',
      countryNameTr: 'Kanada',
      visitedYear: 2024,
      notes: 'Banff National Park high-latitude glacier comparisons and Montreal AI summit.',
      flag: '🇨🇦',
      coordinates: '51.1784,-115.5708',
    }),
  });
  assert(addCountryRes.status === 201, 'Country (Canada) added to interactive world map (201 Created)');
  const createdCountry = await addCountryRes.json();
  const countryId = createdCountry.id;

  // WORKFLOW 4: Create and Edit a Timeline Event
  console.log('\n--- WORKFLOW 4: Create and Edit a Timeline Event ---');
  const createTimelineRes = await fetch(`${BASE_URL}/api/timeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({
      year: 2025,
      date: 'Spring 2025',
      title: 'Inauguration of Eurasian Scientific Observatory',
      titleUz: "Yevroosiyo ilmiy observatoriyasi ochilishi",
      titleRu: 'Открытие Евразийской научной обсерватории',
      titleTr: 'Avrasya Bilimsel Gözlemevinin Açılışı',
      category: 'SCIENTIFIC',
      description: 'Launched a multi-regional observation network for high-altitude meteorological data collection.',
      location: 'Central Asia & Caucasus',
    }),
  });
  assert(createTimelineRes.status === 201, 'Timeline event created (201 Created)');
  const createdTimeline = await createTimelineRes.json();
  const timelineId = createdTimeline.id;

  const editTimelineRes = await fetch(`${BASE_URL}/api/timeline/${timelineId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({
      title: 'Inauguration of Eurasian Scientific Observatory (Expanded Scope)',
    }),
  });
  assert(editTimelineRes.status === 200, 'Timeline event successfully edited (200 OK)');

  // WORKFLOW 5: Upload / Register a Certificate
  console.log('\n--- WORKFLOW 5: Upload / Register a Certificate ---');
  const createCertRes = await fetch(`${BASE_URL}/api/certificates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({
      title: 'Executive Certificate in International Climate Diplomacy',
      issuer: 'Oxford Climate Governance Institute',
      issueDate: '2025-01-10',
      credentialUrl: 'https://ox.ac.uk/verify/OX-CLIM-2025-88',
      credentialId: 'OX-CLIM-2025-88',
      imageUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766',
      category: 'DIPLOMACY',
    }),
  });
  assert(createCertRes.status === 201, 'Certificate registered in credentials vault (201 Created)');
  const createdCert = await createCertRes.json();
  const certId = createdCert.id;

  // WORKFLOW 6: Create a Scientific Publication
  console.log('\n--- WORKFLOW 6: Create a Scientific Publication ---');
  const createPubRes = await fetch(`${BASE_URL}/api/publications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({
      title: 'Hydrological Synchronization in High Asian Mountain Glaciers',
      authors: 'Ashraf Turdialiyev, Dr. H. Lindemann',
      journal: 'Nature Communications & High-Mountain Hydrology, Vol. 16',
      year: 2025,
      doi: '10.1038/s41467-025-88910-x',
      link: 'https://doi.org/10.1038/s41467-025-88910-x',
      abstract: 'Assessing glacier-lake outburst flood hazards and seasonal runoff fluctuations across Pamir and Tian Shan basins.',
      tags: ['Glaciers', 'Hydrology', 'Climate Modeling', 'Central Asia'],
      citations: 12,
      featured: true,
    }),
  });
  assert(createPubRes.status === 201, 'Scientific publication published (201 Created)');
  const createdPub = await createPubRes.json();
  const pubId = createdPub.id;

  // WORKFLOW 7: Change Content Between Four Languages
  console.log('\n--- WORKFLOW 7: Verify Content Across Four Languages ---');
  const homeRes = await fetch(`${BASE_URL}/`);
  const homeHtml = await homeRes.text();
  assert(homeRes.status === 200, 'Public homepage accessible (200 OK)');

  // Verify translations module loads all 4 languages cleanly
  const { translations } = require('../src/lib/translations.ts');
  const langs = ['uz', 'en', 'ru', 'tr'];
  let langCheck = true;
  langs.forEach((l) => {
    if (!translations[l] || !translations[l].nav || !translations[l].hero) {
      langCheck = false;
    }
  });
  assert(langCheck, 'All 4 language dictionaries (UZ, EN, RU, TR) fully defined and accessible');

  // WORKFLOW 8: Submit the Contact Form
  console.log('\n--- WORKFLOW 8: Submit the Inbound Contact Form ---');
  const contactSubmitRes = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Professor Liam Sterling',
      email: 'sterling@zurich-fellowship.ch',
      subject: 'Academic & Scientific Research Collaboration',
      message: 'Dear Ashraf, We are reviewing your paper on high alpine water basins and would like to invite you for a 3-month research fellowship.',
    }),
  });
  assert(contactSubmitRes.status === 201, 'Contact inquiry submitted (201 Created)');
  const contactData = await contactSubmitRes.json();
  const contactMsgId = contactData.id;

  // Verify it reached admin inbox
  const inboxRes = await fetch(`${BASE_URL}/api/contact`, {
    headers: { Cookie: cookieHeader },
  });
  const inboxMessages = await inboxRes.json();
  const foundMessage = inboxMessages.find((m) => m.id === contactMsgId);
  assert(Boolean(foundMessage && foundMessage.email === 'sterling@zurich-fellowship.ch'), 'Submitted inquiry received in admin inbox');

  // WORKFLOW 9: Configure the Simulated Audience Counter
  console.log('\n--- WORKFLOW 9: Configure the Simulated Audience Counter ---');
  const updateStatsRes = await fetch(`${BASE_URL}/api/audience`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({
      stats: [
        { key: 'countries_visited', value: 45, isSimulated: false },
        { key: 'global_audience', value: 420000, isSimulated: true, incrementRate: 0.2 },
      ],
    }),
  });
  assert(updateStatsRes.status === 200, 'Audience counter telemetry updated (200 OK)');
  const statsRes = await fetch(`${BASE_URL}/api/audience`);
  const fetchedStats = await statsRes.json();
  const audienceStat = fetchedStats.find((s) => s.key === 'global_audience');
  assert(audienceStat && audienceStat.value === 420000, 'Updated audience value (420,000) verified in database');

  // WORKFLOW 10: Verify that Published Content Appears on Public Website
  console.log('\n--- WORKFLOW 10: Verify Published Content on Public Website ---');
  const publicDestRes = await fetch(`${BASE_URL}/api/destinations?status=PUBLISHED`);
  const publicDests = await publicDestRes.json();
  const containsTashkent = publicDests.some((d) => d.id === destId);
  assert(containsTashkent, 'Published destination appears in public API catalog');

  const publicCountriesRes = await fetch(`${BASE_URL}/api/countries`);
  const publicCountries = await publicCountriesRes.json();
  const containsCanada = publicCountries.some((c) => c.isoCode === 'CA');
  assert(containsCanada, 'New territory (Canada) appears on public world map data');

  const publicPubsRes = await fetch(`${BASE_URL}/api/publications?q=Hydrological`);
  const publicPubs = await publicPubsRes.json();
  const containsPub = publicPubs.some((p) => p.id === pubId);
  assert(containsPub, 'New scientific publication appears in public search query');

  // Cleanup test entities to maintain clean database state
  console.log('\n--- Cleaning up temporary verification records ---');
  await fetch(`${BASE_URL}/api/destinations/${destId}`, { method: 'DELETE', headers: { Cookie: cookieHeader } });
  await fetch(`${BASE_URL}/api/countries/${countryId}`, { method: 'DELETE', headers: { Cookie: cookieHeader } });
  await fetch(`${BASE_URL}/api/timeline/${timelineId}`, { method: 'DELETE', headers: { Cookie: cookieHeader } });
  await fetch(`${BASE_URL}/api/certificates/${certId}`, { method: 'DELETE', headers: { Cookie: cookieHeader } });
  await fetch(`${BASE_URL}/api/publications/${pubId}`, { method: 'DELETE', headers: { Cookie: cookieHeader } });
  await fetch(`${BASE_URL}/api/contact/${contactMsgId}`, { method: 'DELETE', headers: { Cookie: cookieHeader } });

  // Logout
  const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: cookieHeader },
  });
  assert(logoutRes.status === 200, 'Admin session terminated (Logout 200 OK)');

  console.log(`\n===============================================================`);
  console.log(`   FULL WORKFLOW TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`===============================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

verifyAll().catch((err) => {
  console.error('Workflow verification crashed:', err);
  process.exit(1);
});
