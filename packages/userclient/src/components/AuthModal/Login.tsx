import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signinState, signTypeState, signModalState } from '../../atom/auth';
import useLogin from '../../hooks/useLogin';

interface IInputValue {
  email: string;
  password: string;
}

function Login() {
  const [inputValue, setInputValue] = useState<IInputValue>({
    email: '',
    password: '',
  });
  const setLoginState = useSetRecoilState(signTypeState);
  const setModalState = useSetRecoilState(signModalState);
  const [disabled, setDisabled] = useState(false);
  const SigninState = useRecoilValue(signinState);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginFN] = useLogin();

  useEffect(() => {
    if (SigninState.isLoading) {
      setDisabled(true);
    }
    return () => {
      setDisabled(false);
    };
  }, [SigninState]);

  const changeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      switch (e.target.name) {
        case 'email':
          setInputValue((prevState) => ({
            ...prevState,
            email: e.target.value,
          }));
          break;
        case 'password':
          setInputValue((prevState) => ({
            ...prevState,
            password: e.target.value,
          }));
          break;
      }
    },
    [setInputValue],
  );

  const login = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setErrorMessage('');

      loginFN(inputValue)
        .then(() => setModalState(false))
        .catch((err) => setErrorMessage(err.response.data.message));
    },
    [setErrorMessage, loginFN, inputValue, setModalState],
  );

  return (
    <Container>
      <TitleSection>
        <h1>Login</h1>
      </TitleSection>
      <InputSection>
        <Input
          disabled={disabled}
          name="email"
          placeholder="Email"
          value={inputValue.email}
          onChange={changeInput}
        />
        <Input
          disabled={disabled}
          type="password"
          name="password"
          placeholder="Password"
          value={inputValue.password}
          onChange={changeInput}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </InputSection>
      <ButtonSection>
        <Button onClick={login}>Login</Button>
        <span>
          or <span onClick={() => setLoginState('register')}>Register</span>
        </span>
      </ButtonSection>
    </Container>
  );
}

const ErrorMessage = styled.p`
  color: #eb4034;
  margin-left: 0.5rem;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  & span span {
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
  }
`;

const Button = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 16px;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  border-radius: 7.5px;
  &:hover {
    background: rgba(0, 0, 0, 0.85);
  }
`;

const InputSection = styled.div`
  flex: 1.25;
  display: flex;
  flex-direction: column;
  & input:nth-child(1) {
    margin-top: 0;
  }
  & input:nth-child(2) {
    margin-bottom: 0;
  }
`;

const TitleSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  & h1 {
    font-size: 4rem;
  }
`;

const Input = styled.input`
  padding: 16px;
  font-size: 1.25rem;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 7.5px;
  margin-bottom: 2rem;
  &:focus {
    background: rgba(0, 0, 0, 0.075);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 0 auto;
  height: 100%;
`;

export default Login;
