<script>
    import ExpressionBar from "./ControlBar.svelte";
    import ThreeScene from "../../components/threeJS/ThreeScene.svelte";

    let elLog;
</script>


<ExpressionBar on:latexedit={(e) => elLog.log(e.detail.latex)}/>
<ThreeScene/>

<!--    todo remove domLog?     -->
<!--<div class="absolute top-0 right-0 z-50 mr-3 text-right opacity-40">-->
<!--    <DomLog bind:this={elLog}/>-->
<!--</div>-->

<!--<canvas bind:this={elCanvas} class="absolute top-0 right-0 -z-30"></canvas>-->


<style>
    :global(body) {
        background-color: black;
    }
</style>