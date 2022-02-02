<script>
  import {createEventDispatcher, onMount} from "svelte";

    const onEditLatex = createEventDispatcher();
    let elField;

    function onEdit(newLatex) {
      onEditLatex('latexedit', {
        latex: newLatex
      });
    }

    onMount(async () => {
      await import('mathquill/build/mathquill.js')

      // todo remove global. check out mathquill's noConflict()
      if (!window.MQ) {
        window.MQ = window.MathQuill.getInterface(2);
      }

      const MQ = window.MQ;

      const mqField = MQ.MathField(elField, {
        handlers: {
          edit: () => onEdit(mqField.latex())
        }
      });
    })
</script>



<svelte:head>
    <link rel="stylesheet" href="./mathquillStyling/customMathquill.css">
</svelte:head>


<span bind:this={elField}>
    <slot></slot>
</span>