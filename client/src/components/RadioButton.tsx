import styled from "styled-components";

export const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin: 8px 0 16px;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
`;

const RadioButtonInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #aaa;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #388e3c;
    &::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      background: #388e3c;
      border-radius: 50%;
      top: 2px;
      left: 2px;
    }
  }
`;

const RadioButton = ({ name, value, checked, onChange }: any) => {
  return (
    <RadioButtonLabel>
      <RadioButtonInput
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {value}
    </RadioButtonLabel>
    // <RadioButtonLabel>
    //   <RadioButtonInput
    //     type="radio"
    //     name="documentType"
    //     value="CNPJ"
    //     checked={formData.documentType === "PJ"}
    //     onChange={() => setFormData({ ...formData, documentType: "PJ" })}
    //   />
    //   CNPJ
    // </RadioButtonLabel>
  );
};

export default RadioButton;
