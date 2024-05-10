import React, { useEffect, useState } from 'react';
import { fetchCryptoHistoricalData } from './api';
import CryptoChart from '../CryptoChart/CryptoChart';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

import bitcoinGif from '../../img/bitcoin.gif';
import ethereumGif from '../../img/ethereum.gif';
import tetherGif from '../../img/tether.gif';
import bnbGif from '../../img/bnb.gif';
import usdGif from '../../img/USD.gif';
import xrpGif from '../../img/XRP.gif';
import lidoGif from '../../img/lido.png';
import cardanoGif from '../../img/cardano.gif';
import dogecoinGif from '../../img/dogecoinn.gif';
import solanaGif from '../../img/solana.gif';

const CardContainer = styled.div`
  text-align: left;
`;

const CardTitle = styled.h2`
  margin-bottom: 15px;
  font-size: 18px;
  font-family: 'Raleway', sans-serif;
`;

const CurrentPrice = styled.p`
  margin-bottom: 10px;
`;

const CoinImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const InterpretationContainer = styled.div`
  margin-top: 20px;
  font-family: 'Raleway', sans-serif;
`;

const InterpretationTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
`;

const InterpretationText = styled.p`
  font-family: 'Raleway', sans-serif;

  position: relative;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  align-items: stretch;
  background: #ffffff;

  transition: all 0.5s ease-in-out;
  max-height: 400px;
  overflow: hidden;
  opacity: 1;

  & .coin-gif {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    max-width: 100px;
  }
`;

const CryptoCard = ({ data }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [interpretation, setInterpretation] = useState('');
  const { totalBalance } = useGlobalContext(); // Preluarea funcției totalBalance din contextul global

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const historicalData = await fetchCryptoHistoricalData(data.id);
      setHistoricalData(historicalData);
      setInterpretation(getExpertCryptoInterpretation(data.name, historicalData));
    };
    fetchHistoricalData();
  }, [data.id]);

  const getExpertCryptoInterpretation = (coinName, data) => {
    if (data.length < 2) {
      return '';
    }

    const currentValue = data[data.length - 1];
    const previousValue = data[data.length - 2];
    const difference = currentValue - previousValue;

    let interpretation = '';

    switch (coinName) {
      case 'Bitcoin':
        interpretation = `Based on the chart, Bitcoin has shown a remarkable growth trend in recent months. This indicates a strong market demand and suggests that Bitcoin may continue to be a lucrative investment.`;
        break;
      case 'Ethereum':
        interpretation = `Looking at the chart, Ethereum has experienced significant volatility in the past month. This is likely due to market factors and increased investor interest. It's important to closely monitor Ethereum's price movements before making any investment decisions.`;
        break;
      case 'Tether':
        interpretation = `The chart for Tether indicates a stable value that closely tracks the US dollar. Tether is known as a stablecoin and is often used as a hedge against volatility in the cryptocurrency market.`;
        break;
      case 'BNB':
        interpretation = `BNB has shown impressive growth in recent weeks, largely driven by the popularity of the Binance platform and its utility within the ecosystem. However, it's important to carefully consider market conditions and do thorough research before making investment decisions.`;
        break;
      case 'USD Coin':
        interpretation = `As a stablecoin pegged to the US dollar, USD Coin provides stability and liquidity in the cryptocurrency market. It's commonly used for trading purposes and as a way to store value during market fluctuations.`;
        break;
      case 'XRP':
        interpretation = `XRP has experienced both ups and downs in the past month, influenced by various market factors and regulatory developments. Investors should stay updated with news and be cautious when considering investments in XRP.`;
        break;
      case 'Lido Staked Ether':
        interpretation = `Lido Staked Ether (STETH) represents a staking derivative of Ethereum and allows investors to earn staking rewards. The chart shows the performance of staked Ethereum, which is influenced by the overall demand for ETH staking and network participation.`;
        break;
      case 'Cardano':
        interpretation = `Cardano's chart reflects its growing popularity and potential as a smart contract platform. The recent upgrades and developments in the Cardano ecosystem have contributed to its positive price performance.`;
        break;
      case 'Dogecoin':
        interpretation = `Dogecoin's chart demonstrates the power of community-driven movements and speculative interest. While it has gained attention, investors should be cautious due to its volatile nature and limited utility.`;
        break;
      case 'Solana':
        interpretation = `Solana has emerged as a promising blockchain platform with a focus on scalability and fast transaction speeds. The chart indicates a strong uptrend, reflecting growing interest and adoption of Solana's technology.`;
        break;
      default:
        interpretation = '';
    }

    if (difference > 0) {
      interpretation += ` The value has increased by ${difference.toFixed(2)} units, indicating a positive momentum.`;
    } else if (difference < 0) {
      interpretation += ` The value has decreased by ${Math.abs(difference).toFixed(2)} units, indicating a temporary decline.`;
    } else {
      interpretation += ` The value has remained stable, indicating a steady market.`;
    }

    // Adăugarea sugestiei personalizate în funcție de balanță, cu verificare suplimentară
    const balance = totalBalance();
    if (balance >= currentValue) {
      const numberOfCoins = Math.floor(balance / currentValue);
      interpretation += ` You have a positive balance of $${balance.toFixed(
        2
      )}. You can consider purchasing ${numberOfCoins} ${coinName} coins to potentially grow your portfolio.`;
    } else if (balance > 0) {
      interpretation += ` You have a positive balance of $${balance.toFixed(2)}. Consider accumulating more funds to invest in ${coinName}.`;
    } else {
      interpretation += ` You need to accumulate $${Math.abs(
        balance.toFixed(2)
      )} more to invest in ${coinName}. Start saving and investing to reach your goal.`;
    }

    return interpretation;
  };

  const getCoinGif = (coinName) => {
    switch (coinName) {
      case 'Bitcoin':
        return bitcoinGif;
      case 'Ethereum':
        return ethereumGif;
      case 'Tether':
        return tetherGif;
      case 'BNB':
        return bnbGif;
      case 'USD Coin':
        return usdGif;
      case 'XRP':
        return xrpGif;
      case 'Lido Staked Ether':
        return lidoGif;
      case 'Cardano':
        return cardanoGif;
      case 'Dogecoin':
        return dogecoinGif;
      case 'Solana':
        return solanaGif;
      default:
        return null;
    }
  };
  const coinGif = getCoinGif(data.name);

  return (
    <CardContainer>
      <CardTitle>{data.name}</CardTitle>
      <CurrentPrice>Current price: ${data.current_price}</CurrentPrice>
      {historicalData.length > 0 && <CryptoChart data={historicalData} name={data.name} />}
      {interpretation && (
        <InterpretationContainer>
          <InterpretationTitle>Expert Interpretation:</InterpretationTitle>
          <InterpretationText>
            {interpretation.replace('undefined', data.name)}
            <div className="coin-gif">
              {coinGif && <CoinImage src={coinGif} alt={data.name} />}
            </div>
          </InterpretationText>
        </InterpretationContainer>
      )}
    </CardContainer>
  );
};

export default CryptoCard;
