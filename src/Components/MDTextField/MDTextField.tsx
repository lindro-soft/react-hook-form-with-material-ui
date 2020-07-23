import React, { useRef } from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import {
  ValidationRule,
  Validate,
  ValidationValueMessage,
} from "react-hook-form/dist/types/form";

interface PropTypes {
  name: string;
  label: string;
  value: any;
  error: any;
  rules?:
    | Partial<{
        required: string | boolean | ValidationValueMessage<boolean>;
        min: ValidationRule<React.ReactText>;
        max: ValidationRule<React.ReactText>;
        maxLength: ValidationRule<React.ReactText>;
        minLength: ValidationRule<React.ReactText>;
        pattern: ValidationRule<RegExp>;
        validate: Validate | Record<string, Validate>;
      }>
    | undefined;
  control: any;
  onChangeSetValue: (value: any) => void;
}

const MDTextField: React.FC<PropTypes> = (props: PropTypes) => {
  let inputRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Controller
        control={props.control}
        render={({ onChange }) => (
          <TextField
            label={props.label}
            margin="normal"
            inputRef={inputRef}
            variant="outlined"
            fullWidth
            helperText={props.error && props.error.message}
            error={props.error ? true : false}
            onChange={(event) => {
              props.onChangeSetValue(event.target.value);
              onChange(event.target.value);
            }}
            value={props.value}
          />
        )}
        name={props.name}
        rules={props.rules}
        defaultValue={props.value}
        onFocus={() => {
          inputRef.current?.focus();
        }}
      />
    </>
  );
};

export default MDTextField;
