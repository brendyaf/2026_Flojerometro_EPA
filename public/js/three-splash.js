import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js';

let testCanvas;
try {
  testCanvas = document.createElement('canvas');
  if (!testCanvas.getContext('webgl') && !testCanvas.getContext('experimental-webgl')) {
    return;
  }
} catch (e) {
  return;
}

document.body.insertAdjacentHTML('afterbegin', [
  '<div id="threeSplash">',
    '<canvas id="splash-canvas"></canvas>',
    '<div id="splash-content">',
      '<h1 id="splash-title">FLOJERÓMETRO EPA</h1>',
      '<p id="splash-sub">Descubre tu nivel de procrastinación académica</p>',
    '</div>',
    '<button id="splash-skip">Saltar →</button>',
  '</div>',
].join(''));

const overlay = document.getElementById('threeSplash');
const canvas = document.getElementById('splash-canvas');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 7;

scene.add(new THREE.AmbientLight(0x404060, 0.5));
const l1 = new THREE.DirectionalLight(0x8B5CF6, 0.8);
l1.position.set(2, 3, 4);
scene.add(l1);
const l2 = new THREE.DirectionalLight(0x6D28D9, 0.3);
l2.position.set(-3, -1, 2);
scene.add(l2);

const mainGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 64, 8);
const mainMat = new THREE.MeshPhysicalMaterial({
  color: 0x7C3AED,
  metalness: 0.2,
  roughness: 0.3,
  clearcoat: 0.4,
  transparent: true,
  opacity: 0.9,
});
const mainMesh = new THREE.Mesh(mainGeo, mainMat);
scene.add(mainMesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xA78BFA,
  wireframe: true,
  transparent: true,
  opacity: 0.15,
});
const wireMesh = new THREE.Mesh(mainGeo.clone(), wireMat);
wireMesh.scale.setScalar(1.03);
scene.add(wireMesh);

const glowMat = new THREE.MeshBasicMaterial({
  color: 0x8B5CF6,
  transparent: true,
  opacity: 0.06,
});
const glowMesh = new THREE.Mesh(new THREE.TorusKnotGeometry(1.6, 0.5, 48, 6), glowMat);
scene.add(glowMesh);

const ring = [];
for (let i = 0; i < 50; i++) {
  const a = (i / 50) * Math.PI * 2;
  const r = 2.8 + Math.random() * 0.2;
  const m = new THREE.Mesh(
    new THREE.TetrahedronGeometry(0.06, 0),
    new THREE.MeshStandardMaterial({
      color: 0xA78BFA,
      transparent: true,
      opacity: 0.4 + Math.random() * 0.6,
    }),
  );
  m.position.set(r * Math.cos(a), (Math.random() - 0.5) * 0.3, r * Math.sin(a));
  m.userData = { a, r, speed: 0.6 + Math.random() * 0.4 };
  scene.add(m);
  ring.push(m);
}

const dustCount = 300;
const dustPos = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i++) {
  dustPos[i * 3] = (Math.random() - 0.5) * 24;
  dustPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
  dustPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
}
const dustGeo = new THREE.BufferGeometry();
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dust = new THREE.Points(
  dustGeo,
  new THREE.PointsMaterial({
    color: 0xA78BFA,
    size: 0.015,
    transparent: true,
    opacity: 0.3,
  }),
);
scene.add(dust);

const SPLASH_MS = 2800;
let fading = false;
let done = false;
const start = performance.now();

function fadeOut() {
  if (fading) return;
  fading = true;
  overlay.classList.add('fade-out');
  setTimeout(() => {
    done = true;
    overlay.remove();
    renderer.dispose();
  }, 800);
}

function animate() {
  if (done) return;
  const elapsed = performance.now() - start;
  const t = elapsed / 1000;

  mainMesh.rotation.x = t * 0.2;
  mainMesh.rotation.y = t * 0.4;
  wireMesh.rotation.x = t * 0.2;
  wireMesh.rotation.y = t * 0.4;
  glowMesh.rotation.x = t * 0.15;
  glowMesh.rotation.y = t * 0.35;

  for (const p of ring) {
    p.userData.a += 0.02 * p.userData.speed;
    p.position.x = p.userData.r * Math.cos(p.userData.a);
    p.position.z = p.userData.r * Math.sin(p.userData.a);
    p.position.y += Math.sin(t * 2 + p.userData.a) * 0.002;
    p.rotation.x += 0.03;
    p.rotation.y += 0.04;
  }

  dust.rotation.y = t * 0.015;

  renderer.render(scene, camera);

  if (!fading && elapsed >= SPLASH_MS) fadeOut();
  requestAnimationFrame(animate);
}

document.getElementById('splash-skip').addEventListener('click', fadeOut);

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

animate();
