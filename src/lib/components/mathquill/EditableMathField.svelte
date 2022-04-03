<script>
    import {createEventDispatcher, onDestroy, onMount} from "svelte";

    export let _class;
    export let latex;
    const onEditLatex = createEventDispatcher();

    let elField;
    let mqField;

    function onEdit(newLatex) {
        latex = newLatex;

        onEditLatex('latexedit', {
            latex: newLatex
        });
    }

    async function MQ() {
        // todo remove global. check out mathquill's noConflict()
        if (!window.MQ) {
            await import('mathquill/build/mathquill.js')

            window.MQ = window.MathQuill.getInterface(2);
        }

        return window.MQ;
    }

    onMount(async () => {
        mqField = (await MQ()).MathField(elField, {
            handlers: {
                edit: () => onEdit(mqField.latex())
            }
        });
    })

    onDestroy(() => {
        if (mqField) {
            mqField.revert();
        }
    })
</script>


<svelte:head>
    <link rel="stylesheet" href="./mathquillStyling/customMathquill.css">
</svelte:head>

<div class={`${_class} grid place-items-center`}>
    <span bind:this={elField}>
        {latex}
    </span>
</div>