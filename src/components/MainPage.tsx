import classes from "./MainPage.module.css";

const Main = () => {
  return (
    <main className={classes["main-page"]}>
      <form className={classes["main-page--form"]}>
        <label htmlFor="nickname">Nickname</label>
        <input id="nickname" type="text"></input>
        <label htmlFor="game-type-select">Game Type</label>
        <select name="game-type" id="game-type-select">
          <option value="quiz">Quiz</option>
          <option value="find-country">Find the country</option>
        </select>
        <input type="button" value="Start Game"></input>
      </form>
    </main>
  );
};

export default Main;
