import * as THREE from 'three';

const isMobile = window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 35 : 60;
const CONNECTION_DIST = 2.8;
const COLORS = [0x7C3AED, 0x8B5CF6, 0x6D28D9, 0x4B3B75, 0xA78BFA];

let canvas;
try {
  canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    console.log('WebGL no disponible — Three.js omitido');
  }
} catch (e) {
  return;
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.z = 14;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: !isMobile,
  powerPreference: 'low-power',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
renderer.setClearColor(0x000000, 0);
renderer.domElement.id = 'three-canvas';
document.body.prepend(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
scene.add(ambientLight);

const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
light1.position.set(2, 3, 4);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xA78BFA, 0.4);
light2.position.set(-3, -1, 2);
scene.add(light2);

const meshes = [];
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const Geo = Math.random() > 0.5 ? THREE.OctahedronGeometry : THREE.TetrahedronGeometry;
  const size = 0.15 + Math.random() * 0.2;
  const geometry = new Geo(size, 0);
  const material = new THREE.MeshStandardMaterial({
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    metalness: 0.1,
    roughness: 0.5,
    transparent: true,
    opacity: 0.4 + Math.random() * 0.4,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    (Math.random() - 0.5) * 18,
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 8,
  );
  mesh.userData = {
    rotSpeed: {
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02,
    },
    floatSpeed: 0.3 + Math.random() * 0.4,
    floatAmp: 0.2 + Math.random() * 0.3,
    phase: Math.random() * Math.PI * 2,
    origY: mesh.position.y,
  };
  scene.add(mesh);
  meshes.push(mesh);
}

const maxConnections = PARTICLE_COUNT * (PARTICLE_COUNT - 1) / 2;
const linePositions = new Float32Array(maxConnections * 6);
const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
lineGeo.setDrawRange(0, 0);
const lineMat = new THREE.LineBasicMaterial({
  color: 0x7C3AED,
  transparent: true,
  opacity: 0.12,
});
const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
scene.add(lineSegments);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
}, { passive: true });

const onResize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
};
window.addEventListener('resize', onResize, { passive: true });

let isVisible = true;
document.addEventListener('visibilitychange', () => {
  isVisible = !document.hidden;
});

const clock = new THREE.Clock();
let animId;

function animate() {
  if (isVisible) {
    const t = clock.getElapsedTime();

    scene.rotation.y = t * 0.05;
    scene.rotation.x = Math.sin(t * 0.02) * 0.05;
    scene.rotation.x += mouseY * 0.02;
    scene.rotation.y += mouseX * 0.02;

    for (const mesh of meshes) {
      mesh.rotation.x += mesh.userData.rotSpeed.x;
      mesh.rotation.y += mesh.userData.rotSpeed.y;
      mesh.rotation.z += mesh.userData.rotSpeed.z;
      mesh.position.y = mesh.userData.origY
        + Math.sin(t * mesh.userData.floatSpeed + mesh.userData.phase) * mesh.userData.floatAmp;
    }

    let idx = 0;
    for (let i = 0; i < meshes.length; i++) {
      for (let j = i + 1; j < meshes.length; j++) {
        const dist = meshes[i].position.distanceTo(meshes[j].position);
        if (dist < CONNECTION_DIST) {
          const p1 = meshes[i].position;
          const p2 = meshes[j].position;
          linePositions[idx++] = p1.x;
          linePositions[idx++] = p1.y;
          linePositions[idx++] = p1.z;
          linePositions[idx++] = p2.x;
          linePositions[idx++] = p2.y;
          linePositions[idx++] = p2.z;
        }
      }
    }
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, idx / 3);

    renderer.render(scene, camera);
  }
  animId = requestAnimationFrame(animate);
}

animId = requestAnimationFrame(animate);
