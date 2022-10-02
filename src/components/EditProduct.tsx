import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getStorage } from "firebase/storage";
import db from "../firebase/firebaseConfig";
import { v4 } from "uuid";
import AddCategoryField from "./CategoryField/AddCategoryField.js";
import SelectCategoryField from "./CategoryField/SelectCategoryField.js";
import { useAppContext } from "../context/AppContext.js";
import toast, { Toaster } from "react-hot-toast";
import { IProduct } from "../types/types";
import { FiCamera } from "react-icons/Fi";
import GalleryWidget from "./GalleryWidget";

interface IProps {
  editProductBtn: boolean;
  setEditProductBtn: (value: boolean) => void;
  selectedProduct: IProduct | boolean[] | undefined;
}

const EditProduct = ({
  editProductBtn,
  setEditProductBtn,
  selectedProduct,
}: IProps) => {
  const { addCategoryField, setAddCategoryField } = useAppContext();
  const storage = getStorage();
  const {
    product_id,
    product_name,
    product_price,
    product_img,
    product_description,
    product_category,
  } = selectedProduct;

  //onChange Values
  const [productName, setProductName] = useState(product_name);
  const [price, setPrice] = useState(product_price);
  const [productDescription, setProductDescription] =
    useState(product_description);
  const [productCategory, setProductCategory] = useState(product_category);
  const [productImg, setProductImg] = useState(product_img);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.img.files[0] !== undefined) {
      const imgUpload = e.target.img.files[0];
      const imgName = imgUpload.name + v4();
      const imgRef = ref(storage, `products/${imgName}`);
      uploadBytes(imgRef, imgUpload);
      path = `https://firebasestorage.googleapis.com/v0/b/harajuku-b44c9.appspot.com/o/products%2F${imgName}?alt=media`;
    }
    try {
      const addToDB = async () => {
        await setDoc(doc(db, "products", e.target.id.value), {
          product_id: e.target.id.value,
          product_img: path !== "" ? path : productImg,
          product_name: productName,
          product_price: Number(price),
          product_description: productDescription,
          product_category: productCategory,
          product_isAvailable: true,
        });
      };
      addToDB();
      setEditProductBtn(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to database, please try again");
    }
  };
  return (
    <>
      <Modal
        show={editProductBtn}
        fullscreen={true}
        onHide={() => setEditProductBtn(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-in">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 input-group-sm" controlId="productId">
                <Form.Label>Product ID#</Form.Label>
                <Form.Control
                  disabled
                  type="number"
                  name="id"
                  value={product_id}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 input-group-sm"
                controlId="productImg"
              >
                <Form.Label>Image</Form.Label>
                <div>
                  <Button
                  className="m-3"
                    variant="link"
                    onClick={() => setOpenGalleryBtn(true)}
                  >
                    <div className="img-form-div">
                      <img className="img-form" src={productImg} width="125" />
                    </div>
                  </Button>
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
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => previewImg(e)}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={price}
                  onChange={handlePrice}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  onChange={(e) => setProductDescription(e.target.value)}
                  value={productDescription}
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
                <SelectCategoryField
                  setProductCategory={setProductCategory}
                  currentCategory={product_category}
                />
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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default EditProduct;
