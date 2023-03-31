<script lang="ts">  
  import {  query } from "svelte-apollo";
  
  import Tweet from '$lib/Tweet.svelte';
  import { queries } from '$utils/graphql';

  const feed = query(queries.FEED);

  function reload() {
    feed.refetch();
  }

</script>

<div class="">
  {#if !$feed || $feed.loading}
    Loading...
  {:else if $feed.error}
    Error: {$feed.error.message}
  {:else}
    {#each $feed.data.tweet as tweet}
      <Tweet feed={tweet} />
    {/each}
  {/if}
</div>