import React, { useState } from "react";
import logoImg from "../../assets/logo.svg";
import Toggle from "../Toggle";

import { useAuth } from "../../hooks/auth";
import { useTheme } from "../../hooks/theme";

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu,
} from "react-icons/md";

import {
  Container,
  Header,
  LogoImg,
  Title,
  MenuContainer,
  MenuLink,
  MenuItemButton,
  ToggleMenu,
  ThemeToggleFooter,
} from "./styles";

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>

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

      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <Toggle
          labelLeft='Light'
          labelRight='Dark'
          checked={darkTheme}
          onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  );
};

export default Aside;
