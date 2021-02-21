import React from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { signinState } from '../../atom/auth';

function UserInfo() {
  const { data } = useRecoilValue(signinState);
  return (
    <Container>
      <Username>{data.username}</Username>
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
