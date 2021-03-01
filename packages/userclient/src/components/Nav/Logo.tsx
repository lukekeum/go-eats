import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isTopContentState } from '../../atom/navigation';
import palette from '../../lib/palette';

function Logo() {
  const isTopContent = useRecoilValue(isTopContentState);
  return (
    <>
      <LogoH1 isTopContent={isTopContent} to="/">
        Go-Eats
      </LogoH1>
    </>
  );
}

const LogoH1 = styled(Link)<{ isTopContent: boolean }>`
  text-decoration: none;
  color: ${(props) =>
    props.isTopContent ? `${palette.white}` : `${palette.black}`};
  font-weight: 700;
  font-size: 1.75rem;
  margin-left: 3rem;
  cursor: pointer;
`;

export default Logo;
