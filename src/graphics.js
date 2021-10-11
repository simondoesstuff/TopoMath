import * as Heights from "./heightMap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";
import domLog from "./outputUtil";
import { BufferAttribute } from "three";

const length = 120;
const segments = 200;
const lerpMin = .2;
const changeSmoothness = 0.3;

const lighting = {
    ambientIntensity: undefined,
    directionalIntensity: undefined,
};

let scene, camera, renderer, controls, mainLight, stats;
let autoRotateObjects = [];

// scene, camera
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.set(100, 50, 0);

renderer = new THREE.WebGLRenderer({
    canvas: $("#bg")[0],
    antialias: true,
});

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap = THREE.PCFSoftShadowMap;

// directional light
// mainLight = new THREE.HemisphereLight( 0xffffbb, lighting.directionalIntensity )
// mainLight.position.set( 50, 75, 50 );

// scene.add(new THREE.HemisphereLightHelper(mainLight))
// scene.add(mainLight);

// ambient light
// var ambientLight = new THREE.AmbientLight(0xffffff, lighting.ambientIntensity );
// scene.add(ambientLight);

// controls
//  todo       nice and smooth, typed f(x).   Typed 3f(x) and back to f(x), suddenly smoothing disappeared
controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window); // does some small stuff like allowing you to move with arrow keys

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.maxPolarAngle = Math.PI / 2;

controls.rotateSpeed = 0.25;

// stats
stats = Stats();
$("body").append(stats.dom);

// torus
const torusGeom = new THREE.TorusGeometry(10, 3, 16, 100);

const torusMat = new THREE.MeshBasicMaterial({
    wireframe: true,
});

const torus = new THREE.Mesh(torusGeom, torusMat);

autoRotateObjects.push(torus);
scene.add(torus);

// plane
const planeGeometry = new THREE.PlaneGeometry(
    length,
    length,
    segments,
    segments
);

const planeMaterial = new THREE.MeshNormalMaterial({
    //   vertexColors: THREE.VertexColors,
    //   color: 0xbdf3fa,
    side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;

scene.add(plane);

// used for updatePlane()           // todo move to js file only for plane
let planeSmoothingVerticiesDone = [];
let planeSmoothingVerticiesLeft;    // number

/**
 * Update all height values in the plane.
 */
export function updatePlane() {
    Heights.update();

    planeSmoothingVerticiesLeft = planeGeometry.getAttribute('position').count;
    planeSmoothingVerticiesDone = [];
}

function animatePlane() {
    let positions = planeGeometry.getAttribute("position");
    let updatedSomething = false;

    for (let i = 0; i < positions.count && planeSmoothingVerticiesLeft != 0; i++) {
        // in the plane's local grid, X & Y are horizontal and Z

        let x = positions.getX(i);
        let y = positions.getY(i);
        let z = positions.getZ(i);

        // graphically (+) is down/right, but mathematically it is up/left.
        // these align each axis to make more sense mathematically
        x *= -1;
        y *= -1;

        let newZ;

        try {
            // this may throw an error because it tried to evaluate with a reference to a variable that doesn't exist
            newZ = Heights.evaluate(x, y);

            // graphically (+) is down, but mathematically it is up.
            // aligns axis to make more sense mathematically
            newZ *= -1;
        } catch (e) {
            if (e === "Failed Evaluation") {
                plane.visible = false;
                return;
            }
        }

        // if close enough
        if (Math.abs(newZ - z) < lerpMin) {
            z = newZ;

            if (!planeSmoothingVerticiesDone[i]) {
                // close enough but not yet done
                planeSmoothingVerticiesDone[i] = true;
                planeSmoothingVerticiesLeft--;
            } else {
                // close enough and already done
                continue;
            }
        } else {
            // lerp
            z = z + changeSmoothness * (newZ - z);
        }

        positions.setZ(i, z);
        updatedSomething = true;
        positions.needsUpdate = true;
    }

    if (updatedSomething) {
        console.log('computing normals');   // todo remove
        planeGeometry.computeVertexNormals();
    }

    plane.visible = true;
}

// event: window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    // const deltaTime = Math.min( 0.05, clock.getDelta() ) / STEPS_PER_FRAME;

    for (const obj of autoRotateObjects) {
        obj.rotation.x += 0.003;
        obj.rotation.y += 0.003;
        obj.rotation.z += 0.003;
    }

    stats.update();
    animatePlane();
    controls.update();

    renderer.render(scene, camera);
}

// start animation loop
animate();
window.addEventListener("resize", onWindowResize);
