import Card from "./Card";
import classes from "./QuizGameControl.module.css";

const QuizGameControl = () => {
  return (
    <Card>
      <div className={classes.quizGameControl}>This is the control</div>
    </Card>
  );
};

export default QuizGameControl;
