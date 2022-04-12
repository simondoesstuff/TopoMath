<script>
    import {onDestroy, onMount} from "svelte";


    let gpEle;
    let gp;

    onMount(async () => {
        const Grapick = (await import("grapick/src/Grapick.js")).default;
        await import("$lib/components/grapick/GrapickStyles.scss");

        gp = new Grapick({el: gpEle});

        // Handlers are color stops
        gp.addHandler(0, 'red');
        gp.addHandler(100, 'blue');

        // Do stuff on change of the gradient
        gp.on('change', complete => {
            console.log('change', complete);
        })
    });

    onDestroy(() => {
        gp.destroy();
    });
</script>


<div bind:this={gpEle} class="w-full">
</div>