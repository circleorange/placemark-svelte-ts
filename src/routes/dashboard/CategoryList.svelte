<script lang="ts">
	import { onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
  import type { Category } from "../../services/placemark-types";
  import Icon from "@iconify/svelte";
	import { categoryListStore, openedCategoryID, loggedInUser } from "../../stores";

  let categoryList: Category[] = [];
  let msg: string = "";

  // initial page load
  onMount(async () => {
    updateCategories();
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
    console.log("opened category ID:", $openedCategoryID);
  }

  async function deleteCategory(categoryID: string) {
    console.log("starting transaction to delete category w/ ID:", categoryID);
    try {
      const success = await placemarkService.deleteCategory(categoryID);
      if (success) { updateCategories(); }
    } catch (error) { 
      console.log(error); 
      return msg = "error deleting category";
    }
  };
</script>

{#if categoryList && categoryList.length > 0}
  {#each categoryList as category}
  <div class="box box-link-hover-shadow">
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
  {/each}
{:else}
<p>No categories found.</p>
{/if}

{#if msg}
<div class="section">{msg}</div>
{/if}