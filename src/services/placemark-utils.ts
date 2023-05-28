import { LatLng } from "leaflet";
import type { Category, CategoryPlacemarks, POI } from "./placemark-types";
import type { MarkerLayer, MarkerSpec } from "./markers";
import type { ChartData } from "./charts";
import { categoryListStore, allPlacemarksStore } from "../stores";

export function getMarkerLayer(POIs: POI[]): MarkerLayer {
  const markerSpecs = Array<MarkerSpec>();
  POIs.forEach((POI) => {
    markerSpecs.push({
      id: POI._id || "",
      title: `${POI.name}`,
      location: new LatLng(POI.latitude, POI.longitude),
      popup: true,
    })
  })
  return { title: "Placemarks", markerSpecs: markerSpecs }
}

export function generateByCategory(placemarksByCategory: CategoryPlacemarks[]): ChartData {
  const totalByCategory: ChartData = {
    labels: [],
    datasets: [{values: []}]
  }
  placemarksByCategory.forEach((placemarkByCategory) => {
    const label = `${placemarkByCategory.type}`;
    totalByCategory.labels.push(label);
    let total = 0;
    if (placemarkByCategory.pois?.length == undefined) { return total = 0 }
    placemarkByCategory.pois.forEach(() => { total += 1; });
    totalByCategory.datasets[0].values.push(total);
  });
  return totalByCategory;
}

export function getCategoriesAndPlacemarks(categories: Category[], placemarks: POI[]) {
  try {
    // Create a copy of the categories array to avoid mutating the original array
    const categoriesWithPlacemarks = [...categories];
    // Iterate over each placemark
    placemarks.forEach((placemark) => {
      const category = categoriesWithPlacemarks.find((category) => category._id === placemark.categoryid);
      if (category) {
        // If the category is found, add the placemark to its placemark array
        if (!category.pois) { category.pois = []; }
        category.pois.push(placemark);
      }
    });
    console.log("services.placemarkUtilities.getCategoriesAndPlacemarks.response", categoriesWithPlacemarks);
    return categoriesWithPlacemarks;
  } catch (error) { console.log("services.placemarkUtilities.getCategoriesAndPlacemarks.error", error); }
}