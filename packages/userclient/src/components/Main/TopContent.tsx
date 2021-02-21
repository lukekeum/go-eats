import React, { useCallback } from 'react';
import styled from 'styled-components';

function TopContent() {
  const checkoutButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    },
    [],
  );

  return (
    <Container>
      <Title>Go-Eats</Title>
      <Description>The fastest food delivery app in the world</Description>
      <Description>Check out and get some coupon for deliver</Description>
      <Button onClick={checkoutButton}>Checkout</Button>
    </Container>
  );
}

const Button = styled.button`
  margin-top: 3rem;
  outline: none;
  border: 2px solid white;
  border-radius: 50px;
  color: black;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.75rem 2rem 0.75rem 2rem;
  cursor: pointer;
  background: white;
  transition: all 0.25s;
  &:hover {
    background: black;
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 5rem;
  margin: 0;
  margin-bottom: 0.75rem;
  padding: 0;
`;

const Description = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  margin-top: 0.3rem;
  padding: 0;
  &:nth-type-of(1) {
    margin-top: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

export default TopContent;
