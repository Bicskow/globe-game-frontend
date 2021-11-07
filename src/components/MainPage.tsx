import classes from "./MainPage.module.css";
import { useAppSelector } from "../hooks/redux-hooks";
import { GameType } from "../store";
import StartGameForm from "./StartGameForm";
import GameContainer from "./GameContainer";

const Main = () => {
  const { gameType } = useAppSelector((state) => state.game);
  return (
    <main className={classes["main-page"]}>
      {gameType === GameType.None && <StartGameForm></StartGameForm>}
      {gameType !== GameType.None && <GameContainer></GameContainer>}
    </main>
  );
};

export default Main;
