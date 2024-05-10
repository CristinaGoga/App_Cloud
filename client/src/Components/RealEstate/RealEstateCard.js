import React from 'react';
import styled from 'styled-components';

const colors = {
  available: '#6eff6e',
  unavailable: '#ff6384',
};

function RealEstateCard({ title, price, availability }) {
  const availabilityColor = availability ? colors.available : colors.unavailable;

  return (
    <CardWrapper>
      <StyledHeader>{title}</StyledHeader>
      <StyledParagraph>
        Price: <span>{price}</span>
      </StyledParagraph>
      <StyledAvailability availabilityColor={availabilityColor}>
        {availability ? 'Available' : 'Unavailable'}
      </StyledAvailability>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const StyledHeader = styled.h3`
  color: #424242;
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const StyledParagraph = styled.p`
  color: #555;
  font-size: 1rem;
  margin-bottom: 4px;

  span {
    font-weight: bold;
  }
`;

const StyledAvailability = styled.p`
  color: ${({ availabilityColor }) => availabilityColor};
  font-size: 1rem;
`;

export default RealEstateCard;
