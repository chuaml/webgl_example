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

const lightBulb = new THREE.PointLight(0xffffff, 1001, 0, 2);
lightBulb.position.set(5, 15, 5);
scene.add(lightBulb);

// debug light
scene.add(new THREE.PointLightHelper(lightBulb));

let r_mutiplier = 1;
function animate() {
  object.rotation.x += 0.01 * r_mutiplier;
  object.rotation.y += 0.03 * r_mutiplier;
  object.rotation.z += 0.01 * r_mutiplier;

  camControl.update();

  renderer.render(scene, camera);
  
  requestAnimationFrame(animate);
}


// 2. add object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
let material;

// 2d and wireframe
// material = new THREE.MeshBasicMaterial({
//   color: 0xfff,
//   wireframe: true,
// });

// real alike skin
material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  wireframe: false,
});


const object = new THREE.Mesh(geometry, material);
scene.add(object);



// 3. render all and draw to screen
animate();




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