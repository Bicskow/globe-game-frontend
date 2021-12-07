import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./GameStartCounter.module.css";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { gameActions, GameStep } from "../../store";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const GameStartCounter = () => {
  const dispatch = useAppDispatch();
  const { gameStep } = useAppSelector((state) => state.game);
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    let intetvalId: NodeJS.Timeout;
    if (gameStep === GameStep.Countdown) {
      intetvalId = setInterval(() => {
        setCounter((counter) => {
          return counter - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intetvalId);
  }, [gameStep]);

  useEffect(() => {
    if (counter === 0) {
      dispatch(gameActions.startGame());
    }
  }, [counter, dispatch]);

  const backdropRoot = document.getElementById("backdrop-root")!;
  const counterRoot = document.getElementById("counter-root")!;

  return (
    <Fragment>
      <div>{ReactDOM.createPortal(<Backdrop></Backdrop>, backdropRoot)}</div>
      {gameStep === GameStep.Countdown && (
        <div>
          {ReactDOM.createPortal(
            <div className={classes.counter}>{counter}</div>,
            counterRoot
          )}
        </div>
      )}
    </Fragment>
  );
};

export default GameStartCounter;
