import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function UserForm({ closeUserForm }) {
  const [inputState, setInputState] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    urc: '',
    company: '',
    password: '',
    confirmPassword: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { name, phone, email, city, urc, company, password, confirmPassword } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setSubmitted(true);
      setInputState({
        name: '',
        phone: '',
        email: '',
        city: '',
        urc: '',
        company: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      alert("Parolele nu se potrivesc!");
    }
  };

  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setTimeout(() => {
        setSubmitted(false);
        closeUserForm();
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [submitted, closeUserForm]);

  return (
    <FormStyled onSubmit={handleSubmit}>
      <h2>Update Your Account Details</h2>
      <p>Please fill out this form to update your account details.</p>
      {submitted && <p className="success">Form submitted successfully!</p>}
      <div className="input-control">
        <input
          type="text"
          value={name}
          name={'name'}
          placeholder='Full Name'
          onChange={handleInput('name')}
        />
      </div>

      <div className="input-control">
        <input
          type="text"
          value={phone}
          name={'phone'}
          placeholder='Phone Number'
          onChange={handleInput('phone')}
        />
      </div>

      <div className="input-control">
        <input
          type="text"
          value={email}
          name={'email'}
          placeholder='E-mail'
          onChange={handleInput('email')}
        />
      </div>

      <div className="input-control">
        <input
          type="text"
          value={city}
          name={'city'}
          placeholder='City'
          onChange={handleInput('city')}
        />
      </div>

      <div className="input-control">
        <input
          type="text"
          value={urc}
          name={'urc'}
          placeholder='Age'
          onChange={handleInput('urc')}
        />
      </div>

      <div className="input-control">
        <input
          type="text"
          value={company}
          name={'company'}
          placeholder='Address'
          onChange={handleInput('company')}
        />
      </div>

      <div className="input-control">
        <input
          type="password"
          value={password}
          name={'password'}
          placeholder='Password'
          onChange={handleInput('password')}
        />
      </div>

      <div className="input-control">
        <input
          type="password"
          value={confirmPassword}
          name={'confirmPassword'}
          placeholder='Confirm Password'
          onChange={handleInput('confirmPassword')}
        />
      </div>

      <div className="submit-btn">
        <button type="submit">Update Details</button>
      </div>

    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  max-width: 300px;
  margin: auto;

  h2,
  p {
    text-align: center;
  }

  .input-control {
    position: relative;
    width: 100%;

    input,
    select,
    textarea {
      font-family: inherit;
      font-size: inherit;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 1px solid #ffffff;
      background: #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);
      width: 100%;
      &:focus {
        outline: none;
        border-color: var(--color-green);
      }
      &::placeholder {
        color: rgba(34, 34, 96, 0.4);
      }
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;

    button {
      color: #fff;
      background: #696a86;
      border: none;
      border-radius: 5px;
      padding: 0.8rem 1.6rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s, transform 0.3s;

      &:hover {
        background: #1a0738;
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  .success {
    color: green;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.2rem;
  }

  .close-btn {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    button {
      color: #fff;
      background: #696a86;
      border: none;
      border-radius: 5px;
      padding: 0.8rem 1.6rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s, transform 0.3s;

      &:hover {
        background: #1a0738;
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
`;

export default UserForm;
