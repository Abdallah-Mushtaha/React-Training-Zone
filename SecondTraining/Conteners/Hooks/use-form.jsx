import { useState } from "react";

// Custem React Hooks
export const UseForm = (intitalValues) => {
  //   const [name, setName] = useState("");
  //   const [number, setnumber] = useState(0);
  const [value, setValue] = useState(intitalValues);
  const [error, setError] = useState("");

  function setFormError(errorMas) {
    setError(errorMas);
    setValue(intitalValues);
  }

  return { value, setValue, error, setFormError };
};
