import { GrAlert } from "react-icons/Gr";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import { IProduct } from "../types/types";

interface IProps {
  deleteProductBtn: boolean;
  setDeleteProductBtn: (value: boolean) => void;
  selectedProduct: IProduct | boolean[] | undefined;
}

const DeleteProductModal = ({
  deleteProductBtn,
  setDeleteProductBtn,
  selectedProduct,
}: IProps) => {
  const { products, setProducts } = useAppContext();
  const [input, setInput] = useState("");
  const [multipleProductsConfirm, setMultipleProductsConfirm] = useState(
    "Yes, I want to delete the selected items."
  );

  const handleDeleteProduct = () => {
    const deleteFromDatabase = (product: IProduct) => {
      try {
        const deleteFromDB = async () => {
          await deleteDoc(doc(db, "products", product.product_id));
          toast.success("Product(s) successfully deleted!");
          setDeleteProductBtn(false);
        };
        deleteFromDB();
      } catch (error) {
        console.error(error);
        toast.error("Failed to connect to database, please try again");
      }
    };

    if (!Array.isArray(selectedProduct)) {
      if (selectedProduct.product_name === input) {
        deleteFromDatabase(selectedProduct);
      } else {
        toast.error("Name doesn't match. Please try again");
      }
    } else {
      if (multipleProductsConfirm === input) {
        selectedProduct.map((checkbox, ind) => {
          if (checkbox === true) {
            deleteFromDatabase(products[ind]);
          }
        });
      } else {
        toast.error("Name doesn't match. Please try again");
      }
    }
  };

  return (
    <Modal
      show={deleteProductBtn}
      onHide={() => setDeleteProductBtn((prev: boolean) => !prev)}
      keyboard={false}
    >
      <div className="border border-danger">
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        {!Array.isArray(selectedProduct) && (
          <Modal.Body className="modal-body">
            <div className="modal-in">
              <Alert variant="danger">
                <GrAlert /> This action will permanently delete this product and
                all information associated with it.
              </Alert>
              To confirm that you want to delete this product, type its name:{" "}
              <b>{selectedProduct.product_name}</b>
              <Form.Control
                autoFocus
                className="mt-3"
                type="text"
                placeholder={selectedProduct.product_name}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </Modal.Body>
        )}
        {Array.isArray(selectedProduct) && (
          <Modal.Body className="modal-body">
            <div className="modal-in">
              <Alert variant="danger">
                <GrAlert /> This action will permanently delete this product(s)
                and all information associated.
              </Alert>
              To confirm that you want to delete the following products:
              <ul>
                {selectedProduct.map(
                  (checkbox, ind) =>
                    checkbox === true && (
                      <li key={ind}>
                        <small>
                          <b>{products[ind].product_name} </b>
                        </small>
                      </li>
                    )
                )}
              </ul>
              please type "{multipleProductsConfirm}"
              <Form.Control
                autoFocus
                className="mt-3"
                type="text"
                placeholder={multipleProductsConfirm}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button
            className="btn-secondary"
            onClick={() => setDeleteProductBtn((prev: any) => !prev)}
          >
            Close
          </Button>
          <Button className="btn-danger" onClick={handleDeleteProduct}>
            Delete product
          </Button>
        </Modal.Footer>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </Modal>
  );
};

export default DeleteProductModal;
