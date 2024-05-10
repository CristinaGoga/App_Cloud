import React from 'react';
import styled from 'styled-components';
import { menuItems } from '../utils/menuItems';
function Navigation(props) {
  return (
    <NavStyled>
      <div className="user-con">
        <div className="text">
          <h2>Cristina</h2>
          <p>Your Financial Report</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((category) => (
          <div key={category.id} className="category-div">
            <h3>{category.category}</h3>
            {category.items.map((item) => (
              <li
                key={item.id}
                onClick={() => props.setActive(item.id)}
                className={props.active === item.id ? 'active' : 'inactive'}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2.5rem 2rem 0rem 3.5rem;
  width: 300px;
  height: 91vh;
  background: linear-gradient(to bottom, #ffffff, #6f42c1);
  margin-left: -20px;
  backdrop-filter: blur(4.5px);
  color: #ffffff;

  .menu-items {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    align-items: center;
    margin: 0.3rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    position: relative;
    padding-left: 1rem;
    border-radius: 8px;
    font-size: 0.8rem;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: #1a0738;
    }
    &:hover span {
      color: #1a0738;
    }
  }

  h3 {
    color: #1a0738;
  }

  span {
    margin-left: 1rem;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    h2 {
      margin: 0;
      color: #1a0738;
      font-size: 1.3rem;
      font-weight: 700;
    }
    p {
      margin: 0;
      color: #1a0738;
      font-size: 1rem;
      font-weight: 400;
    }
  }

  .active {
    color: #6f42c1;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background-color: #ffffff;
      border-radius: 0 10px 10px 0;
    }
  }

  .inactive {
    // Puteți adăuga stiluri suplimentare pentru elementele inactive, dacă doriți
  }

  .bottom-nav {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
`;

export default Navigation;
