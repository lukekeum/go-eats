import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
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
  background: ${palette.white};
`;

export default MainContent;
