<script lang="ts">
  import { placemarkService } from "../../services/placemark-service";
  import type { Category } from "../../services/placemark-types";
  import { loggedInUser } from "../../stores";
  import Coordinates from "$lib/Coordinates.svelte";

  let confMsg = "New category has been created";

  async function 
</script>

<form on:submit|preventDefault={newCategory}>
  <div class="field">
    <label class="label" for="category">Category Type</label>
    <input bind:value={category} class="input" id="category" name="category" type="category" />
  </div>
  <div class="field">
    <div class="control"><button class="button is-link is-light">Create Category</button></div>
  </div>
  <div class="box">{confMsg}</div>
</form>