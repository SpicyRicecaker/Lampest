<script lang="ts">
  interface termType {
    content: string;
    description: string;
    date: string;
    category: string;
    example: string;
  }

  const tempTerm: termType = {
    content: '',
    description: '',
    date: '',
    category: '',
    example: '',
  };

  // Here we should finalize the term
  // as well as verify input if need be later on
  const getTerm = (): Promise<termType> => {
    return new Promise((resolve, reject) => {
      // Create object
      tempTerm.date = new Date().toString();
      // Send it as a fetch json request
      resolve(tempTerm);
    });
  };

  const createTerm = async () => {
    // debug
    const testVar = await getTerm();
    await console.log(testVar);
    // end debug
    const term: termType = await getTerm();
    // This could possible bug if we have spaces in-between our code
    const jsonBody = await JSON.stringify(term);
    const serverRes = await fetch(`/api/terms/${term.content}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: jsonBody,
    });
    await console.log(serverRes);
  };
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  /* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
u}

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
  <input type="text" placeholder="Term" bind:value={tempTerm.content} />
  <input
    type="text"
    placeholder="Definition"
    bind:value={tempTerm.description} />
  <input type="text" placeholder="Tag" bind:value={tempTerm.category} />
  <input type="text" placeholder="Example" bind:value={tempTerm.example} />
  <button on:click={createTerm}>Add</button>
</main>
