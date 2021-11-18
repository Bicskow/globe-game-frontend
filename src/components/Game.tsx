import classes from "./Game.module.css";
import Globe from "./Globe";
import Card from "./Card";

const Game = () => {
  return (
    <Card className={classes.game}>
      <Globe></Globe>
    </Card>
  );
};

export default Game;
