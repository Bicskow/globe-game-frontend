import Card from "../Card";
import classes from "./FindCountryGameControl.module.css";
import { Fragment } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { GameStep } from "../../store";

const FindCountryGameControl = () => {
  const { questions, currentQuestion, gameStep } = useAppSelector(
    (state) => state.game
  );
  return (
    <Card className={classes.findCountryGameControl}>
      <Fragment>
        <p>Select the country:</p>
        <div>
          {gameStep === GameStep.InGame &&
            questions[currentQuestion].correctAnswer}
        </div>
      </Fragment>
    </Card>
  );
};

export default FindCountryGameControl;
