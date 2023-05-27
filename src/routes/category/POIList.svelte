<script lang="ts">
  import { openedCategoryID, POIlistStore } from "../../stores";
  import type { Category, POI } from "../../services/placemark-types";
  import { onMount, onDestroy } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
	import Icon from "@iconify/svelte";

  let category: Category;
  let categoryID: string; // store current category
  let POIs: POI[] = [];
  let isGetCategoryComplete: boolean;
  
  onMount(async () => {
    $POIlistStore = [];
    isGetCategoryComplete = false
    openedCategoryID.subscribe(async (ID) => {
      categoryID = ID;
      await updatePOIs();
      isGetCategoryComplete = true;
    })
    if (isGetCategoryComplete) {
      POIlistStore.subscribe(() => {
      POIs = $POIlistStore;
      console.log("POIList.onMount.POIlistStore.subscribe.POIs", POIs);
    })}
  })

  async function updatePOIs() {
    category = await placemarkService.getCategoryByID(categoryID);
    console.log("POIList.updatePOIs.get.category", category);
    if (category.pois == undefined) { return POIlistStore.set([]); } 
    else { 
      const categoryPOI = category.pois.filter((poi) => poi.categoryid === categoryID);
      POIlistStore.set(categoryPOI); 
    }
    
    console.log("POIList.updatePOIs.set.POIlistStore", $POIlistStore);
    POIs = $POIlistStore;
    console.log("POIList.updatePOIs.set.POIs", POIs);
  }

  async function deletePOI(pointID: string) {
    try {
      const success = await placemarkService.deletePOI(pointID);
      if (success) { updatePOIs(); }
    } catch (error) {}
  };
</script>

{#if isGetCategoryComplete}
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
          <button class="button is-link is-light" on:click={() => deletePOI(poi._id)}>
            <span class="icon is-small"><Icon icon="ic:baseline-delete" width="25"/></span>
            &emsp;Delete POI
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
{:else}
<div class="has-text-centered">Loading page...</div>
{/if}