import React from 'react';
import styled from 'styled-components';
import Searchbox from './Searchbox';

function MainContent() {
  return (
    <Container>
      <Searchbox />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  background: white;
`;

export default MainContent;
