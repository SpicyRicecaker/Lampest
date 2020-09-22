<script lang="ts">
  import { view } from './stores';
  import Nav from './Nav.svelte';
  import TerraForm from './TerraForm.svelte';
  import Quarry from './Quarry.svelte';
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  /* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>

<main>
  <!-- <h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
  <Nav />
  {#if $view === 'add-terms'}
    <TerraForm />
  {:else if $view === 'query-terms'}
    <Quarry />
  {:else}
    <div>404 lol</div>
  {/if}
</main>
