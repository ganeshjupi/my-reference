import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
import { uploadImage } from "../services/post";
import {
  CButton,
  CCol,
  CInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";

const ImageCrop = ({ modal, toggle }) => {
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 4 / 3 });
  const [result, setResult] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImage = async (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setSrcImg(url);
    console.log(e.target.files[0]);
  };

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = await canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // save as file
      canvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob);
        setResult(url);
        let myFile = new File([blob], "image.jpeg", {
          type: blob.type,
        });
        console.log(myFile);
        setImageFile(myFile);
      });
    } catch (e) {
      console.log("crop the image");
    }
  };

  const handleSubmit = async (e) => {
    let fdata = new FormData();
    fdata.set("image", imageFile);
    uploadImage(fdata).then((data) => {
      console.log(data);
      toggle();
    });
  };

  return (
    <CModal show={modal} onClose={toggle} centered closeOnBackdrop={false}>
      <CModalHeader closeButton>Image upload</CModalHeader>
      <CModalBody>
        <CInput
          className="custom"
          type="file"
          accept="image/*"
          onChange={handleImage}
        />
        <CRow className="mt-3">
          <CCol className="text-center">
            {srcImg && (
              <div>
                <ReactCrop
                  src={srcImg}
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={setCrop}
                />
              </div>
            )}
          </CCol>
          <CCol className="text-center">
            {result && (
              <div>
                <img src={result} alt="cropped image" />
              </div>
            )}
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="justify-content-between">
        <CButton color="primary" disabled={!srcImg} onClick={getCroppedImg}>
          Crop
        </CButton>
        <CButton color="primary" disabled={!result} onClick={handleSubmit}>
          Upload
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ImageCrop;
