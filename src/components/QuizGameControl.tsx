import Card from "./Card";
import classes from "./QuizGameControl.module.css";
import QuizGameControlButton from "./QuizGameControlButton";
import { useAppSelector } from "../hooks/redux-hooks";
import { QuizQuestion } from "../models/Question";
import { Fragment } from "react";

const QuizGameControl = () => {
  const { questions, currentQuestion, gameStarted } = useAppSelector(
    (state) => state.game
  );

  return (
    <Card className={classes.quizGameControl}>
      <Fragment>
        {gameStarted &&
          (questions[currentQuestion] as QuizQuestion).choces.map((choice) => (
            <QuizGameControlButton name={choice}></QuizGameControlButton>
          ))}
      </Fragment>
    </Card>
  );
};

export default QuizGameControl;
