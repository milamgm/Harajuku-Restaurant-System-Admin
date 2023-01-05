import React from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { BiHide, BiImage } from "react-icons/Bi";
import { GoAlert } from "react-icons/Go";
import { MdDelete, MdEdit } from "react-icons/Md";
import { useAppContext } from "../context/AppContext";
import { IProduct } from "../types/types";

interface ProductsTableProps {
  getCheckboxes: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
  mainCheckbox: React.RefObject<HTMLInputElement>;
  setEditProduct: React.Dispatch<React.SetStateAction<IProduct>>;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  changeAvailability: (selectedProductsId: string[]) => void;
  addToRefs: (el: HTMLInputElement) => void;
  setDeleteProductBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  setEditProductBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsTable = ({
  getCheckboxes,
  mainCheckbox,
  setEditProduct,
  setShowImage,
  setEditProductBtn,
  changeAvailability,
  addToRefs,
  setDeleteProductBtn,
  setSelectedProducts,
}: ProductsTableProps) => {
  const { products } = useAppContext();
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              onChange={getCheckboxes}
              data-check="mainCheckbox"
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
                onChange={getCheckboxes}
                ref={addToRefs}
              />
            </td>
            <td>{product.product_id}</td>
            <td>{product.product_name}</td>
            <td>{product.product_category}</td>
            <td>
              <small>{product.product_description}</small>
            </td>
            <td className="text-end">{product.product_price}€</td>
            <td>
              <div
                className="text-center"
                onClick={() => {
                  setEditProduct(product);
                  product.product_img !== ""
                    ? setShowImage(true)
                    : setEditProductBtn(true);
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
                  onClick={() => changeAvailability([product.product_id])}
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
                    setEditProduct(product);
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
                    setSelectedProducts([product.product_id]);
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
  );
};

export default ProductsTable;
