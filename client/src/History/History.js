import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../Components/context/globalContext';

function History() {
    const {transactionHistory}=useGlobalContext()
 
 
    const[...history] =transactionHistory()
 
    return (
    <HistoryStyled>
        <h2>Recent History</h2>
        {history.map((item) =>{
            const{_id, title, amount, type}= item
            return (
                <div key={_id} className ="history-item">
                   <p
              style={{
                color: type === 'income' ? 'green' : 'red',
              }}>
              {title}
            </p>

            <p
              style={{
                color: type === 'expense' ? 'red' : 'green',
              }}
            >
              {type === 'expense' ? `-${amount}` : `+${amount}`}
            </p>
          </div>
            )
        })}

    </HistoryStyled>
  )
}

const HistoryStyled = styled.div`
h2 {
  color: #1a0738;
}
display:flex;
flex-direction: column;
gap: 1rem;

.history-item{
    background: #f8f8ff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items:center;
}
`;

export default History