import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../context/globalContext';

function Form() {
   const { addIncome,error, setError } = useGlobalContext();
   const [inputState, setInputState] = useState({
      title:'',
      amount:'',
      date:'',
      category:'',
      description:'',
   });
   
   const { title, amount, date, category, description } = inputState; 

   const handleInput = name => e => {
      setInputState({...inputState, [name]: e.target.value})
      setError('')
   };

   const handleSubmit = e => {
      e.preventDefault()
      addIncome(inputState)
      setInputState({
         title:'',
         amount:'',
         date:'',
         category:'',
         description:'',

      })
   };

   const options = [
      { value: "salary", label: "Salary" },
      { value: "interests", label: "Interests" },
      { value: "dividends", label: "Dividends" },
      { value: "rents", label: "Rents" },
      { value: "capital_gains", label: "Capital Gains" },
      { value: "royalties", label: "Royalties" },
      { value: "alimony", label: "Alimony" },
      { value: "retirement_income", label: "Retirement Income" },
      { value: "pension", label: "Pension" },
      { value: "annuities", label: "Annuities" },
      { value: "estate_incomes", label: "Estate Incomes" },
      { value: "trust_incomes", label: "Trust Incomes" },
      { value: "lottery_winnings", label: "Lottery Winnings" },
      { value: "inheritance", label: "Inheritance" },
      { value: "gifts", label: "Gifts" },
      { value: "freelancing_income", label: "Freelancing Income" },
      { value: "side_jobs", label: "Side Jobs" },
      { value: "social_security_benefits", label: "Social Security Benefits" },
      { value: "unemployment_benefits", label: "Unemployment Benefits" },
      { value: "child_support", label: "Child Support" },
      { value: "disability_benefits", label: "Disability Benefits" },
      { value: "other", label: "Other" }
   ];
   
   const handleSelectChange = selectedOption => {
      setInputState({...inputState, category: selectedOption.value})
   }
   
   return (
      <FormStyled onSubmit={handleSubmit}>
        {error && <p className='error'>{error}</p>}
         <div className="input-control">
            <input
               type ="text"
               value={title}
               name={'title'}
               placeholder='Title'
               onChange={handleInput('title')}
            />
         </div>

         <div className="input-control">
            <input
               type ="text"
               value={amount}
               name={'amount'}
               placeholder='Amount'
               onChange={handleInput('amount')}
            />
         </div>

         <div className="input-control">
            <DatePicker
               id='date'
               placeholderText='Enter a Date'
               selected={date}
               dateFormat='dd/MM/yyyy'
               onChange={date => setInputState({...inputState, date})}
            />
         </div>

         <div className="selects input-control">
         <Select
   options={options}
   onChange={handleSelectChange}
   placeholder="Select Option"
   menuPosition="fixed" // Adaugă această linie
   value={options.find(option => option.value === category)}
/>
         </div>
         
         <div className="input-control">
            <textarea 
            id="description"
            cols="30"
            rows="4"
            type ="text"
            value={description}
            name={'description'}
            placeholder='Add a description'
            onChange={handleInput('description')}
            />
         </div>

         <div className="submit-btn">
            <button>Add Income</button>
         </div>
      </FormStyled>
   );
}


const FormStyled = styled.form`
 display:flex;
 flex-direction:column;
 gap:1rem; // reduce gap
 .input-control.datepicker-control .react-datepicker-wrapper {
   width: 100%;
 }
 
 .input-control.datepicker-control .react-datepicker__input-container input {
   width: 100%;
 }
 .error {
  color: red;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
 }

 input, textarea, select {
   font-family: 'Raleway', sans-serif;
 
    font-size:inherit;
    padding: .5rem 1rem;
    border-radius:5px;
    border:1px solid #FFFFFF;
    background:#ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

    color:rgba(34,34,96,0.9);
    width: 100%;  // make all input fields have the same width
    &::placeholder{
        color:rgba(34,34,96,0.4)
    }
    &:focus{
        outline:none;
        border-color:var(--color-green);
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
     background:#696a86;
     border: none;
     border-radius: 5px;
     padding: .8rem 1.6rem;
     font-size: 1rem;
     cursor: pointer;
     transition: background .2s, transform .3s;

     &:hover {
       background: #1A0738;
       transform: scale(1.05);  // mărește puțin butonul la hover
     }

     &:active {
       transform: scale(.95);  // micșorează puțin butonul la apăsare
     }
   }
   .selects {
      position: relative; /* Adaugă o poziție relativă pentru a controla poziția pop-up-ului */
      select {
        /* Stilurile existente... */
  
        /* Modificări pentru a face zona selectorului să arate mai bine */
        appearance: none;
        background: transparent;
        color: rgba(34, 34, 96, 0.9);
        border: 1px solid rgba(34, 34, 96, 0.4);
        border-radius: 5px;
        padding-right: 30px; /* Adaugă un spațiu pentru săgeata de deschidere */
  
        /* Adaugă săgeată personalizată pentru deschiderea pop-up-ului */
        background-image: url('path_to_arrow_icon'); /* înlocuiește 'path_to_arrow_icon' cu calea către imaginea săgeții */
        background-position: right 10px center;
        background-repeat: no-repeat;
        background-size: 12px;
        cursor: pointer;
  
        /* Stilizare pentru opțiunile din pop-up */
        option {
          background: rgba(255, 255, 255, 0.8);
          color: rgba(34, 34, 96, 1);
  
          &:hover {
            background: rgba(34, 34, 96, 0.2);
          }
        }
      }
  
      /* Stilizare pentru pop-up-ul cu opțiuni */
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
        border-top: 5px solid rgba(34, 34, 96, 0.9); /* Schimbă culoarea săgeții în funcție de design-ul tău */
        pointer-events: none; /* Asigură-te că săgeata nu poate fi selectată */
      }
  
      /* Stilizare pentru bara de scroll */
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
export default Form;
