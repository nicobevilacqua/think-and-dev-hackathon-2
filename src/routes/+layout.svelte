<script lang="ts">
  import { ApolloClient, InMemoryCache } from "@apollo/client/core";
  import { setClient } from "svelte-apollo";
	import '../app.css';

  const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_GATEWAY_BASE_URL,
    cache: new InMemoryCache(),
  });

  setClient(client);
</script>

<main class="content flex-1 text-sm flex justify-center">
  <slot />
</main>

