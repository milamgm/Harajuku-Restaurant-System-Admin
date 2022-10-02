import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";


interface TProps {
  setProductCategory : (prev: any) => string
  currentCategory : string
}

const SelectCategoryField = ({ setProductCategory, currentCategory } : TProps) => {
  const {
    initFetchCategories,
    setInitFetchCategories,
    categories,
    setCategories,
  } = useAppContext();
  useEffect(() => {
    if (initFetchCategories === false) {
      onSnapshot(collection(db, "categories"), (snapshot) => {
        setCategories([]);
        snapshot.docs.forEach((doc) => {
          setCategories((prevCategories : boolean[]) => [...prevCategories, doc.data()]);
        });
      });
      setInitFetchCategories(true);
    }
  }, []);
  return (
    <Form.Select
      aria-label="Categories"
      name="category"
      defaultValue={currentCategory}
      onChange={(e) => setProductCategory(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category.category_name} value={category.category_name}>
          {category.category_name}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectCategoryField;
