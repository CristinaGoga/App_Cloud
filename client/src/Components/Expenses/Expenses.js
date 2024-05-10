import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/Layouts';
import ExpenseForm from '../Expenses/ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';
import { useGlobalContext } from '../context/globalContext';


export default function Expenses() { 
  const { expenses, getExpenses,deleteExpense,totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
       <h2 className =" total-income">Total Expense: <span>${totalExpenses()}</span></h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
          {expenses.map((expense, index) => {
  const { _id, title, amount, date, category, description } = expense;
  return (
    <IncomeItem
      key={index}
      id={_id}
      title={title}
      description={description}
      amount={amount}
      date={date}
      category={category}
      indicatorColor="var(--color-green)"
      deleteItem={() => deleteExpense(_id)}
    />
  );
})}
</div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
display: flex;
overflow: hidden;
h1{
  font-family: 'Raleway', sans-serif;
  color:#1a0738;
}

.total-income {
  font-family: 'Raleway', sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8ff;
  color: #6e529b;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 1rem 0;
  font-size: 2rem;
  gap: 0.5rem;
  span {
    font-size: 2rem;
    font-weight: 600;
    color: #6e529b;
  }
}

.income-content {
  display: flex;
  gap: 2rem;
  h1 {
    margin-top: 5px;
    
  }

 

  .incomes {
    flex: 1;
    overflow: auto;
    padding-right: 10px;
    
    /* Setează înălțimea și adaugă scrollbar */
    height: 300px;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}
`;
