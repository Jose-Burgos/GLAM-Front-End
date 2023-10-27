import React, { useState, useEffect } from 'react';

const useValidation = (initialState: any, validate: any, func: any) => {
  const [values, saveValues] = useState(initialState);
  const [errors, saveErrors] = useState({} as any);
  const [submitForm, saveSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        func();
      }
      saveSubmitForm(false);
    }
  }, [errors]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    saveValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validate(values);
    saveErrors(validationErrors);
    saveSubmitForm(true);
  };

  return {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
  };
};
export default useValidation;
