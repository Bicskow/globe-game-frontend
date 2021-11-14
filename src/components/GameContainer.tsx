import classes from "./GameContainer.module.css";
import Game from "./Game";
import Timer from "./Timer";
import QuizGameControl from "./QuizGameControl";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/redux-hooks";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions } from "../store";

const GameContainer = () => {
  const dispatch = useAppDispatch();
  const { globeLoaded } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (globeLoaded) {
      setTimeout(() => {
        dispatch(gameActions.startGame());
      }, 3000);
    }
  }, [globeLoaded, dispatch]);

  return (
    <div className={classes.gameContainer}>
      <Timer></Timer>
      <QuizGameControl></QuizGameControl>
      <Game></Game>
    </div>
  );
};

export default GameContainer;
