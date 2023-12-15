import React from "react";
import styles from "./Button.module.css";
import SvgIcon from "./SvgIcon";

import "ldrs/lineSpinner";
import Spinner from "./Spinner";

function Button({ text, onClick, title, isLoading, icon, disabled }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {isLoading ? <Spinner /> : <SvgIcon icon={icon} />}
    </button>
  );
}

// Default values shown

export default Button;
