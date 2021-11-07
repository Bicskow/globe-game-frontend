import classes from "./Game.module.css";

//import { useAppSelector } from "../hooks/redux-hooks";
import Globe from "./Globe";
import Card from "./Card";

const Game = () => {
  //const game = useAppSelector((state) => state.game);

  return (
    <Card className={classes.game}>
      <Globe></Globe>
    </Card>
  );
};

export default Game;
