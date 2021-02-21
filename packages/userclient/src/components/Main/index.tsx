import React from 'react';
import styled from 'styled-components';
import TopContent from './TopContent';
import MiddleContent from './MiddleContent';

function MainContainer() {
  return (
    <StyledContainer>
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
