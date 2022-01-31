<script>
  import {onMount} from "svelte";
  import { browser } from '$app/env';

  let elProblem;
  let elAnswer;
  let elCanvas;

  let shade = true;
  let logs = [];

  const log = s => {
    logs = [...logs, s]
    shade = !shade;
  }

  const jlog = s => log(JSON.stringify(s, null, 1));

  // ----- math quill

  onMount(async () => {
    log("\t--- mounted.")

    await import('mathquill/build/mathquill.js');
    await import('mathquill/build/mathquill.css');

    const MQ = window.MathQuill.getInterface(2);

    MQ.StaticMath(elProblem);

    var answer = MQ.MathField(elAnswer, {
      handlers: {
        edit: function() {
          log(answer.latex())
        }
      }
    });

    log("\t--- done.")
  });

  // ----- three JS

  import * as THREE from 'three/src/Three.js';

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






<p class="text-white">
    Solve <span bind:this={elProblem}>ax^2 + bx + c = 0</span>:
    <span bind:this={elAnswer}>x=</span>
</p>

<pre class="
 m-5
 text-red-400
">
    {#each logs as log, i}
        <pre class:text-blue-500="{i % 2 === 0}">{log}</pre>
	{/each}
</pre>

<div class="absolute top-0 left-0 -z-30">
    <canvas bind:this={elCanvas}></canvas>
</div>

