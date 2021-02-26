import styled from 'styled-components';

export const ErrorMessage = styled.p`
  color: #eb4034;
  margin-left: 0.5rem;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  & span span {
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
  }
`;

export const Button = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 16px;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  border-radius: 7.5px;
  &:hover {
    background: rgba(0, 0, 0, 0.85);
  }
`;

export const InputSection = styled.div`
  flex: 1.25;
  display: flex;
  flex-direction: column;
  & input:nth-child(1) {
    margin-top: 0;
  }
  & input:last-child {
    margin-bottom: 0;
  }
`;

export const TitleSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  & h1 {
    font-size: 4rem;
  }
`;

export const Input = styled.input`
  padding: 16px;
  font-size: 1.25rem;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 7.5px;
  margin-bottom: 2rem;
  &:focus {
    background: rgba(0, 0, 0, 0.075);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 0 auto;
  height: 100%;
  & form {
    display: flex;
    flex-direction: column;
    flex: 1.65;
  }
`;
