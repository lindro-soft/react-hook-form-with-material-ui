import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Toolbar, Typography, AppBar } from "@material-ui/core";
import MDTextField from "./Components/MDTextField/MDTextField";
import MDDropDown from "./Components/MDTextField/MDDropDown";
import Tabs from "./Components/Tabs/Tabs";

function FormTest() {
  const { handleSubmit, errors, control } = useForm();
  const onSubmit = (data: Record<string, any>) =>
    alert("SUBMIT\n" + JSON.stringify(object, null, 2));

  const [selectedValueInDropDown, setSelectedValueInDropDown] = useState("-1");
  const [emailAddress, setEmailAddress] = useState("");
  const [requiredText, setRequiredText] = useState("");
  const [shortName, setShortName] = useState("");
  const [numberValue, setNumberValue] = useState("");

  const object = {
    selectedTextCode: selectedValueInDropDown,
    email: emailAddress,
    number: numberValue,
    text: requiredText,
    shortName: shortName,
  };

  useEffect(() => {
    if (errors.emailInput !== undefined) {
      console.log("Email error");
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppBar
        position="static"
        style={{ borderRadius: "4px", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            react-hook-form + Material-UI
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <Tabs
        defaultTab={0}
        labels={["Dropdown + E-mail", "Text", "Number in Range"]}
      >
        <div>
          <MDDropDown
            name="dropDownInput"
            error={errors.dropDownInput}
            control={control}
            label="Text"
            onChangeSetValue={setSelectedValueInDropDown}
            value={selectedValueInDropDown}
            defaultItem="Please select a text"
            items={[
              { code: "1", value: "What's up doc?" },
              { code: "2", value: "I tawt i taw a puddy tat" },
            ]}
          />
          <MDTextField
            name="emailInput"
            error={errors.emailInput}
            label="E-Mail address"
            value={emailAddress}
            onChangeSetValue={setEmailAddress}
            rules={{
              required: { value: true, message: "This field is required" },
              validate: (value) => {
                const re =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(value).toLowerCase())
                  ? true
                  : "Please enter a valid e-mail address";
              },
            }}
            control={control}
          />
        </div>
        <div>
          <MDTextField
            name="requiredText"
            label="This text is required"
            value={requiredText}
            error={errors.requiredText}
            control={control}
            onChangeSetValue={setRequiredText}
            rules={{
              required: { message: "This field is required", value: true },
            }}
          />
          <MDTextField
            name="shortName"
            label="Short Name"
            value={shortName}
            error={errors.shortName}
            control={control}
            onChangeSetValue={setShortName}
            rules={{
              required: { message: "This field is required", value: true },
              maxLength: {
                value: 3,
                message: "Shortname should be maximum 3 charaters",
              },
              minLength: {
                value: 2,
                message: "Shortname should be minimum 2 characters",
              },
            }}
          />
        </div>
        <div>
          {" "}
          <MDTextField
            name="numberInput"
            error={errors.numberInput}
            label="Number in the range 1-10"
            value={numberValue}
            onChangeSetValue={setNumberValue}
            rules={{
              required: { message: "This field is required", value: true },
              min: {
                message: "The number should be minimum 1 and maximum 10",
                value: 1,
              },
              max: {
                message: "The number should be minimum 1 and maximum 10",
                value: 10,
              },
              pattern: { value: /[1-9]/, message: "Only numbers are allowed" },
            }}
            control={control}
          />
        </div>
      </Tabs>

      <br />
      <br />
      <pre>{JSON.stringify(object, null, 2)}</pre>
      <br />
      <br />

      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>
      <br />
    </form>
  );
}

export default FormTest;
