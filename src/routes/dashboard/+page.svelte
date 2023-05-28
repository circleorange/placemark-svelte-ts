<script lang="ts">
  import Header from "$lib/Header.svelte";
  import MainNav from "$lib/MainNav.svelte";
	import CategoryForm from "./CategoryForm.svelte";
  import { beforeUpdate, onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
	import CategoryList from "./CategoryList.svelte";
	import LeafletMap from "$lib/LeafletMap.svelte";
  import { getMarkerLayer } from "../../services/placemark-utils";

  let map: LeafletMap;

  onMount(async () => {
    const placemarks = await placemarkService.getAllPlacemarks();
    const placemarkMarkerLayer = getMarkerLayer(placemarks);
    map.populateLayer(placemarkMarkerLayer);

  })

  // Store user token before browser page reload to prevent signing out
  beforeUpdate(() => {
    placemarkService.reload();
  })
</script>

<Header><MainNav /></Header>
<LeafletMap bind:this={map} />
<CategoryList />
<div class="box"><CategoryForm /></div>