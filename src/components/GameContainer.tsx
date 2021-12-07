import classes from "./GameContainer.module.css";
import Game from "./Game";
import Timer from "./Timer";
import QuizGameControl from "./QuizGame/QuizGameControl";
import FindCountryGameControl from "./FindCountryGame/FindCountryGameControl";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/redux-hooks";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions, GameType } from "../store";

const GameContainer = () => {
  const dispatch = useAppDispatch();
  const { globeLoaded, gameType } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (globeLoaded) {
      dispatch(gameActions.startCountdown());
    }
  }, [globeLoaded, dispatch]);

  return (
    <div className={classes.gameContainer}>
      <Timer></Timer>
      {gameType === GameType.Quiz && <QuizGameControl></QuizGameControl>}
      {gameType === GameType.FindCountry && (
        <FindCountryGameControl></FindCountryGameControl>
      )}
      <Game></Game>
    </div>
  );
};

export default GameContainer;
