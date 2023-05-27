import axios from "axios";
import { loggedInUser, latestCategory, latestPOI } from "../stores";
import type { Category, POI } from "./placemark-types";

export const placemarkService = {
  baseURL: "http://localhost:3000",
  async login(email: string, password: string): Promise<boolean> {
    console.log("transaction to authenticate user - in progress");
    try {
      const response = await axios.post(`${this.baseURL}/api/users/authenticate`, {email, password});
      console.log("logged user response", response);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) { 
        loggedInUser.set({
          email: email,
          token: response.data.token,
          _id: response.data._id,
        });
        localStorage.placemark = JSON.stringify({email: email, token: response.data.token, _id: response.data.id,});
        console.log("transaction to authenticate user completed");
        return true;
      }
      console.log("authentication transaction failed");
      return false;
    } catch (error) {
      console.log(error);
      return false
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
      await axios.post(`${this.baseURL}/api/users`, userDetails);
      console.log("sign up transaction completed");
      return true;
    } catch (errror) {
      console.log("sign up transaction failed");
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
    console.log("starting transaction to get specific category");
    try {
      const response = await axios.get(this.baseURL+"/api/categories/"+categoryID);
      console.log("transaction to get specific category has completed");
      return response.data;
    } catch (error) {
      console.log("transaction to get specific category failed w/ error message", error);
      return null;
    }
  },
  async getCategories(): Promise<Category[]> {
    try {
      console.log("requesting all categories data from backend serivce");
      const response = await axios.get(this.baseURL+"/api/categories");
      console.log("transaction to get categories has completed", response.data);
      return response.data;
    } catch (error) {
      console.log("transaction to get all categories failed w/ error message", error);
      return [];
    }
  },
  async getCategoryByUser(userID: string): Promise<Category[]> {
    try {
      console.log("requesting categories by user from backend serivce");
      const requestCall = this.baseURL+"/api/users/"+userID+"/categories";
      console.log(requestCall);
      const response = await axios.get(requestCall);
      console.log("transaction to get categories by user has completed", response.data);
      return response.data;
    } catch (error) {
      console.log("transaction to get categories by user failed w/ error message", error);
      return [];
    }
  },
  async createCategory(category: Category) {
    try {
      console.log("sending category data to backend service", category);
      const request = await axios.post(this.baseURL+"/api/categories", category);
      console.log("transaction completed - category has been created");
      return request.data;
    } catch (error) { 
      console.log("transaction to create new category failed w/ error message", error);
      return false;
    }
  },
  async deleteCategory(catID: string) {
    try {
      console.log("transaction to delete category - in progress")
      const response = await axios.delete(this.baseURL+"/api/categories/"+catID);
      console.log(this.baseURL+"/api/categories/"+catID);
      console.log("transaction to delete category - completed");
      return response.status == 204;
    } catch (error) {
      console.log("transation to delete category - failed", error);
    }
  },
  async getCategoryByID(categoryID: string) {
    try {
      const response = await axios.get(this.baseURL+"/api/categories/"+categoryID);
      console.log("get category data by ID: "+categoryID, response);
      return response.data;
    } catch (error) { console.log("transaction to get category POI failed w/ error message"), error };
  },
  async getCategoriesByUser(userID: string) {
    try {
      console.log("transaction to get categories by user ID:", userID);
      const response = await axios.get(this.baseURL+"/api/users/"+userID+"/categories");
      return response.data;
    } catch (error) {
      console.log("transaction to get categories by user has failed", error);
      return [];
    }
  },
  async getPOI() { // not functional yet
    return false;
  },
  async getPOIs() { // not functional yet
    return false;
  },
  async createPOI(categoryID: string, newPOI: POI) {
    try {
      console.log("transaction to create new POI - in progress \nCategory ID: ", categoryID, "\nPOI", newPOI);
      const response = await axios.post(this.baseURL+"/api/category/pois", {categoryID, newPOI});
      console.log("transaction to create new POI - completed", response);
      return response;
    } catch (error) { console.log(error) }
  },
  async deletePOI(pointID: string) {
    try {
      console.log("transaction to delete point of interest w/ ID: ", pointID);
      const response = await axios.delete(this.baseURL+"/api/pois/"+pointID);
      console.log(response);
      return response.status == 204;
    } catch (error) { console.log(error); }
  },
}