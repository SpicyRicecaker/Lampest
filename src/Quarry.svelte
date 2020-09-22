<script lang="ts">
  import { view } from './stores';
  import { onMount } from 'svelte';

  interface termType {
    content: string;
    description: string;
    date: string;
    category: string;
    example: string;
  }

  let terms: Array<termType> = [];

  onMount(async () => {
    await createTerm;
  });

  const createTerm = async () => {
    const serverRes = await fetch(`/api/terms`);
    const resTerm = await serverRes.json();
    terms = await resTerm;
    await console.log(terms);
  };
</script>

<style lang="scss">
	* {
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
  .wrapper {
    display: flex;
  }
  .left,
  .right {
    flex: 1;
  }
</style>

<main>
  <div class="wrapper">
    {#each terms as term}
      <div>
        <div class="left">term.content</div>
        <div class="right">term.description</div>
      </div>
    {/each}
  </div>
  <!-- <h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
</main>
