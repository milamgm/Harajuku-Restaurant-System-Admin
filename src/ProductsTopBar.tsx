import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { BiExport, BiHide, BiImport, BiPlus } from "react-icons/Bi";
import { MdDelete } from "react-icons/Md";
import SearchField from "./components/SearchField";

interface ProductsTopBarProps {
  setAddProductBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setImportProductsBtn: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProducts: string[],
  changeAvailability: (selectedProductsId: string[]) => void;
  setDeleteProductBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsTopBar = ({
  setAddProductBtn,
  setImportProductsBtn,
  selectedProducts,
  changeAvailability,
  setDeleteProductBtn
}: ProductsTopBarProps) => {
  return (
    <>
  
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
          onClick={() =>
            selectedProducts.length > 0
              ? changeAvailability(selectedProducts)
              : toast("Please select one or more products.")
          }
        >
          <BiHide /> Mark / unmark as unavailable
        </Button>{" "}
        <Button
          className="btn-danger"
          onClick={() =>
            selectedProducts.length > 0
              ? setDeleteProductBtn(true)
              : toast("Please select one or more products.")
          }
        >
          <MdDelete /> Delete
        </Button>{" "}
      </div>
    </div>
    </>
  );
};

export default ProductsTopBar;
