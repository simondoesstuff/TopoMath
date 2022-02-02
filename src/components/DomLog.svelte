<script>
  let entries = [];
  let id = 0;

  export function log(s) {
    id++;

    entries = [...entries, {
      id,
      msg: s,
    }]
  }

  export const jlog = s => log(JSON.stringify(s, null, 1));

  log("\t---dom log initialized.")
</script>



<div class="m-5 text-indigo-400">
    {#each entries as entry, i (entry.id)}
        <!-- This <pre> has to be on one line because it records whitespace -->
        <pre class:text-blue-600={i % 2 === 0}>{entry.msg}</pre>
	{/each}
</div>