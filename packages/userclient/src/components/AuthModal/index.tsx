import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { signModalState, signTypeState } from '../../atom/auth';

import Login from './Login';
import Register from './Register';

function AuthModal() {
  const setModelOpen = useSetRecoilState(signModalState);
  const loginType = useRecoilValue(signTypeState);
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <>
      <ModalProvider>
        <Modal>{loginType === 'login' ? <Login /> : <Register />}</Modal>
      </ModalProvider>
      <Container
        onClick={() => {
          setModelOpen(false);
        }}
      />
    </>
  );
}

const Modal = styled.div`
  display: flex;
  width: 35rem;
  height: 50rem;
  background: white;
  border-radius: 10px;
  z-index: 20;
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