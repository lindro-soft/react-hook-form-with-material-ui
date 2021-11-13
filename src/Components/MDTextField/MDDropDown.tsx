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
        control={props.control}
        render={({ onChange }) => (
          <TextField
            label={props.label}
            select
            margin="normal"
            inputRef={inputRef}
            size="small"
            variant="outlined"
            fullWidth
            helperText={props.error && props.error.message}
            error={props.error ? true : false}
            onChange={(event) => {
              props.onChangeSetValue(event.target.value);
              onChange(event.target.value);
            }}
            value={props.value}
          >
            {" "}
            {props.defaultItem && (
              <MenuItem value="-1" key="-1">
                {props.defaultItem}
              </MenuItem>
            )}
            {props.items.map((item) => (
              <MenuItem value={item.code} key={item.code}>
                {item.value}
              </MenuItem>
            ))}
          </TextField>
        )}
        name={props.name}
        rules={{
          validate: (value) => {
            return value !== "-1" ? true : "Please select an item";
          },
        }}
        defaultValue={props.value}
        onFocus={() => {
          inputRef.current?.focus();
        }}
      />
    </>
  );
};

export default MDDropDown;
