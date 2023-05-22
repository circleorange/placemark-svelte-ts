import { writable } from "svelte/store";
import type { Category, POI, LoggedInUser } from "./services/placemark-types";

export const loggedInUser = writable<LoggedInUser>();
export const latestCategory = writable<Category>();
export const latestPOI = writable<POI>();
export const categoryListStore = writable<Category[]>([]);
