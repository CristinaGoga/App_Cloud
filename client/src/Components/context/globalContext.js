import React, { useState, useContext } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null); // Adăugat înapoi
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [highestIncome, setHighestIncome] = useState(0);
  const [highestExpense, setHighestExpense] = useState(0);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
    setUnreadNotifications((prevUnreadNotifications) => prevUnreadNotifications + 1);
  };

  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-income`, income);
      setIncomes([...incomes, response.data]);
      addNotification('A new income has been added: ' + income.title);

      if (income.amount > highestIncome) {
        setHighestIncome(income.amount);
        addNotification('New highest income registered: ' + income.amount);
      }

    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-expense`, expense);
      setExpenses([...expenses, response.data]);
      addNotification('A new expense has been added: ' + expense.title);

      if (expense.amount > highestExpense) {
        setHighestExpense(expense.amount);
        addNotification('New highest expense registered: ' + expense.amount);
      }

    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-income/${id}`);
      const newIncomes = incomes.filter((income) => income.id !== id);
      setIncomes(newIncomes);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-expense/${id}`);
      const newExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(newExpenses);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const totalBalance = () => {
    const balance = totalIncome() - totalExpenses();
  
    if (balance < 0) {
      addNotification('Attention, your balance has become negative.');
    }
  
    return balance;
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        error, // Adăugat înapoi
        addIncome,
        getIncomes,
        addExpense,
        getExpenses,
        deleteIncome,
        deleteExpense,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
        setError, // Adăugat înapoi
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
