import classes from "./MainPage.module.css";
import { useAppSelector } from "../hooks/redux-hooks";
import { GameType } from "../store";
import Game from "./Game";
import StartGameForm from "./StartGameForm";

const Main = () => {
  const { gameType } = useAppSelector((state) => state.game);
  return (
    <main className={classes["main-page"]}>
      {gameType === GameType.None && <StartGameForm></StartGameForm>}
      {gameType !== GameType.None && <Game></Game>}
    </main>
  );
};

export default Main;
