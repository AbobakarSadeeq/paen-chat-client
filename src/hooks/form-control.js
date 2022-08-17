import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  // validation
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  function valueChangeHandler(event) {
    setEnteredValue(event.target.value);
  }

  function inputBlurHandler(event) {
    setIsTouched(true);
  }
  function reset() {
    setEnteredValue("");
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    hasError: hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset: reset,
  };
};
export default useInput;
