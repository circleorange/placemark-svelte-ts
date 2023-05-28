<script lang="ts">
  import { goto } from "$app/navigation";
  import Header from "$lib/Header.svelte";
  import { placemarkService } from "../../services/placemark-service";
  import WelcomeNav from "$lib/WelcomeNav.svelte";
  import LoginForm from "./LoginForm.svelte";
  import Icon from "@iconify/svelte";
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
    <div class="column">
      <a href="/oauth">
      <div class="box has-text-centered">
        <Icon icon="mdi:github" width="64" /><br>
        Sign In with Github
      </div></a>
    </div>
  </div>
</div>

