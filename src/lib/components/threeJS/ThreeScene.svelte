<script>
    import * as THREE from 'three';
    // two svelte cubed imports are necessary because the IDE can't recognize
    // the second import as a svelte component
    import {AmbientLight, Canvas, DirectionalLight, Mesh, OrbitControls, PerspectiveCamera} from "svelte-cubed";
    import * as SC from "svelte-cubed";
    import ExpressionPlane from "./ExpressionPlane.svelte";


    // latex expression string
    export let latex;

    let spin = 0;

    SC.onFrame(() => {
        spin += 0.01;
    });
</script>

<Canvas antialias background={new THREE.Color('papayawhip')}>
    <Mesh
            geometry={new THREE.BoxGeometry()}
            material={new THREE.MeshStandardMaterial()}
            scale={[1, 1, 1]}
            rotation={[0, spin, 0]}
    />
    <PerspectiveCamera position={[150, 75, 0]}/>
    <OrbitControls enablePan dampingFactor={0.05} enableDamping enableZoom/>
    <AmbientLight intensity={0.6}/>
    <DirectionalLight intensity={0.6} position={[-2, 3, 2]}/>

    <ExpressionPlane expression={latex}/>
</Canvas>