export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}

export interface LoggedInUser {
  email: string;
  token: string;
  _id: string;
}

export interface Category {
  type: string;
  userid: string;
  pois?: POI[];
  _id?: string;
}

export interface POI {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  categoryid: string;
  _id?: string; 
}


export interface CategoryPlacemarks {
  type: Category;
  pois: POI[];
}