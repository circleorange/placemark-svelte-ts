<script lang="ts">
  import Header from "$lib/Header.svelte";
  import WelcomeNav from "$lib/WelcomeNav.svelte";
  import { beforeUpdate, onMount } from "svelte";
	import { placemarkService } from "../../services/placemark-service";

  beforeUpdate(() => {
    placemarkService.reload();
  });
</script>

<Header><WelcomeNav /></Header>

<div class="columns">
  <div class="column has-text-centered"><img alt="homer" src="/homer2.png" width="300" /></div>
  <div class="column">
    <div class="box">
      <h1 class="title">Sign in</h1>
      
    </div>
  </div>
</div>
