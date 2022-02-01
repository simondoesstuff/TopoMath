<script>
  import {createEventDispatcher, onMount} from "svelte";

    const dispatch = createEventDispatcher();

    function onEdit(latex) {
      dispatch('edit', latex);
    }

    let elField;

    onMount(async () => {
      await import('mathquill/build/mathquill.js')
      await import('mathquill/build/mathquill.css')

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

<span bind:this={elField}>
    <slot></slot>
</span>