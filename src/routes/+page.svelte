<script>
    import ControlBar from "$pages/index/ControlBar.svelte";
    import ThreeScene from "$components/threeJS/ThreeScene.svelte"
    import * as THREE from "three";
    import {normalizeHeightValue} from "$components/threeJS/heightMap.js";

    let expression = "f(x)";

    let colorFunction = (angle, height) => {
        height = 1 - normalizeHeightValue(height);
        return new THREE.Color().setHSL(angle, height, .2);
    }
</script>


<div class="absolute top-0 z-10 stretchWidth">
    <ControlBar bind:latex={expression}/>
</div>

<ThreeScene expression={expression} colorFunction={colorFunction}/>


<!--    todo remove domLog?     -->
<!--<div class="absolute top-0 right-0 z-50 mr-3 text-right opacity-40">-->
<!--    <DomLog bind:this={elLog}/>-->
<!--</div>-->


<style>
    :global(body) {
        background-color: black;
    }

    /* todo necessary? */
    .stretchWidth {
        width: 100vw;
    }
</style>