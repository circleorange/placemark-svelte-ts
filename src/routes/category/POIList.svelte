<script lang="ts">
  import { openedCategoryID, POIlistStore } from "../../stores";
  import type { Category, POI } from "../../services/placemark-types";
  import { onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
	import Icon from "@iconify/svelte";

  export let category: Category[] = [];
  let POIs: POI[] = [];
  let categoryID: string = ""; // Declare a variable to hold the current value of openedCategoryID

  const updatePOIs = async () => {
    categoryID = $openedCategoryID;
    category = await placemarkService.getCategoryByID(categoryID);
    POIs = category.pois;
  }

  onMount(updatePOIs);

  async function deletePOI(pointID: string) {
    try {
      const success = await placemarkService.deletePOI(pointID);
      if (success) { 
        POIs = POIs.filter(poi => poi._id !== pointID); // filter out deleted POI from list
        POIlistStore.set(POIs);
      }
    } catch (error) {}
  };

  POIlistStore.subscribe(async (latestPOI) => {
    POIs = latestPOI;
    await updatePOIs();
  })
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#each POIs as poi}
      <tr>
        <td>{poi.name}</td>
        <td>{poi.description}</td>
        <td>{poi.latitude}</td>
        <td>{poi.longitude}</td>
        <td>
          <button class="button is-link is-light" on:click={() => poi._id && deletePOI(poi._id)}>
            <span class="icon is-small"><Icon icon="ic:baseline-delete" width="25"/></span>
            &emsp;Delete POI
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>