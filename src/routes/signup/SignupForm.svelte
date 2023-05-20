<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "../../services/placemark-service";

  let fName = "";
  let lName = "";
  let email = "";
  let pwd = "";
  let errorMsg = "";

  async function signup() {
    console.log(`attempting to sign up w/ email: ${email} and password: ${pwd}`);
    let success = await placemarkService.signup(fName, lName, email, pwd);
    if (success) { goto("/login"); }
    else { errorMsg = "failed to sign up"; }
  }
</script>

<form on:submit|preventDefault={signup}>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <label for="fName" class="label">First Name</label>
        <input bind:value={fName} id="fName" class="input" type="text" placeholder="Enter first name" name="fName" />
      </div>
      <div class="field">
        <label for="lName" class="label">Last name</label>
        <input bind:value={lName} id="lName" class="input" type="text" placeholder="Enter last name" name="lName" />
      </div>
    </div>
  </div>
  <div class="field">
    <label for="email" class="label">Email</label>
    <input bind:value={email} id="email" class="input" type="text" placeholder="Enter email address" name="email" />
  </div>
  <div class="field">
    <label for="pwd" class="label">Password</label>
    <input bind:value={pwd} id="pwd" class="input" type="password" placeholder="Enter password" name="pwd" />
  </div>
  <div class="field is-grouped"><button class="button is-link">Sign Up</button></div>
</form>

{#if errorMsg}
<div class="section">{errorMsg}</div>
{/if}