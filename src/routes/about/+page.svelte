<script lang="ts">
  import Header from "$lib/Header.svelte";
  import MainNav from "$lib/MainNav.svelte";
  import { beforeUpdate, onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";

  beforeUpdate(() => {
    placemarkService.reload();
  });
</script>

<Header><MainNav /></Header>

