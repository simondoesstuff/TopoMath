<script>
    import * as THREE from 'three';
    import {Mesh} from "svelte-cubed";
    import * as HeightMap from "./heightMap.js";
    import * as SC from "svelte-cubed";


    export let expression;
    export let colorFunction = () => new THREE.Color(0, 0, 0);
    export let length = 200;
    export let segments = 200;

    export let doLerp = true;
    export let lerpThreshold = .01;     // how far we should lerp
    export let lerpSpeed = 0.3;  // how fast we should lerp


    let geometry = new THREE.PlaneGeometry(length, length, segments, segments);
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 3), 3));

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
        HeightMap.newExpression(latexExp)

        let positions = geometry.attributes.position;
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

            let target = 20 * HeightMap.evaluateAt(x, y);

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
        let positions = geometry.attributes.position;

        verticesInMotion = verticesInMotion.filter(vertexIndex => {
            const targetHeight = targets[vertexIndex];
            let z = positions.getZ(vertexIndex);

            if (!doLerp) {
                positions.setZ(vertexIndex, targetHeight);
                // remove the vertex from the queue
                return false;
            }

            // lerp
            z = z + lerpSpeed * (targetHeight - z);

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

        positions.needsUpdate = true;
    }

    const computeColors = (colorFunction) => {
        const {color: colors, position: positions, normal: normals} = geometry.attributes;

        for (let i = 0; i < positions.count; i++) {
            const angle = Math.abs(normals.getZ(i));
            const height = positions.getZ(i);

            let color = colorFunction(angle, height - 9);
            colors.setXYZ(i, color.r, color.g, color.b);
        }

        colors.needsUpdate = true;
    }

    // the plane automatically updates based on parameters
    $: if (expression) newExpression(expression);
    $: if (colorFunction) computeColors(colorFunction);

    // called every frame.
    // each frame if the verticies need to ease into new positions
    // the mesh will have to be updated.
    SC.onFrame(() => {
        // if there are no vertices to animate
        if (verticesInMotion.length === 0) return

        lerpHeights();
        geometry.computeVertexNormals();
        computeColors(colorFunction);

        // for svelte reactivity
        geometry = geometry;
    });
</script>


<Mesh
    rotation={[-Math.PI/2, 0, 0]}
    position={[0, -5, 0]}
    receiveShadow
    castShadow
    geometry={geometry}
    material={new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        vertexColors: true,
        shininess: 20,
        emissive: '#000000',
    })}
/>