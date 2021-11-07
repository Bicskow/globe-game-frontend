import Card from "./Card";
import classes from "./Timer.module.css";

const Timer = () => {
  return (
    <Card className={classes.timer}>
      <div>This will be the timer</div>
    </Card>
  );
};

export default Timer;
