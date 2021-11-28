import classes from "./FindCountryGameControlButton.module.css";

const FindCountryGameControlButton: React.FC<{
  name: string;
  answerOk: boolean | null;
}> = (props) => {
  let highlightClass = "";
  if (props.answerOk === true) {
    highlightClass = classes.correct;
  }
  if (props.answerOk === false) {
    highlightClass = classes.wrong;
  }

  return (
    <button className={`${classes.findCountryButton} ${highlightClass}`}>
      {props.name}
    </button>
  );
};

export default FindCountryGameControlButton;
