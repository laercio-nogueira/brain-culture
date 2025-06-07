import styled from "styled-components";

const Button = styled.button`
  font-size: 13px !important;
  padding: 6px 12px;
  cursor: pointer;
  color: #fff !important;
  border: none;
  border-radius: 4px;
  font-weight: bold;

  &:disabled {
    background-color: #999 !important;
    opacity: 0.5;
  }
`;

interface ButtonProps {
  backgroundColor: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonMore = ({ backgroundColor, text, onClick, disabled }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor }}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default ButtonMore;