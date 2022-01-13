import Card from "../Card";
import classes from "./FindCountryGameControl.module.css";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { GameStep } from "../../store";
import FindCountryGameControlButton, {
  ButtonDomProps,
} from "./FindCountryGameControlButton";
import ReactGA from "react-ga4";

const FindCountryGameControl = () => {
  const { questions, currentQuestion, gameStep } = useAppSelector(
    (state) => state.game
  );
  const [shiftList, setShiftList] = useState(0);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const getShift = useCallback(() => {
    let offset = 15;
    let shiftCurrent = questions.length - currentQuestion - 1;
    let shift = 0;
    for (let i = 0; i < itemsRef.current.length && i < shiftCurrent; i++) {
      if (itemsRef.current[i]) {
        shift += itemsRef.current[i].height ?? 0;
        shift += itemsRef.current[i].margin;
        if (itemsRef.current[i].margin === 16) {
          offset = 6;
        }
      } else {
        console.log("was zweo");
      }
    }
    return shift + offset;
  }, [currentQuestion, questions.length]);

  const itemsRef = useRef<Array<ButtonDomProps>>([]);

  useEffect(() => {
    setShiftList(getShift());
  }, [currentQuestion, getShift, dimensions]);

  useEffect(() => {
    function handleResize2() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize2);

    return () => {
      window.removeEventListener("resize", handleResize2);
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.event("FINDCOUNTRY");
    }
  }, []);

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
                    ref={(el: ButtonDomProps) => (itemsRef.current[index] = el)}
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
