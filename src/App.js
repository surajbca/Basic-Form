import React, { useState } from "react";
import "./App.css";
const useFormValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  return { values, errors, isSubmitting, handleChange, handleSubmit };
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (
    !values.email ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Invalid email";
  }
  if (!values.age || values.age <= 0) {
    errors.age = "Must be a number greater than 0";
  }
  if (values.attendingWithGuest && !values.guestName) {
    errors.guestName = "Required";
  }
  return errors;
};

const App = () => {
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormValidation(
      {
        name: "",
        email: "",
        age: "",
        attendingWithGuest: false,
        guestName: "",
      },
      validate
    );

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && (
          <div style={{ color: "red" }} className="error">
            {errors.name}
          </div>
        )}
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && (
          <div style={{ color: "red" }} className="error">
            {errors.email}
          </div>
        )}
      </label>

      <label>
        Age:
        <input
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
        />
        {errors.age && (
          <div style={{ color: "red" }} className="error">
            {errors.age}
          </div>
        )}
      </label>

      <label>
        Are you attending with a guest?
        <select
          name="attendingWithGuest"
          value={values.attendingWithGuest}
          onChange={handleChange}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </label>

      {values.attendingWithGuest && (
        <label>
          Guest Name:
          <input
            type="text"
            name="guestName"
            value={values.guestName}
            onChange={handleChange}
          />
          {errors.guestName && (
            <div style={{ color: "red" }} className="error">
              {errors.guestName}
            </div>
          )}
        </label>
      )}

      <button
        type="submit"
        disabled={Object.keys(errors).length > 0 || isSubmitting}
      >
        Submit
      </button>
    </form>
  );
};

export default App;
