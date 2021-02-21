import { atom } from 'recoil';

export interface ISigninState {
  isLoading: boolean;
  isSignedIn: boolean;
  data: {
    email: null | string;
    username: null | string;
  };
}

export const signModalState = atom<boolean>({
  key: 'sign-modal',
  default: false,
});

type TSignType = 'login' | 'register';

export const signTypeState = atom<TSignType>({
  key: 'sign-type',
  default: 'login',
});

export const signinState = atom<ISigninState>({
  key: 'signin',
  default: {
    isLoading: false,
    isSignedIn: true,
    data: {
      email: null,
      username: 'John',
    },
  },
});

export const userDropdownState = atom<boolean>({
  key: 'dropdown',
  default: false,
});
