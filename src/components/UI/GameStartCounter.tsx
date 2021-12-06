import ReactDOM from "react-dom";
import classes from "./GameStartCounter.module.css";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const GameStartCounter = () => {
  const backdropRoot = document.getElementById("backdrop-root")!;

  return (
    <div>{ReactDOM.createPortal(<Backdrop></Backdrop>, backdropRoot)}</div>
  );
};

export default GameStartCounter;
