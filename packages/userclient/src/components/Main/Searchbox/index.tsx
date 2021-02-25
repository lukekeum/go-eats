import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import Input from './Input';

function Searchbox() {
  return (
    <Wrapper>
      <SearchBoxContainer>
        <Input />
        <Button />
      </SearchBoxContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50vh;
  background: #f5f5f5;
  width: 100vw;
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const SearchBoxContainer = styled.form`
  border-bottom: 2px solid black;
  display: flex;
  padding: 10px;
  width: 30rem;
  margin: 0 auto;
  z-index: 0;
`;

export default Searchbox;
