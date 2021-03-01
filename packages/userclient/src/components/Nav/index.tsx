import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDropdownState } from '../../atom/auth';
import { isTopContentState } from '../../atom/navigation';

import Logo from './Logo';
import Profile from './Profile';
import UserDropMenu from '../UserDropMenu';
import palette from '../../lib/palette';

interface INavbarProps {
  isMain: boolean;
}

function Navbar({ isMain = false }: INavbarProps) {
  const [isTopComponent, setTopContent] = useRecoilState(isTopContentState);
  const userDropdownOpened = useRecoilValue(userDropdownState);

  useEffect(() => {
    if (!isMain) return;
    const changeColor = () => {
      if (window.scrollY < window.innerHeight - 50) {
        return setTopContent(true);
      }
      return setTopContent(false);
    };
    window.addEventListener('scroll', changeColor);
    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, [isMain, setTopContent]);

  return (
    <Container isTopContent={isTopComponent}>
      <Logo />
      <Profile />
      {userDropdownOpened && <UserDropMenu />}
    </Container>
  );
}

const Container = styled.div<{ isTopContent: boolean }>`
  position: fixed;
  display: flex;
  width: 100%;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
  background: ${(props) =>
    props.isTopContent ? `${palette.black}` : `${palette.white}`};
  color: ${(props) =>
    props.isTopContent ? `${palette.white}` : `${palette.black}`};
`;

export default Navbar;
