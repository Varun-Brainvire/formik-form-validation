import React, { useState } from "react";
import {
  ErrorDiv,
  Input,
  InputDiv,
  RadioInput,
  RadioLabel,
  RadioWrapper,
} from "./styles/Form.styled";
import { ErrorMessage } from "formik";

interface Props {
  label?: string;
  type?: string;
  handleChange: any;
  selectedRadio: any;
  setSelectedRadio: (data: string) => void;
}

const RadioButton = ({
  label,
  type,
  handleChange,
  selectedRadio,
  setSelectedRadio,
}: Props) => {
  // console.log(handleChange)
  //   const [selectedRadio, setSelectedRadio] = useState("");
  // console.log(errors)
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  //   };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, selectedRadio, "others");
    if (selectedRadio) {
      setSelectedRadio("");
    } else {
      console.log(e.target.value,"e.target.value");
      setSelectedRadio(e.target.value);
    }
  };

  return (
    <>
      <>
        <RadioWrapper>
          <RadioInput
            id="radio"
            type={type}
            name="radio"
            value={label}
            onChange={(e) => {
              console.log(selectedRadio)
              console.log(e.target.value);
              handleChange(e.target.value);
              handleCheckChange(e);
            }}
            checked={selectedRadio == label}
          />
          <RadioLabel htmlFor="radio">{label}</RadioLabel>
        </RadioWrapper>
        
      </>
    </>
  );
};

export default RadioButton;
