import React from "react";
import logoImg from "../../assets/logo.svg";

import { useAuth } from "../../hooks/auth";

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from "react-icons/md";

import {
  Container,
  Header,
  LogoImg,
  Title,
  MenuContainer,
  MenuLink,
  MenuItemButton,
} from "./styles";

const Aside: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt='Logo My Wallet' />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuLink className='menu-link' href='/'>
          <MdDashboard />
          Dashboard
        </MenuLink>

        <MenuLink className='menu-link' href='/list/entry-balance'>
          <MdArrowUpward />
          Entradas
        </MenuLink>

        <MenuLink className='menu-link' href='/list/withdraw-balance'>
          <MdArrowDownward />
          Saídas
        </MenuLink>

        <MenuItemButton className='menu-link' onClick={signOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
