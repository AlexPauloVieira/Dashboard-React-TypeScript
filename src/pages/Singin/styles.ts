import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }

`;

const animateForm = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }

`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 30px;

  > h2 {
    color: ${(props) => props.theme.colors.white};
    margin-left: 7px;
  }

  > img {
    width: 40px;
    height: 40px;
  }

  animation: ${animate} 0.5s;
`;

export const Form = styled.form`
  width: 300px;
  height: 300px;

  padding: 30px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.tertiary};

  animation: ${animateForm} 0.5s;
`;

export const FormTitle = styled.h1`
  margin-bottom: 40px;
  color: ${(props) => props.theme.colors.white};

  &:after {
    content: "";
    display: block;
    width: 55px;
    border-bottom: 10px solid ${(props) => props.theme.colors.warning};
  }
`;
