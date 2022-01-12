import classes from "./QuizGameControlButton.module.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { gameActions, GameStep } from "../../store";

const QuizGameControlButton: React.FC<{
  name: string;
  disabled: boolean;
  revealed: boolean;
  onClick: () => void;
}> = (props) => {
  const [highlightClass, setHighlightClass] = useState("");
  const { questions, currentQuestion, gameStep } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.revealed) {
      if (props.name === questions[currentQuestion].correctAnswer) {
        setHighlightClass(classes.correct);
      }
    } else {
      setHighlightClass("");
    }
  }, [currentQuestion, questions, props.revealed, props.name]);

  const handleButtonClicked = () => {
    if (!props.disabled && gameStep === GameStep.InGame) {
      props.onClick();
      let answerOk: boolean;
      if (props.name === questions[currentQuestion].correctAnswer) {
        setHighlightClass(classes.correct);
        answerOk = true;
      } else {
        setHighlightClass(classes.wrong);
        answerOk = false;
      }
      setTimeout(() => {
        setHighlightClass("");
        dispatch(gameActions.stepToNextQuestion(answerOk));
      }, 1000);
    }
  };
  return (
    <button
      className={`${classes.quizButton} ${highlightClass} ${
        props.disabled && classes.noHover
      }`}
      onClick={handleButtonClicked}
    >
      {props.name}
    </button>
  );
};

export default QuizGameControlButton;
