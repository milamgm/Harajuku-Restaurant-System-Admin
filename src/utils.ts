import { BiPlus } from "react-icons/Bi";
import {
  Button,
  Accordion,
  Col,
  Row,
  Table,
  FormControl,
  Modal,
  Form,
} from "react-bootstrap";
import AddProduct from "./components/AddProduct";
import db from "./firebase/firebaseConfig";
import EditProduct from "./components/EditProduct";
import { useAppContext } from "./context/AppContext";
import DeleteProductModal from "./components/DeleteProductModal";
import { toast, Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
import ImportProducts from "./components/ImportProducts";
import ShowProductImageModal from "./components/ShowProductImageModal";
import ProductsTable from "./components/ProductsTable";
import ProductsTopBar from "./components/ProductsTopBar";
import { v4 } from "uuid";
import AddCategoryField from "./components/CategoryField/AddCategoryField.js";
import SelectCategoryField from "./components/CategoryField/SelectCategoryField.js";
import GalleryWidget from "./components/GalleryWidget";
import { FiCamera } from "react-icons/Fi";
import { IFormTarget } from "./types/types";

export {
  BiPlus,
  Button,
  AddProduct,
  db,
  EditProduct,
  useAppContext,
  DeleteProductModal,
  Toaster,
  toast,
  Loading,
  ImportProducts,
  ShowProductImageModal,
  ProductsTable,
  ProductsTopBar,
  productInitialState,
  weekDays,
  monate,
  Accordion,
  Modal,
  Form,
  Col,
  Row,
  Table,
  FormControl,
  v4,
  AddCategoryField,
  SelectCategoryField,
  GalleryWidget,
  FiCamera,
};

const productInitialState = {
  product_id: "",
  product_img: "",
  product_name: "",
  product_price: 0,
  product_description: "",
  product_category: "",
  product_isAvailable: false,
};

const weekDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];
const monate = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

//Changes the first letter of the words in the string to uppercase
export const toUpperCaseString = (str: string) => {
  let upperStr;
  if (str.indexOf(" ")) {
    const categoryArr = str.split(" ");
    let arr = [];
    for (const word of categoryArr) {
      const first = word.charAt(0).toUpperCase();
      const upperWord = `${first}${word.slice(1)}`;
      arr.push(upperWord);
    }
    upperStr = arr.join(" ");
  } else {
    const first = str.charAt(0).toUpperCase();
    upperStr = `${first}${str.slice(1)}`;
  }
  return upperStr;
};
