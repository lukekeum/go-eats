import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { signModalState } from '../../atom/auth';

import TopContent from './TopContent';
import MiddleContent from './MiddleContent';
import Navbar from '../Nav';
import AuthModal from '../AuthModal';

function MainContainer() {
  const isModalOpened = useRecoilValue(signModalState);
  return (
    <StyledContainer>
      {isModalOpened && <AuthModal />}
      <Navbar isMain={true} />
      <TopContent />
      <MiddleContent />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

export default MainContainer;
