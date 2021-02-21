import React from 'react';
import styled from 'styled-components';

function MainContent() {
  return (
    <div>
      <Container></Container>
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
`;

export default MainContent;
