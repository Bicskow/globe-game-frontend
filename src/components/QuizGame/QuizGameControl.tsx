import Card from "../Card";
import { useEffect, useState } from "react";
import classes from "./QuizGameControl.module.css";
import QuizGameControlButton from "./QuizGameControlButton";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Fragment } from "react";
import { GameStep } from "../../store";
import ReactGA from "react-ga4";

const QuizGameControl = () => {
  const { questions, currentQuestion, gameStep } = useAppSelector(
    (state) => state.game
  );
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
  }, [currentQuestion]);

  const handleButtonClicked = () => {
    setClicked(true);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.event("QUIZ");
    }
  }, []);

  return (
    <Card className={classes.quizGameControl}>
      <Fragment>
        {gameStep === GameStep.InGame &&
          questions[currentQuestion].choices.map((choice, index) => (
            <QuizGameControlButton
              disabled={clicked}
              revealed={clicked}
              onClick={handleButtonClicked}
              key={index}
              name={choice}
            ></QuizGameControlButton>
          ))}
      </Fragment>
    </Card>
  );
};

export default QuizGameControl;
