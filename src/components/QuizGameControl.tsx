import Card from "./Card";
import classes from "./QuizGameControl.module.css";
import QuizGameControlButton from "./QuizGameControlButton";
import { useAppSelector } from "../hooks/redux-hooks";
import { Fragment } from "react";

const QuizGameControl = () => {
  const { questions, currentQuestion, gameStarted } = useAppSelector(
    (state) => state.game
  );

  return (
    <Card className={classes.quizGameControl}>
      <Fragment>
        {gameStarted &&
          questions[currentQuestion].choices.map((choice, index) => (
            <QuizGameControlButton
              key={index}
              name={choice}
            ></QuizGameControlButton>
          ))}
      </Fragment>
    </Card>
  );
};

export default QuizGameControl;
