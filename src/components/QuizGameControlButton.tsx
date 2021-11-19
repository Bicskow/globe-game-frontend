import classes from "./QuizGameControlButton.module.css";
import { useState } from "react";
import { useAppSelector } from "../hooks/redux-hooks";
import { QuizQuestion } from "../models/Question";

const QuizGameControlButton: React.FC<{
  name: string;
}> = (props) => {
  const { questions, currentQuestion, gameStarted } = useAppSelector(
    (state) => state.game
  );
  const [highlightClass, setHighlightClass] = useState("");

  const handleButtonClicked = () => {
    if (gameStarted) {
      if (
        props.name ===
        (questions[currentQuestion] as QuizQuestion).correctAnswer
      ) {
        setHighlightClass(classes.correct);
      } else {
        setHighlightClass(classes.wrong);
      }
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
