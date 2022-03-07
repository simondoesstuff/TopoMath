<script>
    export let variant;
    export let _class;
    export let _in;
    export let _out;

    if (variant !== "expBar" && variant !== "menuBar") {
        throw "Variant must be 'expBar' or 'menuBar'";
    }

    const ifAvailable = (node, anim) => {
        return anim ? anim(node) : undefined;
    }
</script>




<div class="grid place-items-center">
    <button
            on:click
            in:ifAvailable={_in}
            out:ifAvailable={_out}
            class:expBar={variant === "expBar"}
            class:menuBar={variant === "menuBar"}
            class={`
            ${_class}
            p-2 bg-gray-800 bg-opacity-95 rounded-3xl border-2 border-opacity-60 opacity-70 border-solid font-semibold
            transition-colors duration-500 cursor-pointer block
            hover:border-transparent hover:opacity-100
        `}>
        <slot></slot>
    </button>
</div>



<style>
    .expBar {
        @apply text-gray-300 border-indigo-500;
    }

    .expBar:hover {
        @apply bg-indigo-500;
    }

    .menuBar {
        @apply text-indigo-200 border-indigo-200;
    }

    .menuBar:hover {
        @apply text-gray-800 bg-indigo-200;
    }
</style>