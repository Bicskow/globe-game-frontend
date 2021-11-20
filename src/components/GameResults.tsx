import Card from "./Card";
import classes from "./GameResults.module.css";

const GameResults = () => {
  return (
    <Card className={classes.results}>
      <div>Results</div>
    </Card>
  );
};

export default GameResults;
