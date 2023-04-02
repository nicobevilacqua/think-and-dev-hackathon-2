<script lang="ts">  
  import { query } from "svelte-apollo";
  import { onMount } from 'svelte';
  
  import Tweet from '$lib/Tweet.svelte';
  import { queries } from '$utils/graphql';
    
  const feed = query(queries.FEED);

  function reloadFeed() {
    feed.refetch();
  }

  onMount(() => {
    // lo re kakeo ya fue
    window.reloadFeed = reloadFeed;
  })

  $: allTweets = [...(($feed&& $feed.data && $feed.data.allTweets) || [])].reverse();

</script>

<div class="">
  {#if !$feed || $feed.loading}
    Loading...
  {:else if $feed.error}
    Error: {$feed.error.message}
  {:else}
    {#each allTweets as tweet}
      <Tweet {tweet} />
    {/each}
  {/if}
</div>