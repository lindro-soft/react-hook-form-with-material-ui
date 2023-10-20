import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

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
  return (
    <>
      <Controller
        control={props.control}
        render={({ field: { onChange, ref } }) => (
          <TextField
            label={props.label}
            select
            margin="normal"
            inputRef={ref}
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
      />
    </>
  );
};

export default MDDropDown;
