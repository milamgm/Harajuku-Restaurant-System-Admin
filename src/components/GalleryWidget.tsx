import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { getStorage, ref, listAll } from "firebase/storage";
import { GrGallery, GrPersonalComputer } from "react-icons/Gr";

const GalleryWidget = ({
  openGalleryBtn,
  setOpenGalleryBtn,
  setProductImg,
}) => {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, "products/");
  const [imagesArr, setImagesArr] = useState([]);
  const [loadFromComputer, setLoadFromComputer] = useState(false);

  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          setImagesArr((prev) => [...prev, itemRef._location.path]);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  return (
    <>
      <Modal
        show={openGalleryBtn}
        size="xl"
        onHide={() => setOpenGalleryBtn(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Row className="text-center">
            <Col className="m-5">
              <GrGallery /> From gallery
            </Col>
            <Col className="m-5">
              <GrPersonalComputer /> From Computer
            </Col>
          </Row>*/}
          <Row className="mt-4">
            {imagesArr.map((image) => (
              <Col key={image}>
                <Button
                  variant="link"
                  onClick={() => {
                    setProductImg(
                      `https://firebasestorage.googleapis.com/v0/b/harajuku-b44c9.appspot.com/o/products%2F${image.replace(
                        "products/",
                        ""
                      )}?alt=media`
                    );
                    setOpenGalleryBtn(false);
                  }}
                >
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/harajuku-b44c9.appspot.com/o/products%2F${image.replace(
                      "products/",
                      ""
                    )}?alt=media`}
                    width="100"
                  />
                </Button>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GalleryWidget;
