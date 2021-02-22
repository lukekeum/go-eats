import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { signModalState, signTypeState } from '../../atom/auth';

import Login from './Login';
import Register from './Register';

function AuthModal() {
  const setModelOpen = useSetRecoilState(signModalState);
  const setSignType = useSetRecoilState(signTypeState);
  const loginType = useRecoilValue(signTypeState);
  useEffect(() => {
    setSignType('login');
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [setSignType]);
  return (
    <AuthModalContainer>
      <ModalProvider>
        <Modal>{loginType === 'login' ? <Login /> : <Register />}</Modal>
      </ModalProvider>
      <Container
        onClick={() => {
          setModelOpen(false);
        }}
      />
    </AuthModalContainer>
  );
}

const modalPopup = keyframes`
  0% {
    transform: scale(0.5, 0.5);
    opacity: 0.5;
  }
  95% {
    transform: scale(1.01, 1.01);
    opacity: 0.9;
  }
  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
`;

const AuthModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  height: 50rem;
  background: white;
  border-radius: 10px;
  z-index: 20;
  animation: ${modalPopup} 0.25s;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const ModalProvider = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  z-index: 5;
`;

export default AuthModal;
