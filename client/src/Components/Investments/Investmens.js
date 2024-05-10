import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from './api';
import CryptoCard from '../Crypto/CryptoCard';
import styled from 'styled-components';

const InvestmentsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Description = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  align-items: stretch;
  background: #ffffff;
`;

const CryptoButtonsContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const CryptoButtonsTitle = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CryptoButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const CryptoButton = styled.button`
  font-family: 'Raleway', sans-serif;
  background-color: #f2f2f2;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  &.selected {
    background-color: #c5cae9;
  }
`;

const Investments = () => {
  const [investmentData, setInvestmentData] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  useEffect(() => {
    const getInvestmentData = async () => {
      const data = await fetchCryptoData();
      setInvestmentData(data);
    };

    getInvestmentData();
  }, []);

  const handleInvestmentSelect = (investment) => {
    setSelectedInvestment(investment);
  };

  const renderInvestmentCard = () => {
    if (!selectedInvestment) {
      return null;
    }

    return <CryptoCard data={selectedInvestment} />;
  };

  return (
    <InvestmentsContainer>
      <Title>Discover the World of Cryptocurrency Investment</Title>
      <Description>
      Cryptocurrencies have revolutionized the world of finance, offering new investment opportunities and
        disrupting traditional financial systems. This page provides real-time information on popular cryptocurrencies,
        helping you stay informed and make informed investment decisions in this dynamic market.
        <br />
        Select a crypto below:
      </Description>
      <CryptoButtonsContainer>
        <CryptoButtonsTitle>Select your crypto:</CryptoButtonsTitle>
        <CryptoButtons>
          {investmentData.map((investment) => (
            <CryptoButton
              key={investment.id}
              className={selectedInvestment === investment ? 'selected' : ''}
              onClick={() => handleInvestmentSelect(investment)}
            >
              {investment.name}
            </CryptoButton>
          ))}
        </CryptoButtons>
      </CryptoButtonsContainer>
      {renderInvestmentCard()}
    </InvestmentsContainer>
  );
};

export default Investments;
