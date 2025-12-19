// --- SCÈNE DE BASE ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumière (même si ce n'est pas indispensable pour MeshBasicMaterial)
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// --- CHARGER UNE IMAGE COMME TEXTURE ---
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "images/mon_image.png", // 🔴 mets ici le chemin de ton image
  () => {
    console.log("Image chargée !");
  },
  undefined,
  (err) => {
    console.error("Erreur de chargement de l'image", err);
  }
);

// Plan qui affichera l'image
const geometry = new THREE.PlaneGeometry(4, 3); // largeur, hauteur
const material = new THREE.MeshBasicMaterial({ map: texture });
const panneau = new THREE.Mesh(geometry, material);
scene.add(panneau);

// --- ANIMATION ---
function animate() {
  requestAnimationFrame(animate);

  // Juste pour voir que ça bouge un peu
  panneau.rotation.y += 0.01;

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

