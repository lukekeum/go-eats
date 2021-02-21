import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signinState, userDropdownState } from '../../atom/auth';

function UserInfo() {
  const { data } = useRecoilValue(signinState);
  const setDropdownOpen = useSetRecoilState(userDropdownState);

  const toggleDropdown = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      setDropdownOpen((oldState) => !oldState);
    },
    [setDropdownOpen],
  );

  return (
    <Container>
      <Username onClick={toggleDropdown}>{data.username}</Username>
    </Container>
  );
}

const Username = styled.span`
  text-decoration: underline;
  font-size: 1.25rem;
  cursor: pointer;
`;

const Container = styled.div``;

export default UserInfo;
