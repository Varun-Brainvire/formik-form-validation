import styled from "styled-components";
import Select from "react-select";
import { Formik, Form, ErrorMessage, Field } from "formik";

interface Props {
  borderColor?: string;
  option?: any;
}

export const MainDiv = styled.div`
  text-align: left;
  /* max-width: 1526px; */
  max-width: 750px;
  margin: auto;
`;

export const RegistrationForm = styled.h2`
  color: black;
  font-family: Open Sans, sans-serif;
  text-align: center;
  margin-bottom: 10%;
  margin-top: 14%;
`;
export const InputLabel = styled.h4`
  color: #313131;
  font-family: Open Sans, sans-serif;
  /* text-align: center */
`;

export const NormalDiv = styled.div`
  margin-bottom: 60px;
`;

export const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: transparent;
  padding: 5px;
  background-color: #f6d9d5;
  /* border: 1px solid black;
    margin-bottom: 60px; */
`;

export const InputDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 0px -5px;
  justify-content: center;
  gap: 2px;
`;

export const FirstNameDiv = styled.div`
  width: 50%;
  margin: 0px 5px;
`;

export const SecondNameDiv = styled.div`
  margin: 0px 5px;
  width: 50%;
`;

export const Input = styled.input<Props>`
  background: transparent;
  outline: none;
  border: ${(props) => props.borderColor};
  width: 100%;
  height: 40px;
  line-height: 1.4rem;
  font-size: medium;
  background-color: #f6d9d5;
  border-color: #313131;
  :focus {
    border-color: #000000;
    /* background-color: #f7d0cb; */
  }
`;

export const EmailInput = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  background-color: transparent;
`;

export const AddressDropdown = styled.select<Props>`
  background: transparent;
  outline: none;
  border: ${(props) => props.borderColor};
  border-radius: 0 !important;
  width: 100%;
  height: 40px;
  line-height: 1.4rem;
  font-size: medium;
  :focus {
    border-color: #000000;
  }
`;

export const CountryOptions = styled.option<Props>`
  border: ${(props) => props.borderColor};
  background: transparent;
  outline: none;
  width: 100%;
  height: 40px;
  line-height: 1.4rem;
  font-size: medium;
  :focus {
    border-color: #000000;
  }
`;

export const SelectWrapper = styled.div`
  width: 100%;
  border: 1px solid black;
`;

export const CustomSelect = styled(Select)`
  & > div[class*="control"] {
    border: none;
    color: black;
    background: #f7d0cb;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
`;

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f6d9d5;
  background: transparent;
  outline: none;
  border: black 1px solid;
  border-radius: 0 !important;
  width: 100%;
  height: 40px;
  line-height: 1.4rem;
  font-size: medium;
  margin-bottom: 15px;
  :focus {
    border-color: #000000;
  }
`;

export const RadioInput = styled.input`
  background-color: #f6d9d5;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #000;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #000;
  }
`;

export const RadioLabel = styled.label`
  margin-left: 10px;
`;

export const CheckBoxInput = styled(Field)`
  cursor: pointer;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  background-color: #f6d9d5;

  &:after {
    width: 20px;
    height: 20px;
  }
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
  outline: none;
  border: black 1px solid;
  border-radius: 0 !important;
  width: 100%;
  height: 40px;
  line-height: 1.4rem;
  font-size: medium;
  margin-bottom: 15px;
  :focus {
    border-color: #000000;
  }
`;

export const CheckBoxLabel = styled.label`
  margin-left: 10px;
  font-size: 15px;
`;

export const SubmitButton = styled.button`
  background-color: #313131 !important;
  border-radius: 0 !important;
  color: #fff;
  font-weight: 700;
  min-height: 3.4rem;
  min-width: 9.2em;
  font-size: 1.03em;
`;

export const ErrorDiv = styled.div`
  min-width: 9.2em;
  color: red;
`;
