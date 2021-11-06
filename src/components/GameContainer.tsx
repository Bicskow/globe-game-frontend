import classes from "./GameContainer.module.css";
import Game from "./Game";
import QuizGameControl from "./QuizGameControl";

const GameContainer = () => {
  return (
    <div className={classes.gameContainer}>
      <QuizGameControl></QuizGameControl>
      <Game></Game>
    </div>
  );
};

export default GameContainer;
