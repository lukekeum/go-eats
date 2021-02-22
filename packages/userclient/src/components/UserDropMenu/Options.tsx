import React from 'react';
import styled from 'styled-components';

interface IOptionProps {
  value: string;
}

function Options({ value }: IOptionProps) {
  return (
    <Container>
      <span>{value}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #cfcfcf;
  color: black;
  &:hover {
    background: #cfcfcf;
    border-radius: 5px;
  }
`;

export default React.memo(Options);
