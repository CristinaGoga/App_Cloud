import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../context/globalContext';

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
      description: '',
    });
  };

  const options = [
    { value: 'rent', label: 'Rent' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'debt', label: 'Debt' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'dining', label: 'Dining' },
    { value: 'travel', label: 'Travel' },
    { value: 'subscriptions', label: 'Subscriptions' },
    { value: 'personal_care', label: 'Personal Care' },
    { value: 'gifts', label: 'Gifts' },
    { value: 'charity', label: 'Charity' },
    { value: 'other', label: 'Other' },
  ];

  const handleSelectChange = (selectedOption) => {
    setInputState({ ...inputState, category: selectedOption.value });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input
          type='text'
          value={title}
          name='title'
          placeholder='Title'
          onChange={handleInput('title')}
        />
      </div>

      <div className='input-control'>
        <input
          type='text'
          value={amount}
          name='amount'
          placeholder='Amount'
          onChange={handleInput('amount')}
        />
      </div>

      <div className='input-control'>
        <DatePicker
          id='date'
          placeholderText='Enter a Date'
          selected={date}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => setInputState({ ...inputState, date })}
        />
      </div>

      <div className='selects input-control'>
        <Select
          options={options}
          onChange={handleSelectChange}
          placeholder='Select Option'
          menuPosition="fixed" 
          value={options.find((option) => option.value === category)}
        />
      </div>

      <div className='input-control'>
        <textarea
          id='description'
          cols='30'
          rows='4'
          type='text'
          value={description}
          name='description'
          placeholder='Add a description'
          onChange={handleInput('description')}
        />
      </div>

      <div className='submit-btn'>
        <button>Add Expense</button>
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.2rem;
  }

  input,
  textarea,
  select {
    font-family: 'Raleway', sans-serif;
    font-size: inherit;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid #ffffff;
    background: #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    width: 100%;
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
    &:focus {
      outline: none;
      border-color: var(--color-green);
    }
  }

  .input-control {
    position: relative;
    width: 100%;
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

    .selects {
      position: relative;
      select {
        appearance: none;
        background: transparent;
        color: rgba(34, 34, 96, 0.9);
        border: 1px solid rgba(34, 34, 96, 0.4);
        border-radius: 5px;
        padding-right: 30px;
        background-image: url('path_to_arrow_icon');
        background-position: right 10px center;
        background-repeat: no-repeat;
        background-size: 12px;
        cursor: pointer;

        option {
          background: rgba(255, 255, 255, 0.8);
          color: rgba(34, 34, 96, 1);

          &:hover {
            background: rgba(34, 34, 96, 0.2);
          }
        }
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid rgba(34, 34, 96, 0.9);
        pointer-events: none;
      }

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      scrollbar-width: thin;
      scrollbar-color: #888 #f1f1f1;
    }
  }
`;

export default ExpenseForm;
