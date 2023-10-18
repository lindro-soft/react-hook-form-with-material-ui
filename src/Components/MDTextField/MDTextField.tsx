import TextField from "@mui/material/TextField";
import React, { useEffect, useRef } from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface PropTypes {
  name: string;
  label: string;
  value: any;
  error: any;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  control: any;
  onChangeSetValue: (value: any) => void;
}

const MDTextField: React.FC<PropTypes> = (props: PropTypes) => {
  let inputRef = useRef<HTMLDivElement>(document.createElement("div"));
  useEffect(() => {
    if (props.error) {
      inputRef.current.focus();
    }
  });
  return (
    <>
      <Controller
        control={props.control}
        render={({ field: { onChange } }) => (
          <TextField
            label={props.label}
            margin="normal"
            size="small"
            inputRef={inputRef}
            variant="outlined"
            onFocus={() => {
              inputRef.current?.focus();
            }}
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
      />
    </>
  );
};

export default MDTextField;
