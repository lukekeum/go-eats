import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { signinState } from '../atom/auth';
import client from '../lib/client';
import useLogin from './useLogin';

interface IInputValue {
  email: string;
  username: string;
  password: string;
}

const useRegister = () => {
  const setLoginInfo = useSetRecoilState(signinState);
  const [loginFN] = useLogin();

  const register = (inputValue: IInputValue) => {
    setLoginInfo((prev) => ({ ...prev, isLoading: true }));
    return new Promise((resolve, reject) => {
      client
        .post('/auth/signup', inputValue)
        .then((response) => {
          onSignUpSuccess(response, inputValue);
          resolve(response);
        })
        .catch((err) => {
          setLoginInfo((prev) => ({ ...prev, isLoading: false }));
          reject(err);
        });
    });
  };

  const onSignUpSuccess = (
    response: AxiosResponse,
    inputValue: IInputValue,
  ) => {
    loginFN(inputValue);
  };

  return register;
};

export default useRegister;
