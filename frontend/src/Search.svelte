<script lang="ts">
  export let quarryParameters = {
    content: null,
    language: null,
    category: null,
    startDate: null,
    endDate: null,
  };

  let revealParameters = false;

  const queryIt = () => {
    console.log('hi');
  };
</script>

<style lang="scss">
  $munchingOrange: #f1c232;
  * {
    margin: 0;
    padding: 0;
  }

  main {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .searchbar {
    // Expand max
    flex: 1;
    // Horizontal layout of inside items
    display: flex;
    flex-direction: row;
    padding: 0rem 0rem 0rem 0.5rem;
    // Styling
    border: 0.1rem solid gainsboro;
    border-radius: 2rem;
    // When something is active
    transition: 0.2s;
    &:focus-within {
      outline: none;
      border: 0.1rem solid #ababab;
      box-shadow: 0 0 0.2rem gray;
    }
  }

  .dropdown-check {
    display: none;
    &:checked + .dropdown-label {
      transform: rotate(0);
    }
  }

  .dropdown-label {
    padding: 1rem;
    transform: rotate(-90deg);
    transition: 1s;
    &:hover {
      transition: 0.2s;
      color: $munchingOrange;
      cursor: pointer;
    }
    user-select: none;
  }

  input[type='text'] {
    flex: 1;
    outline: none;
    border: 0.1rem solid gainsboro;
    border-radius: 2rem;
    padding: 1rem;
    transition: 0.2s;
    &:focus {
      outline: none;
      border: 0.1rem solid #ababab;
      box-shadow: 0 0 0.2rem gray;
    }
  }

  .searchbar input[type='text'] {
    border: 0.1rem transparent;
    padding: 1rem 1rem 1rem 0rem;
    &:focus {
      outline: none;
      border: 0.1rem transparent;
      box-shadow: none;
    }
  }

  .date-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  input[type='date'] {
    color: gray;
    flex: 1;
    outline: none;
    border: 0.1rem solid gainsboro;
    border-radius: 2rem;
    padding: 1rem;
    transition: 0.2s;
    &:focus {
      outline: none;
      border: 0.1rem solid #ababab;
      box-shadow: 0 0 0.2rem gray;
    }
    text-align: center;
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
    }
  }
  
</style>

<main>
  <div class="searchbar">
    <label class="dropdown-wrapper">
      <input
        type="checkbox"
        class="dropdown-check"
        bind:checked={revealParameters} />
      <div class="dropdown-label">&#x25BC;</div>
    </label>
    <input
      size="1"
      type="text"
      placeholder="Quarry..."
      bind:value={quarryParameters.content} />
  </div>
  {#if revealParameters}
    <input
      type="text"
      placeholder="Lang - en, es, ja"
      bind:value={quarryParameters.language} />
    <input
      type="text"
      placeholder="Category - verb, noun, idiom"
      bind:value={quarryParameters.category} />
    <div class="date-wrapper">
      <input type="date" bind:value={quarryParameters.startDate} />
      <input type="date" bind:value={quarryParameters.endDate} />
    </div>
    <button on:click={queryIt}>Search</button>
  {/if}
</main>
