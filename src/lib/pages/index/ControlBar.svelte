<script>
    import EditableMathField from "$lib/components/mathquill/EditableMathField.svelte";
    import {fly} from 'svelte/transition';
    import {createEventDispatcher} from "svelte";
    import SoftButton from "$lib/components/SoftButton.svelte";
    import MenuIcon from '$lib/svgIcons/MenuIcon.svelte'
    import MinusIcon from "$lib/svgIcons/MinusIcon.svelte";
    import PlusIcon from "$lib/svgIcons/PlusIcon.svelte";
    import XIcon from "$lib/svgIcons/XIcon.svelte";
    import GlobeAltIcon from "$lib/svgIcons/GlobeAltIcon.svelte";
    import RibbonToggle from "$lib/pages/index/RibbonToggle.svelte";


    let latex = 'f(x)';
    let contracted = false;
    let menuMode = false;

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
    <div transition:fly|local={{y: -100}}>
        <div
                class:menuBar="{menuMode}"
                class:expBar="{!menuMode}"
                class="flex gap-3 p-3 px-6 align-middle transition-height transition-colors duration-1000"
        >
            {#if !menuMode}

                <!--    Menu Button     -->
                <SoftButton
                        variant='expBar'
                        on:click={() => menuMode = !menuMode}
                >
                    <MenuIcon/>
                </SoftButton>

                <!--    MQ Expression Box       -->
                <EditableMathField on:latexedit={handleLatexEdit} _class="text-6xl text-white">
                    {latex}
                </EditableMathField>
                <!--    PlusIcon and MinusIcon Buttons      -->
                <div>
                    <button class="expBar btn-soft mb-2">
                        <PlusIcon/>
                    </button>
                    <SoftButton variant="expBar">
                        <MinusIcon/>
                    </SoftButton>
                </div>

            {:else}

                <!--    Close Button    -->
                <SoftButton
                        _in={node => fly(node, {x: -200})}
                        variant='menuBar'
                        on:click={() => menuMode = !menuMode}
                >
                    <XIcon/>
                </SoftButton>
                <!--    Menu Contents   -->
                <GlobeAltIcon/>

            {/if}
        </div>

        <!--    Contraction "Ribbon"            -->
        <RibbonToggle
                contracted={contracted}
                on:click={() => contracted = !contracted}
        />
    </div>
{:else}

    <!--    Contraction "Ribbon"            -->
    <RibbonToggle
            flyIn
            contracted={contracted}
            on:click={() => contracted = !contracted}
    />

{/if}


<style lang="scss">
  .menuBar {
    div {
      @apply flex-col justify-around bg-indigo-500;
    }

    button {
      @apply text-indigo-200 border-indigo-200;

      &:hover {
        @apply text-gray-800 bg-indigo-200;
      }
    }
  }

  .expBar {
    div {
      @apply justify-between bg-indigo-900;
    }

    button {
      @apply text-gray-300 border-indigo-500;

      &:hover {
        @apply bg-indigo-500;
      }
    }
  }
</style>