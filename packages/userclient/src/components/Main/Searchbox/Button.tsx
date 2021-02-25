import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

function Button() {
  return (
    <SearchButton>
      <FaSearch />
    </SearchButton>
  );
}

const SearchButton = styled.button`
  text-align: center;
  font-size: 1.25rem;
  padding: 12px 16px;
  cursor: pointer;
  background: white;
  outline: none;
  border: none;
  background: transparent;
`;

export default Button;
