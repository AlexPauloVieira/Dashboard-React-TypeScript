import React from "react";

import logoImg from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { Container, Logo, Form, FormTitle } from "./styles";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src={logoImg} alt='My Wallet' />
        <h2>My Wallet</h2>
      </Logo>
      <Form onSubmit={() => {}}>
        <FormTitle>Entrar</FormTitle>
        <Input type='email' placeholder='E-mail' required />
        <Input type='password' placeholder='Senha' required />

        <Button type='submit'>Acessar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
