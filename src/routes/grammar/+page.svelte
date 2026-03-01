<script>
  const { data } = $props();
</script>

<div class="page-content-container">
  <h1>Grammar</h1>

  <ol>
    {#each data.rules as rule}
      <li>
        <p class="rule">{@html rule.ruleHtml}</p>
        <p class="explanation"><em>{@html rule.explanationHtml}</em></p>
      </li>
    {/each}
  </ol>
</div>

<style>
  li {
      margin: 3rem 0;
  }

  ol {
      margin-top: 50px;
  }

  .rule {
      font-size: 1.1rem;
  }

  .explanation {
      color: #373737;
      padding-left: 2rem;
  }
</style>
