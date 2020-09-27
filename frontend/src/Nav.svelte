<script lang="ts">
  import { view } from './stores';
  export let visible = false;
</script>

<style lang="scss">
  $munchingOrange: #f1c232;
  $msTake: #e06666;
  $notGray: #f3f3f3;

  * {
    margin: 0;
    padding: 0;
  }
  
  main {
    position: sticky;
    z-index: 1;
  }
  
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
  }

  button {
    background: white;
    outline: none;
    border: none;
    padding: 1rem;
    border-radius: 0;
    transition: 1s;
    &:hover {
      color: $munchingOrange;
      cursor: pointer;
    }
    &:active {
      transition: 0s;
      background: $munchingOrange;
      color: white;
    }
  }

  h1 {
    padding: 0rem 1rem;
    font-family: 'Bebas Neue', cursive;
  }

  a {
    color: black;
    &:hover {
      text-decoration: none;
    }
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    box-shadow: 0rem 5rem 5rem 0.2rem lightgray;
  }

  .center {
    flex: 1;
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

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
    rel="stylesheet" />
</svelte:head>

<main>
  <!-- <h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
  <nav>
    <span class="left">
      <h1><a href="/">Lampest</a></h1></span>
    <span class="center" />
    <span class="right"><button
        on:click={() => {
          visible = !visible;
        }}><span>|||</span></button>
    </span>
  </nav>
  {#if visible}
    <div
      class="dropdown"
      on:click={() => {
        visible = false;
      }}>
      <button
        on:click={() => {
          $view = 'add-terms';
        }}><span>Add term</span>
      </button>
      <button
        on:click={() => {
          $view = 'query-terms';
        }}><span>Query term</span>
      </button>
    </div>
  {/if}
</main>
