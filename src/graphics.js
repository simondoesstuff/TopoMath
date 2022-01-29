import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import * as EQPlane from "./equationPlane";


const lighting = {
    ambientIntensity: undefined,
    directionalIntensity: undefined,
};

let scene, camera, renderer, controls, mainLight, stats;
let autoRotateObjects = [];
let updateFrameHooks = [];

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
const plane = EQPlane.newMesh();
updateFrameHooks.push(EQPlane.updateFrame)
scene.add(plane);

export const updatePlaneExpression = EQPlane.newExpression;

// event: window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

// animation loop
function updateFrame() {
    requestAnimationFrame(updateFrame);
    // const deltaTime = Math.min( 0.05, clock.getDelta() ) / STEPS_PER_FRAME;

    // rotate objects on the screen
    for (const obj of autoRotateObjects) {
        obj.rotation.x += 0.003;
        obj.rotation.y += 0.003;
        obj.rotation.z += 0.003;
    }

    // ripple updateFrame to the all the hooks
    for (const hook of updateFrameHooks) {
        hook()
    }

    stats.update();
    controls.update();

    renderer.render(scene, camera);
}

// start loop
updateFrame();
