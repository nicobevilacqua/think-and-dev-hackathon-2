<script lang="ts">
  import { ApolloClient, InMemoryCache } from "@apollo/client/core";
  import { setClient } from "svelte-apollo";
	import '../app.css';

  import {PUBLIC_GRAPHQL_GATEWAY_BASE_URL} from '$env/static/public';
  import { login, init, wallet, profile, contractProfile } from "../store/Wallet2";
import { formatBytes32String} from "@ethersproject/strings";


  import { onMount } from 'svelte';

  let isMinting = false;
  let username = '';
  async function mintProfile() {
    isMinting = true;
    username = username.trim();
    try {
      const tx = await $contractProfile.mint(formatBytes32String(username));
      await tx.wait();
      // init para recargar el profile
      await init();
    } catch (e) {
      console.log(e)
    }
    isMinting = false;
  }

onMount(async () => {
  try {
    await init()
  } catch (e) {
    console.log(e)
  }
})

async function connect() {
  await login()
}
const client = new ApolloClient({
    uri: PUBLIC_GRAPHQL_GATEWAY_BASE_URL,
    cache: new InMemoryCache(),
  });

  setClient(client);
</script>

<main class="content flex-1 text-sm flex justify-center">
  <slot />
</main>
{#if !$wallet || !$profile}
  <div class="fixed top-0 left-0 w-full bg-black h-full">
    <div class="flex flex-col items-center justify-center h-full">
      <!-- <img src="/images/logo.svg" alt="logo" class="w-32" /> -->
      <h1 class="text-4xl text-white font-bold mt-4">Welcome to DTweet</h1>
      <!-- landind hero, explain user that has to connect wallet -->
      <p class="text-white text-center mt-4">
        To use DTweet, you need to connect your wallet.
      </p>
      {#if !$profile && $wallet}
          
          <div>
            <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
            <div class="relative mt-2 rounded-md shadow-sm">
              
              <input type="text"  
              placeholder="username"
              bind:value={username}
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              
            </div>
          </div>
          <div class="flex flex-col items-center justify-center mt-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              on:click={mintProfile}
              disabled={isMinting}
            >
              Mint profile
            </button>
          </div>

      {:else}
      <div class="flex flex-col items-center justify-center mt-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          on:click={connect}
        >
          Connect Wallet
        </button>
      </div>
      {/if}
    </div>
  </div>
{/if}