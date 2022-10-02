import { BiPlus, BiImport, BiExport, BiHide, BiImage } from "react-icons/Bi";
import {MdEdit, MdDelete} from "react-icons/Md";
import { GoAlert } from "react-icons/Go";
import { Button, Row, Col, Form, Table, Modal, Alert, Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import AddProduct from "../components/AddProduct";
import { onSnapshot, collection, setDoc, doc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import EditProduct from "../components/EditProduct";
import { useAppContext } from "../context/AppContext";
import DeleteProductModal from "../components/DeleteProductModal";
import SearchField from "../components/SearchField";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import { IProduct } from "../types/types";
import ImportProducts from "../components/ImportProducts";

const Products = () => {
  const { setInitFetchProducts, initFetchProducts, products, setProducts } =
    useAppContext();
  const [addProductBtn, setAddProductBtn] = useState(false);
  const [editProductBtn, setEditProductBtn] = useState(false);
  const [deleteProductBtn, setDeleteProductBtn] = useState(false);
  const [importProductsBtn, setImportProductsBtn] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const mainCheckbox = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [checkboxes, setCheckboxes] = useState<boolean[]>(
    new Array(products.length).fill(false)
  );
  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | boolean[]
  >();

  const [productName, setProductName] = useState<string>();
  const [productImg, setProductImg] = useState<string>();

  const markAsUnavailable = (input: IProduct | boolean[]): void => {
    const addToDB = async (input: IProduct) => {
      await setDoc(doc(db, "products", input.product_id), {
        product_id: input.product_id,
        product_img: input.product_img,
        product_name: input.product_name,
        product_price: input.product_price,
        product_description: input.product_description,
        product_category: input.product_category,
        product_isAvailable: input.product_isAvailable === true ? false : true,
      });
    };
    if (Array.isArray(input)) {
      input.map((checkbox, ind) => {
        if (checkbox === true) {
          try {
            addToDB(products[ind]);
          } catch (error) {
            console.error(error);
            toast.error("Failed to connect to database, please try again");
          }
        }
      });
    } else {
      try {
        addToDB(input);
      } catch (error) {
        console.error(error);
        toast.error("Failed to connect to database, please try again");
      }
    }
  };
  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index === 9999) {
      let target = e.target as HTMLInputElement;
      let mainCheckboxValue = target.checked;
      setCheckboxes(
        checkboxes.map((value, ind) => {
          return (value = mainCheckboxValue);
        })
      );
    } else {
      setCheckboxes(
        checkboxes.map((value, ind) => {
          if (ind === index) {
            return (value = !value);
          } else {
            return value;
          }
        })
      );
      mainCheckbox.current.checked = false;
    }
  };
  useEffect(() => {
    if (initFetchProducts === false) {
      let productQty = 0;
      const accessProducts = new Promise((resolutionFunc, rejectionFunc) => {
        onSnapshot(collection(db, "products"), (snapshot) => {
          setProducts([]);
          snapshot.docs.forEach((doc) => {
            setProducts((prevProducts: IProduct[]) => [
              ...prevProducts,
              doc.data(),
            ]);
            productQty++;
          });
          setInitFetchProducts(true);
          resolutionFunc(() => console.log("resolved"));
          rejectionFunc(() => console.log("rejected"));
        });
      });

      accessProducts
        .then(() => {
          setCheckboxes(new Array(productQty).fill(false));
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to connect to database, please try again");
        });
    }
  }, []);

  useEffect(() => {
    /*if (checkboxes.every((checkbox) => checkbox === true)) {
      mainCheckbox.current.checked = true;
      console.log("hola");
    }else{
      mainCheckbox.current.checked = false;
    }*/
  }, [checkboxes]);
  return (
    <div>
      <Row>
        <Col>
          <Button
            className="mt-1me-1"
            variant="success"
            onClick={() => setAddProductBtn(true)}
          >
            <BiPlus /> Add Product
          </Button>{" "}
          <Button
            className="mt-1me-1"
            variant="dark"
            onClick={() => setImportProductsBtn(true)}
          >
            <BiImport /> Import Products
          </Button>{" "}
          <Button className="mt-1" variant="dark">
            <BiExport /> Export Products
          </Button>{" "}
        </Col>
        <SearchField />
      </Row>

      <div className="mt-5">
        <div className="d-flex justify-content-end mb-2">
          <Button
            className="me-1 btn-warning"
            onClick={() => {
              if (checkboxes.includes(true)) markAsUnavailable(checkboxes);
            }}
          >
            <BiHide /> Mark / unmark as unavailable
          </Button>{" "}
          <Button
            className="btn-danger"
            onClick={() => {
              setSelectedProduct(checkboxes);
              if (checkboxes.includes(true)) setDeleteProductBtn(true);
            }}
          >
            <MdDelete /> Delete
          </Button>{" "}
        </div>
        {products.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    onChange={(e) => handleCheckbox(e, 9999)}
                    ref={mainCheckbox}
                  />
                </th>
                <th># ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: IProduct, index: number) => (
                <tr
                  key={product.product_id}
                  className={`${
                    product.product_isAvailable === true ? "" : "isNotAvailable"
                  }`}
                >
                  <td>
                    <Form.Check
                      data-check={product.product_id}
                      type="checkbox"
                      className="row_checkbox"
                      checked={checkboxes[index]}
                      onChange={(e) => handleCheckbox(e, index)}
                    />
                  </td>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_category}</td>
                  <td>
                    <small>
                      <i></i>
                      {product.product_description}
                    </small>
                  </td>
                  <td className="text-end">
                    {typeof product.product_price === "number" ? (
                      `${product.product_price}€`
                    ) : (
                      <h6>Price must be a number, please update it</h6>
                    )}
                  </td>
                  <td>
                    <div
                      className="text-center"
                      onClick={() => {
                        {
                          if (product.product_img !== "") {
                            setShowImage(true);
                          } else {
                            setSelectedProduct(product);
                            setEditProductBtn(true);
                          }
                          setProductName(product.product_name);
                          setProductImg(product.product_img);
                        }
                      }}
                    >
                      {product.product_img !== "" ? (
                        <h3>
                          <BiImage />
                        </h3>
                      ) : (
                        <Alert variant="danger" className="text-center">
                          <GoAlert />
                          "Please add an image"
                        </Alert>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="btn-list-div">
                      <Button
                        className="text-warning"
                        variant="link"
                        onClick={() => markAsUnavailable(product)}
                      >
                        <h4>
                          <BiHide />
                        </h4>
                      </Button>
                      <Button
                        className="text-info"
                        variant="link"
                        onClick={() => {
                          setEditProductBtn(true);
                          setSelectedProduct(product);
                        }}
                      >
                        <h4>
                          <MdEdit />
                        </h4>
                      </Button>
                      <Button
                        className="text-danger"
                        variant="link"
                        onClick={() => {
                          setDeleteProductBtn(true);
                          setSelectedProduct(product);
                        }}
                      >
                        <h4>
                          <MdDelete />
                        </h4>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      {addProductBtn && (
        <AddProduct
          addProductBtn={addProductBtn}
          setAddProductBtn={setAddProductBtn}
        />
      )}
      {editProductBtn && (
        <EditProduct
          editProductBtn={editProductBtn}
          setEditProductBtn={setEditProductBtn}
          selectedProduct={selectedProduct}
        />
      )}
      {deleteProductBtn && (
        <DeleteProductModal
          deleteProductBtn={deleteProductBtn}
          setDeleteProductBtn={setDeleteProductBtn}
          selectedProduct={selectedProduct}
        />
      )}
      {importProductsBtn && (
        <ImportProducts
          importProductsBtn={importProductsBtn}
          setImportProductsBtn={setImportProductsBtn}
        />
      )}
      {initFetchProducts === false && <Loading />}
      {products.length === 0 && initFetchProducts === true && (
        <div className="text-center mt-5 pt-5">
          <h3>You don't have any products yet,</h3>
          <h3 className="text-center">please add some here</h3>
          <Button onClick={() => setAddProductBtn(true)}>
            <BiPlus /> Add Product
          </Button>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <Modal show={showImage} onHide={() => setShowImage(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{productName}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-in">
            <img src={productImg} width="465" />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Products;
