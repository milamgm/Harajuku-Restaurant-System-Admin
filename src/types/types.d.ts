import { Timestamp } from "firebase/firestore";
import React from "react";

export interface IAppContext {
  initFetchProducts: boolean;
  setInitFetchProducts: Function;
  products: ProductsTypes[];
  setProducts: Function;
  initFetchCategories: boolean;
  setInitFetchCategories: React.Dispatch<React.SetStateAction<boolean>>;
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  addCategoryField: boolean;
  setAddCategoryField: React.Dispatch<React.SetStateAction<boolean>>;
  completedOrders: IOrder[];
}

interface ICategory {
  category_name: string;
}

export interface IOrder {
  order_id: string;
  table_num: number;
  time: Timestamp;
  items: ItemTypes[];
}
export interface IItem {
  id: string;
  name: string;
  quantity: number;
}

export interface IProduct {
  product_id: string;
  product_img: string;
  product_name: string;
  product_price: number;
  product_description: string;
  product_category: string;
  product_isAvailable: boolean;
}
export interface IFormTarget {
  id: { value: string };
  name: { value: string };
  img: { files: File[] };
  price: { value: number };
  description: { value: string };
  category: { value: string };
  isAvailable: { value: boolean };
}
