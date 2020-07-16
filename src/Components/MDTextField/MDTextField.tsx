import React, { useRef } from "react";
import { TextField } from "@material-ui/core";
import {
  Controller,
  ValidationOption,
  Validate,
  ValidationValueMessage,
} from "react-hook-form";

interface PropTypes {
  name: string;
  label: string;
  value: any;
  error: any;
  rules?:
    | Partial<{
        required:
          | string
          | boolean
          | React.ReactElement<
              any,
              | string
              | ((
                  props: any
                ) => React.ReactElement<
                  any,
                  | string
                  | any
                  | (new (props: any) => React.Component<any, any, any>)
                > | null)
              | (new (props: any) => React.Component<any, any, any>)
            >
          | ValidationValueMessage<boolean>;
        min: ValidationOption<React.ReactText>;
        max: ValidationOption<React.ReactText>;
        maxLength: ValidationOption<React.ReactText>;
        minLength: ValidationOption<React.ReactText>;
        pattern: ValidationOption<RegExp>;
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
        as={
          <TextField
            label={props.label}
            margin="normal"
            inputRef={inputRef}
            variant="outlined"
            value={props.value}
            fullWidth
            error={props.error ? true : false}
          />
        }
        name={props.name}
        control={props.control}
        onFocus={() => {
          inputRef.current?.focus();
        }}
        onChange={([event]) => {
          props.onChangeSetValue(event.target.value);
          return event.target.value;
        }}
        error={props.error ? true : false}
        defaultValue={props.value}
        rules={props.rules}
      />
      {props.error && <span>{props.error.message}</span>}
    </>
  );
};

export default MDTextField;
