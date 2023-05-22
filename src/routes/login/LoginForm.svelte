<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "../../services/placemark-service";

  let email = "";
  let password = "";
  let errorMsg = "";

  async function login() {
    console.log(`attempting to log in w/ email: ${email} and password: ${password}`);
    let success = await placemarkService.login(email, password);
    if (success) { goto("/dashboard") }
    else {
      email = "";
      password = "";
      errorMsg = "Something went wrong, please check the credentials";
    }
  }
</script>

<form on:submit|preventDefault={login}>
  <div class="field">
    <label class="label" for="email">Email</label>
    <input bind:value={email} class="input" id="email" name="email" placeholder="Enter email" type="text" />
  </div>
  <div class="field">
    <label class="label" for="password">Password</label>
    <input bind:value={password} class="input" id="password" name="password" placeholder="Enter password" type="password" />
  </div>
  <div class="field is-grouped"><button class="button is-link">Sign In</button></div>
</form>

{#if errorMsg}
<div class="section">{errorMsg}</div>
{/if}