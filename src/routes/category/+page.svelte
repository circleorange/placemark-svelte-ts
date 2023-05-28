<script lang="ts">
  import Header from "$lib/Header.svelte";
  import MainNav from "$lib/MainNav.svelte";
  import { beforeUpdate, onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";
  import POIList from "./POIList.svelte";
  import POIForm from "./POIForm.svelte";

  beforeUpdate(() => {
    placemarkService.reload();
  });
</script>

<Header><MainNav /></Header>
<div class="box"><POIList /></div>
<div class="box"><POIForm /></div>
