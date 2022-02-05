<script>
    export let clazz;
</script>




<div class={`grid place-items-center ${clazz}`}>
    <button on:click class="
            p-2 bg-gray-800 bg-opacity-95 rounded-3xl border-2 border-indigo-500 border-opacity-60 opacity-70 border-solid
            font-semibold text-gray-300
            transition-colors duration-500 cursor-pointer block
            hover:bg-indigo-500 hover:border-transparent hover:opacity-100"
    >
        <slot></slot>
    </button>
</div>