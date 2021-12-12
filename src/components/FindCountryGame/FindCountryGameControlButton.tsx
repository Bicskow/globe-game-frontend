import classes from "./FindCountryGameControlButton.module.css";
import { useImperativeHandle, useRef, forwardRef } from "react";

type ButtonProps = {
  name: string;
  answerOk: boolean | null;
};

export type ButtonDomProps = {
  height: number | undefined;
  margin: number;
};

const FindCountryGameControlButton = forwardRef<ButtonDomProps, ButtonProps>(
  (props, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle<ButtonDomProps, ButtonDomProps>(ref, () => {
      let margin = 0;
      let height = 0;
      if (buttonRef.current !== undefined) {
        margin = parseFloat(
          window
            .getComputedStyle(buttonRef.current ?? new Element())
            .marginTop.replace("px", "")
        );
      }
      if (buttonRef.current?.clientHeight !== undefined) {
        height = buttonRef.current?.clientHeight;
      }
      return {
        height,
        margin,
      };
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
  }
);

export default FindCountryGameControlButton;
