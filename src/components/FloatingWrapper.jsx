import Button from "./Button";
import FloatingButton from "./FloatingButton";
import Input from "./Input";
import Tooltip from "./Tooltip";
import styles from "./FloatingWrapper.module.css";
const FloatingWrapper = ({
  length,
  handleImageUpload,
  disableButton,
  clearArray,
  compressAndDownloadImages,
  isLoading,
}) => {
  return (
    <div className={styles.options} data-empty={length === 0}>
      {length > 0 && (
        <FloatingButton>
          <Input hideText icon={"plus"} rounded onChange={handleImageUpload} />
          <Tooltip title={"Agregar"} />
        </FloatingButton>
      )}

      <FloatingButton>
        <Button icon={"delete"} onClick={clearArray} disabled={disableButton} />
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
  );
};

export default FloatingWrapper;
