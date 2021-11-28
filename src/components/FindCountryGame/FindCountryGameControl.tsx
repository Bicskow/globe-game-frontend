import Card from "../Card";
import classes from "./FindCountryGameControl.module.css";
import { Fragment } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { GameStep } from "../../store";
import FindCountryGameControlButton from "./FindCountryGameControlButton";

const FindCountryGameControl = () => {
  const { questions, currentQuestion, gameStep } = useAppSelector(
    (state) => state.game
  );

  const getQuestionList = () => {
    let toReturn = [];
    for (let i = currentQuestion; i >= 0; i--) {
      toReturn.push(questions[i]);
    }
    return toReturn;
  };

  return (
    <Card className={classes.findCountryGameControl}>
      <Fragment>
        {gameStep === GameStep.InGame && (
          <div className={classes.findCountryList}>
            {getQuestionList().map((question, index) => (
              <FindCountryGameControlButton
                answerOk={question.answerIsCorrect}
                key={index}
                name={question.correctAnswer}
              ></FindCountryGameControlButton>
            ))}
            <div className={classes.listCoverBottom}></div>
          </div>
        )}
      </Fragment>
    </Card>
  );
};

export default FindCountryGameControl;
