import Card from "./Card";
import classes from "./GameResults.module.css";
import { useAppSelector } from "../hooks/redux-hooks";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions } from "../store";
import { Fragment } from "react";
import { QuestionIterface } from "../models/Question";

const GameResults = () => {
  const { questions, startTime } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const handeButtonClick = () => {
    dispatch(gameActions.endGame());
  };

  const pad = (n: number) => {
    return ("0" + n).slice(-2);
  };

  const getAnswerTime = (question: QuestionIterface) => {
    let timeDiff = new Date(question.answeredAt - startTime);

    return `${pad(timeDiff.getMinutes())}:${pad(
      timeDiff.getUTCSeconds()
    )}:${pad(Math.floor(timeDiff.getMilliseconds() / 16.66667))}`;
  };

  return (
    <Card className={classes.results}>
      <Fragment>
        <div className={classes.headerRow}>Country Name</div>
        <div className={classes.headerRow}>Time</div>
        <div className={classes.headerRow}>Answer</div>
        <div className={classes.headerDivider}></div>
        {questions.map((question, index) => {
          return (
            <Fragment key={index}>
              <div>{question.correctAnswer}</div>
              <div>{getAnswerTime(question)}</div>
              {question.answerIsCorrect ? (
                <svg
                  className={classes.checkMark}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
              ) : (
                <svg
                  className={classes.xMark}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
              )}
            </Fragment>
          );
        })}
        <button onClick={handeButtonClick} className={classes.okButton}>
          Ok
        </button>
      </Fragment>
    </Card>
  );
};

export default GameResults;
