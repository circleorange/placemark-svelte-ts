<script lang="ts">
  import { goto } from "$app/navigation";
  import Header from "$lib/Header.svelte";
  import { placemarkService } from "../../services/placemark-service";
  import WelcomeNav from "$lib/WelcomeNav.svelte";
  import LoginForm from "./LoginForm.svelte";
</script>

<Header>
  <WelcomeNav />
</Header>

<div class="columns">
  <div class="column has-text-centered"><img alt="homer" src="/homer2.png" width="300" /></div>
  <div class="column">
    <div class="box">
      <h1 class="title">Sign in</h1>
      <LoginForm />
    </div>
  </div>
</div>