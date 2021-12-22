import classes from "./MainPage.module.css";
import { useAppSelector } from "../hooks/redux-hooks";
import { GameStep } from "../store";
import GameContainer from "./GameContainer";
import GameResults from "./GameResults";
import GameStartCounter from "./UI/GameStartCounter";
import StartGamePage from "./StartGamePage/StartGamePage";

const Main = () => {
  const { gameStep } = useAppSelector((state) => state.game);
  return (
    <main className={classes["main-page"]}>
      {gameStep === GameStep.Init && <StartGamePage></StartGamePage>}
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
