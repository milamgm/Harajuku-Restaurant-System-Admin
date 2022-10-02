import { createContext, useContext, useState } from "react";
import { IAppContext, IProducts, ICategory } from "../types/types";

type Props = {
  children: React.ReactNode;
};

const context = createContext({} as IAppContext);
export const useAppContext = () => {
  return useContext(context);
};

const AppContext = ({ children }: Props) => {
  const [initFetchProducts, setInitFetchProducts] = useState(false);
  const [initFetchCategories, setInitFetchCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [addCategoryField, setAddCategoryField] = useState(false);

  const AppContextValues = {
    setInitFetchProducts,
    initFetchProducts,
    products,
    setProducts,
    initFetchCategories,
    setInitFetchCategories,
    categories,
    setCategories,
    addCategoryField,
    setAddCategoryField,
  };
  return (
    <context.Provider value={AppContextValues}>{children}</context.Provider>
  );
};

export default AppContext;
