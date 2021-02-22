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

  const login = (inputValue: IInputValue) => {
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

  const onSilentRefresh = () => {
    return client
      .post('/auth/silent-refresh', {})
      .then(onLoginSuccess)
      .catch((err) => {
        console.log(err);
      });
  };

  const onLoginSuccess = (response: AxiosResponse) => {
    const { token } = response.data;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setLoginInfo({
      isLoading: false,
      isSignedIn: true,
      data: {
        username: response.data.data.username,
        email: response.data.data.email,
      },
    });

    setTimeout(onSilentRefresh, JWT_EXPIRES_TIME - 60 * 1000);
  };

  return [login, onSilentRefresh] as const;
};

export default useLogin;
