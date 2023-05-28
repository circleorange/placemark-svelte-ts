import { writable } from "svelte/store";
import type { Category, POI, LoggedInUser } from "./services/placemark-types";
import type { MarkerSpec } from "./services/markers";

export const loggedInUser = writable<LoggedInUser>();
export const latestCategory = writable<Category>();
export const latestPOI = writable<POI>();
export const categoryListStore = writable<Category[]>([]);
export const openedCategoryID = writable<string>();
export const POIlistStore = writable<POI[]>([]);
export const markerSelected = writable<MarkerSpec>();
export const allPlacemarksStore = writable<POI[]>([]);