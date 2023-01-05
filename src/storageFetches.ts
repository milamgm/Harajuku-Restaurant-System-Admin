import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { FormControl } from "react-bootstrap";
import { IFormTarget } from "./types/types";
import { v4 } from "./utils";


//creates a path in case a new image has been uploaded
export const createImgPath = (target: IFormTarget, path: string) => {
  const storage = getStorage();
  if (target.img.files[0] !== undefined) {
    const imgUpload = target.img.files[0];
    const imgName = imgUpload.name + v4();
    const imgRef = ref(storage, `products/${imgName}`);
    uploadBytes(imgRef, imgUpload);
    path = `${import.meta.env.VITE_APP_FIREBASE_IMG_PATH + imgName}?alt=media`;
  }
};

//Creates a local image url to show preview
export const previewImg = (
  e: React.ComponentProps<typeof FormControl>,
  setProductImg: React.Dispatch<React.SetStateAction<string>>
) => {
  const imgFile = e.target.files && e.target.files[0];
  const localURL = imgFile ? URL.createObjectURL(imgFile) : "";
  setProductImg(localURL);
};
