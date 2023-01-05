import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { IFormTarget, IProduct } from "../types/types";
import {
  AddCategoryField,
  Button,
  db,
  FiCamera,
  Form,
  GalleryWidget,
  Modal,
  SelectCategoryField,
  toast,
  Toaster,
  useAppContext,
} from "../utils";
import { createImgPath, previewImg } from "../storageFetches";

interface EditProductProps {
  editProductBtn: boolean;
  setEditProductBtn: (value: boolean) => void;
  editProduct: IProduct;
}

const EditProduct = ({
  editProductBtn,
  setEditProductBtn,
  editProduct,
}: EditProductProps) => {
  const { addCategoryField, setAddCategoryField } = useAppContext();
  const {
    product_id,
    product_name,
    product_price,
    product_img,
    product_description,
    product_category,
  } = editProduct;

  const [productName, setProductName] = useState(product_name);
  const [price, setPrice] = useState(product_price);
  const [productDescription, setProductDescription] =
    useState(product_description);
  const [productCategory, setProductCategory] = useState(product_category);
  const [productImg, setProductImg] = useState(product_img);
  const [openGalleryBtn, setOpenGalleryBtn] = useState(false);
  let path = "";

  //Formats input to decimals
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const result = e.target.value.replace(/\D/g, "");
    const decs = result.slice(-2);
    const units = result.slice(0, -2);
    const num = Number(units + (units !== "" ? "." : "") + decs);
    setPrice(num);
  };

  //Updates the product in the database
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & IFormTarget;
    //creates a path in case a new image has been uploaded
    createImgPath(target, path);

    //updates the database
    try {
      addToDB(target, path, productImg, productName, productCategory, price);
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
                    className="m-3 text-decoration-none"
                    variant="link"
                    onClick={() => setOpenGalleryBtn(true)}
                  >
                    <div className="img-form-div">
                      <img className="img-form" src={productImg} width="125" />
                    </div>
                  </Button>
                  <Button
                    variant="link"
                    className="text-decoration-none"
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
                    onChange={(e) => previewImg(e, setProductImg)}
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
                  className="text-decoration-none"
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

const addToDB = async (
  target: IFormTarget,
  path: string,
  productImg: string,
  productName: string,
  productCategory: string,
  price: number
) => {
  await setDoc(doc(db, "products", target.id.value), {
    product_id: target.id.value,
    product_img: path !== "" ? path : productImg,
    product_name: productName,
    product_price: price,
    product_description: productImg,
    product_category: productCategory,
    product_isAvailable: true,
  });
};
