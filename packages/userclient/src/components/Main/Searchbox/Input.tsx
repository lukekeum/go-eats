import React from 'react';
import styled from 'styled-components';

function Input() {
  return <SearchInput placeholder="What food you want to eat" />;
}

const SearchInput = styled.input`
  font-size: 1.5rem;
  padding: 0px 16px;
  width: 80%;
  outline: none;
  border: none;
  z-index: 1;
  background: transparent;
`;

export default Input;
