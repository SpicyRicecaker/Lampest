<script lang="ts">
  // We're basically planning to dispatch an event when we click enter or search with the needed info to search
  // Or not, we'll also be doing validation in search
  // Mandatory library import from svelte
  import { createEventDispatcher } from 'svelte';
  // Need to create a dispatcher from that
  const dispatch = createEventDispatcher();

  let quarryParams = {
    content: '',
    language: '',
    category: '',
    startDate: '',
    endDate: '',
  };

  let revealParameters = false;

  const validateParameters = () =>
    new Promise((resolve, reject) => {
      // Our new object with good params
      let cleanParams = {};
      Object.entries(quarryParams).forEach(([key, value]) => {
        switch (key) {
          // Content should be a regex search I think
          // Blank should be all
          case 'content': {
            if (value === '') {
              cleanParams[key] = '.*';
            } else {
              cleanParams[key] = value;
            }
            break;
          }
          // We should convert these dates into actual dates
          case 'startDate': //Fallthrough
          case 'endDate': {
            if (value !== '') {
              cleanParams[key] = value;
            }
            break;
          }
          // For the other params we're looking for exact match
          default: {
            if (value !== '') {
              cleanParams[key] = value;
            }
            break;
          }
        }
      });
      resolve(cleanParams);
    });

  const initQuarry = async () => {
    // First validate probably
    dispatch('quarryRequest', {
      params: await validateParameters(),
    });
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
      bind:value={quarryParams.content}
      on:keydown={(e) => {
        if (e.code === "Enter") {
          e.preventDefault();
          initQuarry();
        }
      }} />
  </div>
  {#if revealParameters}
    <input
      type="text"
      placeholder="Lang - en, es, ja"
      bind:value={quarryParams.language} />
    <input
      type="text"
      placeholder="Category - verb, noun, idiom"
      bind:value={quarryParams.category} />
    <div class="date-wrapper">
      <input type="date" bind:value={quarryParams.startDate} />
      <input type="date" bind:value={quarryParams.endDate} />
    </div>
    <button on:click={initQuarry}>Search</button>
  {/if}
</main>
