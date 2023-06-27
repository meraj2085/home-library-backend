import { Model, Types } from "mongoose";

export enum Location {
  Dhaka = "Dhaka",
  Chattogram = "Chattogram",
  Barishal = "Barishal",
  Rajshahi = "Rajshahi",
  Sylhet = "Sylhet",
  Comilla = "Comilla",
  Rangpur = "Rangpur",
  Mymensingh = "Mymensingh",
}

export enum Label {
  ForSale = "for sale",
  SoldOut = "sold out",
}

export enum Category {
  Dairy = "Dairy",
  Beef = "Beef",
  DualPurpose = "Dual Purpose",
}

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed:
    | "Brahman"
    | "Nellore"
    | "Sahiwal"
    | "Gir"
    | "Indigenous"
    | "Tharparkar"
    | "Kankrej";
  weight: number;
  label: Label;
  category: Category;
  seller: Types.ObjectId;
};

export type ICowFilters = {
  searchTerm?: string;
  id?: string;
  name?: string;
  age?: number;
  price?: number;
  location?: Location;
  breed?: ICow["breed"];
  weight?: number;
  label?: Label;
  category?: Category;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
