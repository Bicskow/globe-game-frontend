import classes from "./FindCountryGameControlButton.module.css";
import { useImperativeHandle, useRef, forwardRef } from "react";

type ButtonProps = {
  name: string;
  answerOk: boolean | null;
};

const FindCountryGameControlButton = forwardRef<
  number | undefined,
  ButtonProps
>((props, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle<number | undefined, number | undefined>(ref, () => {
    return buttonRef.current?.clientHeight;
  });

  let highlightClass = "";
  if (props.answerOk === true) {
    highlightClass = classes.correct;
  }
  if (props.answerOk === false) {
    highlightClass = classes.wrong;
  }

  return (
    <button
      ref={buttonRef}
      className={`${classes.findCountryButton} ${highlightClass}`}
    >
      {props.name}
    </button>
  );
});

export default FindCountryGameControlButton;
