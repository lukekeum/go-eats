import { atom } from 'recoil';

export const isTopContentState = atom<boolean>({
  key: 'navigation-top-state',
  default: true,
});
