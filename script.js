// --- SCENE 3D DE BASE ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 1, 6);

// --- RENDERER ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- LUMIERES ---
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(5, 5, 5);
scene.add(dir);

// --- CHARGEMENT DES MODELES ---
const loader = new THREE.GLTFLoader();

// --- SQUELETTE ---
loader.load(
  "models/skeleton.glb",
  (gltf) => {
    const skeleton = gltf.scene;
    skeleton.scale.set(0.01, 0.01, 0.01);
    skeleton.position.set(0, -1, 0);
    scene.add(skeleton);
  },
  (progress) => {
    console.log(`Chargement du squelette : ${(progress.loaded / progress.total) * 100}%`);
  },
  (err) => {
    console.error("Erreur de chargement du squelette:", err);
  }
);

// --- CORPS HUMAIN ---
loader.load(
  "models/human_body_normal.glb",
  (gltf) => {
    const body = gltf.scene;
    body.scale.set(0.01, 0.01, 0.01);
    body.position.set(0, -1, 0);
    scene.add(body);
  },
  (progress) => {
    console.log(`Chargement du corps : ${(progress.loaded / progress.total) * 100}%`);
  },
  (err) => {
    console.error("Erreur de chargement du corps:", err);
  }
);

// --- CONTROLES (rotation avec la souris) ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;

// --- BOUCLE ANIMATION ---
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();

// --- RESPONSIVE ---
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
