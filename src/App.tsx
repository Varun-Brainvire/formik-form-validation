import React from "react";
import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import "./App.css";
import {
  InputLabel,
  RegistrationForm,
  InputDiv,
  FirstNameDiv,
  SecondNameDiv,
  MainDiv,
  NormalDiv,
  IconDiv,
  Input,
  SelectWrapper,
  CustomSelect,
  SubmitButton,
  ErrorDiv,
} from "./components/styles/Form.styled";
import { GlobalStyle } from "./components/styles/Global.styled";
import RadioButton from "./components/RadioButton";
import CheckBox from "./components/CheckBox";
import { FaEnvelope, FaAddressCard } from "react-icons/fa";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import ReferralSelect from "./components/ReferalSelect";

const App: React.FC = () => {
  const [countryOption, setCountryOption] = useState();
  const [stateOption, setStateOption] = useState();
  const [cityOption, setCityOption] = useState();
  const [countrySelected, setCountrySelected] = useState<any>("");
  const [stateSelected, setStateSelected] = useState<any>();
  const [citySelected, setCitySelected] = useState();
  const [selectedRadio, setSelectedRadio] = useState("");

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: "none !important;",
      borderRadius: "4px",
      backgroundColor: "#f6d9d5",
      boxShadow: state.isFocused ? "1px solid #313131;" : "none",
      "&:hover": {
        border: "1px solid #313131",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f6d9d5" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#f6d9d5;",
        color: "black",
      },
    }),
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Your name is too short")
      .required("Please enter your first name"),
    lastName: Yup.string()
      .min(2, "Your name is too short")
      .required("Please enter your last name"),
    email: Yup.string()
      .email("The email is incorrect")
      .required("Please enter your email"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Please Enter Phone Number"),
    country: Yup.object().required("Please Select Country"),
    state: Yup.object().required("Please Select State"),
    city: Yup.object().required("Please Select City"),
    date: Yup.string().required("Please Select Date"),
    radio: Yup.string().required("Please Select Any One Option"),
    singleCheckBox: Yup.boolean().oneOf(
      [true],
      "Please accept the terms and conditions"
    ),
    referal: Yup.string().required("Please select any one option"),
  });

  useEffect(() => {
    if (Country.getAllCountries()) {
      let arr: any = [];
      Country.getAllCountries()?.map((data) => {
        return arr.push({ label: data?.name, value: data?.isoCode });
      });
      setCountryOption(arr);
    }
  }, [Country]);

  useEffect(() => {
    if (State.getStatesOfCountry()) {
      let stateArray: any = [];
      State.getStatesOfCountry(countrySelected.value).map((data) => {
        // console.log(data, "data");
        stateArray.push({
          label: data.name,
          value: data.isoCode,
          countryCode: data.countryCode,
        });
      });
      setStateOption(stateArray);
    }
  }, [countrySelected]);

  useEffect(() => {
    if (City.getAllCities()) {
      let cityArray: any = [];
      City.getCitiesOfState(
        stateSelected?.countryCode,
        stateSelected?.value
      ).map((data) => {
        console.log(data, "city");
        cityArray.push({ label: data.name });
      });
      setCityOption(cityArray);
    }
  }, [stateSelected]);
  return (
    <div className="App">
      <MainDiv>
        <RegistrationForm>Registration Form</RegistrationForm>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            country: "",
            state: "",
            city: "",
            phone: "",
            date: "",
            radio: "",
            singleCheckBox: false,
            referal: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            // same shape as initial values
            console.log(actions);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            isValidating,
            isValid,
            handleChange,
            setFieldValue,
          }) => {
            return (
              <>
                <GlobalStyle />
                <Form method="post">
                  <NormalDiv>
                    <InputLabel>1.Name*</InputLabel>
                    <InputDiv>
                      <FirstNameDiv>
                        <Input
                          // id="firstName"
                          placeholder="First name"
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                        />
                        <ErrorDiv>
                          <ErrorMessage component="span" name="firstName" />
                        </ErrorDiv>
                      </FirstNameDiv>

                      <SecondNameDiv>
                        <Input
                          placeholder="Second name"
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                        />
                        <ErrorDiv>
                          <ErrorMessage component="span" name="lastName" />
                        </ErrorDiv>
                      </SecondNameDiv>
                    </InputDiv>
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>2. E-mail*</InputLabel>
                    <IconDiv>
                      <FaEnvelope />
                      <Input
                        placeholder="Enter Email"
                        borderColor="none"
                        name="email"
                        onChange={handleChange}
                      />
                    </IconDiv>
                    <ErrorDiv>
                      <ErrorMessage component="span" name="email" />
                    </ErrorDiv>
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>3. Address*</InputLabel>
                    <IconDiv>
                      <FaAddressCard />
                      <SelectWrapper>
                        <CustomSelect
                          styles={customStyles}
                          name="country"
                          id="country"
                          options={countryOption}
                          value={countrySelected}
                          onChange={(item: any) => {
                            let event = {
                              target: { name: "country", value: item },
                            };
                            handleChange(event);
                            // let event = {target: {name: "country", value: item}}
                            console.log(event);
                            // handleChange(event.target.value.value)
                            // values.country = countrySelected
                            setCountrySelected(item);
                            console.log(item, "item.label");
                          }}
                        />
                      </SelectWrapper>
                    </IconDiv>
                    <ErrorDiv>
                      <ErrorMessage component="span" name="country" />
                    </ErrorDiv>
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>4. State*</InputLabel>
                    <IconDiv>
                      <FaAddressCard />
                      <SelectWrapper>
                        <CustomSelect
                          styles={customStyles}
                          name="state"
                          id="state"
                          options={stateOption}
                          value={stateSelected}
                          onChange={(item: any) => {
                            let event = {
                              target: { name: "state", value: item },
                            };
                            handleChange(event);
                            setStateSelected(item);
                          }}
                        />
                      </SelectWrapper>
                    </IconDiv>
                    <ErrorDiv>
                      <ErrorMessage component="span" name="state" />
                    </ErrorDiv>
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>5. City*</InputLabel>
                    <IconDiv>
                      <FaAddressCard />
                      <SelectWrapper>
                        <CustomSelect
                          styles={customStyles}
                          name="city"
                          id="city"
                          options={cityOption}
                          value={citySelected}
                          onChange={(item: any) => {
                            let event = {
                              target: { name: "city", value: item },
                            };
                            handleChange(event);
                            setCitySelected(item);
                          }}
                        />
                      </SelectWrapper>
                    </IconDiv>
                    <ErrorDiv>
                      <ErrorMessage component="span" name="city" />
                    </ErrorDiv>
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>6. Phone*</InputLabel>
                    <InputDiv>
                      <Input
                        placeholder="Enter Phone"
                        name="phone"
                        onChange={handleChange}
                      />
                    </InputDiv>
                    <ErrorDiv>
                      <ErrorMessage component="span" name="city" />
                    </ErrorDiv>
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>7. Date*</InputLabel>
                    <InputDiv>
                      <Input
                        placeholder="Enter Date"
                        type="date"
                        name="date"
                        onChange={handleChange}
                      />
                      {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                      {/* <DateSingleInput
              onDateChange={(e) => {
                console.log("date");
              }}
              showDatepicker={true}
              date={null}
              onFocusChange={() => {console.log("date")}}
              // onFocusChange={function (focusInput: boolean): void {
              //   throw new Error("Function not implemented.");
              // }}
            /> */}
                    </InputDiv>
                    <ErrorDiv>
                      <ErrorMessage component="span" name="date" />
                    </ErrorDiv>
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>8.Where did you hear about us*</InputLabel>
                    <div role="group" aria-labelledby="checkbox-group">
                      <RadioButton
                        label="A Friend or Colleague"
                        type="checkbox"
                        handleChange={handleChange}
                        selectedRadio={selectedRadio}
                        setSelectedRadio={setSelectedRadio}
                      />
                      <RadioButton
                        setSelectedRadio={setSelectedRadio}
                        selectedRadio={selectedRadio}
                        label="Google"
                        type="checkbox"
                        handleChange={handleChange}
                      />
                      <RadioButton
                        setSelectedRadio={setSelectedRadio}
                        selectedRadio={selectedRadio}
                        label="News Article"
                        type="checkbox"
                        handleChange={handleChange}
                      />
                      <RadioButton
                        setSelectedRadio={setSelectedRadio}
                        selectedRadio={selectedRadio}
                        label="Blog Post"
                        type="checkbox"
                        handleChange={handleChange}
                      />
                      <RadioButton
                        setSelectedRadio={setSelectedRadio}
                        selectedRadio={selectedRadio}
                        label="Others"
                        type="checkbox"
                        handleChange={handleChange}
                      />
                    </div>
                    {selectedRadio == "Others" && (
                      <InputDiv>
                        <Input />
                      </InputDiv>
                    )}
                    {!selectedRadio && (
                      <ErrorDiv>
                        <ErrorMessage component="span" name="radio" />
                      </ErrorDiv>
                    )}
                  </NormalDiv>

                  <NormalDiv>
                    <CheckBox
                      handleChange={handleChange}
                      values={values}
                      label="I have read,understood and accepted the PRIVACY POLICY for the membership. Terms and Conditions"
                    />
                  </NormalDiv>

                  <NormalDiv>
                    <ReferralSelect
                      name="referal"
                      setFieldValue={setFieldValue}
                    />
                    {errors.referal && touched.referal && (
                      <ErrorDiv>
                        <ErrorMessage component="span" name="referal" />
                      </ErrorDiv>
                    )}
                  </NormalDiv>

                  <NormalDiv>
                    <SubmitButton type="submit">Submit</SubmitButton>
                  </NormalDiv>
                </Form>
              </>
            );
          }}
        </Formik>
      </MainDiv>
    </div>
  );
};

export default App;
