import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.conToSpinner}>
      <div className={styles.customLoader}></div>{" "}
    </div>
  );
};

export default Spinner;
