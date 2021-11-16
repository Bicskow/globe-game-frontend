import classes from "./QuizGameControlButton.module.css";

const QuizGameControlButton: React.FC<{ name: string }> = (props) => {
  return <button className={classes.quizButton}>{props.name}</button>;
};

export default QuizGameControlButton;
