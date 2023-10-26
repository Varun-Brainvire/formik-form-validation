import React, { useState } from "react";
import {
  CheckBoxInput,
  CheckBoxLabel,
  CheckBoxWrapper,
} from "./styles/Form.styled";
import { ErrorMessage } from "formik";

interface Props {
  label?: string;
  type?: string;
  errors?: any;
  handleChange: any;
  values:any
}

const CheckBox = ({ label, type, errors, handleChange,values }: Props) => {
  console.log(values)
  const [event,setEvent] = useState(false)

    const handleCheckChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        // const event = e.target.checked
        console.log(event,"event")
        // handleChange(e.target.value)
        setEvent(e?.target?.checked)
    }



  return (
    <>
      <CheckBoxWrapper>
        <CheckBoxInput
        id="singleCheckBox"
        name="singleCheckBox"

          // onChange={(e) => {
          //   console.log(values, 'values')
          //   handleCheckChange(e)
          //   console.log(e.target.checked, 'checked')
          //   handleChange(values.singleCheckBox = (e.target.checked));
          // }}
          type="checkbox"
          value={values.singleCheckBox }
          checked = {values.singleCheckBox}

        />
        <CheckBoxLabel>{label}</CheckBoxLabel>        
      </CheckBoxWrapper>
      {!values.singleCheckBox && (
          <ErrorMessage
          component="div"
          name="lastName"
          // className="invalid-feedback"
        />
        )}
    </>
  );
};

export default CheckBox;
