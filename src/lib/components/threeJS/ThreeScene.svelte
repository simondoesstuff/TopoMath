<script>
    // two svelte cubed imports are necessary because the IDE can't recognize
    // the second import as a svelte component
    import {
        AmbientLight,
        Canvas,
        DirectionalLight,
        Mesh,
        onFrame,
        OrbitControls,
        PerspectiveCamera
    } from "svelte-cubed";
    import * as THREE from 'three';
    import ExpressionPlane from "./ExpressionPlane.svelte";


    export let expression, colorFunction;

    let spin = 0;
    onFrame(() => spin += .07);
</script>

<Canvas antialias background={new THREE.Color('#21252b')}>
    <Mesh
        geometry={new THREE.BoxGeometry()}
        material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
        scale={[1, 1, 1]}
        rotation={[spin, spin, spin]}
        position={[0, -1000, 0]}
    />

    <PerspectiveCamera position={[150, 75, 0]}/>
    <OrbitControls enablePan dampingFactor={0.05} enableDamping={false} enableZoom/>
    <AmbientLight intensity={0.6}/>
    <DirectionalLight intensity={0.6} position={[-2, 3, 2]}/>

    <ExpressionPlane expression={expression} colorFunction={colorFunction}/>
</Canvas>
