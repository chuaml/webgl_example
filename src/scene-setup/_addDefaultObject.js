import * as THREE from 'three';

export default function (
    scene,
) {

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

    const texture = new THREE.TextureLoader().load('img/worldmap.png');
    // texture.offset = new THREE.Vector2(0, 0.4);
    material = new THREE.MeshStandardMaterial({
        map: texture,
        // normalMap: texture,
        // metalness: 0.6,
        roughness: .8,
    });
    const geometry = new THREE.TorusGeometry(10, 3, 16, 200);
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

    let r_mutiplier = 1;
    document.addEventListener('mousedown', function (e) {
        r_mutiplier += 2;
    });

    document.addEventListener('mouseup', function (e) {
        r_mutiplier = 1;
    });

    return (function () {
        donut.rotation.x += 0.02 * r_mutiplier;
        donut.rotation.y += 0.01 * r_mutiplier;
        donut.rotation.z += 0.01 * r_mutiplier;

        moonOrbit.rotation.x += 0.001 * r_mutiplier;
        moonOrbit.rotation.z += 0.02 * r_mutiplier;

        sunOrbit.rotation.y += 0.02 * r_mutiplier;
    });
}