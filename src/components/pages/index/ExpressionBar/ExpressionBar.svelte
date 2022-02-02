<script>
  import EditableMathField from "../../../mathquill/EditableMathField.svelte";
  import {fly} from 'svelte/transition';
  import {createEventDispatcher} from "svelte";


  let latex = 'f(x)';
  let contracted = false;

  const onEditLatex = createEventDispatcher();

  function handleLatexEdit(e) {
    latex = e.detail.latex;

    onEditLatex('latexedit', {
      latex: latex
    })
  }
</script>





{#if !contracted}
    <div transition:fly={{y: -100}}>
        <div class="grid place-items-center p-3 text-5xl text-white bg-indigo-900">
            <EditableMathField on:latexedit={handleLatexEdit}>
                {latex}
            </EditableMathField>
        </div>

        <div
                on:click={() => contracted = !contracted}
                class="ribbon opacity-80"
        >
        </div>
    </div>
{/if}

{#if contracted}
    <div
            in:fly={{delay: 400, y: -50}}
            on:click={() => contracted = !contracted}
            class="opacity-30 ribbon"
    >
    </div>
{/if}





<style>
    .ribbon {
        @apply absolute right-1/4 w-12 h-4 bg-gray-400;

        transition: height ease-out;
        transition-duration: 300ms;
        border-radius: 50% 50% 50% 50% / 0% 0% 40% 40%;
    }

    .ribbon:hover {
        @apply h-8;
    }
</style>