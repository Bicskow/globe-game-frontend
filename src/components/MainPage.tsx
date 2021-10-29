import classes from "./MainPage.module.css";
import useInput from "../hooks/use-input";

const Main = () => {
  const {
    inputValue: nickName,
    inputIsValid: nickNameIsValid,
    inputHasError: nickNameHasError,
    inputChangeHandler: nickNameChangeHandler,
    inputBlurHandler: nickNameBlurHandler,
  } = useInput((nickName: string) => nickName !== "");

  const nickNameInputClasses = nickNameHasError ? classes["invalid"] : "";

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
        ></input>
      </form>
    </main>
  );
};

export default Main;
