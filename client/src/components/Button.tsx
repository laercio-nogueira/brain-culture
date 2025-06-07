import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

export default Button;