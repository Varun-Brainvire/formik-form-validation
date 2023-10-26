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
} from "./components/styles/Form.styled";
import { GlobalStyle } from "./components/styles/Global.styled";
import RadioButton from "./components/RadioButton";
import CheckBox from "./components/CheckBox";
import { FaEnvelope, FaAddressCard } from "react-icons/fa";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const App: React.FC = () => {
  const [countryOption, setCountryOption] = useState();
  const [stateOption, setStateOption] = useState();
  const [cityOption, setCityOption] = useState();
  const [countrySelected, setCountrySelected] = useState<any>("");
  const [stateSelected, setStateSelected] = useState<any>();
  const [citySelected, setCitySelected] = useState();

  const [selectedRadio, setSelectedRadio] = useState("");
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
    singleCheckBox: Yup.boolean().required("Please Check The Check Box")
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
            singleCheckBox:false
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
                      </FirstNameDiv>
                      {/* {errors.firstName && touched.firstName && (
                        <span>{JSON.stringify(errors.firstName)}</span>
                      )} */}
                      <ErrorMessage component="div" name="firstName" />
                      <SecondNameDiv>
                        <Input
                          placeholder="Second name"
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                        />
                      </SecondNameDiv>
                      <ErrorMessage
                        component="div"
                        name="lastName"
                        // className="invalid-feedback"
                      />
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
                    <ErrorMessage
                      component="div"
                      name="email"
                      // className="invalid-feedback"
                    />
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>3. Address*</InputLabel>
                    <IconDiv>
                      <FaAddressCard />
                      <SelectWrapper>
                        <CustomSelect
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
                    <ErrorMessage
                      component="div"
                      name="country"
                      // className="invalid-feedback"
                    />
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>4. State*</InputLabel>
                    <IconDiv>
                      <FaAddressCard />
                      <SelectWrapper>
                        <CustomSelect
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
                    <ErrorMessage
                      component="div"
                      name="state"
                      // className="invalid-feedback"
                    />
                  </NormalDiv>

                  <NormalDiv>
                    <InputLabel>5. City*</InputLabel>
                    <IconDiv>
                      <FaAddressCard />
                      <SelectWrapper>
                        <CustomSelect
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
                    <ErrorMessage
                      component="div"
                      name="city"
                      // className="invalid-feedback"
                    />
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
                    <ErrorMessage
                      component="div"
                      name="phone"
                      // className="invalid-feedback"
                    />
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
                    <ErrorMessage
                      component="div"
                      name="date"
                      // className="invalid-feedback"
                    />
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
                  </NormalDiv>

                  <NormalDiv>
                    <CheckBox
                      handleChange={handleChange}
                      values={values}
                      label="I have read,understood and accepted the PRIVACY POLICY for the membership. Terms and Conditions"
                    />
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
