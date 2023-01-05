import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { getStorage, ref, listAll, StorageReference } from "firebase/storage";
import { toast } from "react-hot-toast";

interface GalleryWidgetProps {
  openGalleryBtn: boolean;
  setOpenGalleryBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setProductImg: React.Dispatch<React.SetStateAction<string>>;
}

const GalleryWidget = ({
  openGalleryBtn,
  setOpenGalleryBtn,
  setProductImg,
}: GalleryWidgetProps) => {
  const storage = getStorage();

  const listRef = ref(storage, "products/");
  const [imagesArr, setImagesArr] = useState<string[]>([]);

  //Fetches all images in firestore
  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef: StorageReference) => {
          setImagesArr((prev: string[]) => [...prev, itemRef.fullPath]);
        });
      })
      .catch((error) => {
        toast.error("Uh-oh, an error occurred!");
        console.error(error);
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
          <Row className="mt-4">
            {imagesArr.map((image: string) => (
              <Col key={image}>
                <Button
                  variant="link"
                  onClick={() => {
                    setProductImg(
                      `${
                        import.meta.env.VITE_APP_FIREBASE_IMG_PATH +
                        image.replace("products/", "")
                      }?alt=media`
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
