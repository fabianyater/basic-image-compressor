import React from "react";
import styles from "./Input.module.css";
import SvgIcon from "./SvgIcon";

function Input({ onChange, rounded, hideText, text, icon }) {
  return (
    <label className={styles.labelUpload} data-rounded={rounded}>
      {!hideText && text}
      <SvgIcon icon={icon} />
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
