import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { signinState } from '../../atom/auth';

import LoginButton from './LoginButton';
import UserInfo from './UserInfo';

function Profile() {
  const { isSignedIn } = useRecoilValue(signinState);
  return <Container>{!isSignedIn ? <LoginButton /> : <UserInfo />}</Container>;
}

const Container = styled.div`
  margin-right: 3.5rem;
`;

export default Profile;
