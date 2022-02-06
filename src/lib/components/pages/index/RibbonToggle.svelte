<script>
    import {fly} from 'svelte/transition';


    export let contracted;
    export let flyIn = false;

    const getTransition = (node) => {
        return flyIn ? fly(node, {delay: 400, y: -50}) : undefined;
    }
</script>





<div
        in:getTransition
        on:click
        class:opacity-25={contracted}
        class:opacity-60={!contracted}
        class="
                absolute right-1/4 w-12 h-4 bg-gray-400
                hover:h-8 hover:bg-gray-300 hover:opacity-100
                ribbon
            ">
</div>




<style>
    .ribbon {
        transition: height ease-out;
        transition-duration: 300ms;
        border-radius: 50% 50% 50% 50% / 0 0 40% 40%;
    }
</style>