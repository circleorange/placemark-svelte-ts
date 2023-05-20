import axios from "axios";
import { loggedInUser, Category, POI } from "../stores";

export const placemarkService = {
  baseURL: "http://localhost:4000",
  async login(email: string, password: string): Promise<boolean> {
    console.log("login transaction starting")
    try {
      const response = await axios.post(`${this.baseURL}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) { 
        loggedInUser.set({
          email: email,
          token: response.data.token,
          _id: response.data.id
        });
        localStorage.placemark = JSON.stringify({email: email, token: response.data.token});
        console.log("login transaction completed")
        return true;
      }
      console.log("login transaction failed")
      return false;
    } catch (error) {
      console.log(error);
      return false
    }
  },
  async logout() {
    loggedInUser.set({
      email: "",
      token: "",
      _id: ""
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("placemark");
  },
  async signup(fName: string, lName: string, email: string, pwd: string): Promise<boolean> {
    console.log("sign up transaction starting")
    try {
      const userDetails = {
        firstName: fName,
        lastName: lName,
        email: email,
        password: pwd
      };
      await axios.post(`${this.baseURL}/api/users`, userDetails);
      console.log("sign up transaction completed")
      return true;
    } catch (errror) {
      console.log("sign up transaction failed")
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
  async getCategory(): Promise<Category> { // not functional yet
    return false;
  },
  async getCategories(): Promise<Category[]> { // not functional yet
    return [];
  },
  async createCategory(category: Category) { // not functional yet
    return false;
  },
  async deleteCategory() { // not functional yet
    return false;
  },
  async getPOI() { // not functional yet
    return false;
  },
  async getPOIs() { // not functional yet
    return false;
  },
  async createPOI() { // not functional yet
    return false;
  },
  async deletePOI() { // not functional yet
    return false;
  },
}