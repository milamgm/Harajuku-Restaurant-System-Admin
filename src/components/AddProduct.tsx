import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getStorage } from "firebase/storage";
import db from "../firebase/firebaseConfig";
import { v4 } from "uuid";
import { useAppContext } from "../context/AppContext.js";
import AddCategoryField from "./CategoryField/AddCategoryField.js";
import SelectCategoryField from "./CategoryField/SelectCategoryField.js";
import GalleryWidget from "./GalleryWidget";
import { FiCamera } from "react-icons/Fi";

interface PropsInterface {
  addProductBtn: boolean;
  setAddProductBtn: (value: boolean) => void;
}

const AddProduct = ({ addProductBtn, setAddProductBtn }: PropsInterface) => {
  const { addCategoryField, setAddCategoryField } = useAppContext();
  const [price, setPrice] = useState("");
  const storage = getStorage();
  const [productImg, setProductImg] = useState("");
  const [openGalleryBtn, setOpenGalleryBtn] = useState(false);
  let path = "";

  const handlePrice = (e) => {
    e.preventDefault();
    const result = e.target.value.replace(/\D/g, "");
    const decs = result.slice(-2);
    const units = result.slice(0, -2);
    const num = units + (units !== "" ? "." : "") + decs;
    setPrice(num);
  };
  const previewImg = (e) => {
    const imgFile = e.target.files[0];
    const localURL = URL.createObjectURL(imgFile);
    setProductImg(localURL);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      id: { value: string };
      name: { value: string };
      price: { value: number };
      description: { value: string };
      category: { value: string };
      isAvailable: { value: boolean };
    };

    if (e.target.img.files[0] !== undefined) {
      const imgUpload = e.target.img.files[0];
      const imgName = imgUpload.name + v4();
      const imgRef = ref(storage, `products/${imgName}`);
      uploadBytes(imgRef, imgUpload);
      path = `https://firebasestorage.googleapis.com/v0/b/harajuku-b44c9.appspot.com/o/products%2F${imgName}?alt=media`;
    }
    const addToDB = async () => {
      await setDoc(doc(db, "products", target.id.value), {
        product_id: target.id.value,
        product_img: path !== "" ? path : productImg,
        product_name: target.name.value,
        product_price: Number(price),
        product_description: target.description.value,
        product_category: target.category.value,
        product_isAvailable: true,
      });
    };
    addToDB();
    setAddProductBtn(false);
  };
  return (
    <>
      <Modal
        show={addProductBtn}
        fullscreen={true}
        onHide={() => setAddProductBtn(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-in">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 input-group-sm" controlId="productId">
                <Form.Label>Product ID#</Form.Label>
                <Form.Control
                  type="number"
                  name="id"
                  placeholder="5463"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3 input-group-sm"
                controlId="productImg"
              >
                <Form.Label>Image</Form.Label>
                <div>
                  { productImg !== "" && <Button
                    variant="link"
                    onClick={() => setOpenGalleryBtn(true)}
                  >
                    <div className="img-form-div">
                      <img className="img-form" src={productImg} width="125" />
                    </div>
                  </Button>}
                  <Button
                    variant="link"
                    onClick={() => setOpenGalleryBtn(true)}
                  >
                    <div className="d-flex align-items-center">
                      <h3 className="me-3">
                        <FiCamera />
                      </h3>
                      Choose from gallery
                    </div>
                  </Button>
                  <Form.Control
                    name="img"
                    type="file"
                    className="mt-3"
                    onChange={(e) => previewImg(e)}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                  placeholder="Delicious Dessert"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  placeholder="5.00"
                  required
                  value={price}
                  onChange={handlePrice}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  required
                  placeholder="With the best ingredients..."
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productCategory">
                <Form.Label>Category</Form.Label>{" "}
                <Button
                  variant="link"
                  onClick={() => setAddCategoryField(!addCategoryField)}
                >
                  + Add new category
                </Button>
                {addCategoryField && <AddCategoryField />}
                <SelectCategoryField />
              </Form.Group>
              <Button className="mt-3 btn-primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      {openGalleryBtn && (
        <GalleryWidget
          openGalleryBtn={openGalleryBtn}
          setOpenGalleryBtn={setOpenGalleryBtn}
          setProductImg={setProductImg}
        />
      )}
    </>
  );
};

export default AddProduct;
