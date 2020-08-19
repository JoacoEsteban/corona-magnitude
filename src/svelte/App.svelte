<script lang="ts">
  import type { CountryDay } from '../services/numbers.service';
  import NumbersService from '../services/numbers.service';
  import MainGrid from './MainGrid.svelte'

  let numbers: CountryDay = null
  const init = async () => {
    numbers = await NumbersService.getCountryStats('argentina')
  }

  init()
</script>

<style lang="scss">
  main {
    margin: auto;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<main>
  <MainGrid {numbers} />
</main>