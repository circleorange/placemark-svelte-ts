import { LatLng } from "leaflet";
import type { POI } from "./placemark-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function getMarkerLayer(POIs: POI[]): MarkerLayer {
  const markerSpecs = Array<MarkerSpec>();
  POIs.forEach((POI) => {
    markerSpecs.push({
      id: POI._id,
      title: `Marker name`,
      location: new LatLng(POI.latitude, POI.longitude),
      popup: true,
    })
  })
  return { title: "Points of Interest", markerSpecs: markerSpecs }
}