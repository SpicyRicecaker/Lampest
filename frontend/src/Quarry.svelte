<script lang="ts">
  import { onMount } from 'svelte';
  import Search from './Search.svelte';

  interface termType {
    content: string;
    description: string;
    date: string;
    category: string;
    example: string;
  }

  let terms: Array<termType> = [];
  let features: Array<any> = [
    { inner: 'Term', style: 'flex: 1' },
    { inner: 'Definition', style: 'flex: 1' },
  ];

  onMount(async () => {
    await createTerm({});
  });

  const createTerm = async (body) => {
    // Define our base query
    let base = `/api/terms?`;
    Object.entries(body).forEach(
      ([key, value]) => (base += `${key}=${value}&`)
    );
    // Pop the last element, whether this be the ? or the &
    const serverRes = await fetch(base.slice(0, -1));
    switch (await serverRes.status) {
      case 200: {
        const resTerm = await serverRes.json();
        terms = await resTerm;
        break;
      }
      default: {
        console.log('error');
      }
    }
  };

  // When we need to send a quarry request
  const handleQuarryRequest = async (event) => {
    createTerm(event.detail.params);
  };
</script>

<style lang="scss">
  $notGray: #f3f3f3;
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
    // gap: 0.5rem;
    box-shadow: 0rem 0.1rem 0.3rem 0.1rem lightgray;
    & > span {
      flex: 1;
      padding: 1rem;
      background-color: white;
      text-align: center;
      // box-shadow: 0rem 0.1rem 0.3rem 0.1rem lightgray;
    }
  }

  .header {
    @extend .smallwrap;
    box-shadow: none;
    & > span {
      color: gray;
      flex: 1;
      padding: 0rem 1rem 1rem;
    }
    margin: 0rem 1rem;
  }

  .divider {
    flex: 0;
    border-left: 0.1rem dotted #cacaca;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <Search on:quarryRequest={handleQuarryRequest} />
  <div class="header">
    {#each features as feature}<span>{feature.inner}</span>{/each}
  </div>
  <div class="bigwrap">
    {#each terms as term}
      <div class="smallwrap">
        <span class="tail">{term.content}</span>
        <div class="divider" />
        <span class="head">{term.description}</span>
      </div>
    {/each}
  </div>
</main>
