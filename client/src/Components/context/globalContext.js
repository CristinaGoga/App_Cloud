import React, { useState, useContext } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [savings, setSavings] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [highestIncome, setHighestIncome] = useState(0);
  const [highestExpense, setHighestExpense] = useState(0);
 
  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
    setUnreadNotifications((prevUnreadNotifications) => prevUnreadNotifications + 1);
   };

  const clearUnreadNotifications = () => {
    setUnreadNotifications(0); // reset the unread notifications count
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
    getIncomes();
  };
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const addSaving = async (saving) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-saving`, saving);
      setSavings([...savings, response.data]);
      addNotification('A new saving has been added: ' + saving.title);
    } catch (err) {
      setError(err.response.data.message);
    }
    getSavings();
  };

  const getSavings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-savings`);
      setSavings(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const deleteSaving = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-saving/${id}`);
      const newSavings = savings.filter((saving) => saving.id !== id);
      setSavings(newSavings);
    } catch (err) {
      setError(err.response.data.message);
    }
    getSavings();
  };

  const updateSaving = async (id, updatedSaving) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-saving/${id}`, updatedSaving);
      const updatedSavings = savings.map((saving) => {
        if (saving.id === id) {
          return response.data;
        }
        return saving;
      });
      setSavings(updatedSavings);
    } catch (err) {
      setError(err.response.data.message);
    }
    getSavings();
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
    getExpenses();
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
    getIncomes();
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

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-expense/${id}`);
      const newExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(newExpenses);
    } catch (err) {
      setError(err.response.data.message);
    }
    getExpenses();
  };

  const getDailyExpenses = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of today

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      expenseDate.setHours(0, 0, 0, 0); // set to start of day

      return expenseDate.getTime() === today.getTime();
    });
  };

  const getMonthlyExpenses = () => {
    const thisMonth = new Date().getMonth();

    return expenses.filter((expense) => {
      return new Date(expense.date).getMonth() === thisMonth;
    });
  };

  const getAnnualExpenses = () => {
    const thisYear = new Date().getFullYear();

    return expenses.filter((expense) => {
      return new Date(expense.date).getFullYear() === thisYear;
    });
  };

  const getNotifications = () => {
    let newNotifications = [];

    if (totalBalance() < 0) {
      newNotifications.push({
        title: 'Negative Balance',
        message: 'Your balance is currently negative. Please review your expenses and incomes.',
      });
    }

    setNotifications(newNotifications);
    return newNotifications;
  };

  const getSuggestions = () => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
    const lastTwoMonthsExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getTime() >= twoMonthsAgo.getTime();
    });
  
    const suggestions = [];
  
    lastTwoMonthsExpenses.forEach((expense) => {
      const { description, category, amount } = expense;
  
      if (category === 'utilities') {
        const keywords = ['water', 'light', 'electricity', 'gas'];
      
        keywords.forEach((keyword) => {
          if (description.toLowerCase().includes(keyword)) {
            if (keyword === 'water') {
              const reducedAmount = expense.amount * 0.2;
              const suggestionMessage = ` You have been investing a significant amount in ${expense.title}. To save money, consider reducing your spending by 20% (approximately ${reducedAmount.toFixed(2)} $). One simple way is to take shorter showers and be mindful of water consumption. 💧`;
              suggestions.push(suggestionMessage);
            }
            if (keyword === 'light') {
              const reducedAmount = expense.amount * 0.2;
              const suggestionMessage = `You have been spending quite a bit on ${expense.title}. To save money, consider reducing your spending by 20% (approximately ${reducedAmount.toFixed(2)} $). Remember to turn off lights when not needed at night to conserve energy. 💡`;
              suggestions.push(suggestionMessage);
            }
            if (keyword === 'electricity') {
              const reducedAmount = expense.amount * 0.2;
              const suggestionMessage = `You have been allocating a significant portion of your budget to ${expense.title}. To save money, consider reducing your spending by 20% (approximately ${reducedAmount.toFixed(2)} $). Be mindful of unplugging electronic devices when not in use to reduce electricity consumption.⚡`;
              suggestions.push(suggestionMessage);
            }
            if (keyword === 'gas') {
              const reducedAmount = expense.amount * 0.2;
              const suggestionMessage = `You have been spending quite a bit on ${expense.title}. To save money, consider reducing your spending by 20% (approximately ${reducedAmount.toFixed(2)} $). Optimize your gas usage by planning trips efficiently and using public transportation whenever possible. 🔥`;
              suggestions.push(suggestionMessage);
            }
          }
        });
      }
      
      if (category === 'rent' && amount > 2000) {
        const suggestionMessage = 'Consider exploring more affordable rental options to reduce your monthly expenses. 🏠';
        suggestions.push(suggestionMessage);
      }
      
      if (category === 'groceries') {
        if (amount > 700) {
          const reducedAmount = 500;
          const suggestionMessage = `You have been spending a significant amount on groceries (${expense.title}). To save money, aim to reduce your spending to a maximum of ${reducedAmount.toFixed(2)} $. Additionally, keep an eye out for special offers and discounts at local supermarkets to stretch your grocery budget. 🛒`;
          suggestions.push(suggestionMessage);
        }
        const keywords = ['sweets', 'cigarettes', 'alcohol'];
      
        keywords.forEach((keyword) => {
          if (description.toLowerCase().includes(keyword)) {
            const suggestionMessage = `You have made a purchase related to ${keyword} (${expense.title}). Consider evaluating your spending habits and prioritize healthier choices to improve both your well-being and your wallet. 🍎`;
            suggestions.push(suggestionMessage);
          }
        });
      }
      
      if (category === 'transportation' && amount > 150) {
        if (description.toLowerCase().includes('uber') || description.toLowerCase().includes('bolt')) {
          const reducedAmount = 40;
          const suggestionMessage = `You have been spending a considerable amount on transportation (${expense.title}). To save money, aim to reduce your spending to a maximum of ${reducedAmount.toFixed(2)} $ by utilizing public transportation or considering alternative options like electric scooters. These options can be more cost-effective and help you reach your financial goals. 🚗`;
          suggestions.push(suggestionMessage);
        }
      }
      
      if (category === 'entertainment' && amount > 400) {
        const reducedAmount = expense.amount * 0.2;
        const suggestionMessage = `You have been allocating a significant portion of your budget to entertainment (${expense.title}). To save money, consider reducing your spending by 20% (approximately ${reducedAmount.toFixed(2)} $) and exploring more affordable alternatives. For example, you can enjoy homemade meals instead of dining out and discover free or discounted activities like local theater performances or outdoor events. 🎉`;
        suggestions.push(suggestionMessage);
      
        const keywords = ['dinner', 'cinema'];
      
        keywords.forEach((keyword) => {
          if (description.toLowerCase().includes(keyword)) {
            if (keyword === 'dinner') {
              const suggestionMessage = 'Consider preparing dinner at home instead of eating out to save money while still enjoying delicious meals. 🍽️';
              suggestions.push(suggestionMessage);
            }
            if (keyword === 'cinema') {
              const suggestionMessage = 'Explore local theaters or online streaming platforms for movie options instead of going to the cinema. This way, you can still enjoy your favorite movies without the extra expenses. 🎥';
              suggestions.push(suggestionMessage);
            }
          }
        });
      }
      
      if (category === 'healthcare') {
        const suggestionMessage = 'Remember to prioritize your health and well-being. Ensure you get enough sleep, exercise regularly, and consume nutritious foods. Consult with healthcare professionals for any specific health concerns or conditions. By taking care of your health, you can potentially reduce medical expenses in the long run. ⚕️';
        suggestions.push(suggestionMessage);
      }
      
      if (category === 'shopping') {
        if (amount > 700) {
          const reducedAmount = 500;
          const suggestionMessage = `You have been spending a significant amount on shopping (${expense.title}). To save money, aim to reduce your spending to a maximum of ${reducedAmount.toFixed(2)} $. Additionally, you can take advantage of upcoming sales events like Black Friday to enjoy discounts, especially on electronics and appliances. 🛍️`;
          suggestions.push(suggestionMessage);
        }
      }
      
      if (category === 'gifts' && amount > 100) {
        const reducedAmount = expense.amount * 0.2;
        const suggestionMessage = `You have been spending a significant amount on gifts (${expense.title}). To save money, consider reducing your spending by 20% (approximately ${reducedAmount.toFixed(2)} $). You can explore personalized or handmade gift options, which not only show thoughtfulness but can also be more cost-effective. 🎁`;
        suggestions.push(suggestionMessage);
      }
      
      if (category === 'charity') {
        const suggestionMessage = 'Take a break from making charitable donations for now and focus on achieving your personal financial goals. Once you reach your desired financial stability, you can resume supporting the causes you care about. 🤝';
        suggestions.push(suggestionMessage);
      }
      
      if (category === 'debt') {
        const suggestionMessage = 'Make paying off your debts a priority to improve your financial situation and reduce unnecessary interest charges. Consider allocating more of your budget towards debt repayment to accelerate your progress and achieve financial freedom sooner. 💰';
        suggestions.push(suggestionMessage);
      }
      
      if (category === 'subscriptions') {
        const keywords = ['netflix', 'youtube premium', 'hbo'];
      
        keywords.forEach((keyword) => {
          if (description.toLowerCase().includes(keyword)) {
            const reducedAmount = expense.amount * 4;
            const suggestionMessage = `Suspend your subscription for 4 months and save approximately ${reducedAmount.toFixed(2)} $. During this time, explore alternative entertainment options such as borrowing books from the library, enjoying free online content, or engaging in hobbies that don't require paid subscriptions. This will help you reduce expenses while still enjoying entertainment. 📺`;
            suggestions.push(suggestionMessage);
          }
        });
      }
      
      if (category === 'travel') {
        const suggestionMessage = "Consider postponing unnecessary travel expenses and evaluate the purpose of your savings goals. By reducing travel expenses, you can allocate more funds towards your financial objectives and achieve them sooner. ✈️";
        suggestions.push(suggestionMessage);
      }
      
      if (category === 'dining') {
        const suggestionMessage = `Opt for home-cooked meals to save money on dining expenses. Reserve eating out for special occasions only. 🍽️`;
        suggestions.push(suggestionMessage);
      }
      
      if (category === 'other') {
        const keywords = ['books', 'reading', 'gym'];
      
        keywords.forEach((keyword) => {
          if (description.toLowerCase().includes(keyword)) {
            if (keyword === 'books' || keyword === 'reading') {
              const suggestionMessage = 'Consider switching to e-books or borrowing books from the library to reduce expenses related to purchasing physical books. 📚';
              suggestions.push(suggestionMessage);
            }
            if (keyword === 'gym') {
              const suggestionMessage = 'Save money on gym memberships by exploring free workout options like running in the park, following exercise routines on YouTube, or engaging in outdoor activities. 💪';
              suggestions.push(suggestionMessage);
            }
          }
          if (category === 'personal_care') {
          if (keyword === 'makeup') {
            if (amount > 200) {
              const reducedAmount = expense.amount * 0.5;
              const suggestionMessage = `This month, focus on embracing your natural beauty and reducing your spending on makeup. Aim to reduce your expenses by 50% (approximately ${reducedAmount.toFixed(2)} $) and explore simple, minimalistic beauty routines that can help you save money while still looking great. 💄`;
              suggestions.push(suggestionMessage);
            }
          }
        }
        });
      }
    });
  
    return suggestions;
  };
  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        savings,
        error,
        addIncome,
        getIncomes,
        addSaving,
        getSavings,
        deleteSaving,
        updateSaving,
        addExpense,
        deleteIncome,
        deleteExpense,
        totalIncome,
        getExpenses,
        totalExpenses,
        totalBalance,
        transactionHistory,
        setError,
        getDailyExpenses,
        getMonthlyExpenses,
        getAnnualExpenses,
        notifications,
        getNotifications,
        addNotification,
        clearUnreadNotifications,
        unreadNotifications,
        highestIncome,
        highestExpense,
        getSuggestions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
