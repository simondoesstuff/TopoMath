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
  import RibbonToggle from "$lib/components/pages/index/RibbonToggle.svelte";


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
                class:menuDiv={menuMode}
                class:expBarDiv={!menuMode}
                class="flex gap-3 p-3 px-6 align-middle"
        >
            <!--    Menu / Close Button     -->
            <SoftButton
                    variant={menuMode ? 'menuBar' : 'expBar'}
                    on:click={() => menuMode = !menuMode}
            >
                {#if menuMode}
                    <XIcon/>
                {:else}
                    <MenuIcon/>
                {/if}
            </SoftButton>

            {#if !menuMode}

                <!--    MQ Expression Box       -->
                <EditableMathField on:latexedit={handleLatexEdit} clazz="text-6xl text-white">
                    {latex}
                </EditableMathField>
                <!--    PlusIcon and MinusIcon Buttons      -->
                <div>
                    <SoftButton variant="expBar" clazz="mb-2">
                        <PlusIcon/>
                    </SoftButton>
                    <SoftButton variant="expBar">
                        <MinusIcon/>
                    </SoftButton>
                </div>

                {:else}

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






<style>
    .menuDiv {
        @apply flex-col justify-around bg-indigo-500;
    }
    
    .expBarDiv {
        @apply justify-between bg-indigo-900;
    }
</style>