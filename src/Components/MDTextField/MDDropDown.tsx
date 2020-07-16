import React, { useRef } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { Controller } from "react-hook-form";

interface Item {
  code: string;
  value: string;
}

interface PropTypes {
  name: string;
  label: string;
  value: any;
  error: any;
  control: any;
  onChangeSetValue: (value: any) => void;
  defaultItem?: string;
  items: Item[];
}

const MDDropDown: React.FC<PropTypes> = (props: PropTypes) => {
  let inputRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Controller
        as={
          <TextField
            select
            label={props.label}
            margin="normal"
            inputRef={inputRef}
            variant="outlined"
            value={props.value}
            fullWidth
            error={props.error ? true : false}
          >
            {props.defaultItem && (
              <MenuItem value="-1">{props.defaultItem}</MenuItem>
            )}
            {props.items.map((item) => (
              <MenuItem value={item.code}>{item.value}</MenuItem>
            ))}
          </TextField>
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
        rules={{
          validate: (value) => {
            return value !== "-1" ? true : "Please select an item";
          },
        }}
      />
      {props.error && <span>{props.error.message}</span>}
    </>
  );
};

export default MDDropDown;
