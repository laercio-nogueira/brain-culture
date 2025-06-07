import InputMask from "react-input-mask";
import styled from "styled-components";

const InputStyle = styled.div`
  input {
    width: 95%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 0.0625rem solid #ccc;
    font-size: 1rem;
    margin-bottom: 1rem;

    &:focus {
      border-color: #4caf50;
      outline: none;
    }
  }

  .error {
    font-size: 0.8rem;
    color: red;
    margin-top: -0.9rem;
    margin-bottom: 0.5rem;
  }
`;

type InputProps = {
  mask?: string;
  value: string | number | undefined;
  onChange?: any;
  required?: boolean;
  [key: string]: any;
};

const Input = ({
  mask = "",
  value,
  error,
  onChange,
  ...props
}: InputProps): JSX.Element => {
  return (
    <InputStyle>
      <InputMask
        {...props}
        mask={mask}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maskChar={""}
      />
      {error && <div className="error">{error}</div>}
    </InputStyle>
  );
};

export default Input;
