import * as THREE from "three";
import * as ValueGen from "./heightMap.js"
import {lazyLog} from "./outputUtil.js";

// these are initialized in mesh
let geomLength;
let geomSegments;
let geometry;

const lerpThreshold = .01;
const changeSmoothness = 0.1;

let targets = []  // a list of heights matched to mesh vertices by index
let verticesInMotion = [] // a list of indexes (matching 'targets')

/**
 * The plane object to add to the scene
 */
export const newMesh = (length = 120, segments = 200) => {
  geomLength = length;
  geomSegments = segments;

  geometry = new THREE.PlaneGeometry(
    geomLength,
    geomLength,
    geomSegments,
    geomSegments
  );

  // todo placeholder material
  let material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;

  // give the plane a default function
  newExpression('f(x)');

  return mesh
}

/**
 * Update all height values in the plane.
 */
export const newExpression = (latexExp) => {
  ValueGen.newExpression(latexExp)

  let positions = geometry.getAttribute('position');
  let vertexCount = positions.count
  targets = []; // fresh new target heights
  verticesInMotion = []; // stop any ongoing vertex animations

  // set the target heights
  for (let i = 0; i < vertexCount; i++) {
    let x = positions.getX(i);
    let y = positions.getY(i);

    // graphically (+) is down/right, but mathematically it is up/left.
    // these align each axis to make more sense mathematically
    x *= -1;
    y *= -1;

    let target = ValueGen.evaluateAt(x, y);

    if (target == null) {
      // ran into a problem. latexExp probably invalid
      // cancel the height update
      return;
    }

    // graphically (+) is down, but mathematically it is up.
    // aligns axis to make more sense mathematically
    target *= -1;

    targets.push(target);
  }

  // the update was successful.

  // add every vertex to the queue to be animated
  verticesInMotion = Array.from(targets.keys());
}

// called every frame
export const updateFrame = () => {
  // if there are no vertices to animate
  if (verticesInMotion.length === 0) return

  lerpHeights();
  geometry.getAttribute('position').needsUpdate = true;
  geometry.computeVertexNormals();
}

const lerpHeights = () => {
  let positions = geometry.getAttribute('position');

  verticesInMotion.filter(vertexIndex => {
    const targetHeight = targets[vertexIndex];
    let z = positions.getZ(vertexIndex);

    // lerp
    z = z + changeSmoothness * (targetHeight - z);

    // if close enough
    if (Math.abs(targetHeight - z) < lerpThreshold) {
      // jump to the target height
      z = targetHeight;
      positions.setZ(vertexIndex, z);

      // remove the vertex from the motion queue
      return false;
    }

    // this vertex has more animating to do...
    positions.setZ(vertexIndex, z);
    return true;
  });
}
