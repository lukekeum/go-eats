import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './AuthModal.styles';
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
    <S.Container>
      <S.TitleSection>
        <h1>Register</h1>
      </S.TitleSection>
      <form onSubmit={onRegister}>
        <S.InputSection>
          <S.Input
            disabled={disabled}
            name="email"
            placeholder="Email"
            value={inputValue.email}
            onChange={changeInput}
            ref={emailRef}
          />
          <S.Input
            disabled={disabled}
            name="username"
            placeholder="Username"
            value={inputValue.username}
            onChange={changeInput}
          />
          <S.Input
            disabled={disabled}
            type="password"
            name="password"
            placeholder="Password"
            value={inputValue.password}
            onChange={changeInput}
          />
          <S.Input
            disabled={disabled}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={inputValue.confirmPassword}
            onChange={changeInput}
          />
          <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
        </S.InputSection>
        <S.ButtonSection>
          <S.Button type="submit">Register</S.Button>
          <span>
            or <span onClick={() => setLoginState('login')}>Login</span>
          </span>
        </S.ButtonSection>
      </form>
    </S.Container>
  );
}

export default React.memo(Register);
