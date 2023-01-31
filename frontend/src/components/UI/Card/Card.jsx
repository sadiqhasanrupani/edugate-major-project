// styles
import styles from "./Card.module.scss";

const Card = ({ className, children, onClick, onBlur, onChange, ref }) => {
  return (
    <div
      ref={ref}
      className={`${styles.card} ${className}`}
      onClick={onClick}
      onBlur={onBlur}
      onChange={onChange}
    >
      {children}
    </div>
  );
};

export default Card;
