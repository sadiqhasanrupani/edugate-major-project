import { useSelector } from "react-redux";

// styles
import styles from "./Card.module.scss";

const Card = ({ className, children, onClick, onBlur, onChange, ref }) => {
  // const themeMode = useSelector((state) => state.ui.isDarkMode);
  const themeMode = JSON.parse(localStorage.getItem("theme"));

  return (
    <div
      ref={ref}
      className={`${styles.card} ${
        themeMode ? styles.darkCard : styles.lightCard
      } ${className}`}
      onClick={onClick}
      onBlur={onBlur}
      onChange={onChange}
    >
      {children}
    </div>
  );
};

export default Card;
