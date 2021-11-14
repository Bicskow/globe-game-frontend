import Card from "./Card";
import classes from "./Timer.module.css";
import useTimer from "../hooks/use-timer";
import { useAppSelector } from "../hooks/redux-hooks";
import { useEffect } from "react";

const Timer = () => {
  const { gameStarted } = useAppSelector((state) => state.game);
  const { timer, startTimer } = useTimer();

  useEffect(() => {
    if (gameStarted) {
      startTimer();
    }
  }, [gameStarted, startTimer]);

  return (
    <Card className={classes.timer}>
      <div>{timer}</div>
    </Card>
  );
};

export default Timer;
