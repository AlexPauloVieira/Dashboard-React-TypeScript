import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from "react-icons/md";

import { Container, Header, LogoImg, Title, MenuContainer } from "./styles";

const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt='Logo My Wallet' />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <Link className='menu-link' to='/dashboard'>
          <MdDashboard />
          Dashboard
        </Link>

        <Link className='menu-link' to='/list/entry-balance'>
          <MdArrowUpward />
          Entradas
        </Link>

        <Link className='menu-link' to='/list/withdraw-balance'>
          <MdArrowDownward />
          Saídas
        </Link>

        <Link className='menu-link' to='#'>
          <MdExitToApp />
          Sair
        </Link>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
