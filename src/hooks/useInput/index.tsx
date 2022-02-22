// Absolute
import React from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onInput,
    },
  };
};

export default useInput;
