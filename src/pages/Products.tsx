import React, { useEffect, useRef, useState } from "react";
import { IProduct } from "../types/types";
import { onSnapshot, collection, setDoc, doc } from "firebase/firestore";
import {
  BiPlus,
  Button,
  AddProduct,
  db,
  EditProduct,
  useAppContext,
  DeleteProductModal,
  Toaster,
  Loading,
  ImportProducts,
  ShowProductImageModal,
  ProductsTable,
  ProductsTopBar,
  productInitialState,
} from "../utils";

const Products = () => {
  const { setInitFetchProducts, initFetchProducts, products, setProducts } =
    useAppContext();
  const [addProductBtn, setAddProductBtn] = useState(false);
  const [editProductBtn, setEditProductBtn] = useState(false);
  const [deleteProductBtn, setDeleteProductBtn] = useState(false);
  const [importProductsBtn, setImportProductsBtn] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const mainCheckbox = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [editProduct, setEditProduct] = useState<IProduct>(productInitialState);

  //Groups all checkbox references (except mainCheckbox) into an array
  const revealRefs = useRef([]);
  revealRefs.current = [];
  const checkBoxRefs: HTMLInputElement[] = revealRefs.current;
  const addToRefs = (el: HTMLInputElement) => {
    if (el && !checkBoxRefs.includes(el)) {
      checkBoxRefs.push(el);
    }
  };
  //If maincheckbox, enable/disable all other checkboxes; if not, gets the selected checkboxes.
  const getCheckboxes = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target.dataset.check === "mainCheckbox") {
      revealRefs.current.map(
        (item: HTMLInputElement) => (item.checked = e.target.checked)
      );
    }
    setSelectedProducts(() => {
      return checkBoxRefs
        .filter((checkbox: HTMLInputElement) => checkbox.checked === true)
        ?.map((item: HTMLInputElement) => item.dataset.check!);
    });
  };
  //Change the status of a product to available/not available. (If it is not available, it will not be displayed in customers app).
  const changeAvailability = (selectedProductsId: string[]) => {
    const updateInDatabase = async (product: IProduct) =>
      await setDoc(doc(db, "products", product.product_id), product);
    selectedProductsId.forEach((productId) => {
      const product = products.find(
        (product) => product.product_id === productId
      );
      product.product_isAvailable =
        product.product_isAvailable === true ? false : true;
      updateInDatabase(product);
    });
  };
  //collects again the active checkboxes when deleteProduct modal closes.
  useEffect(() => {
    if (!deleteProductBtn) {
      getCheckboxes(null);
    }
  }, [deleteProductBtn]);
  //Fetches products data.
  useEffect(() => {
    if (!initFetchProducts) {
      onSnapshot(collection(db, "products"), (snapshot) => {
        setProducts([]);
        snapshot.docs.forEach((doc) => {
          setProducts((prevProducts: IProduct[]) => [
            ...prevProducts,
            doc.data(),
          ]);
        });
        setInitFetchProducts(true);
      });
    }
  }, []);
  //props for ProductsTable component
  const productsTablePros = {
    getCheckboxes,
    mainCheckbox,
    setEditProduct,
    setShowImage,
    setEditProductBtn,
    changeAvailability,
    addToRefs,
    setDeleteProductBtn,
    setSelectedProducts,
  };
  return (
    <div style={{ paddingBottom: "200px" }}>
      <ProductsTopBar
        setAddProductBtn={setAddProductBtn}
        setImportProductsBtn={setImportProductsBtn}
        selectedProducts={selectedProducts}
        changeAvailability={changeAvailability}
        setDeleteProductBtn={setDeleteProductBtn}
      />
      {products.length > 0 && <ProductsTable {...productsTablePros} />}

      {/*////////////// OPEN MODALS ////////////*/}
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
          editProduct={editProduct}
        />
      )}
      {deleteProductBtn && (
        <DeleteProductModal
          deleteProductBtn={deleteProductBtn}
          setDeleteProductBtn={setDeleteProductBtn}
          selectedProducts={selectedProducts}
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

      {showImage && (
        <ShowProductImageModal
          showImage={showImage}
          setShowImage={setShowImage}
          editProduct={editProduct}
        />
      )}

      <Toaster
        toastOptions={{
          style: {
            marginTop: "60px",
            backgroundColor: "#c6f2ff",
          },
        }}
      />
    </div>
  );
};

export default Products;
