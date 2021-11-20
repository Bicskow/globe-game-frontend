import classes from "./MainPage.module.css";
import { useAppSelector } from "../hooks/redux-hooks";
import { GameStep } from "../store";
import StartGameForm from "./StartGameForm";
import GameContainer from "./GameContainer";
import GameResults from "./GameResults";

const Main = () => {
  const { gameStep } = useAppSelector((state) => state.game);
  return (
    <main className={classes["main-page"]}>
      {gameStep === GameStep.Init && <StartGameForm></StartGameForm>}
      {(gameStep === GameStep.LoadingGame || gameStep === GameStep.InGame) && (
        <GameContainer></GameContainer>
      )}
      {gameStep === GameStep.ViewResults && <GameResults></GameResults>}
    </main>
  );
};

export default Main;
