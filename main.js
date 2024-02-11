import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// 1. setup
const scene = new THREE.Scene();


const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);
scene.add(new THREE.GridHelper(200, 50));
const camControl = new OrbitControls(camera, renderer.domElement);

const globalLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(globalLight);

const lightBulb = new THREE.PointLight(0xffffff, 1, 0, 2);
lightBulb.position.set(5, 15, 5);
scene.add(lightBulb);
// debug light
scene.add(new THREE.PointLightHelper(lightBulb));

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(11),
  new THREE.MeshBasicMaterial({ color: 0xffaf4d })
);
sun.position.set(0, 10, 50);

const sunOrbit = new THREE.Mesh(
  new THREE.SphereGeometry(200),
  new THREE.MeshBasicMaterial(),
);
const sunLight = new THREE.PointLight(0xffffff, 400, 0, 1);
sun.add(sunLight);
scene.add(new THREE.PointLightHelper(sunLight));

sunOrbit.add(sun);
scene.add(sunOrbit);




let r_mutiplier = 1;
const WORLD_TIME_SPEED = 1000 / 60;
function updateSceneState() {
  donut.rotation.x += 0.02 * r_mutiplier;
  donut.rotation.y += 0.01 * r_mutiplier;
  donut.rotation.z += 0.01 * r_mutiplier;

  moonOrbit.rotation.x += 0.001 * r_mutiplier;
  moonOrbit.rotation.z += 0.02 * r_mutiplier;

  sunOrbit.rotation.y += 0.02 * r_mutiplier;
  setTimeout(updateSceneState, WORLD_TIME_SPEED);
}
function animate() {
  camControl.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', function (ev) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// 2. add object
const geometry = new THREE.TorusGeometry(10, 3, 16, 200);
let material;

// 2d and wireframe
// material = new THREE.MeshBasicMaterial({
//   color: 0xfff,
//   wireframe: true,
// });

// real alike texture
// material = new THREE.MeshStandardMaterial({
//   color: 0xff6347,
//   wireframe: false,
// });

// img texture
const texture = new THREE.TextureLoader().load('img/worldmap.png');
// texture.offset = new THREE.Vector2(0, 0.4);
material = new THREE.MeshStandardMaterial({
  map: texture,
  // normalMap: texture,
  // metalness: 0.6,
  roughness: .8,
});


const donut = new THREE.Mesh(geometry, material);
donut.rotation.x = 3.14 / 2;
scene.add(donut);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2),
  new THREE.MeshStandardMaterial({ color: 0xffffff }),
);
moon.position.set(0, 24, 0);
const moonOrbit = new THREE.Mesh(
  new THREE.SphereGeometry(100),
  new THREE.MeshBasicMaterial(),
);
moonOrbit.add(moon);

scene.add(moonOrbit);

// 3. render all and draw to screen
animate();
updateSceneState();




// etc
function newStar() {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(.1, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  const [x, y, z] = Array(3).fill().map(x => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  return star;
}


Array(200).fill().forEach(function (x) {
  scene.add(newStar());
});


// movement
document.addEventListener('keydown', function (e) {
  if (e.key === 'w') {
    camera.position.z -= 1;
  }
  else if (e.key === 's') {
    camera.position.z += 1;
  }
  else if (e.key === 'a') {
    camera.position.x -= 1;
  }
  else if (e.key === 'd') {
    camera.position.x += 1;
  }
});

document.addEventListener('mousedown', function (e) {
  r_mutiplier += 2;
});

document.addEventListener('mouseup', function (e) {
  r_mutiplier = 1;
});