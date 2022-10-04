import { createContext, useContext, useState, useEffect } from "react";
import { IAppContext, IProducts, ICategory } from "../types/types";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

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
  const [completedOrders, setCompletedOrders] = useState<IOrder[]>([]);

  

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
    completedOrders
  };
  useEffect(() => {
    onSnapshot(collection(db, "completedOrders"), (snapshot) => {
      setCompletedOrders([]);
      snapshot.docs.forEach((doc) => {
        setCompletedOrders((prevOrders: any) => [...prevOrders, doc.data()]);
      });
    });
  }, []);
  
  return (
    <context.Provider value={AppContextValues}>{children}</context.Provider>
  );
};

export default AppContext;
