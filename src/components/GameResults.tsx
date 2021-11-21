import Card from "./Card";
import classes from "./GameResults.module.css";
import { useAppSelector } from "../hooks/redux-hooks";
import { Fragment } from "react";

const GameResults = () => {
  const { questions } = useAppSelector((state) => state.game);
  return (
    <Card className={classes.results}>
      <Fragment>
        <div className={classes.headerRow}>Country Name</div>
        <div className={classes.headerRow}>Time</div>
        <div className={classes.headerRow}>Answer</div>
        <div className={classes.headerDivider}></div>
        {questions.map((question) => {
          return (
            <Fragment>
              <div>{question.correctAnswer}</div>
              <div>00:00:00</div>
              <div>{question.answerIsCorrect ? "OK" : "NOK"}</div>
            </Fragment>
          );
        })}
      </Fragment>
    </Card>
  );
};

export default GameResults;
