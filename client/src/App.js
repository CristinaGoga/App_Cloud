import React, { useState } from 'react';
import styled from 'styled-components';
import backGroundAbout from './img/backGroundAbout.png';
import { MainLayout } from './Components/styles/Layouts';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import UserForm from './Components/UserForm/UserForm';
import Incomes from './Components/Incomes/Incomes';
import Expenses from './Components/Expenses/Expenses';
import Investments from './Components/Investments/Investmens'
import ReactDOM from 'react-dom';

function App() {
  const [active, setActive] = useState(1);
  const [showUserForm, setShowUserForm] = useState(false);

  const openUserForm = () => {
    setShowUserForm(true);
  };

  const closeUserForm = () => {
    setShowUserForm(false);
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 3: 
        return <Incomes />;
      case 4:
        return <Expenses />;
      case 11: 
       return <Investments />
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppStyled>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <MainContent>{displayData()}</MainContent>
      </MainLayout>
      {showUserForm ? ReactDOM.createPortal(<UserForm closeUserForm={closeUserForm} />, document.body) : null}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${backGroundAbout});
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default App;
