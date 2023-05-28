<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Header from "$lib/Header.svelte";
  import MainNavigator from "$lib/MainNav.svelte";
  import type { ChartData } from "../../services/charts";
  import { beforeUpdate, onMount } from "svelte";
  import { placemarkService } from "../../services/placemark-service";
  import { generateByCategory, getCategoriesAndPlacemarks } from "../../services/placemark-utils";
  import { loggedInUser } from "../../stores";
  import { allPlacemarksStore, categoryListStore } from "../../stores";


  let byCategory: ChartData;

  onMount(async () =>{
    const categories = getCategoriesAndPlacemarks($categoryListStore, $allPlacemarksStore);
    byCategory = generateByCategory(categories);
  })

  beforeUpdate(() => { placemarkService.reload(); });
</script>

<Header>
  <MainNavigator />
</Header>

<div class="columns">
  <div class="column box has-text-centered">
    <h1 class="title is-4">Placemarks by Category</h1>
    <Chart data={byCategory} type="bar" />
  </div>
  <div class="column box has-text-centered">
    <h1 class="title is-4">Placemarks by Category</h1>
    <Chart data={byCategory} type="pie" />
  </div>
</div>