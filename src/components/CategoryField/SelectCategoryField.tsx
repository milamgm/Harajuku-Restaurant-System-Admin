import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import { ICategory } from "../../types/types";

interface SelectCategoryFieldProps {
  setProductCategory?: React.Dispatch<React.SetStateAction<string>>;
  currentCategory?: string;
}

const SelectCategoryField = ({
  setProductCategory,
  currentCategory,
}: SelectCategoryFieldProps) => {
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
          setCategories((prevCategories) => [
            ...prevCategories,
            doc.data() as ICategory,
          ]);
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
      onChange={(e) =>
        setProductCategory !== undefined && setProductCategory(e.target.value)
      }
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
