<script lang="ts">
  // ---------------------METHODS---------------------
  const getCellAmount = (): number => {
    if (cellAmount === null) {
      if (!numbers) return 0;
      const base = cellPopulationValue;
      // const pop = numbers.data.population;
      const pop = 1000;
      cellAmount = Math.round(Math.sqrt(pop / base));
      rowPopulationValue = cellAmount * cellPopulationValue
      cellAmount = cellAmount ** 2
      element.css('--cell-amount', cellAmount)
    }
    return cellAmount
  }

  const getCellClass = (rowIndex: number, cellIndex: number): CellType => {
    // console.log(rowIndex, cellIndex)
    const cellPopulationMark = rowIndex * rowPopulationValue + (cellIndex + 1) * cellPopulationValue
    // console.log(cellPopulationMark)
    return CellType.dead
  }

  const onInit = (node: Element) => {
    element = window.$(node)
  }


  // ---------------------DATA---------------------
  import "../typings"
  import { CellType } from "../typings";
  import type { CountryDay } from "../services/numbers.service";
  export let numbers: CountryDay | null = null;
  export let cellAmount: number | null = null;
  
  export let cellPopulationValue = 20
  export let rowPopulationValue = 0
  let element
  
  const ammounts = {
    dead: 40,
    infected: 60
  }
  
  const infected = 20
  // ---------------------RUNTIME---------------------
  // call somethin
</script>

<div class="grid-wrapper" use:onInit>
  <div class="cells-container">
    {#if numbers?.stats}
    <div class="overlay">
      {numbers.stats.ptg.confirmed * 100}
      {numbers.stats.ptg.deaths * 100}
      </div>
      <!-- {#each Array(getCellAmount()) as itm, rowIndex} -->
        <div class="row">
          {#each Array(getCellAmount()) as itm, cellIndex}
            <div class="cell {getCellClass(0, cellIndex)}">
              <!-- {numbers.data.population} -->
              <!-- {index} -->
            </div>
          {/each}
        </div>
      <!-- {/each} -->
    {/if}
  </div>
</div>

<style lang="scss">
  .grid-wrapper {
    margin: auto;
    color: black;
    padding: var(--cell-spacing);

    --grid-size: 50em;
    $size: var(--grid-size);
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
    flex-wrap: wrap;
    width: 100%;
    // height: 100%;
  }
  .cell {
    // margin: 0 1em;
    --_size: calc(var(--cell-amount) / var(--grid-size));
    width: var(--_size);
    height: var(--_size);
    // border: 1px solid #777;
    padding: var(--cell-spacing);
    &.infected {
      --CELL-COLOR: var(--cell-color-infected);
    }
    &.dead {
      --CELL-COLOR: var(--cell-color-dead);
    }
    &::after {
      content: '';
      position: relative;
      width: 100%;
      height: 100%;
      display: block;
      background-color: var(--CELL-COLOR);
      box-shadow: var(--cell-box-shadow);
      border-radius: .5em;
    }
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
  }
</style>
