import React, { useState } from "react";
import {
  CheckBoxInput,
  CheckBoxLabel,
  CheckBoxWrapper,
} from "./styles/Form.styled";

interface Props {
  label?: string;
  type?: string;
  errors?: any;
  handleChange: any;
}

const CheckBox = ({ label, type, errors, handleChange }: Props) => {
  const [event, setEvent] = useState(false);

  return (
    <>
      <CheckBoxWrapper>
        <CheckBoxInput
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          type="checkbox"
          checked
        />
        <CheckBoxLabel>{label}</CheckBoxLabel>
      </CheckBoxWrapper>
    </>
  );
};

export default CheckBox;
