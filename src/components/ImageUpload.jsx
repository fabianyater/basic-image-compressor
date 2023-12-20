import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import FloatingButton from "./FloatingButton";
import styles from "./ImageUpload.module.css";
import Input from "./Input";
import SvgIcon from "./SvgIcon";
import Tooltip from "./Tooltip";

function ImageUpload() {
  const [imageInfo, setImageInfo] = useState([]);
  const [length, setLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const infoPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            file,
            size: file.size,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
    });

    Promise.all(infoPromises).then((newImages) => {
      setImageInfo((prevImages) => [...prevImages, ...newImages]);
    });
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
        imageInfo.map((image) =>
          imageCompression(image.file, options).then((compressedFile) => {
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
    setImageInfo([]);
  };

  useEffect(() => {
    if (imageInfo.length > 0) {
      setDisableButton(false);
      setLength(imageInfo.length);
    } else {
      setDisableButton(true);
      setLength(imageInfo.length);
    }
  }, [imageInfo]);

  useEffect(() => {
    imageInfo.map((image) => console.log(image.file));
  }, [imageInfo]);

  const deleteImage = (index) => {
    console.log(index);
    setImageInfo((currentImages) =>
      currentImages.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <div className={styles.container} data-empty={imageInfo.length === 0}>
        {imageInfo.length === 0 && (
          <>
            <h1 className={styles.title}>Comprime tus imágenes</h1>
            <Input text={"Seleccionar imagen"} onChange={handleImageUpload} />
          </>
        )}
        {imageInfo.map((info, index) => (
          <div
            key={index}
            className={styles.imageWrapper}
            data-max={length <= 4}
          >
            <Tooltip
              tooltipPosition={"bottom"}
              type={"image"}
              title={`${(info.size / 1024).toFixed(2)} KB - ${info.width}x${
                info.height
              }`}
            />
            <div className={styles.actions}>
              <button onClick={() => deleteImage(index)}>
                <SvgIcon icon={"close"} />
              </button>
            </div>
            <div className={styles.canvas}>
              <img
                src={URL.createObjectURL(info.file)}
                alt={`Imagen ${index}`}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <span>{info.file.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.options} data-empty={length === 0}>
        {length > 0 && (
          <FloatingButton>
            <Input
              hideText
              icon={"plus"}
              rounded
              onChange={handleImageUpload}
            />
            <Tooltip title={"Agregar"} />
          </FloatingButton>
        )}

        <FloatingButton>
          <Button
            icon={"delete"}
            onClick={clearArray}
            disabled={disableButton}
          />
          <Tooltip title={"Limpiar"} />
        </FloatingButton>

        <FloatingButton>
          <Button
            icon={"compress"}
            onClick={compressAndDownloadImages}
            disabled={disableButton}
            isLoading={isLoading}
          />
          <Tooltip title={"Comprimir"} />
        </FloatingButton>
      </div>
    </>
  );
}

export default ImageUpload;
