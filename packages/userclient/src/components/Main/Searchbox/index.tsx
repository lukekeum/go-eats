import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../lib/palette';

import Button from './Button';
import Input from './Input';

interface ISearchContext {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<ISearchContext | null>(null);

function Searchbox() {
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      return history.push(`/search?type=restaurant&content=${inputValue}`);
    },
    [history, inputValue],
  );

  return (
    <SearchContext.Provider
      value={{ input: inputValue, setInput: setInputValue }}
    >
      <Wrapper>
        <SearchBoxContainer onSubmit={onSubmit}>
          <Input />
          <Button />
        </SearchBoxContainer>
      </Wrapper>
    </SearchContext.Provider>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50vh;
  background: ${palette.grey[100]};
  width: 100vw;
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const SearchBoxContainer = styled.form`
  border-bottom: 2px solid ${palette.black};
  display: flex;
  padding: 10px;
  width: 30rem;
  margin: 0 auto;
  z-index: 0;
`;

export default Searchbox;
