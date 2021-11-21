import { useState } from "react";

const useInput = (validateInput: (nickname: string) => boolean) => {
  const [inputValue, setInputValue] = useState("");
  const [inputTouched, setInputTouced] = useState(false);

  const inputIsValid = validateInput(inputValue);
  const inputHasError = !inputIsValid && inputTouched;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const prefillInput = (value: string) => {
    setInputValue(value);
  };

  const inputBlurHandler = () => {
    setInputTouced(true);
  };

  return {
    inputValue,
    inputIsValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    prefillInput,
  };
};

export default useInput;
