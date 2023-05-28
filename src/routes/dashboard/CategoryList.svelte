<script lang="ts">
	import { onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
  import type { Category } from "../../services/placemark-types";
  import Icon from "@iconify/svelte";
	import { categoryListStore, openedCategoryID, loggedInUser } from "../../stores";
	import LeafletMap from "$lib/LeafletMap.svelte";
	import { getMarkerLayer } from "../../services/placemark-utils";

  let categoryList: Category[] = [];
  let msg: string = "";

  // initial page load
  onMount(async () => {
    await updateCategories();
    console.log("CategoryList.onMount.categoryListStore", $categoryListStore);
    categoryListStore.subscribe(() => {
      categoryList = $categoryListStore;
    })
  });

  async function updateCategories() {
    categoryList = await placemarkService.getCategoriesByUser($loggedInUser._id);
    categoryListStore.set(categoryList);
  }
  
  async function openCategory(categoryID: string) {
    openedCategoryID.set(categoryID);
    console.log("CategoryList.openCategory.ID", $openedCategoryID);
  }

  async function deleteCategory(categoryID: string) {
    try {
      const success = await placemarkService.deleteCategory(categoryID);
      if (success) { updateCategories(); }
    } catch (error) { 
      console.log(error); 
      return msg = "error deleting category";
    }
  }
</script>

{#if categoryList && categoryList.length > 0}
  {#each categoryList as category}
  <div class="box box-link-hover-shadow">
    <div class="column is-one-fifths">
      <h2 class="title">{category.type}</h2>
      <a href="/category" class="button" on:click={() => openCategory(category._id)}>
        <span class="icon is-small"><Icon icon="fluent:folder-open-20-filled" width="25"/></span>
        &emsp;View Points of Interest
      </a>
      <a href="/dashboard" class="button" on:click={() => deleteCategory(category._id)}>
        <span class="icon is-small"><Icon icon="ic:baseline-delete" width="25"/></span>
        &emsp;Delete Category
      </a>
    </div>
    <div class="column is-four-fifths">
    </div>
  </div>
  {/each}
{:else}
<p>No categories found.</p>
{/if}

{#if msg}
<div class="section">{msg}</div>
{/if}