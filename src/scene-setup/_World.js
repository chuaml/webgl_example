import * as THREE from 'three';

// 1. setup
export class World {

  scene;
  camera;
  renderer;
  constructor(
    canvas
  ) {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(windowWidth, windowHeight);
    this.renderer = renderer;

    const camera = new THREE.PerspectiveCamera(90, windowWidth / windowHeight, 0.1, 1000);
    camera.position.setZ(30);
    camera.position.setY(10);
    scene.add(new THREE.GridHelper(200, 50));
    this.camera = camera;
    this.scene = scene;

    // const camControl = new OrbitControls(camera, renderer.domElement);

    this._addLight();

    this.updateSceneState();
    this.animate();

    window.addEventListener('resize', function (ev) {
      this.camera.aspect = windowWidth / windowHeight;
      this.camera.updateProjectionMatrix();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(windowWidth, windowHeight);
    });

  }

  WORLD_TIME_SPEED = 1000 / 60;
  updateSceneState() {
    //   donut.rotation.x += 0.02 * r_mutiplier;
    //   donut.rotation.y += 0.01 * r_mutiplier;
    //   donut.rotation.z += 0.01 * r_mutiplier;

    //   moonOrbit.rotation.x += 0.001 * r_mutiplier;
    //   moonOrbit.rotation.z += 0.02 * r_mutiplier;
    // sunOrbit.rotation.y += 0.02 * r_mutiplier;

    setTimeout(_ => this.updateSceneState(), this.WORLD_TIME_SPEED);

    const tasks = this._stateToUpdate;
    const len = tasks.length;
    for (let i = 0; i < len; ++i) {
      try {
        tasks[i]();
      } catch (err) {
        this._logError(err);
      }
    }
  }

  _logError_task_timeoutId = 0;
  _logError_task_BufferCount = 0;
  _logError(err) {
    clearTimeout(this._logError_task_timeoutId);
    if (++this._logError_task_BufferCount > 120) {
      console.error(err);
      this._logError_task_BufferCount = 0;
    }
    else {
      this._logError_task_timeoutId = setTimeout(() => {
        console.error(err);
      }, 200);
    }

  }

  _stateToUpdate = [];
  addSceneState(func) {
    console.log(this);
    this._stateToUpdate.push(func);
  }

  removeSceneState(func) {
    this._stateToUpdate.remove(this._stateToUpdate.indexOf(func));
  }

  _addLight() {
    const globalLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(globalLight);

    const lightBulb = new THREE.PointLight(0xffffff, 1, 0, 2);
    lightBulb.position.set(5, 15, 5);
    this.scene.add(lightBulb);
    // debug light
    this.scene.add(new THREE.PointLightHelper(lightBulb));
  }

  updateCamControl = function () { };
  animate() {
    // camControl.update();
    this.updateCamControl();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(_ => this.animate());
  }
}
