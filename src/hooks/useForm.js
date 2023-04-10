import { useState } from 'react';

const useForm = (valuesInput) => {
  const [values, setValues] = useState(valuesInput);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};

export default useForm;
