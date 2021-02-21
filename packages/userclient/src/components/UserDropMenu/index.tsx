import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { userDropdownState } from '../../atom/auth';
import Options from './Options';

function UserDropMenu() {
  const setDropDownState = useSetRecoilState(userDropdownState);

  const cancelDropMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      setDropDownState(false);
    },
    [setDropDownState],
  );

  return (
    <>
      <Container>
        <Options value="Profile" />
        <Options value="Cart" />
        <Options value="Order Process" />
        <Options value="Logout" />
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
  background: white;
  padding: 8px 8px;
  & div:last-child {
    border: none;
  }
  z-index: 2;
`;

export default UserDropMenu;
