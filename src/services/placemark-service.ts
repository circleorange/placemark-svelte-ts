import axios from "axios";
import { loggedInUser, latestCategory, latestPOI } from "../stores";
import type { Category, POI } from "./placemark-types";

export const placemarkService = {
  baseURL: "http://localhost:3000",
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseURL}/api/users/authenticate`, {email, password});
      console.log("placemarkService.login.response", response);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) { 
        loggedInUser.set({
          email: email,
          token: response.data.token,
          _id: response.data._id,
        });
        localStorage.placemark = JSON.stringify({email: email, token: response.data.token, _id: response.data.id,});
        return true;
      } return false;
    } catch (error) {
      console.log("placemarkService.login.error", error);
      return false;
    }
  },
  async logout() {
    loggedInUser.set({ email: "", token: "", _id: "" });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("placemark");
  },
  async signup(fName: string, lName: string, email: string, pwd: string): Promise<boolean> {
    try {
      const userDetails = {
        firstName: fName,
        lastName: lName,
        email: email,
        password: pwd
      };
      const response = await axios.post(`${this.baseURL}/api/users`, userDetails);
      console.log("placemarkService.signup.response", response);
      return true;
    } catch (error) {
      console.log("placemarkService.signup.error", error);
      return false;
    }
  },
  // reload function to store logged user for browser page reload function
  reload() {
    if (!axios.defaults.headers.common["Authorization"]) {
      const placemarkCred = localStorage.placemark;
      if (placemarkCred) {
        const savedUser = JSON.parse(placemarkCred);
        console.log(savedUser);
        loggedInUser.set({
          email: savedUser.email, 
          token: savedUser.token,
          _id: savedUser._id,
        });
        axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
      }
    }
  },
  async getCategory(categoryID: string): Promise<Category | null> {
    try {
      const response = await axios.get(this.baseURL+"/api/categories/"+categoryID);
      console.log("placemarkService.getCategory.response", response.data);
      return response.data;
    } catch (error) {
      console.log("placemarkService.getCategory.error", error);
      return null;
    }
  },
  async getCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(this.baseURL+"/api/categories");
      console.log("placemarkService.getCategories.response", response.data);
      return response.data;
    } catch (error) {
      console.log("placemarkService.getCategories.error", error);
      return [];
    }
  },
  async getCategoryByUser(userID: string): Promise<Category[]> {
    try {
      console.log("placemarkService.getCategoryByUser.request", userID);
      const requestCall = this.baseURL+"/api/users/"+userID+"/categories";
      const response = await axios.get(requestCall);
      console.log("placemarkService.getCategoryByUser.response", response.data);
      return response.data;
    } catch (error) {
      console.log("placemarkService.getCategoryByUser.error", error);
      return [];
    }
  },
  async createCategory(category: Category) {
    try {
      console.log("placemarkService.createCategory.request", category);
      const request = await axios.post(this.baseURL+"/api/categories", category);
      console.log("placemarkService.createCategory.response", request.data);
      return request.data;
    } catch (error) { 
      console.log("placemarkService.createCategory.error", error);
      return false;
    }
  },
  async deleteCategory(catID: string) {
    try {
      console.log("placemarkService.deleteCategory.request", catID);
      const response = await axios.delete(this.baseURL+"/api/categories/"+catID);
      console.log("placemarkService.deleteCategory.response", response);
      return response.status == 204;
    } catch (error) {
      console.log("placemarkService.deleteCategory.error", error);
    }
  },
  // returns category w/ placemarks array
  async getCategoryByID(categoryID: string) {
    try {
      console.log("placemarkService.getCategoryByID.request", categoryID);
      const response = await axios.get(this.baseURL+"/api/categories/"+categoryID);
      console.log("placemarkService.getCategoryByID.response", response.data);
      return response.data;
    } catch (error) { console.log("placemarkService.getCategoryByID.error", error); };
  },
  // returns categories w/o placemarks
  async getCategoriesByUser(userID: string) {
    try {
      console.log("placemarkService.getCategoriesByUser.request", userID);
      const response = await axios.get(this.baseURL+"/api/users/"+userID+"/categories");
      console.log("placemarkService.getCategoriesByUser.response", response.data);
      return response.data;
    } catch (error) {
      console.log("placemarkService.getCategoriesByUser.error", error);
      return [];
    }
  },
  async getPOI() { // not functional yet
    return false;
  },
  // returns array of placemarks
  async getAllPlacemarks() {
    try {
      const response = await axios.get(this.baseURL+"/api/pois");
      console.log("placemarkService.getAllPlacemarks.response", response);
      return response.data;
    } catch (error) {
      console.log("placemarkService.getAllPlacemarks.error", error);
      return [];
    }
  },
  async createPOI(categoryID: string, newPOI: POI) {
    try {
      console.log("placemarkService.createPOI.request", categoryID, newPOI);
      const response = await axios.post(this.baseURL+"/api/category/pois", {categoryID, newPOI});
      console.log("placemarkService.createPOI.response", response);
      return response;
    } catch (error) { console.log("placemarkService.createPOI.error", error); }
  },
  async deletePOI(pointID: string) {
    try {
      console.log("placemarkService.deletePOI.request", pointID);
      const response = await axios.delete(this.baseURL+"/api/pois/"+pointID);
      console.log("placemarkService.deletePOI.response", response);
      return response.status == 204;
    } catch (error) { console.log("placemarkService.deletePOI.error", error); }
  },
}