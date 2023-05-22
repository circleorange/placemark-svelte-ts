<script lang="ts">
  import TitleBar from "./TitleBar.svelte";
  import Icon from "@iconify/svelte";
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar title={"PlaceMark: Sweet spots of Ireland"} subTitle={"Sign Up or Sign In!"} />
  </div>
  <div class="column">
    <slot />
  </div>
</div>

