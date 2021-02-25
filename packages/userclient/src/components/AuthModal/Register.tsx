import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signinState, signModalState, signTypeState } from '../../atom/auth';
import useRegister from '../../hooks/useRegister';
interface IInputValue {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const [inputValue, setInputValue] = useState<IInputValue>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const setLoginState = useSetRecoilState(signTypeState);
  const setModalOpen = useSetRecoilState(signModalState);
  const SigninState = useRecoilValue(signinState);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const registerFN = useRegister();

  useEffect(() => {
    if (SigninState.isLoading) {
      setDisabled(true);
    }
    const current = emailRef.current;
    return () => {
      setDisabled(false);
      current?.focus();
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
        case 'confirmPassword':
          setInputValue((prevState) => ({
            ...prevState,
            confirmPassword: e.target.value,
          }));
          if (e.target.value && inputValue.password !== e.target.value) {
            setErrorMessage('Check your password twice');
          } else setErrorMessage('');
          break;
        case 'username':
          setInputValue((prevState) => ({
            ...prevState,
            username: e.target.value,
          }));
          break;
      }
    },
    [setInputValue, setErrorMessage, inputValue],
  );

  const onRegister = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage('');

      if (
        !inputValue.confirmPassword ||
        !inputValue.email ||
        !inputValue.username ||
        !inputValue.password
      ) {
        setDisabled(false);
        emailRef.current?.focus();
        return setErrorMessage('Field is empty');
      }

      registerFN(inputValue)
        .catch((err) => {
          setErrorMessage(err.response.data.message);
        })
        .then(() => {
          setModalOpen(false);
        })
        .finally(() => {
          setDisabled(false);
          emailRef.current?.focus();
        });
    },
    [inputValue, setErrorMessage, registerFN, setModalOpen],
  );

  return (
    <Container>
      <TitleSection>
        <h1>Register</h1>
      </TitleSection>
      <form onSubmit={onRegister}>
        <InputSection>
          <Input
            disabled={disabled}
            name="email"
            placeholder="Email"
            value={inputValue.email}
            onChange={changeInput}
            ref={emailRef}
          />
          <Input
            disabled={disabled}
            name="username"
            placeholder="Username"
            value={inputValue.username}
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
          <Input
            disabled={disabled}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={inputValue.confirmPassword}
            onChange={changeInput}
          />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </InputSection>
        <ButtonSection>
          <Button type="submit">Register</Button>
          <span>
            or <span onClick={() => setLoginState('login')}>Login</span>
          </span>
        </ButtonSection>
      </form>
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

const Button = styled.button`
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
  & input:nth-child(4) {
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
  & form {
    display: flex;
    flex-direction: column;
    flex: 1.65;
  }
`;

export default React.memo(Register);
