import { Modal } from "react-bootstrap";
import { IProduct } from "../types/types";

interface ShowProductImageModalProps {
  showImage: boolean;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  editProduct: IProduct;
}
const ShowProductImageModal = ({
  showImage,
  setShowImage,
  editProduct,
}: ShowProductImageModalProps) => {
  return (
    <Modal show={showImage} onHide={() => setShowImage(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{editProduct!.product_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="modal-in">
          <img src={editProduct!.product_img} className="show-product-img" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShowProductImageModal;
