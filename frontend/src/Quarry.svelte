<script lang="ts">
  import { onMount } from 'svelte';
  import Search from './Search.svelte';
  import { slide } from 'svelte/transition';

  interface termType {
    content: string;
    description: string;
    date: string;
    category: string;
    example: string;
    lang: string;
  }

  interface svelteTermType {
    term: termType;
    expanded: boolean;
  }
  let reveal: string = '';

  let terms: Array<termType> = [];
  let features: Array<any> = [
    { inner: 'Term', style: 'flex: 1' },
    { inner: 'Definition', style: 'flex: 1' },
  ];
  let termInfo: Array<any> = [
    { inner: 'Term', style: 'flex: 1' },
    { inner: 'Definition', style: 'flex: 1' },
  ];

  let svelteTerms: Array<svelteTermType> = [];

  onMount(async () => {
    await createTerm('/api/terms');
  });

  const updateSvelteTerms = (newTerms: Array<termType>) =>
    new Promise((resolve, reject) => {
      svelteTerms = [];
      for (let i = 0; i < newTerms.length; i += 1) {
        svelteTerms.push({ term: newTerms[i], expanded: false });
      }
      resolve();
    });

  const createTerm = async (queryString) => {
    const serverRes = await fetch(queryString);
    switch (await serverRes.status) {
      case 200: {
        const resTerm = await serverRes.json();
        await updateSvelteTerms(await resTerm);
        console.log(svelteTerms);
        break;
      }
      default: {
        console.log('error');
      }
    }
  };

  // When we need to send a quarry request
  const handleQuarryRequest = async (event) => {
    console.log(event.detail.params);
    createTerm(event.detail.params);
  };

  // // When a term is clicked
  // const expandTerm = (e: MouseEvent) => {
  //   console.log(e.currentTarget);
  //   if (
  //     (e.currentTarget as HTMLDivElement).contains(
  //       (e.currentTarget as HTMLDivElement).querySelector('#extra')
  //     )
  //   ) {
  //     (e.currentTarget as HTMLDivElement).removeChild(
  //       (e.currentTarget as HTMLDivElement).querySelector('#extra')
  //     );
  //   } else {
  //     const t = document.createElement('div');
  //     t.setAttribute('id', 'extra');
  //     t.innerHTML = '123123123123';
  //     (e.currentTarget as HTMLDivElement).appendChild(t);
  //   }
  // };
</script>

<style lang="scss">
  $notGray: #f3f3f3;
  $munchingOrange: #f1c232;
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
    & > span {
      flex: 1;
      padding: 1rem;
      text-align: center;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .smallwrapinfo {
    display: flex;
    flex-direction: column;
    // gap: 0.5rem;
    & > div {
      flex: 1;
      padding: 0.5rem;
      border-top: 0.1rem dotted #cacaca;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .doublewrap {
    box-shadow: 0rem 0.1rem 0.3rem 0.1rem lightgray;
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

  .delete-button {
    &:active {
      color: $munchingOrange;
    }
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
    {#each svelteTerms as st, i}
      <div class="doublewrap" on:click={() => (st.expanded = !st.expanded)}>
        <div class="smallwrap" transition:slide|local>
          <span class="tail">{st.term.content}</span>
          <div class="divider" />
          <span class="head">{st.term.description}</span>
        </div>
        {#if st.expanded}
          <div class="smallwrapinfo" transition:slide>
            {#each Object.entries(st.term) as [termLabel, termValue]}
              <div>
                <span style="color:gray;">{termLabel}: </span>{termValue}
              </div>
            {/each}
            <div
              class="delete-button"
              on:click|stopPropagation={() => {
                // Update the database
                // We only need to splice terms
                svelteTerms.splice(i, 1);
                svelteTerms = svelteTerms;
              }}>
              delete
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</main>
