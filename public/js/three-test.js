(function () {
  'use strict';

  if (window.location.pathname !== '/') return;

  var c = document.createElement('canvas');
  if (!c.getContext('webgl') && !c.getContext('experimental-webgl')) return;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ---- Overlay ----
  var overlay = document.createElement('div');
  overlay.id = 'three-test-overlay';
  overlay.innerHTML =
    '<canvas id="tt-canvas"></canvas>' +
    '<div id="tt-content">' +
      '<img src="img/blanco.png" id="tt-logo" alt="Flojerómetro EPA">' +
      '<h1 id="tt-title">FLOJERÓMETRO EPA</h1>' +
      '<p id="tt-sub">Evalúa tus hábitos académicos</p>' +
    '</div>' +
    '<button id="tt-skip">Saltar →</button>';
  document.body.insertBefore(overlay, document.body.firstChild);

  var canvas = document.getElementById('tt-canvas');
  var overlayEl = overlay;
  var ttLogo = document.getElementById('tt-logo');

  // ---- Three.js ----
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.5, 6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0x404060, 0.5));
  var dl1 = new THREE.DirectionalLight(0xA78BFA, 0.7);
  dl1.position.set(2, 3, 4);
  scene.add(dl1);
  var dl2 = new THREE.DirectionalLight(0x6D28D9, 0.3);
  dl2.position.set(-3, -1, 2);
  scene.add(dl2);
  var dl3 = new THREE.DirectionalLight(0xffffff, 0.2);
  dl3.position.set(0, -2, 3);
  scene.add(dl3);

  // ---- All-scene group (controls overall scale) ----
  var allGroup = new THREE.Group();
  scene.add(allGroup);

  // ---- Abstract Brain ----
  var brainGroup = new THREE.Group();
  var brainPositions = [];
  var brainSpheres = [];

  [-1, 1].forEach(function (side) {
    for (var i = 0; i < 24; i++) {
      var theta = Math.random() * Math.PI;
      var phi = Math.random() * 2 * Math.PI;

      var x0 = Math.sin(theta) * Math.cos(phi);
      var y0 = Math.sin(theta) * Math.sin(phi);
      var z0 = Math.cos(theta);

      x0 = side * Math.abs(x0);

      var scaleZ = 0.65 + 0.35 * (1 - Math.abs(z0));
      var scaleX = 0.85 + 0.3 * (1 - z0);
      var scaleY = 0.85;

      var pos = new THREE.Vector3(
        x0 * scaleX + side * 0.18,
        y0 * scaleY,
        z0 * scaleZ
      );

      pos.x += (Math.random() - 0.5) * 0.1;
      pos.y += (Math.random() - 0.5) * 0.1;
      pos.z += (Math.random() - 0.5) * 0.1;

      brainPositions.push(pos);

      var size = 0.055 + Math.random() * 0.045;
      var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(size, 6, 6),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.74 + Math.random() * 0.05, 0.5 + Math.random() * 0.3, 0.4 + Math.random() * 0.25),
          roughness: 0.4,
          metalness: 0.15,
        })
      );
      sphere.position.copy(pos);
      sphere.userData.phase = Math.random() * Math.PI * 2;
      brainGroup.add(sphere);
      brainSpheres.push(sphere);
    }
  });

  var linePairs = [];
  for (var i = 0; i < brainPositions.length; i++) {
    for (var j = i + 1; j < brainPositions.length; j++) {
      if (brainPositions[i].distanceTo(brainPositions[j]) < 0.45) {
        linePairs.push(i, j);
      }
    }
  }

  if (linePairs.length > 0) {
    var lineFloats = new Float32Array(linePairs.length * 6);
    var lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lineFloats, 3));
    var lineMat = new THREE.LineBasicMaterial({
      color: 0x7C3AED,
      transparent: true,
      opacity: 0.2,
    });
    var lineSegs = new THREE.LineSegments(lineGeo, lineMat);

    for (var idx = 0; idx < linePairs.length; idx += 2) {
      var pi = brainPositions[linePairs[idx]];
      var pj = brainPositions[linePairs[idx + 1]];
      lineFloats[idx * 3] = pi.x;
      lineFloats[idx * 3 + 1] = pi.y;
      lineFloats[idx * 3 + 2] = pi.z;
      lineFloats[idx * 3 + 3] = pj.x;
      lineFloats[idx * 3 + 4] = pj.y;
      lineFloats[idx * 3 + 5] = pj.z;
    }
    lineGeo.attributes.position.needsUpdate = true;
    brainGroup.add(lineSegs);
  }

  var glowSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0x7C3AED,
      transparent: true,
      opacity: 0.1,
    })
  );
  brainGroup.add(glowSphere);

  allGroup.add(brainGroup);

  // ---- 6 Orbital Rings ----
  var ringGroup = new THREE.Group();
  var rings = [];
  var ringColors = [0x7C3AED, 0x8B5CF6, 0x6D28D9, 0xA78BFA, 0x9F7AEA, 0x8B5CF6];
  var ringSizes = [1.7, 1.9, 2.1, 1.8, 2.0, 2.2];

  for (var ri = 0; ri < 6; ri++) {
    var ring = new THREE.Mesh(
      new THREE.TorusGeometry(ringSizes[ri], 0.015, 8, 60),
      new THREE.MeshBasicMaterial({
        color: ringColors[ri],
        transparent: true,
        opacity: 0.2 + ri * 0.025,
      })
    );
    ring.rotation.x = (Math.PI / 3) * (ri % 3);
    ring.rotation.y = (Math.PI / 4) * ri;
    ring.userData = {
      rx: 0.004 + Math.random() * 0.006,
      ry: 0.005 + Math.random() * 0.007,
      rz: 0.002 + Math.random() * 0.004,
    };
    ringGroup.add(ring);
    rings.push(ring);
  }
  allGroup.add(ringGroup);

  // ---- Dust Particles ----
  var dustCount = 400;
  var dustPos = new Float32Array(dustCount * 3);
  for (var i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 20;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
  }
  var dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  var dustMat = new THREE.PointsMaterial({
    color: 0xA78BFA,
    size: 0.012,
    transparent: true,
    opacity: 0.25,
  });
  var dust = new THREE.Points(dustGeo, dustMat);
  allGroup.add(dust);

  // ---- State ----
  var start = performance.now();
  var fading = false;
  var done = false;

  function fadeOut() {
    if (fading) return;
    fading = true;
    overlayEl.classList.add('fade-out');
    setTimeout(function () {
      done = true;
      overlayEl.parentNode.removeChild(overlayEl);
      renderer.dispose();
    }, 800);
  }

  document.getElementById('tt-skip').addEventListener('click', fadeOut);

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---- Animation ----
  function animate() {
    if (done) return;
    var elapsed = performance.now() - start;
    var t = elapsed / 1000;

    // Entry: 0 -> 2.0s  scale 0 to 1
    if (t < 2.0) {
      allGroup.scale.setScalar(easeOutCubic(t / 2.0));
    }

    // Shrink: 7.0 -> 7.5s  scale 1 to 0
    if (t >= 7.0 && t < 7.5) {
      var s = 1 - easeOutCubic((t - 7.0) / 0.5);
      allGroup.scale.setScalar(s);
      ttLogo.style.transform = 'scale(' + s + ')';
    }
    if (t >= 7.5) {
      allGroup.scale.setScalar(0);
      ttLogo.style.transform = 'scale(0)';
    }

    // Rotation phases (2.0s -> 7.0s)
    if (t >= 2.0 && t < 7.0) {
      var rt = t - 2.0;
      var speedMul = 1;

      if (t >= 5.0) {
        speedMul = 1 - ((t - 5.0) / 2.0) * 0.7;
      }

      var angle = rt * 0.35 * speedMul;
      brainGroup.rotation.y = angle;
      brainGroup.rotation.x = Math.sin(angle * 0.3) * 0.08;
      brainGroup.rotation.z = Math.sin(angle * 0.2) * 0.03;

      ringGroup.rotation.y = rt * 0.2 * speedMul;
      ringGroup.rotation.x = Math.sin(rt * 0.1) * 0.06;

      for (var ri2 = 0; ri2 < rings.length; ri2++) {
        var r = rings[ri2];
        r.rotation.x += r.userData.rx * speedMul;
        r.rotation.y += r.userData.ry * speedMul;
        r.rotation.z += r.userData.rz * speedMul;
      }
    }

    // Camera zoom (5s -> 7s)
    if (t >= 5.0 && t < 7.0) {
      camera.position.z = 6 - ((t - 5.0) / 2.0) * 0.4;
    }

    // Brain sphere micro-pulse (slows during phase 3)
    var pulseSpeed = t < 5.0 ? 1.5 : 1.5 - ((t - 5.0) / 2.0) * 0.5;
    pulseSpeed = Math.max(pulseSpeed, 1.0);
    for (var si = 0; si < brainSpheres.length; si++) {
      var bs = brainSpheres[si];
      bs.scale.setScalar(0.95 + 0.05 * Math.sin(t * pulseSpeed + bs.userData.phase));
    }

    // Dust drift
    dust.rotation.y = t * 0.008;
    dust.rotation.x = Math.sin(t * 0.005) * 0.02;

    // Glow pulse
    glowSphere.scale.setScalar(1 + 0.1 * Math.sin(t * 1.2));
    glowSphere.material.opacity = 0.08 + 0.04 * Math.sin(t * 1.2);

    renderer.render(scene, camera);

    // Background lighten at 7.0s
    if (t >= 7.0 && !overlayEl.classList.contains('lighten')) {
      overlayEl.classList.add('lighten');
    }

    // Auto-fade at 7.5s
    if (elapsed >= 7500 && !fading) fadeOut();

    requestAnimationFrame(animate);
  }

  animate();
})();
