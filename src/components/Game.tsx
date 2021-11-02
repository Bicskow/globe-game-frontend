import { useAppSelector } from "../hooks/redux-hooks";

const Game = () => {
  const game = useAppSelector((state) => state.game);

  return <div>{game.nickname}</div>;
};

export default Game;
