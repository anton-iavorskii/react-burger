import { useState } from "react";

const useForm = <T>(valuesInput: T) => {
  const [values, setValues] = useState<T>(valuesInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};

export default useForm;
