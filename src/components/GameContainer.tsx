import classes from "./GameContainer.module.css";
import Game from "./Game";
import Timer from "./Timer";
import QuizGameControl from "./QuizGameControl";

const GameContainer = () => {
  return (
    <div className={classes.gameContainer}>
      <Timer></Timer>
      <QuizGameControl></QuizGameControl>
      <Game></Game>
    </div>
  );
};

export default GameContainer;
