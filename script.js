// --- SCÈNE DE BASE ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumière
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// --- CHARGER UN MODELE GLB ---
const loader = new THREE.GLTFLoader();

// 🔹 Mets ici le nom du modèle à charger
const modelPath = "./models/heart_normal.glb";

loader.load(
  modelPath,
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
  },
  undefined,
  function (error) {
    console.error("Erreur de chargement du modèle :", error);
  }
);

// --- ANIMATION ---
function animate() {
  requestAnimationFrame(animate);

  // Tu peux faire tourner tous les objets de la scène
  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.rotation.y += 0.01;
    }
  });

  renderer.render(scene, camera);
}
animate();

// --- ADAPTATION À LA TAILLE DE FENÊTRE ---
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
