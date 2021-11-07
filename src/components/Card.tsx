import classes from "./Card.module.css";

const Card: React.FC<{ children: JSX.Element; className?: string }> = (
  props
) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};
export default Card;
