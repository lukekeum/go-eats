import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { SearchContext } from './index';

function Input() {
  const searchValue = useContext(SearchContext);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      searchValue?.setInput(e.target.value);
    },
    [searchValue],
  );

  return (
    <SearchInput
      placeholder="What food you want to eat"
      value={searchValue?.input}
      onChange={onChange}
    />
  );
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
