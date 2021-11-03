import classes from "./Game.module.css";

import { useAppSelector } from "../hooks/redux-hooks";
import Globe from "./Globe";

const Game = () => {
  const game = useAppSelector((state) => state.game);

  return (
    <div className={classes.gameContainer}>
      <div>Nickname: {game.nickname}</div>
      <div>Game type: {game.gameType}</div>
      <Globe></Globe>
    </div>
  );
};

export default Game;
