import React from "react";
import styles from "./Input.module.css";

function Input({ onChange }) {
  return (
    <label className={styles.labelUpload}>
      Seleccionar imagen
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className={styles.uploadInput}
        multiple
      />
    </label>
  );
}

export default Input;
