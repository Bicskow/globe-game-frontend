import classes from "./Game.module.css";

//import { useAppSelector } from "../hooks/redux-hooks";
import Globe from "./Globe";
import Card from "./Card";

const Game = () => {
  //const game = useAppSelector((state) => state.game);

  return (
    <Card>
      <div className={classes.gameContainer}>
        <Globe></Globe>
      </div>
    </Card>
  );
};

export default Game;
