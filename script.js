// --- SCENE ---
const scene = new THREE.Scene();

// --- CAMERA ---
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

// IMPORTANT : attacher dans le container
document.getElementById("viewer-container").appendChild(renderer.domElement);

// --- LIGHTS ---
scene.add(new THREE.AmbientLight(0xffffff, 1));
const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(5, 5, 5);
scene.add(dir);

// --- LOADER ---
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
  undefined,
  (err) => console.error("Erreur squelette:", err)
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
  undefined,
  (err) => console.error("Erreur corps:", err)
);

// --- CONTROLS ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- LOOP ---
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// --- RESIZE ---
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
