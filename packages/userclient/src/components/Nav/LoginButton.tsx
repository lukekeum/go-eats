import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isTopContentState } from '../../atom/navigation';

function LoginButton() {
  const isTopContent = useRecoilValue(isTopContentState);
  return <LoginButtonStyle isTopContent={isTopContent}>Login</LoginButtonStyle>;
}

const LoginButtonStyle = styled.button<{ isTopContent: boolean }>`
  outline: none;
  border: ${(props) =>
    props.isTopContent ? '2px solid white' : '2px solid black'};
  background: ${(props) => (props.isTopContent ? 'transparent' : 'white')};
  color: ${(props) => (props.isTopContent ? 'white' : 'black')};
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem 0.4rem 1.2rem;
  border-radius: 25px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    background: ${(props) => (props.isTopContent ? 'white' : 'black')};
    color: ${(props) => (props.isTopContent ? 'black' : 'white')};
  }
`;
export default LoginButton;
