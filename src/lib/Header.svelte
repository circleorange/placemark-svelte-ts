<script lang="ts">
  import TitleBar from "./TitleBar.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column is-half">
    <TitleBar title={"PlaceMark Services"} subTitle={"Sign Up or Sign In!"} />
  </div>
  <div class="column">
    <slot />
  </div>
</div>