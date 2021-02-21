import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isTopContentState } from '../../atom/navigation';

import Logo from './Logo';
import Profile from './Profile';

interface INavbarProps {
  isMain: boolean;
}

function Navbar({ isMain = false }: INavbarProps) {
  const [isTopComponent, setTopContent] = useRecoilState(isTopContentState);

  useEffect(() => {
    if (!isMain) return;
    window.addEventListener('scroll', changeColor);
    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  const changeColor = () => {
    if (window.scrollY < window.innerHeight - 50) {
      return setTopContent(true);
    }
    return setTopContent(false);
  };

  return (
    <Container isTopContent={isTopComponent}>
      <Logo />
      <Profile />
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
  background: ${(props) => (props.isTopContent ? 'black' : 'white')};
  color: ${(props) => (props.isTopContent ? 'white' : 'black')};
`;

export default Navbar;
