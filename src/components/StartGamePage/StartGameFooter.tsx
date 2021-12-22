import classes from "./StartGameFooter.module.css";

const StartGameFooter = () => {
  return (
    <footer className={classes.footer}>
      <a
        href="https://github.com/Bicskow/globe-game-frontend"
        className={`${classes.link} ${classes.githubLink}`}
      >
        Github
      </a>
      <a
        href="https://www.facebook.com/sharer/sharer.php?u=bicskow.pro"
        className={`${classes.link} ${classes.facebookLink}`}
      >
        Facebook
      </a>
      <a
        href="https://twitter.com/intent/tweet?url=bicskow.pro"
        className={`${classes.link} ${classes.twitterLink}`}
      >
        Twitter
      </a>
    </footer>
  );
};

export default StartGameFooter;
