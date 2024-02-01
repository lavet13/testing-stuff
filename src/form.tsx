import React, { useState, type FC } from 'react';

const Form: FC = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    isBitch: false,
  });

  const [age, setAge] = useState(42);

  console.log({ formValues });

  const { firstName, lastName, isBitch } = formValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked, type } = e.target;

    const isCheckbox = type === 'checkbox';

    setFormValues(v => ({ ...v, [name]: isCheckbox ? checked : value }));
  };

  const handleAge = () => {
    setAge(a => a + 1);
    setAge(a => a + 1);
    setAge(a => a + 1);
    console.log({ age });
  };

  console.log({ age });

  return (
    <>
      <input
        name='firstName'
        value={firstName}
        onChange={handleChange}
        placeholder='First name'
      />
      <input
        name='lastName'
        value={lastName}
        onChange={handleChange}
        placeholder='Last name'
      />
      <label>
        <input
          type='checkbox'
          name='isBitch'
          checked={isBitch}
          onChange={handleChange}
        />
        is a bitch?
      </label>
      <button onClick={handleAge}>Increment age</button>
      <p>
        Hello, {!isBitch ? `${firstName} ${lastName}` : `bitch!`}. You are {age}
        .
      </p>
    </>
  );
};

export default Form;
