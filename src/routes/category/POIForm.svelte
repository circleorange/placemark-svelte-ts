<script lang="ts">
  import { placemarkService } from "../../services/placemark-service";
  import { openedCategoryID, POIlistStore } from "../../stores";

  let name: string = "";
  let desc: string = "";
  let lat: string = "";
  let lng: string = "";
  let msg: string = "";
  let categoryID = $openedCategoryID;

  async function createPOI() {
    console.log("starting transaction to create new POI");
    if (name == "" || desc == "" || lat == "" || lng == "") {
      return msg = "failed to create new POI because one of the fields was empty"; 
    } 
    const latFloat = parseFloat(lat);
    const lngFloat = parseFloat(lng);

    if (isNaN(latFloat) || isNaN(lngFloat)) {
      return (msg = "Latitude and longitude must be valid numbers");
    }

    let newPOI = {
      name: name,
      description: desc,
      latitude: latFloat,
      longitude: lngFloat,
      categoryid: categoryID,
    }

    try {
      let response = await placemarkService.createPOI(categoryID, newPOI);
      console.log("POIForm.createPOI.response", response);
      if (response.status == 201) { 
        newPOI._id = response.data._id;
        console.log("POIForm.createPOI.newPOI", newPOI);
        POIlistStore.update((currentPOIs) => [...currentPOIs, newPOI]); 
        console.log("POIForm.createPOI.update.POIlistStore", $POIlistStore);
      }
    } catch (error) { 
      console.log(error);
      return msg = "error creating POI";
    }

    // set value back to empty after successful POI creation
    name = "";
    desc = "";
    lat = "";
    lng = "";
  }
</script>

<form on:submit|preventDefault={createPOI}>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <label class="label" for="name">Name</label>
        <input bind:value={name} class="input" id="name" name="name" type="string" />
      </div>
      <div class="field">
        <label class="label" for="desc">Description</label>
        <input bind:value={desc} class="input" id="desc" name="desc" type="string" />
      </div>
      <div class="field">
        <label class="label" for="lat">Latitude</label>
        <input bind:value={lat} class="input" id="lat" name="lat" type="string" />
      </div>
      <div class="field">
        <label class="label" for="lng">Longitude</label>
        <input bind:value={lng} class="input" id="lng" name="lng" type="string" />
      </div>
      <div class="field">
        <label class="label" for="action">Action</label>
        <div class="control"><button class="button is-link is-light">Create POI</button></div>
      </div>
    </div>
  </div>
</form>

{#if msg}
<div class="section">{msg}</div>
{/if}