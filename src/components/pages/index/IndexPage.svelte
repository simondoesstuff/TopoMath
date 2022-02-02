<script>
  import EditableMathField from "../../mathquill/EditableMathField.svelte";
  import DomLog from "../../DomLog.svelte";
  import {createScene} from "../../threeJsScene/Scene.js";
  import {onMount} from "svelte";


  let elCanvas;
  let elLog;

  onMount(() => {
    createScene(elCanvas);
  });
</script>





<div>
    <div class="grid place-items-center p-3 text-5xl text-white bg-indigo-900">
        <!--                todo how do shadow??????????????????       -->
        <EditableMathField
                on:latexedit={e => elLog.log(e.detail.latex)}
                class="shadow shadow-lg shadow-black"
        >
            f(x)
        </EditableMathField>
    </div>

    <div class="absolute top-0 right-0 z-50 mr-3 text-right opacity-40">
        <DomLog bind:this={elLog}/>
    </div>
</div>

<canvas bind:this={elCanvas} class="absolute top-0 right-0 -z-30"></canvas>





<style>
    :global(body) {
        background-color: black;
    }
</style>