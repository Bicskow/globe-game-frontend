import Card from "../Card";
import classes from "./Timer.module.css";
import useTimer from "../../hooks/use-timer";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useEffect } from "react";
import { GameStep } from "../../store";

const Timer = () => {
  const { gameStep } = useAppSelector((state) => state.game);
  const { timer, startTimer } = useTimer();

  useEffect(() => {
    if (gameStep === GameStep.InGame) {
      startTimer();
    }
  }, [gameStep, startTimer]);

  return (
    <Card className={classes.timer}>
      <div>{timer}</div>
    </Card>
  );
};

export default Timer;
