export interface IAppContext {
  initFetchProducts: boolean;
  setInitFetchProducts: Function;
  products: ProductsTypes[];
  setProducts: Function;
  initFetchCategories: boolean;
  setInitFetchCategories: Function;
  categories: ICategory[];
  setCategories: Function;
  addCategoryField: boolean;
  setAddCategoryField: Function;
}

interface ICategory{
  category_name : string
}

export interface IOrder {
  order_id: string;
  table_num: number;
  time: Date;
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
export interface IProducts {
  [index: number]: TProduct;
}
