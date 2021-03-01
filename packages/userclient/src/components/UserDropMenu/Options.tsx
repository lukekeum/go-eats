import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';

interface IOptionProps {
  value: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function Options({ value, onClick }: IOptionProps) {
  return (
    <Container onClick={onClick}>
      <span>{value}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid ${palette.grey[100]};
  color: black;
  &:hover {
    background: ${palette.grey[100]};
    border-radius: 5px;
  }
`;

export default React.memo(Options);
