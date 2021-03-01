import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { signinState, userDropdownState } from '../../atom/auth';
import Options from './Options';
import client from '../../lib/client';
import palette from '../../lib/palette';

function UserDropMenu() {
  const setDropDownState = useSetRecoilState(userDropdownState);
  const setSignInState = useSetRecoilState(signinState);

  const cancelDropMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      setDropDownState(false);
    },
    [setDropDownState],
  );

  const logout = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      client.post('/auth/logout', {}).then(() => {
        setSignInState({
          isLoading: false,
          isSignedIn: false,
          data: { username: null, email: null },
        });
        setDropDownState(false);
      });
    },
    [setSignInState, setDropDownState],
  );

  return (
    <>
      <Container>
        <Options value="Profile" />
        <Options value="Cart" />
        <Options value="Order Process" />
        <Options value="Logout" onClick={logout} />
      </Container>
      <MenuOutContainer onClick={cancelDropMenu} />
    </>
  );
}

const MenuOutContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: normal;
  width: 10rem;
  position: fixed;
  top: 4rem;
  right: 3.3rem;
  border-radius: 5px;
  background: ${palette.white};
  padding: 8px 8px;
  & div:last-child {
    border: none;
  }
  z-index: 2;
`;

export default UserDropMenu;
