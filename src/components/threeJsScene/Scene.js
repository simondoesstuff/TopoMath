import * as Three from "three";


let elCanvas;

let camera, scene, renderer;
let geometry, material, mesh;

export function createScene(canvas) {
  elCanvas = canvas;
  init();
}

function init() {
  camera = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new Three.Scene();

  geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
  material = new Three.MeshNormalMaterial();

  mesh = new Three.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new Three.WebGLRenderer({
  canvas: elCanvas,
  antialias: true
});

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
}

function animation( time ) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}