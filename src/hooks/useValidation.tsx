import React, { useState, useEffect } from 'react';

const useValidation = (initialState: any, validate: any, func: any) => {
  const [values, saveValues] = useState(initialState);
  const [errors, saveErrors] = useState({} as any);
  const [submitForm, saveSubmitForm] = useState(false);

  // Use effect for submission and validation
  useEffect(() => {
    if (submitForm) {
      const validationErrors = validate(values); // Validate values
      saveErrors(validationErrors); // Set errors
      if (Object.keys(validationErrors).length === 0) {
        func(); // Call submit function if no errors
      }
      saveSubmitForm(false); // Reset submitForm after submission attempt
    }
  }, [submitForm, values, validate, func]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    saveValues((prevState: any) => ({ ...prevState, [name]: value })); // Update the correct field
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSubmitForm(true); // Trigger validation
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
