<script lang="ts">
  import { placemarkService } from "../../services/placemark-service";
  import { categoryListStore, loggedInUser } from "../../stores";

  let userInput: string = "";
  let msg: string = "";

  async function createCategory() {
    console.log("starting transaction to create new category");
    if (userInput == "") { return msg = "category name cannot be empty"; }
    console.log("debugging", $loggedInUser);
    let newCategory = {
      type: userInput,
      userid: $loggedInUser._id,
      //pois: [],
    };
    
    try {
      let response = await placemarkService.createCategory(newCategory);
      categoryListStore.update((existingCategories) => [...existingCategories, response]);
    } catch ( error ) { 
      console.log(error);
      return msg = "error creating category";
    }
    
    console.log("transaction to create category has been completed");
    userInput = "";
  }
</script>

<form on:submit|preventDefault={createCategory}>
  <div class="field">
    <label class="label" for="category">Category Type</label>
    <input bind:value={userInput} class="input" id="category" name="category" type="string" />
  </div>
  <div class="field">
    <div class="control"><button class="button is-link is-light">Create Category</button></div>
  </div>
  <div class="box">{userInput}</div>
</form>

{#if msg}
<div class="section">{msg}</div>
{/if}