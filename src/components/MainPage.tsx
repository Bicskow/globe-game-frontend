import classes from "./MainPage.module.css";
import useInput from "../hooks/use-input";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions } from "../store";
import Game from "./Game";
import React from "react";

const Main = () => {
  const dispatch = useAppDispatch();

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
  };

  return (
    <main className={classes["main-page"]}>
      <form className={classes["main-page--form"]}>
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
        <select name="game-type" id="game-type-select">
          <option value="quiz">Quiz</option>
          <option value="find-country">Find the country</option>
        </select>
        <input
          disabled={!nickNameIsValid}
          type="button"
          value="Start Game"
          onClick={startGameHandler}
        ></input>
      </form>
      <Game></Game>
    </main>
  );
};

export default Main;
