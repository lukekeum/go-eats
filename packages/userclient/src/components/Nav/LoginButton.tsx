import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isTopContentState } from '../../atom/navigation';
import { signModalState } from '../../atom/auth';
import palette from '../../lib/palette';

function LoginButton() {
  const setModalState = useSetRecoilState(signModalState);
  const isTopContent = useRecoilValue(isTopContentState);

  const openModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setModalState(true);
    },
    [setModalState],
  );

  return (
    <LoginButtonStyle onClick={openModal} isTopContent={isTopContent}>
      Login
    </LoginButtonStyle>
  );
}

const LoginButtonStyle = styled.button<{ isTopContent: boolean }>`
  outline: none;
  border: ${(props) =>
    props.isTopContent
      ? `2px solid ${palette.white}`
      : `2px solid ${palette.black}`};
  background: ${(props) =>
    props.isTopContent ? `${palette.black}` : `${palette.white}`};
  color: ${(props) =>
    props.isTopContent ? `${palette.white}` : `${palette.black}`};
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem 0.4rem 1.2rem;
  border-radius: 25px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    background: ${(props) =>
      props.isTopContent ? `${palette.white}` : `${palette.black}`};
    color: ${(props) =>
      props.isTopContent ? `${palette.black}` : `${palette.white}`};
  }
`;
export default LoginButton;
