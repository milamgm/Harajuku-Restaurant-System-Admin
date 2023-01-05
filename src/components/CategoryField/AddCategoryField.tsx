import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { toUpperCaseString } from "../../utils";

const AddCategoryField = () => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    const upperCased = toUpperCaseString(newCategory);
    try {
      addToDB(upperCased);
      setNewCategory("");
      toast.success("Category successfully added!");
    } catch (error) {
      console.error(error);
      toast.error("This didn't work. Please refresh the page and try again");
    }
  };
  return (
    <div className="mb-3">
      <Row>
        <Col>
          <Form.Control
            type="text"
            size="sm"
            className=" me-2"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Col>
        <Col>
          <Button className="btn-primary" onClick={() => handleAddCategory()}>
            Add
          </Button>
        </Col>
      </Row>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddCategoryField;

const addToDB = async (newCategory: string) => {
  await setDoc(doc(db, "categories", newCategory), {
    category_name: newCategory,
  });
};
