import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1.5rem;
  font-size: 1rem;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

export default Select;