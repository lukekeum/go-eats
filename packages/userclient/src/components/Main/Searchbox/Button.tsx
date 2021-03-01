import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import palette from '../../../lib/palette';

function Button() {
  return (
    <SearchButton type="submit">
      <FaSearch />
    </SearchButton>
  );
}

const SearchButton = styled.button`
  text-align: center;
  font-size: 1.25rem;
  padding: 12px 16px;
  cursor: pointer;
  background: ${palette.white};
  outline: none;
  border: none;
  background: transparent;
`;

export default Button;
