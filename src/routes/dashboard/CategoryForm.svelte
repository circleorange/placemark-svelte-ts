<script lang="ts">
  import { placemarkService } from "../../services/placemark-service";
  import { categoryListStore, loggedInUser } from "../../stores";

  let userInput = "";

  async function createCategory() {
    console.log("transaction starting to create new category");
    if (userInput != "") {
      let newCategory = {
        type: userInput,
        userid: $loggedInUser._id,
        pois: [],
      };
      console.log("passing category data to placemark service");
      await placemarkService.createCategory(newCategory);
      categoryListStore.update((categories) => [...categories, newCategory]);
      console.log("Category has been created");
      userInput = "";
    }
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