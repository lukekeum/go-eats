import React from 'react';
import styled from 'styled-components';

function MainContainer() {
  return <StyledContainer></StyledContainer>;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

export default MainContainer;
