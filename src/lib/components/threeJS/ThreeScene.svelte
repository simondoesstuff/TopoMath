<script>
    import * as THREE from 'three';
    import * as SC from 'svelte-cubed';

    let width = 1;
    let height = 1;
    let depth = 1;

    let spin = 0;

    SC.onFrame(() => {
        spin += 0.01;
    });
</script>

<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
    <SC.Mesh
            geometry={new THREE.BoxGeometry()}
            material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
            scale={[width, height, depth]}
            rotation={[0, spin, 0]}
    />
    <SC.PerspectiveCamera position={[1, 1, 3]}/>
    <SC.OrbitControls enableZoom={false}/>
    <SC.AmbientLight intensity={0.6}/>
    <SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]}/>
</SC.Canvas>