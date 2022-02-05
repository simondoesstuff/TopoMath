<script>
  import EditableMathField from "../../../mathquill/EditableMathField.svelte";
  import {fly} from 'svelte/transition';
  import {createEventDispatcher} from "svelte";
  import SoftButton from "$lib/components/SoftButton.svelte";
  import MenuIcon from '$lib/svgIcons/Menu.svelte'
  import Minus from "$lib/svgIcons/Minus.svelte";
  import Plus from "$lib/svgIcons/Plus.svelte";


  let latex = 'f(x)';
  let contracted = false;

  const onEditLatex = createEventDispatcher();

  function handleLatexEdit(e) {
    // preserve state
    latex = e.detail.latex;

    // forward the event
    onEditLatex('latexedit', {
      latex: latex
    })
  }
</script>





{#if !contracted}
    <div transition:fly={{y: -100}}>
        <div class="flex justify-between p-3 px-6 align-middle bg-indigo-900">
            <SoftButton>
                <MenuIcon/>
            </SoftButton>
            <EditableMathField
                    on:latexedit={handleLatexEdit}
                    clazz="grid place-items-center text-6xl text-white"
            >
                {latex}
            </EditableMathField>

            <div>
                <SoftButton clazz="mb-2">
                    <Plus/>
                </SoftButton>
                <SoftButton>
                    <Minus/>
                </SoftButton>
            </div>
        </div>

        <div
                on:click={() => contracted = !contracted}
                class="opacity-60 ribbon"
        >
        </div>
    </div>
{/if}

{#if contracted}
    <div
            in:fly={{delay: 400, y: -50}}
            on:click={() => contracted = !contracted}
            class="opacity-25 ribbon"
    >
    </div>
{/if}





<style>
    .ribbon {
        @apply absolute right-1/4 w-12 h-4 bg-gray-400;

        transition: height ease-out;
        transition-duration: 300ms;
        border-radius: 50% 50% 50% 50% / 0 0 40% 40%;
    }

    .ribbon:hover {
        @apply h-8 bg-gray-300 opacity-100;
    }
</style>