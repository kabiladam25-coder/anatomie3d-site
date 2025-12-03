// --- SCENE 3D DE BASE ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 1, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
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
  "models/model.glb", // ⚠️ Remplace par ton fichier
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Ajustements du modèle
    model.scale.set(0.01, 0.01, 0.01); // Réduire si trop grand
    model.position.set(0, -1, 0);
  },
  undefined,
  (err) => {
    console.error("Erreur de chargement du modèle:", err);
  }
);

// --- CONTROLES (rotation avec la souris) ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

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
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});
