import axios, { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { signinState } from '../atom/auth';
import client from '../lib/client';

const JWT_EXPIRES_TIME = 24 * 3600 * 1000;

interface IInputValue {
  email: string;
  password: string;
}

const useLogin = () => {
  const setLoginInfo = useSetRecoilState(signinState);

  const login = (inputValue: IInputValue): Promise<AxiosResponse> => {
    setLoginInfo((prev) => ({ ...prev, isLoading: true }));
    return new Promise((resolve, reject) => {
      client
        .post('/auth/signin', inputValue)
        .then((response) => {
          onLoginSuccess(response);
          resolve(response);
        })
        .catch((err) => {
          setLoginInfo((prev) => ({ ...prev, isLoading: false }));
          reject(err);
        });
    });
  };

  const onSilentRefresh = (): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
      client
        .post('/auth/silent-refresh', {})
        .then((response) => {
          onLoginSuccess(response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const onLoginSuccess = (response: AxiosResponse) => {
    const { token } = response.data;

    client.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setLoginInfo({
      isLoading: false,
      isSignedIn: true,
      data: {
        username: response.data.data.username,
        email: response.data.data.email,
      },
    });

    return setTimeout(onSilentRefresh, JWT_EXPIRES_TIME - 60 * 1000);
  };

  return { login, onSilentRefresh };
};

export default useLogin;
