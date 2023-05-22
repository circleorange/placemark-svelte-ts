<script>
  import { loggedInUser } from "../stores";
  export let title = '';
  export let subTitle = '';
  import Icon from "@iconify/svelte";
</script>

<div class="box has-text-centered columns m-2 p-1">
  <div class="column"><Icon icon="streamline:travel-places-mountain-sun-landmark-mountain-place" width="70" /></div>
  <div class="column is-three-fifths">
    <div class="title is-5">{title}</div>
    <div class="subtitle is-5">{subTitle}</div>
  </div>
  <div class="column">  
    {#if $loggedInUser?.email}
    <Icon icon="mdi:user" width="60" />
    <div class="is-size-7">{$loggedInUser.email}</div>
    {:else}
    <Icon icon="bxs:user-x" width="60" />
    <div class="is-size-7">PlaceMark-Svelte 0.2</div>
    {/if}
  </div>
</div>