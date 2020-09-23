<script lang="ts">
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
    await createTerm();
  });

  const createTerm = async () => {
    const serverRes = await fetch(`/api/terms`);
    const resTerm = await serverRes.json();
    terms = await resTerm;
  };
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  .bigwrap {
    margin: 0rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .smallwrap {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    & > span {
      flex: 1;
      padding: 1rem;
      background-color: white;
    box-shadow: 0rem .1rem .3rem .1rem lightgray;
    }
  }

  .header {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    & > span {
      flex: 1;
    }
    margin: 1rem 1rem 0.5rem;
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
  <div class="header"><span>Term</span> <span>Definition</span></div>
  <div class="bigwrap">
    {#each terms as term}
      <div class="smallwrap">
        <span class="tail">{term.content}</span>
        <span class="head">{term.description}</span>
      </div>
    {/each}
  </div>
  <!-- <h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
</main>
