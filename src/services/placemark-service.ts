import axios from "axios";
import { loggedInUser, latestCategory, latestPOI } from "../stores";
import type { Category, POI } from "./placemark-types";

export const placemarkService = {
  baseURL: "http://localhost:3000",
  async login(email: string, password: string): Promise<boolean> {
    console.log("login transaction starting");
    try {
      const response = await axios.post(`${this.baseURL}/api/users/authenticate`, {email, password});
      console.log("logged user response", response);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) { 
        loggedInUser.set({
          email: email,
          token: response.data.token,
          _id: response.data.id,
        });
        localStorage.placemark = JSON.stringify({email: email, token: response.data.token});
        console.log("login transaction completed");
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
        loggedInUser.set({
          email: savedUser.email, 
          token: savedUser.token,
          _id: savedUser._id
        });
        axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
      }
    }
  },
  async getCategory(catID: string): Promise<Category | null> {
    console.log("starting transaction to get one category");
    try {
      const response = await axios.get(this.baseURL+"/api/categories/"+catID);
      console.log("transaction to get specific category completed");
      return response.data;
    } catch (error) {
      console.log("transaction to get specific category failed w/ error message", error);
      return null;
    }
  },
  async getCategories(): Promise<Category[]> {
    try {
      console.log("requesting categories data from backend serivce");
      const response = await axios.get(this.baseURL+"/api/categories");
      console.log("transaction to get categories completed", response.data);
      return response.data;
    } catch (error) {
      console.log("transaction to get categories failed w/ error message", error);
      return [];
    }
  },
  async createCategory(category: Category) {
    try {
      console.log("sending category data to backend service", category);
      const request = await axios.post(this.baseURL+"/api/categories", category);
      console.log("transaction completed - category has been created");
      return request.status == 200;
    } catch (error) { 
      console.log("transaction to create new category failed w/ error message", error);
      return false;
    }
  },
  async deleteCategory(catID: string) {
    try {
      const response = await axios.delete(this.baseURL+"/api/categories/"+catID);
      console.log(this.baseURL+"/api/categories/"+catID);
      console.log("transaction to delete category has completed");
      return response.status == 204;
    } catch (error) {
      console.log("transation to delete cateogry failed w/ error message", error);
    }
  },
  async getCategoryByID(categoryID: string) {
    try {
      const response = await axios.get(this.baseURL+"/api/categories/"+categoryID);
      console.log("get category by ID: "+categoryID, response);
      return response.data;
    } catch (error) { console.log("transaction to get category POI failed w/ error message"), error };
  },
  async getPOI() { // not functional yet
    return false;
  },
  async getPOIs() { // not functional yet
    return false;
  },
  async createPOI(categoryID: string, newPOI: POI) { // not functional yet
    try {
      console.log("starting transation to create new POI", newPOI);
      const response = await axios.post(this.baseURL+"/api/categories/"+categoryID+"/pois", newPOI);
      console.log("transaction to create new POI has completed", response);
      return response.data;
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