import React from 'react'
import styled from 'styled-components'

function Button({ name, icon, onClick, bg, bPad, color, bRad }) {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
      }}
      onClick={onClick}
    >
      {icon}
      {name}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
padding: 1rem;
border-radius: 50%;
background: var(--primary-color);
color: #fff;
transition: background 0.3s ease;

&:hover {
    background: var(--color-green);
}

& > i {
    color: #fff;
}
`;

export default Button;
