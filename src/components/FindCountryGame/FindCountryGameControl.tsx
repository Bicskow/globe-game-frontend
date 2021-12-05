import Card from "../Card";
import classes from "./FindCountryGameControl.module.css";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { GameStep } from "../../store";
import FindCountryGameControlButton from "./FindCountryGameControlButton";

const FindCountryGameControl = () => {
  const { questions, currentQuestion, gameStep } = useAppSelector(
    (state) => state.game
  );
  const [shiftList, setShiftList] = useState(0);

  const getShift = useCallback(() => {
    let shiftCurrent = questions.length - currentQuestion - 1;
    let shift = 0;
    for (let i = 0; i < itemsRef.current.length && i < shiftCurrent; i++) {
      shift += itemsRef.current[i] ?? 0;
      shift += 16;
    }
    return shift + 6;
  }, [currentQuestion, questions.length]);

  const itemsRef = useRef<Array<number | undefined>>([]);

  useEffect(() => {
    setShiftList(getShift());
  }, [currentQuestion, getShift]);

  return (
    <Card className={classes.findCountryGameControl}>
      <Fragment>
        {gameStep === GameStep.InGame && (
          <div className={classes.findCountryList}>
            <ul
              style={{
                transform: `translateY(-${shiftList}px)`,
                transition: "transform ease-out 1s",
              }}
            >
              {questions
                .slice()
                .reverse()
                .map((question, index) => (
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
