import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { signTypeState } from '../../atom/auth';

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
          break;
        case 'username':
          setInputValue((prevState) => ({
            ...prevState,
            username: e.target.value,
          }));
          break;
      }
    },
    [setInputValue],
  );

  return (
    <Container>
      <TitleSection>
        <h1>Register</h1>
      </TitleSection>
      <InputSection>
        <Input
          name="email"
          placeholder="Email"
          value={inputValue.email}
          onChange={changeInput}
        />
        <Input
          name="username"
          placeholder="username"
          value={inputValue.username}
          onChange={changeInput}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={inputValue.password}
          onChange={changeInput}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          value={inputValue.confirmPassword}
          onChange={changeInput}
        />
      </InputSection>
      <ButtonSection>
        <Button>Register</Button>
        <span>
          or <span onClick={() => setLoginState('login')}>Login</span>
        </span>
      </ButtonSection>
    </Container>
  );
}

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

export default Register;
