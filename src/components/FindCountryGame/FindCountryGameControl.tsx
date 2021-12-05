import Card from "../Card";
import classes from "./FindCountryGameControl.module.css";
import { Fragment, useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { GameStep } from "../../store";
import FindCountryGameControlButton from "./FindCountryGameControlButton";

const FindCountryGameControl = () => {
  const { questions, currentQuestion, gameStep } = useAppSelector(
    (state) => state.game
  );

  const itemsRef = useRef<Array<number | undefined>>([]);

  useEffect(() => {
    console.log(itemsRef);
  }, [currentQuestion]);

  return (
    <Card className={classes.findCountryGameControl}>
      <Fragment>
        {gameStep === GameStep.InGame && (
          <div className={classes.findCountryList}>
            <ul>
              {questions.map((question, index) => (
                <FindCountryGameControlButton
                  ref={(el: number | undefined) =>
                    (itemsRef.current[index] = el)
                  }
                  answerOk={question.answerIsCorrect}
                  key={index}
                  name={question.correctAnswer}
                ></FindCountryGameControlButton>
              ))}
            </ul>
            <div className={classes.listCoverBottom}></div>
          </div>
        )}
      </Fragment>
    </Card>
  );
};

export default FindCountryGameControl;
