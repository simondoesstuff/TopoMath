<script>
    export let variant;
    export let clazz;

    if (variant !== "expBar" && variant !== "menuBar") {
        throw "Variant must be 'expBar' or 'menuBar'";
    }
</script>




<div class={`grid place-items-center ${clazz}`}>
    <button
            on:click
            class:expBar={variant === "expBar"}
            class:menuBar={variant === "menuBar"}
            class="
                p-2 bg-opacity-95 rounded-3xl border-2 border-opacity-60 opacity-70 border-solid font-semibold
                transition-colors duration-500 cursor-pointer block
                hover:border-transparent hover:opacity-100
            ">
        <slot></slot>
    </button>
</div>




<style>
    .expBar {
        @apply text-gray-300 bg-gray-800 border-indigo-500;
    }

    .expBar:hover {
        @apply bg-indigo-500;
    }

    .menuBar {
        @apply text-indigo-200 bg-gray-800 border-indigo-200;
    }

    .menuBar:hover {
        @apply text-gray-800 bg-indigo-200;
    }
</style>