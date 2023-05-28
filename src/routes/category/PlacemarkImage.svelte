<script lang="ts">
	import { placemarkService } from "../../services/placemark-service";
	import type { POI } from "../../services/placemark-types";
  
  export let placemark: POI;
  export let image;

  let avatar, fileinput;
	const onFileSelected =(e)=>{
    image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => { avatar = e.target.result };
    const placemarkID = placemark._id;
    placemarkService.uploadPlacemarkImage(placemarkID, fileinput);
  }

  function handleDeleteImage() {
    image = null;
  }
</script>

<div id="card">
  {#if avatar}
  <img class="avatar" src="{avatar}" alt="d" />
  {/if}
  <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
  <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
  <input style="display:none" name="imagefile" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
</div>

<style>
	#card{
	display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
}
 
	.upload{
		display:flex;
	height:50px;
		width:50px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:200px;
		width:200px;
	}
</style>