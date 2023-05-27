<script lang="ts">
  import Header from "$lib/Header.svelte";
  import MainNav from "$lib/MainNav.svelte";
	import CategoryForm from "./CategoryForm.svelte";
  import { beforeUpdate } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
	import CategoryList from "./CategoryList.svelte";

  // Store user token before browser page reload to prevent signing out
  beforeUpdate(() => {
    placemarkService.reload();
  })
</script>

<Header><MainNav /></Header>

<CategoryList />
<div class="box"><CategoryForm /></div>