<script>
  import DomLog from "../../DomLog.svelte";
  import {createScene} from "../../../scripts/graphics/threeJsScene/Scene.js";
  import {onMount} from "svelte";
  import ExpressionBar from "./ControlBar/ControlBar.svelte";


  let elCanvas;
  let elLog;

  onMount(() => {
    createScene(elCanvas);
  });
</script>





<ExpressionBar on:latexedit={(e) => elLog.log(e.detail.latex)}/>

<div class="absolute top-0 right-0 z-50 mr-3 text-right opacity-40">
    <DomLog bind:this={elLog}/>
</div>

<canvas bind:this={elCanvas} class="absolute top-0 right-0 -z-30"></canvas>





<style>
    :global(body) {
        background-color: black;
    }
</style>