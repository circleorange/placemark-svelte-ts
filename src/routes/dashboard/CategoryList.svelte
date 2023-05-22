<script lang="ts">
	import { onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
  import type { Category } from "../../services/placemark-types";
  import Icon from "@iconify/svelte";
	import { categoryListStore } from "../../stores";
  import { goto } from "$app/navigation";

  export let categoryList: Category[] = [];
  let errorMsg: string = "";

  // initial page load
  onMount(async () => {
    console.log("starting transaction to get categories");
    categoryList = await placemarkService.getCategories();
  });
  
  async function openCategory() {};

  async function deleteCategory(categoryID: string) {
    console.log("starting transaction to delete category w/ ID:", categoryID);
    try {
      const success = await placemarkService.deleteCategory(categoryID);
      if (success) { 
        goto("/dashboard");
        categoryList = await placemarkService.getCategories();
      } else { errorMsg = "Something went wrong and category was not deleted"; }
    } catch (error) { console.log(error); }
  };
  
  // update page after new category created
  categoryListStore.subscribe(async (categories) => {
    categoryList = categories;
    categoryList = await placemarkService.getCategories();
  });
</script>

{#if categoryList && categoryList.length > 0}
  {#each categoryList as category}
  <div class="box box-link-hover-shadow">
    <h2 class="title">{category.type}</h2>
    <a href="/dashboard/{category._id}" class="button" on:click={openCategory}>
      <span class="icon is-small"><Icon icon="fluent:folder-open-20-filled" width="25"/></span>
      &emsp;View Points of Interest
    </a>
    <a href="/dashboard" class="button" on:click={() => category._id && deleteCategory(category._id)}>
      <span class="icon is-small"><Icon icon="ic:baseline-delete" width="25"/></span>
      &emsp;Delete Category
    </a>
  </div>
  {/each}
{:else}
<p>No categories found.</p>
{/if}

{#if errorMsg}
<div class="section">{errorMsg}</div>
{/if}