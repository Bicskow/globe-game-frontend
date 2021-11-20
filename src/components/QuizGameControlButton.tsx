import classes from "./QuizGameControlButton.module.css";
import { useState } from "react";
import { useAppSelector } from "../hooks/redux-hooks";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions } from "../store";

const QuizGameControlButton: React.FC<{
  name: string;
}> = (props) => {
  const [highlightClass, setHighlightClass] = useState("");
  const { questions, currentQuestion, gameStarted } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();

  const handleButtonClicked = () => {
    if (gameStarted) {
      if (props.name === questions[currentQuestion].correctAnswer) {
        setHighlightClass(classes.correct);
      } else {
        setHighlightClass(classes.wrong);
      }
      setTimeout(() => {
        setHighlightClass("");
        dispatch(gameActions.stepToNextQuestion());
      }, 1000);
    }
  };
  return (
    <button
      className={`${classes.quizButton} ${highlightClass}`}
      onClick={handleButtonClicked}
    >
      {props.name}
    </button>
  );
};

export default QuizGameControlButton;
