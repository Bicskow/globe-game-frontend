import classes from "./MainPage.module.css";
import { useAppSelector } from "../hooks/redux-hooks";
import { GameStep } from "../store";
import StartGameForm from "./StartGameForm";
import GameContainer from "./GameContainer";
import GameResults from "./GameResults";
import GameStartCounter from "./UI/GameStartCounter";

const Main = () => {
  const { gameStep } = useAppSelector((state) => state.game);
  return (
    <main className={classes["main-page"]}>
      {gameStep === GameStep.Init && <StartGameForm></StartGameForm>}
      {(gameStep === GameStep.LoadingGame ||
        gameStep === GameStep.InGame ||
        gameStep === GameStep.Countdown) && <GameContainer></GameContainer>}
      {gameStep === GameStep.ViewResults && <GameResults></GameResults>}
      {(gameStep === GameStep.LoadingGame ||
        gameStep === GameStep.Countdown) && (
        <GameStartCounter></GameStartCounter>
      )}
    </main>
  );
};

export default Main;
