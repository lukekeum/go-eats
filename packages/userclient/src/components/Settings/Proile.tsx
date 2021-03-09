import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { signinState } from '../../atom/auth';
import Hyper from './Hyper';

function Profile() {
  const { data } = useRecoilValue(signinState);

  return (
    <ProfileContainer>
      <h1>{data.username}</h1>
      <Hyper>asdf</Hyper>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  width: 100%;
  & h1 {
    font-weight: 400;
    font-size: 2rem;
  }
`;

export default Profile;
