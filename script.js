// --- SCENE ---
const scene = new THREE.Scene();

// --- CAMERA ---
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 1, 5);

// --- RENDERER ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// --- LIGHTS ---
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// --- LOAD SKELETON GLB ---
const loader = new THREE.GLTFLoader();
let skeleton;

loader.load(
  "models/skeleton.glb",
  (gltf) => {
    skeleton = gltf.scene;

    // Scale + position if needed
    skeleton.scale.set(1.5, 1.5, 1.5);
    skeleton.position.set(0, -1.5, 0);

    scene.add(skeleton);
    console.log("Skeleton loaded!");
  },
  undefined,
  (err) => {
    console.error("Erreur chargement GLB:", err);
  }
);

// --- ANIMATION ---
function animate() {
  requestAnimationFrame(animate);

  // Rotate model if loaded
  if (skeleton) {
    skeleton.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
animate();

// --- RESIZE ---
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});
