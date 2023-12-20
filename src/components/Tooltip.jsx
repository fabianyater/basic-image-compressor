import styles from "./Tooltip.module.css";

const Tooltip = ({ tooltipPosition, type, title }) => {
  return (
    <div className={styles.tooltipContainer}  data-image={type}>
      <span className={styles.tooltipText} data-position={tooltipPosition}>
        {title}
      </span>
    </div>
  );
};

export default Tooltip;
