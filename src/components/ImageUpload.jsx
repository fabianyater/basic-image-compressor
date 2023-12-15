import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import styles from "./ImageUpload.module.css";
import Input from "./Input";

import JSZip from "jszip";
import Button from "./Button";

function ImageUpload() {
  const [originalImages, setOriginalImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    setOriginalImages(files);
  };

  const compressAndDownloadImages = async () => {
    setIsLoading(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const zip = new JSZip();

    try {
      await Promise.all(
        originalImages.map((image) =>
          imageCompression(image, options).then((compressedFile) => {
            zip.file(compressedFile.name, compressedFile);
          })
        )
      );

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "compressed_images.zip");
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearArray = () => {
    setOriginalImages([]);
  };

  useEffect(() => {
    if (originalImages.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [originalImages]);

  return (
    <>
      <div className={styles.container}>
        {originalImages.length === 0 && (
          <>
            <h1 className={styles.title}>Comprime tus imágenes</h1>
            <Input onChange={handleImageUpload} />
          </>
        )}
        <div className={styles.imagesContainer}>
          {originalImages.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Imagen ${index}`}
                className={styles.image}
              />
              <span>{image.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.tooltipContainer}>
          <Button
            icon={"compress"}
            text={"Comprimir imágenes"}
            title={"Comprimir imágenes"}
            onClick={compressAndDownloadImages}
            isLoading={isLoading}
          />
          <span className={styles.tooltipText}>Comprimir</span>
        </div>
      </div>
      <div className={styles.buttonClean}>
        <div className={styles.tooltipContainer}>
          <Button
            disabled={disableButton}
            icon={"delete"}
            text={"Limpiar"}
            title={"Limpiar"}
            onClick={clearArray}
          />
          <span className={styles.tooltipText}>Limpiar</span>
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
