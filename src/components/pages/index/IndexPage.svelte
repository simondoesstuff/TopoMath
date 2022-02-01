<script>
  import {onMount} from "svelte";

  let elCanvas;

  let shade = true;
  let logs = [];

  const log = s => {
    logs = [...logs, s]
    shade = !shade;
  }

  const jlog = s => log(JSON.stringify(s, null, 1));

  log("\t--- initialized.")

  // ----- three JS

  import * as THREE from 'three/src/Three.js';
  import EditableMathField from "../../mathquill/EditableMathField.svelte";

  let camera, scene, renderer;
  let geometry, material, mesh;

  onMount(() => init())

  function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({
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
</script>






<div class="text-white">
    Solve:
    <EditableMathField on:edit={latex => log(latex.detail)}>x=</EditableMathField>
</div>

<pre class="
 m-5
 text-red-400
">
    {#each logs as log, i}
        <pre class:text-blue-500={i % 2 === 0}>{log}</pre>
	{/each}
</pre>

<div class="absolute top-0 left-0 -z-30">
    <canvas bind:this={elCanvas}></canvas>
</div>

