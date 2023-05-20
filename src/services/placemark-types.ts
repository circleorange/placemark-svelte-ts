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
  user: User;
  POIs: POI[];
  _id: string;
}

export interface POI {
  name: string;
  description: string;
  category: Category;
  lat: number;
  lng: number;
  _id: string;
}
