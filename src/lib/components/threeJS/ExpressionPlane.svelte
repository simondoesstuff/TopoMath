<script>
    import * as THREE from 'three';
    import {Mesh} from "svelte-cubed";
    import * as ValueGen from "./heightMap.js";
    import * as SC from "svelte-cubed";
    import * as Svelte from "svelte";

    export let expression = 'f(x)';
    export let length = 120;
    export let segments = 200;
    // these settings configure the lerp
    export let lerpThreshold = .01;     // how far we should lerp
    export let changeSmoothness = 0.1;  // how fast we should lerp

    let geometry = new THREE.PlaneGeometry(length, length, segments, segments);
    let targets = []  // a list of heights matched to mesh vertices by index
    let verticesInMotion = [] // a list of indexes (matching 'targets')

    // reset the plane to prime it for recalculation and lerping
    const reset = () => {
        targets = []; // fresh new target heights
        verticesInMotion = []; // stop any ongoing vertex animations
    };

    /**
     * Update all height values in the plane.
     */
    const newExpression = (latexExp) => {
        ValueGen.newExpression(latexExp)

        let positions = geometry.getAttribute('position');
        let vertexCount = positions.count
        reset();

        // set the target heights
        for (let i = 0; i < vertexCount; i++) {
            let x = positions.getX(i);
            let y = positions.getY(i);

            // graphically (+) is down/right, but mathematically it is up/left.
            // these align each axis to make more sense mathematically
            x *= -1;
            y *= -1;

            let target = ValueGen.evaluateAt(x, y);

            if (target == null) {
                // ran into a problem. latexExp probably invalid
                // cancel the height update
                return;
            }

            // graphically (+) is down, but mathematically it is up.
            // aligns axis to make more sense mathematically
            target *= -1;

            targets.push(target);
        }

        // the update was successful.

        // add every vertex to the queue to be animated
        verticesInMotion = Array.from(targets.keys());
    }

    // lerps the CURRENT heights of the geometry
    // to the TARGET heights. Thus the target
    // heights can be reset to cause the mesh
    // to update.
    const lerpHeights = () => {
        let positions = geometry.getAttribute('position');

        verticesInMotion = verticesInMotion.filter(vertexIndex => {
            const targetHeight = targets[vertexIndex];
            let z = positions.getZ(vertexIndex);

            // if the lerpThreshold is 0, then lerp
            // is essentially disabled.
            if (lerpThreshold === 0) {
                positions.setZ(vertexIndex, targetHeight);
                // remove the vertex from the queue
                return false;
            }

            // lerp
            z = z + changeSmoothness * (targetHeight - z);

            // if close enough
            if (Math.abs(targetHeight - z) <= lerpThreshold) {
                // jump to the target height
                z = targetHeight;
                positions.setZ(vertexIndex, z);

                // remove the vertex from the motion queue
                return false;
            }

            // this vertex has more animating to do...
            positions.setZ(vertexIndex, z);
            return true;
        });
    }

    // when the expression is updated, the plane must update
    $: newExpression(expression);

    // called every frame.
    // each frame if the verticies need to ease into new positions
    // the mesh will have to be updated.
    SC.onFrame(() => {
        // if there are no vertices to animate
        if (verticesInMotion.length === 0) return

        lerpHeights();
        geometry.getAttribute('position').needsUpdate = true;
        geometry.computeVertexNormals();
    });

    // give the mesh a default expression
    Svelte.onMount(async () => {
        newExpression(expression);

        const count = geometry.attributes.position.count;
        geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );

        setTimeout(() => {
            const color = new THREE.Color();
            const position = geometry.attributes.position;
            const colors = geometry.attributes.color;

            for (let i = 0; i < count; i++) {
                color.setHSL(position.getZ(i), 1.0, 0.5);
                colors.setXYZ(i, color.r, color.g, color.b);
            }

            console.log('done');
            colors.needsUpdate = true;
        }, 2000);
    });
</script>


<Mesh
    geometry={geometry}
    material={new THREE.MeshStandardMaterial({side: THREE.DoubleSide, vertexColors: true})}
    rotation={[-Math.PI/2, 0, 0]}
    position={[0, -5, 0]}
    receiveShadow
    castShadow
/>