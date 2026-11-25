'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

export interface GlobeLocationItem {
  id: string;
  title: string;
  titleUz?: string | null;
  titleRu?: string | null;
  titleTr?: string | null;
  country: string;
  countryCode: string;
  city?: string | null;
  latitude: number;
  longitude: number;
  visitDate: string | Date;
  description: string;
  descriptionUz?: string | null;
  descriptionRu?: string | null;
  descriptionTr?: string | null;
  story?: string | null;
  category: string;
  coverImage?: string | null;
  photos?: string | string[];
  featured?: boolean;
}

interface EarthGlobe3DProps {
  locations?: GlobeLocationItem[];
  interactivePicker?: boolean;
  onPickCoordinates?: (lat: number, lng: number) => void;
  selectedMarkerId?: string | null;
  height?: string;
  showControls?: boolean;
  showSidebar?: boolean;
}

// Convert Lat/Lng to 3D Vector3 on a sphere of given radius
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Convert 3D Vector3 on sphere back to Lat/Lng
function vector3ToLatLng(point: THREE.Vector3, radius: number): { lat: number; lng: number } {
  const norm = point.clone().normalize();
  const lat = 90 - (Math.acos(Math.max(-1, Math.min(1, norm.y))) * 180 / Math.PI);
  let lng = ((Math.atan2(norm.z, -norm.x) * 180 / Math.PI) - 180);
  while (lng < -180) lng += 360;
  while (lng > 180) lng -= 360;
  return {
    lat: Number(lat.toFixed(4)),
    lng: Number(lng.toFixed(4)),
  };
}

export default function EarthGlobe3D({
  locations = [],
  interactivePicker = false,
  onPickCoordinates,
  selectedMarkerId = null,
  height = 'h-[650px]',
  showControls = true,
  showSidebar = true,
}: EarthGlobe3DProps) {
  const { lang, currentLocale } = useLanguage();
  const isUz = (lang || currentLocale) === 'uz';
  const isRu = (lang || currentLocale) === 'ru';
  const isTr = (lang || currentLocale) === 'tr';

  const globeI18n = {
    expeditions: isUz ? 'Ekspeditsiyalar' : isRu ? 'Экспедиции' : isTr ? 'Seferler' : 'Expeditions',
    closeList: isUz ? 'Yopish' : isRu ? 'Закрыть' : isTr ? 'Kapat' : 'Close List',
    reCenter: isUz ? 'Markazga qaytarish' : isRu ? 'По центру' : isTr ? 'Yeniden ortala' : 'Re-center',
    expeditionIndex: isUz ? 'Ekspeditsiyalar Indeksi' : isRu ? 'Индекс Экспедиций' : isTr ? 'Keşif Dizini' : 'Expeditions Index',
    searchPlaceholder: isUz ? 'Shahar yoki davlat bo‘yicha izlash...' : isRu ? 'Поиск страны или города...' : isTr ? 'Ülke veya şehir ara...' : 'Search country or city...',
    noLocations: isUz ? 'Mos keluvchi manzillar topilmadi' : isRu ? 'Локации не найдены' : isTr ? 'Konum bulunamadı' : 'No locations match query',
    all: isUz ? 'Barchasi' : isRu ? 'Все' : isTr ? 'Tümü' : 'ALL',
    interactiveTitle: isUz ? 'Geografik Koordinatani Tanlash' : isRu ? 'Выбор координат на глобусе' : isTr ? 'Görsel Konum Seçici' : 'Visual Location Picker',
    interactiveHint: isUz ? 'Aniq geografik koordinatani belgilash uchun 3D yer sharining istalgan nuqtasini bosing.' : isRu ? 'Нажмите на любую точку глобуса для фиксации точных координат.' : isTr ? 'Kesin coğrafi koordinatları seçmek için kürenin herhangi bir yerine tıklayın.' : 'Click anywhere on the globe to pick exact geographical coordinates.',
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeLocation, setActiveLocation] = useState<GlobeLocationItem | null>(null);
  const [pickedCoord, setPickedCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const isAutoRotatingRef = useRef(true);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync ref with state
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsAutoRotating(false);
      isAutoRotatingRef.current = false;
    }
  }, []);

  // Fresh references to avoid recreating Three.js scene
  const locationsRef = useRef(locations);
  locationsRef.current = locations;
  const interactivePickerRef = useRef(interactivePicker);
  interactivePickerRef.current = interactivePicker;
  const onPickCoordinatesRef = useRef(onPickCoordinates);
  onPickCoordinatesRef.current = onPickCoordinates;

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const pickedMarkerRef = useRef<THREE.Mesh | null>(null);
  const reqAnimRef = useRef<number | null>(null);

  // Interaction tracking
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.3, y: -1.2 });
  const currentRotation = useRef({ x: 0.3, y: -1.2 });
  const targetCameraDistance = useRef(12);
  const currentCameraDistance = useRef(12);

  const GLOBE_RADIUS = 5;

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchCat = filterCategory === 'ALL' || loc.category === filterCategory;
      const title = loc.title.toLowerCase();
      const country = loc.country.toLowerCase();
      const city = (loc.city || '').toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || title.includes(q) || country.includes(q) || city.includes(q);
      return matchCat && matchSearch;
    });
  }, [locations, filterCategory, searchQuery]);

  // Sync external selectedMarkerId
  useEffect(() => {
    if (selectedMarkerId) {
      const found = locations.find((l) => l.id === selectedMarkerId);
      if (found) {
        focusOnLocation(found);
      }
    }
  }, [selectedMarkerId, locations]);

  // Focus globe camera on a target location
  const focusOnLocation = (loc: GlobeLocationItem) => {
    setActiveLocation(loc);
    setIsAutoRotating(false);

    // Target angles to orient the picked coordinates towards the camera (+Z)
    const phi = (90 - loc.latitude) * (Math.PI / 180);
    const theta = (loc.longitude + 180) * (Math.PI / 180);

    // Desired rotation of the globeGroup
    targetRotation.current.x = phi - Math.PI / 2;
    targetRotation.current.y = -theta + Math.PI / 2;
    targetCameraDistance.current = 8.5; // smooth zoom in
  };

  const resetView = () => {
    targetRotation.current = { x: 0.3, y: -1.2 };
    targetCameraDistance.current = 12;
    setIsAutoRotating(true);
    setActiveLocation(null);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const heightPx = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.set(0, 0, currentCameraDistance.current);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ea, 1.8);
    sunLight.position.set(12, 8, 10);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x90b4d4, 0.6);
    fillLight.position.set(-10, -5, -8);
    scene.add(fillLight);

    // 5. Globe Group (holds earth, clouds, pins, route arcs)
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    globeGroup.rotation.x = currentRotation.current.x;
    globeGroup.rotation.y = currentRotation.current.y;
    scene.add(globeGroup);

    // 6. Textures
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load(
      '/textures/earth_daymap.jpg',
      () => setIsLoading(false),
      undefined,
      () => {
        console.warn('Failed to load earth_daymap texture, using fallback color');
        setIsLoading(false);
      }
    );
    dayTexture.colorSpace = THREE.SRGBColorSpace;

    const normalTexture = textureLoader.load('/textures/earth_normal.jpg');
    const specularTexture = textureLoader.load('/textures/earth_specular.jpg');
    const cloudsTexture = textureLoader.load('/textures/earth_clouds.png');

    // 7. Earth Mesh
    const earthGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: specularTexture,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMeshRef.current = earthMesh;
    globeGroup.add(earthMesh);

    // 8. Clouds Mesh
    const cloudsGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.06, 64, 64);
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    cloudsMeshRef.current = cloudsMesh;
    globeGroup.add(cloudsMesh);

    // 9. Atmospheric Glow Shell
    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.35, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.72, 0.60, 0.35, 1.0) * intensity * 0.7 + vec4(0.4, 0.65, 0.95, 1.0) * intensity * 0.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // 10. Markers Group
    const markersGroup = new THREE.Group();
    markersGroupRef.current = markersGroup;
    globeGroup.add(markersGroup);

    // 11. Subtle Stars / Ambient Dust
    const starsCount = 400;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      const r = 25 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xb99a5b,
      size: 0.12,
      transparent: true,
      opacity: 0.4,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 12. Mouse / Touch Events
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.005;
      targetRotation.current.x = Math.max(
        -Math.PI / 2 + 0.1,
        Math.min(Math.PI / 2 - 0.1, targetRotation.current.x + deltaY * 0.005)
      );

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      setIsAutoRotating(false);
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.006;
      targetRotation.current.x = Math.max(
        -Math.PI / 2 + 0.1,
        Math.min(Math.PI / 2 - 0.1, targetRotation.current.x + deltaY * 0.006)
      );

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setIsAutoRotating(false);
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetCameraDistance.current = Math.max(
        6.8,
        Math.min(18, targetCameraDistance.current + e.deltaY * 0.008)
      );
    };

    const onClick = (e: MouseEvent) => {
      // Calculate coordinates relative to canvas
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check click on markers first
      if (markersGroupRef.current) {
        const markerIntersects = raycaster.intersectObjects(markersGroupRef.current.children, true);
        if (markerIntersects.length > 0) {
          let topObj: THREE.Object3D | null = markerIntersects[0].object;
          while (topObj && !topObj.userData.locationId && topObj.parent) {
            topObj = topObj.parent;
          }
          if (topObj && topObj.userData.locationId) {
            const locId = topObj.userData.locationId;
            const found = locationsRef.current.find((l) => l.id === locId);
            if (found) {
              focusOnLocation(found);
              return;
            }
          }
        }
      }

      // Check click on Earth for interactive picker
      if (interactivePickerRef.current && earthMeshRef.current) {
        const earthIntersects = raycaster.intersectObject(earthMeshRef.current);
        if (earthIntersects.length > 0) {
          const hit = earthIntersects[0].point;
          // transform point to globe local space
          const localHit = earthMeshRef.current.worldToLocal(hit.clone());
          const coords = vector3ToLatLng(localHit, GLOBE_RADIUS);
          setPickedCoord(coords);
          if (onPickCoordinatesRef.current) {
            onPickCoordinatesRef.current(coords.lat, coords.lng);
          }
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('click', onClick);

    // 13. Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 14. Page Visibility API (pause when tab hidden to save battery & GPU)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (reqAnimRef.current) {
          cancelAnimationFrame(reqAnimRef.current);
          reqAnimRef.current = null;
        }
      } else {
        if (!reqAnimRef.current) {
          clock.start();
          animate();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 15. WebGL Context Loss Handlers
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (reqAnimRef.current) {
        cancelAnimationFrame(reqAnimRef.current);
        reqAnimRef.current = null;
      }
      console.warn('WebGL context lost. Pausing render loop.');
    };
    const handleContextRestored = () => {
      console.info('WebGL context restored. Resuming render loop.');
      if (!reqAnimRef.current) animate();
    };
    dom.addEventListener('webglcontextlost', handleContextLost);
    dom.addEventListener('webglcontextrestored', handleContextRestored);

    // 16. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isAutoRotatingRef.current) {
        targetRotation.current.y += delta * 0.08;
      }

      // Smooth interpolation for rotations and zoom
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;
      currentCameraDistance.current +=
        (targetCameraDistance.current - currentCameraDistance.current) * 0.08;

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.x = currentRotation.current.x;
        globeGroupRef.current.rotation.y = currentRotation.current.y;
      }

      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += delta * 0.02;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z = currentCameraDistance.current;
      }

      // Animate glowing rings on markers
      if (markersGroupRef.current) {
        const time = clock.getElapsedTime();
        markersGroupRef.current.children.forEach((child) => {
          const ring = child.getObjectByName('pulseRing');
          if (ring) {
            const scale = 1 + Math.sin(time * 3 + (child.userData.order || 0)) * 0.25;
            ring.scale.set(scale, scale, scale);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      dom.removeEventListener('webglcontextlost', handleContextLost);
      dom.removeEventListener('webglcontextrestored', handleContextRestored);

      // Dispose geometries
      earthGeometry.dispose();
      cloudsGeometry.dispose();
      atmosphereGeometry.dispose();
      starGeometry.dispose();

      // Dispose materials
      earthMaterial.dispose();
      cloudsMaterial.dispose();
      atmosphereMaterial.dispose();
      starMaterial.dispose();

      // Dispose textures
      dayTexture.dispose();
      normalTexture.dispose();
      specularTexture.dispose();
      cloudsTexture.dispose();

      renderer.dispose();
    };
  }, []);

  // Re-render markers whenever locations or pickedCoord changes
  useEffect(() => {
    if (!markersGroupRef.current) return;
    const markersGroup = markersGroupRef.current;
    markersGroup.clear();

    // Render location markers
    filteredLocations.forEach((loc, index) => {
      const pos = latLngToVector3(loc.latitude, loc.longitude, GLOBE_RADIUS);
      const markerRoot = new THREE.Group();
      markerRoot.position.copy(pos);
      markerRoot.userData = { locationId: loc.id, order: index };

      // Look away from center so rings face outward
      markerRoot.lookAt(pos.clone().multiplyScalar(2));

      // Pin core
      const pinGeom = new THREE.SphereGeometry(0.12, 16, 16);
      const isFeatured = loc.featured;
      const pinColor = isFeatured ? 0xb99a5b : 0x17243a;
      const pinMat = new THREE.MeshBasicMaterial({ color: pinColor });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      markerRoot.add(pinMesh);

      // Outer glow pulse ring
      const ringGeom = new THREE.RingGeometry(0.18, 0.26, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xb99a5b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.name = 'pulseRing';
      markerRoot.add(ringMesh);

      // Light stalk pointing outwards
      const stalkGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8);
      stalkGeom.rotateX(Math.PI / 2);
      const stalkMat = new THREE.MeshBasicMaterial({
        color: 0xb99a5b,
        transparent: true,
        opacity: 0.7,
      });
      const stalkMesh = new THREE.Mesh(stalkGeom, stalkMat);
      stalkMesh.position.z = 0.17;
      markerRoot.add(stalkMesh);

      markersGroup.add(markerRoot);
    });

    // Render temporary picked marker for location picker
    if (pickedCoord) {
      const pos = latLngToVector3(pickedCoord.lat, pickedCoord.lng, GLOBE_RADIUS);
      const pickRoot = new THREE.Group();
      pickRoot.position.copy(pos);
      pickRoot.lookAt(pos.clone().multiplyScalar(2));

      const pickGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const pickMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const pickMesh = new THREE.Mesh(pickGeom, pickMat);
      pickRoot.add(pickMesh);

      const pickRingGeom = new THREE.RingGeometry(0.24, 0.36, 32);
      const pickRingMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      });
      const pickRing = new THREE.Mesh(pickRingGeom, pickRingMat);
      pickRing.name = 'pulseRing';
      pickRoot.add(pickRing);

      markersGroup.add(pickRoot);
    }
  }, [filteredLocations, pickedCoord]);

  // Extract parsed gallery photos
  const activePhotos = useMemo(() => {
    if (!activeLocation) return [];
    const list: string[] = [];
    if (activeLocation.coverImage) list.push(activeLocation.coverImage);
    if (Array.isArray(activeLocation.photos)) {
      list.push(...activeLocation.photos);
    } else if (typeof activeLocation.photos === 'string') {
      try {
        const parsed = JSON.parse(activeLocation.photos);
        if (Array.isArray(parsed)) list.push(...parsed);
      } catch {}
    }
    return Array.from(new Set(list.filter(Boolean)));
  }, [activeLocation]);

  // Localized text helper
  const getLocalized = (loc: GlobeLocationItem, key: 'title' | 'description' | 'story') => {
    if (currentLocale === 'uz' && loc[`${key}Uz` as keyof GlobeLocationItem]) {
      return loc[`${key}Uz` as keyof GlobeLocationItem] as string;
    }
    if (currentLocale === 'ru' && loc[`${key}Ru` as keyof GlobeLocationItem]) {
      return loc[`${key}Ru` as keyof GlobeLocationItem] as string;
    }
    if (currentLocale === 'tr' && loc[`${key}Tr` as keyof GlobeLocationItem]) {
      return loc[`${key}Tr` as keyof GlobeLocationItem] as string;
    }
    return loc[key] || '';
  };

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-3xl bg-gradient-to-b from-[#101927] via-[#17243A] to-[#0D1522] shadow-2xl border border-navy/10 select-none`}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/90 backdrop-blur-md z-30 text-white">
          <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
          <p className="font-editorial text-xl tracking-wide text-gold">Loading 3D Earth Globe...</p>
          <p className="text-xs text-white/60 mt-1">Rendering satellite textures & geographical markers</p>
        </div>
      )}

      {/* Top Header Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="pointer-events-auto bg-navy/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center space-x-3 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white">
            Interactive Earth
          </span>
          <span className="text-xs text-gold font-mono">
            {locations.length} {currentLocale === 'uz' ? 'nuqta' : currentLocale === 'ru' ? 'локаций' : currentLocale === 'tr' ? 'konum' : 'locations'}
          </span>
        </div>

        {/* Action Controls */}
        {showControls && (
          <div className="pointer-events-auto flex items-center space-x-2">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              title={isAutoRotating ? 'Pause Rotation' : 'Auto Rotate'}
              className={`p-2.5 rounded-2xl border backdrop-blur-md transition shadow-md ${
                isAutoRotating
                  ? 'bg-gold/20 border-gold/40 text-gold'
                  : 'bg-navy/80 border-white/10 text-white hover:bg-navy'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={resetView}
              title="Reset View"
              className="p-2.5 rounded-2xl bg-navy/80 hover:bg-navy border border-white/10 text-white backdrop-blur-md transition shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            {showSidebar && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="px-3.5 py-2 rounded-2xl bg-gold text-navy font-semibold text-xs tracking-wider uppercase transition shadow-md hover:bg-gold-light"
              >
                {sidebarOpen ? globeI18n.closeList : globeI18n.expeditions}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Interactive Picker Instructions & Status */}
      {interactivePicker && (
        <div className="absolute bottom-4 left-4 z-20 bg-navy/90 backdrop-blur-md border border-gold/30 px-4 py-3 rounded-2xl text-white shadow-xl max-w-sm pointer-events-auto">
          <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">
            {globeI18n.interactiveTitle}
          </p>
          <p className="text-xs text-white/80">
            {globeI18n.interactiveHint}
          </p>
          {pickedCoord && (
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400">Lat: {pickedCoord.lat}°</span>
              <span className="text-emerald-400">Lng: {pickedCoord.lng}°</span>
            </div>
          )}
        </div>
      )}

      {/* Selected Location Details Drawer / Mobile Bottom Sheet */}
      {activeLocation && (
        <div className="fixed sm:absolute inset-x-3 bottom-3 sm:bottom-4 sm:top-20 sm:left-auto sm:right-4 sm:w-96 max-h-[80vh] sm:max-h-none sm:h-auto max-w-[calc(100vw-1.5rem)] bg-white/95 dark:bg-[#101827]/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200/80 dark:border-white/15 z-30 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-bottom-4 sm:slide-in-from-right-4 duration-300 pointer-events-auto text-[#101827] dark:text-white">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#B99A5B]/15 text-[#B99A5B] border border-[#B99A5B]/30">
                {activeLocation.category}
              </span>
              <button
                onClick={() => setActiveLocation(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#B99A5B]/20 flex items-center justify-center text-slate-600 dark:text-slate-300 transition"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            {/* Photos Carousel / Cover */}
            {activePhotos.length > 0 && (
              <div className="relative h-40 sm:h-48 w-full rounded-2xl overflow-hidden mb-3.5 shadow-inner bg-slate-100 dark:bg-white/5">
                <img
                  src={activePhotos[0]}
                  alt={activeLocation.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {activePhotos.length > 1 && (
                  <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] text-white font-mono border border-white/20">
                    +{activePhotos.length - 1} photos
                  </span>
                )}
              </div>
            )}

            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#101827] dark:text-white leading-tight mb-1">
              {getLocalized(activeLocation, 'title')}
            </h3>

            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
              <span>📍 {activeLocation.city ? `${activeLocation.city}, ` : ''}{activeLocation.country}</span>
              <span>•</span>
              <span>{new Date(activeLocation.visitDate).getFullYear()}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {getLocalized(activeLocation, 'description')}
            </p>

            {/* Coordinates metadata badge */}
            <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#101827] dark:text-white">
              <span>{activeLocation.latitude > 0 ? `${activeLocation.latitude}° N` : `${Math.abs(activeLocation.latitude)}° S`}</span>
              <span>{activeLocation.longitude > 0 ? `${activeLocation.longitude}° E` : `${Math.abs(activeLocation.longitude)}° W`}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              Ashraf Turdialiyev Expedition
            </span>
            <button
              onClick={() => focusOnLocation(activeLocation)}
              className="text-xs text-[#B99A5B] font-bold hover:underline"
            >
              {globeI18n.reCenter}
            </button>
          </div>
        </div>
      )}

      {/* Expeditions Sidebar List / Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed sm:absolute inset-x-3 bottom-3 sm:bottom-4 sm:top-20 sm:right-auto sm:left-4 sm:w-80 max-h-[80vh] sm:max-h-none sm:h-auto max-w-[calc(100vw-1.5rem)] bg-[#101827]/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-white/15 z-30 flex flex-col text-white pointer-events-auto animate-in slide-in-from-bottom-4 sm:slide-in-from-left-4 duration-300">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-editorial text-lg text-[#eedda5] font-bold">{globeI18n.expeditionIndex}</h4>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs transition"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Search box */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={globeI18n.searchPlaceholder}
            className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 text-xs mb-3 focus:outline-none focus:border-gold"
          />

          {/* Category Filter Pills */}
          <div className="flex space-x-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-[10px]">
            {['ALL', 'EXPEDITION', 'ALPINE', 'CULTURAL', 'SCHOLARLY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition ${
                  filterCategory === cat
                    ? 'bg-gold text-navy font-bold'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat === 'ALL' ? globeI18n.all : cat}
              </button>
            ))}
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredLocations.length === 0 ? (
              <p className="text-xs text-white/50 text-center py-8">{globeI18n.noLocations}</p>
            ) : (
              filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => focusOnLocation(loc)}
                  className={`p-3 rounded-2xl border transition cursor-pointer ${
                    activeLocation?.id === loc.id
                      ? 'bg-gold/20 border-gold text-white'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs truncate max-w-[170px]">
                      {getLocalized(loc, 'title')}
                    </span>
                    <span className="text-[10px] font-mono text-gold">
                      {new Date(loc.visitDate).getFullYear()}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 truncate">
                    📍 {loc.city ? `${loc.city}, ` : ''}{loc.country}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
