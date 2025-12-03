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

// --- CHARGEMENT DU MODELE GLB ---
const loader = new THREE.GLTFLoader();

loader.load(
  "models/model.glb",  // ⚠️ Mets ICI le nom correct de ton fichier GLB
  (gltf) => {
    const model = gltf.scene;

    // Échelle / position
    model.scale.set(0.01, 0.01, 0.01); 
    model.position.set(0, -1, 0);

    scene.add(model);
  },
  (progress) => {
    console.log(`Chargement : ${(progress.loaded / progress.total) * 100}%`);
  },
  (err) => {
    console.error("Erreur de chargement du modèle:", err);
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
