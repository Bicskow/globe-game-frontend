import classes from "./StartGameForm.module.css";
import useInput from "../hooks/use-input";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions, GameType } from "../store";
import React from "react";
import { useState } from "react";
import Card from "./Card";

const StartGameForm = () => {
  const dispatch = useAppDispatch();
  const [selectedGame, setSelectedGame] = useState(GameType[GameType.Quiz]);

  const {
    inputValue: nickName,
    inputIsValid: nickNameIsValid,
    inputHasError: nickNameHasError,
    inputChangeHandler: nickNameChangeHandler,
    inputBlurHandler: nickNameBlurHandler,
  } = useInput((nickName: string) => nickName !== "");

  const nickNameInputClasses = nickNameHasError ? classes["invalid"] : "";

  const startGameHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    dispatch(gameActions.setNickname(nickName));
    dispatch(gameActions.setGameType(GameType[selectedGame]));
    dispatch(gameActions.loadGame());
  };

  const gameTypeSelectionChangedHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedGame(GameType[event.target.value as keyof typeof GameType]);
  };

  return (
    <Card>
      <form className={classes.startGameForm}>
        <label htmlFor="nickname">Nickname</label>
        <input
          id="nickname"
          type="text"
          className={nickNameInputClasses}
          onChange={nickNameChangeHandler}
          onBlur={nickNameBlurHandler}
          value={nickName}
        ></input>
        <label htmlFor="game-type-select">Game Type</label>
        <select
          name="game-type"
          id="game-type-select"
          onChange={gameTypeSelectionChangedHandler}
        >
          <option value="Quiz">Quiz</option>
          <option value="FindCountry">Find the country</option>
        </select>
        <input
          disabled={!nickNameIsValid}
          type="button"
          value="Start Game"
          onClick={startGameHandler}
        ></input>
      </form>
    </Card>
  );
};

export default StartGameForm;
