import { useState } from "react";

const useInput = (validateInput) => {
  const [inputValue, setInputValue] = useState("");
  const [inputTouched, setInputTouced] = useState(false);

  const inputIsValid = validateInput(inputValue);
  const inputHasError = !inputIsValid && inputTouched;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setInputTouced(true);
  };

  const reset = () => {
    setInputValue("");
    setInputTouced(false);
  };

  return {
    inputValue,
    inputIsValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
