<script lang="ts">
  import { onMount } from 'svelte';

  interface termType {
    content: string;
    description: string;
    date: Date;
    category: Array<string>;
    example: string;
  }
  
  let categoryList:string = '';
  
  $: {
    tempTerm.category = categoryList.split(',');
  }

  const tempTerm: termType = {
    content: '',
    description: '',
    date: new Date(),
    category: [],
    example: '',
  };

  // Here we should finalize the term
  // as well as verify input if need be later on
  const getTerm = (): Promise<termType> => {
    return new Promise((resolve, reject) => {
      // Create object
      tempTerm.date = new Date();
      // Send it as a fetch json request
      resolve(tempTerm);
    });
  };

  let fetchRes = {
    status: 99,
    msg: '',
  };

  const colorbaseres = new Map();
  colorbaseres.set(200, '#deffdb');
  colorbaseres.set(400, '#ffabab');
  colorbaseres.set(404, '#ffabab');

  onMount(() => {
    fetchRes.status = 99;
    fetchRes.msg = '';
  });

  const updateFetchRes = async (someResponse) =>
    new Promise((resolve, reject) => {
      switch (someResponse.status) {
        // We can probably fix this l8r
        case 404: {
          fetchRes.msg = 'Please include a term and definition';
          fetchRes.status = 404;
          break;
        }
        default: {
          someResponse.json().then((res) => {
            fetchRes.msg = res.msg;
            fetchRes.status = someResponse.status;
          });
          break;
        }
      }
    });

  const createTerm = async () => {
    try {
      const term: termType = await getTerm();
      // This could possible bug if we have spaces in-between our code
      const jsonBody = await JSON.stringify(term);
      const serverRes = await fetch(`/api/terms/${term.content}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: jsonBody,
      });
      await updateFetchRes(serverRes);
    } catch (err) {
      console.log(err);
    }
  };
</script>

<style lang="scss">
  $munchingOrange: #f1c232;
  * {
    padding: 0;
    margin: 0;
  }

  main {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    outline: none;
    border: 0.1rem solid gainsboro;
    padding: 1rem;
    border-radius: 2rem;
    transition: 0.2s;
    /* border: .1rem solid gray; */
    /* border: 2px inset; */
    &:focus {
      outline: none;
      border: 0.1rem solid #ababab;
      box-shadow: 0 0 0.2rem gray;
    }
  }

  button {
    background-color: white;
    padding: 1rem;
    border-radius: 2rem;
    outline: none;
    border: 0.1rem solid gainsboro;
    // background-color: white;
    transition: 1s;
    &:hover {
      cursor: pointer;
      color: $munchingOrange;
    }
    &:active {
      transition: 0s;
      background: $munchingOrange;
      color: white;
      border: 0.1rem solid transparent;
    }
  }

  .response {
    outline: none;
    padding: 1rem;
    border-radius: 2rem;
    /* border: .1rem solid gray; */
    /* border: 2px inset; */
  }

  .status {
    font-weight: bold;
  }

  // button:active {
  //   background-color: blue;
  // }
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
  <input type="text" placeholder="Tag" bind:value={categoryList} />
  <input type="text" placeholder="Example" bind:value={tempTerm.example} />
  <button on:click={createTerm}>Add</button>
  {#if fetchRes.status !== 99}
    <div
      class="response"
      style="background-color:{colorbaseres.get(fetchRes.status)};">
      <span class="status">Code {fetchRes.status}</span>
      {fetchRes.msg}
    </div>
  {/if}
</main>
