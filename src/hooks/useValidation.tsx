import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '@/hooks/authContext';

const useValidation = (initialState: any, validate: any, func: any) => {
  const [values, saveValues] = useState(initialState);
  const [errors, saveErrors] = useState({} as any);
  const [submitForm, saveSubmitForm] = useState(false);
  const { logIn } = useContext(AuthContext);

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
    if (e && e.target) {
      // console.log(e);
      const { name, value } = e.target;
      saveValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validate(values);
    saveErrors(validationErrors);
    saveSubmitForm(true);
    logIn();
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
