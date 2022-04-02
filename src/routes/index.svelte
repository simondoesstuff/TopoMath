<script>
    import ControlBar from "$pages/index/ControlBar.svelte";
    import ThreeScene from "$components/threeJS/ThreeScene.svelte";
    import DomLog from "$components/DomLog.svelte";

    let latex = "f(x)";
    let elLog;
</script>


<div class="absolute top-0 z-10 stretchWidth">
    <ControlBar bind:latex on:latexedit={e => latex = e.detail.latex}/>
</div>

<ThreeScene bind:latex/>


<!--    todo remove domLog?     -->
<div class="absolute top-0 right-0 z-50 mr-3 text-right opacity-40">
    <DomLog bind:this={elLog}/>
</div>


<style>
    :global(body) {
        background-color: black;
    }

    /* todo necessary? */
    .stretchWidth {
        width: 100vw;
    }
</style>