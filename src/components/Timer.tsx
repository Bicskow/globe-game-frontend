import Card from "./Card";
import classes from "./Timer.module.css";
import useTimer from "../hooks/use-timer";

const Timer = () => {
  const { timer } = useTimer();

  return (
    <Card className={classes.timer}>
      <div>{timer}</div>
    </Card>
  );
};

export default Timer;
