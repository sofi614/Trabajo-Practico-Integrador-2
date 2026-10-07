import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState({ ...initialValues });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setValues({ ...initialValues });
  };

  return { values, handleInputChange, handleReset };
};