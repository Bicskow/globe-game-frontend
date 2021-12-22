import { Fragment } from "react";
import StartGameForm from "./StartGameForm";
import StartGameFooter from "./StartGameFooter";

const StartGamePage = () => {
  return (
    <Fragment>
      <StartGameForm></StartGameForm>
      <StartGameFooter></StartGameFooter>
    </Fragment>
  );
};

export default StartGamePage;
