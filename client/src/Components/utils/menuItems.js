import { dashboard, expenses, invoice, recipt, money, trend, pieChart, lineChart, scatterChart, barChart, savingsIcon, investmentsIcon, budgetIcon } from "./icons";

export const menuItems = [
    {
      id: 1,
      category: 'Dashboard',
      items: [
        {
          id: 1,
          title: 'Dashboard',
          icon: dashboard,
          link: '/dashboard'
        },
      ]
    },
    {
      id: 2,
      category: 'Reports',
      items: [
        {
          id: 3,
          title: 'Incomes',
          icon: trend,
          link: '/dashboard'
        },
        {
          id: 4,
          title: 'Expenses',
          icon: expenses,
          link: '/dashboard'
        }
      ]
    },
    
    
    {
      id: 5,
      category: 'Savings',
      items: [
       
        {
          id: 11,
          title: 'Investments',
          icon: investmentsIcon,  
          link: '/investments'
        },
        
      ]
    }
  ];
  