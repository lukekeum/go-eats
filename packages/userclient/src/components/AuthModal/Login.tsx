import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './AuthModal.styles';
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
  const emailRef = useRef<HTMLInputElement>(null);
  const { login } = useLogin();

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
      }
    },
    [setInputValue],
  );

  const onLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage('');

      login(inputValue)
        .then(() => setModalState(false))
        .catch((err) => setErrorMessage(err.response.data.message))
        .finally(() => {
          setDisabled(false);
          emailRef.current?.focus();
        });
    },
    [setErrorMessage, login, inputValue, setModalState],
  );

  return (
    <S.Container>
      <S.TitleSection>
        <h1>Login</h1>
      </S.TitleSection>
      <form onSubmit={onLogin}>
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
            type="password"
            name="password"
            placeholder="Password"
            value={inputValue.password}
            onChange={changeInput}
          />
          <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
        </S.InputSection>
        <S.ButtonSection>
          <S.Button type="submit">Login</S.Button>
          <span>
            or <span onClick={() => setLoginState('register')}>Register</span>
          </span>
        </S.ButtonSection>
      </form>
    </S.Container>
  );
}

export default React.memo(Login);
