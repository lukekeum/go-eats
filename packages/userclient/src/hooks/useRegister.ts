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
  const { login } = useLogin();

  const register = (inputValue: IInputValue): Promise<AxiosResponse> => {
    setLoginInfo((prev) => ({ ...prev, isLoading: true }));
    return new Promise((resolve, reject) => {
      client
        .post('/auth/signup', inputValue)
        .then((response) => {
          onSignUpSuccess(inputValue);
          resolve(response);
        })
        .catch((err) => {
          setLoginInfo((prev) => ({ ...prev, isLoading: false }));
          reject(err);
        });
    });
  };

  const onSignUpSuccess = (inputValue: IInputValue) => {
    login(inputValue);
  };

  return { register };
};

export default useRegister;
