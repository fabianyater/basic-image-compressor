import styles from "./FloatingButton.module.css";

const FloatingButton = ({ children }) => {
  return (
    <div className={styles.buttonContainer}>
      {children}
      {/* <div className={styles.tooltipContainer}>
        <span className={styles.tooltipText} data-position={tooltipPosition}>
          {title}
        </span>
      </div> */}
    </div>
  );
};

export default FloatingButton;
