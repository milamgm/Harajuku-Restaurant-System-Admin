import { GrAlert } from "react-icons/Gr";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

interface IDeleteProductModalProps {
  deleteProductBtn: boolean;
  setDeleteProductBtn: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProducts: string[];
}

const DeleteProductModal = ({
  deleteProductBtn,
  setDeleteProductBtn,
  selectedProducts
}: IDeleteProductModalProps) => {
  const {products} = useAppContext()
  const [input, setInput] = useState("");
  const multipleProductsConfirm = "Yes, I want to delete the selected items."
 
  const handleDeleteProduct = () => {
    const deleteFromDatabase = (selectedProductId : string) => {
      try {
        const deleteFromDB = async () => {
          await deleteDoc(doc(db, "products", selectedProductId));
          toast.success("Product(s) successfully deleted!");
          setDeleteProductBtn(false);
        };
        deleteFromDB();
      } catch (error) {
        console.error(error);
        toast.error("Failed to connect to database, please try again");
      }
    };
    if (multipleProductsConfirm === input) {
      selectedProducts.map((selectedProductId) => {
        deleteFromDatabase(selectedProductId);
      });
    } else {
      toast.error("Name doesn't match. Please try again");
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

        <Modal.Body className="modal-body">
          <div className="modal-in">
            <Alert variant="danger">
              <GrAlert /> This action will permanently delete this product(s)
              and all information associated.
            </Alert>
            To confirm that you want to delete the following products:
            <ul>
              {selectedProducts.map((selectedProductId) => (
                <li key={selectedProductId}>
                  <small>
                    <b>{products.find(prod => prod.product_id === selectedProductId)?.product_name} </b>
                  </small>
                </li>
              ))}
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
