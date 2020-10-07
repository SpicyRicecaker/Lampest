<script lang="ts">
  // We're basically planning to dispatch an event when we click enter or search with the needed info to search
  // Or not, we'll also be doing validation in search
  // Mandatory library import from svelte
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  // Need to create a dispatcher from that
  const dispatch = createEventDispatcher();

  let categoryList: string = '';

  let startDate: string = '';
  let endDate: string = '';
  let mainBody: string = '';

  // interface mongoParam {
  //   $or: [{ content: string }, { description: string }];
  //   category: string[];
  //   date: { $gte: Date; $lte: Date };
  // }
  let mongoParams: any = {
    $or: [
      { content: { $regex: '', $options: 'i' } },
      { description: { $regex: '', $options: 'i' } },
    ],
  };

  // Matches category string to category array
  $: {
    // If we've just reacted to a tangible change
    if (categoryList.length !== 0) {
      // Spread the new parameters in!!
      mongoParams = {
        ...mongoParams,
        category: {
          $all: categoryList.split(','),
        },
      };
    } else {
      // Otherwise, if we've just reacted to the category being cleared, we just delete it!
      delete mongoParams.category;
    }
  }

  // We can add regex date checking later
  // Matches greater than string to start date

  // Matches less than string to end date
  $: {
    if (endDate.length !== 0) {
      mongoParams = {
        ...mongoParams,
        date: {
          ...mongoParams.date,
          $lte: new Date(endDate),
        },
      };
    } else if (startDate.length === 0) {
      delete mongoParams.date;
    }
  }

  $: {
    // Should be regex checked, but I'm lazy for now
    if (startDate.length !== 0) {
      mongoParams = {
        ...mongoParams,
        date: {
          ...mongoParams.date,
          $gte: new Date(startDate),
        },
      };
    } else if (endDate.length === 0) {
      delete mongoParams.date;
    }
  }

  // Matches description and content to main body regexed, not matching caps either
  $: {
    // Content
    mongoParams.$or[0].content.$regex = mainBody;
    mongoParams.$or[1].description.$regex = mainBody;
  }

  const mainBodyComponent = ['content', 'description'];

  let revealParameters = false;

  const validateParameters = (): Promise<string> =>
    new Promise((resolve, reject) => {
      // Our new query object for mongodb
      // Go through our mongoParams
      resolve(`/api/terms/search?q=${JSON.stringify(mongoParams)}`);
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
  }

  .mini-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &:first-child {
      margin-top: 1rem;
    }
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
  <div class="wrapper">
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
        bind:value={mainBody}
        on:keydown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();
            initQuarry();
          }
        }} />
    </div>
    {#if revealParameters}
      <!-- <input
      type="text"
      placeholder="Lang - en, es, ja"
      bind:value={mongoParams.language} /> -->
      <div transition:slide|local class="mini-wrapper">
    <input
      type="text"
      placeholder="Category - en, ja, es, verb, noun"
      bind:value={categoryList} />
    <div class="date-wrapper">
      <input type="date" bind:value={startDate} />
      <input type="date" bind:value={endDate} />
    </div>
    <button on:click={initQuarry}>Search</button>
    </div>
    {/if}
  </div>
</main>
