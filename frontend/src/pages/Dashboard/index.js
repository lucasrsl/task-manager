import React from 'react';
import { useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';

import { signOut } from '../../store/modules/auth/actions';
import { Container, Wrapper } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Wrapper>
      <Container>
        <button type="button" onClick={ handleSignOut }> 
          <FiLogOut size={36} />
        </button>
      </Container>
    </Wrapper>
  );
}
