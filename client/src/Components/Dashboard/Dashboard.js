import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layouts';
import { dollar } from '../utils/icons';
import { useGlobalContext } from '../context/globalContext';
import History from '../../History/History';

function Dashboard() {
  const{totalExpenses,incomes, expenses, totalIncome,totalBalance, getIncomes,getExpenses}=useGlobalContext();
  useEffect(() => {
    getIncomes()
    getExpenses()
  },[])
  return (
    <DashboardStyled>
       <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stat-con">
          <div className ="chart-con">
            <div className="amount-con">
              <div className="income">
                <h2>Total Incomes</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expenses</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className='history-con'>
            <History />
            <h2 className ="capital-title">Min<span>Income</span>Max </h2>
            <div className =" capital-items">
              <p>
                {Math.min(...incomes.map(item => item.amount))}
              </p>
              <p>
                {Math.max(...incomes.map(item => item.amount))}
              </p>
            </div>

            <h2 className ="capital-title">Min<span>Expense</span>Max </h2>
            <div className =" capital-items">
              <p>
                {Math.min(...expenses.map(item => item.amount))}
              </p>
              <p>
                {Math.max(...expenses.map(item => item.amount))}
              </p>
            </div>
          </div>
        </div>
       </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
h1{
  color:#1a0738;
  margin-left:20px;

}
.stat-con {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  

  .chart-con {
    margin-top:10px;
    grid-column: 1 / 4;
    height: 300px;

    .amount-con {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin-top: 2rem;
      

      .income,
      .expense {
        grid-column: span 2;
      }

      .income,
      .expense,
      .balance {
        background: #f8f8ff;
        justify-content: center;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
        padding: 0.4rem;
        align-items: center;
        text-align:center;
        h2 {
          color:#1a0738;
          font-size: 1.2rem; 
        }


        p {
          
          font-size: 1.4rem;
          font-weight: 100;
        }
      }

      .balance {
        grid-column: 2 / 4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top:-20px;
        h2 {
          color:#1a0738;
          font-size: 1.2rem; 
        }

        p {
         
          font-size: 1.4rem;
        }
      }
    }
  }

  .history-con {
    grid-column: 4 / -1;

    h2 {
      color: #6e529b;
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .capital-title {
      font-size: 1rem;

      span {
        color:#1a0738;
        font-size: 1.2rem;
      }
    }

    .capital-items {
      background: #f8f8ff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        
        font-weight: 600;
        font-size: 1.3rem;
      }
    }
  }
}

`;

export default Dashboard;