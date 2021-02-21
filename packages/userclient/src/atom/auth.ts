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
  key: 'signmodal',
  default: false,
});

export const signinState = atom<ISigninState>({
  key: 'signin',
  default: {
    isLoading: false,
    isSignedIn: false,
    data: {
      email: null,
      username: null,
    },
  },
});
