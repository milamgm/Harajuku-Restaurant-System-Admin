import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const ImportProducts = ({ importProductsBtn, setImportProductsBtn }) => {
  const [file, setFile] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const fileExt = file.name.slice(-3);
      if (fileExt === "csv" || fileExt === "txt") {
        const fileReader = new FileReader();
        fileReader.readAsText(file);

        fileReader.onload = () => {
          importFile(fileReader.result, fileExt);
        };
        fileReader.onerror = () => {
          console.error(fileReader.error);
          toast.error("Error, please try again.");
        };
      } else {
        toast.error(
          "Fille not allowed. Must be a CSV or tab-delimited TXT file."
        );
      }
    } else {
      toast.error("No files selected");
    }
  };
  const toUpperCaseString = (str: string) => {
    let upperStr;
    if (str.indexOf(" ")) {
      const categoryArr = str.split(" ");
      let arr = [];
      for (const word of categoryArr) {
        const first = word.charAt(0).toUpperCase();
        const upperWord = `${first}${word.slice(1)}`;
        arr.push(upperWord);
      }
      upperStr = arr.join(" ");
    } else {
      const first = str.charAt(0).toUpperCase();
      upperStr = `${first}${str.slice(1)}`;
    }
    return upperStr;
  };
  const addToDB = async (product) => {
    const upperCasedName = toUpperCaseString(product[1]);
    const upperCasedCategory = toUpperCaseString(product[4]);
    await setDoc(doc(db, "products", product[0]), {
      product_id: product[0],
      product_img: product[5],
      product_name: upperCasedName,
      product_price: Number(product[2]),
      product_description: product[3],
      product_category: upperCasedCategory,
      product_isAvailable: true,
    });
    await setDoc(doc(db, "categories", upperCasedCategory), {
      category_name: upperCasedCategory,
    });
    toast.success("Product(s) successfully imported");
    setImportProductsBtn(false);
  };
  const importFile = (fileText, fileExt) => {
    if (fileExt === "csv") {
      let fileArray = fileText.split(/\r?\n|\r/);
      fileArray = fileArray.filter((value) => value !== "");
      for (let i = 1; i < fileArray.length; i++) {
        const product = fileArray[i].split(";");
        console.log(product);
        try {
          addToDB(product);
        } catch (error) {
          console.error(error);
          toast.error("Could not connect, please try again");
        }
      }
    }
    if (fileExt === "txt") {
      console.log("lallalal");
    }
  };
  return (
    <>
      <Modal
        show={importProductsBtn}
        fullscreen={true}
        onHide={() => setImportProductsBtn(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Import Products</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="modal-in">
            <Form onSubmit={handleSubmit}>
              <h5>Import products from a CSV or tab-delimited TXT file.</h5>
              <Form.Group
                className="mb-3 input-group-sm"
                controlId="importFile"
              >
                <Form.Label>Choose File</Form.Label>
                <Form.Control
                  name="importFile"
                  type="file"
                  multiple={false}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
              <Button className="btn-primary" type="submit">
                Continue
              </Button>
            </Form>
          </div>
        </Modal.Body>
        <Toaster position="top-center" reverseOrder={false}/>
      </Modal>
      
    </>
  );
};

export default ImportProducts;
