<script lang="ts">
  import type { CountryDay } from "../services/numbers.service";
  export let numbers: CountryDay | null;

  const getCellAmount = (): number => {
    if (!numbers) return 0;
    const base = 10000;
    const pop = numbers.data.population;
    return Math.round(Math.sqrt(pop / base));
  };
</script>

<style lang="scss">
  .grid-wrapper {
    margin: auto;
    color: black;

    $size: 50em;
    $max-size: 75vmax;

    height: $size;
    max-height: $max-size;
    width: $size;
    max-width: $max-size;

    background-color: var(--grid-color);
    // padding: 1em;

    display: flex;
  }
  .cells-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .row {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .cell {
    // margin: 0 1em;
    width: 100%;
    border: 1px solid #777;
  }


  .overlay {
    position: absolute;
    top: 0;left: 0;bottom: 0;right: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    &::after {
      content: '';
      background-color: var(--overlay-background, black);
      width: var(--_width);
      height: var(--_height);
    }
    &.infecteds {
      // background-color: green;
      --overlay-background: green;
      --_width: var(--infected-width);
      --_height: var(--infected-height);
    }
    &.deaths {
      --_width: var(--death-width);
      --_height: var(--death-height);
    }
  }
</style>

<div class="grid-wrapper">
  <div class="cells-container">
    {#if numbers?.stats}
      <div class="overlay infecteds">
        {numbers.stats.ptg.confirmed * 100}
        {numbers.stats.ptg.deaths * 100}
      </div>
      <div class="overlay deaths">
        <!-- {numbers.stats.ptg.deaths} -->
      </div>
      {#each Array(getCellAmount()) as index}
        <div class="row">
          {#each Array(getCellAmount()) as itm, index}
            <div class="cell">
              <!-- {numbers.data.population} -->
              <!-- {index} -->
            </div>
          {/each}
        </div>
      {/each}
    {/if}
  </div>
</div>
