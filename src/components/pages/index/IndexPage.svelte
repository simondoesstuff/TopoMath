<script>
  import EditableMathField from "../../mathquill/EditableMathField.svelte";
  import DomLog from "../../DomLog.svelte";
  import * as Three from 'three';


  let elCanvas;
  let elLog;

  // ----- three JS

  import {onMount} from "svelte";

  onMount(async () => {
    elLog.log('\t---mounted...');
  })


  let camera, scene, renderer;
  let geometry, material, mesh;

  onMount(() => init())

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
</script>





<div>
    Solve:
    <EditableMathField on:latexedit={e => elLog.log(e.detail.latex)}>
        x=
    </EditableMathField>
</div>

<div class="absolute top-0 right-0 z-50 text-right opacity-30">
    <DomLog bind:this={elLog}/>
</div>

<canvas bind:this={elCanvas}></canvas>





<style lang="scss">
  :global(body) {
    background-color: black;
    padding: 1rem;
    overflow-x: hidden;
  }
</style>