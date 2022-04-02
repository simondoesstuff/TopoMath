<script>
    import EditableMathField from "$lib/components/mathquill/EditableMathField.svelte";
    import {fly} from 'svelte/transition';
    import MinusIcon from "$lib/svgIcons/MinusIcon.svelte";
    import PlusIcon from "$lib/svgIcons/PlusIcon.svelte";
    import RibbonToggle from "$lib/pages/index/RibbonToggle.svelte";
    import ColorSwatchIcon from "../../svgIcons/ColorSwatchIcon.svelte";
    import XIcon from "../../svgIcons/XIcon.svelte";


    export let latex;
    let contracted = false;
    let gradPaneOpen = false;
</script>


{#if !contracted}
    <div transition:fly|local={{y: -100}}>
        <div class="flex gap-3 justify-between content-between p-3 px-6 bg-indigo-900 h-32">
            <!--    Menu/Close Button     -->
                    <!--   todo is this outer grid center div necessary?    -->
            <div class="grid place-items-center">
                <button class="btn-soft" on:click={() => gradPaneOpen = !gradPaneOpen}>
                    {#if gradPaneOpen}
                        <XIcon/>
                    {:else}
                        <ColorSwatchIcon/>
                    {/if}
                </button>
            </div>

            {#if gradPaneOpen}
                <h3>gradients!</h3>
            {:else}
                <!--    MQ Expression Box       -->
                <EditableMathField on:latexedit _class="text-6xl text-white">
                    {latex}
                </EditableMathField>
                <!--    PlusIcon and MinusIcon Buttons      -->
                <div class="flex flex-col justify-between">
                    <button class="btn-soft">
                        <PlusIcon/>
                    </button>
                    <button class="btn-soft">
                        <MinusIcon/>
                    </button>
                </div>
            {/if}
        </div>
        <!--    Contraction "Ribbon"            -->
        <RibbonToggle
                contracted={false}
                on:click={() => contracted = !contracted}
        />
    </div>
{:else}
    <!--    Contraction "Ribbon"            -->
    <RibbonToggle
            flyIn
            contracted={true}
            on:click={() => contracted = !contracted}
    />
{/if}


<!-- todo apply btn-soft -->
<style lang="scss">
    button {
      @apply mb-2 text-gray-300 border-indigo-500 ;

      &:hover {
        @apply bg-indigo-500;
      }
    }
</style>