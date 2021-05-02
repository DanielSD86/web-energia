import React from "react";

import { FormControl, Select, InputLabel } from "@material-ui/core";

export default function InputDropDowList({ label, value, onChangeValue, defaultValue, children, ...rest}) {

    return (
        <FormControl variant="outlined" size="small">
            <InputLabel id="demo-simple-outlined-label">{label}</InputLabel>
            <Select
                {...rest}
                defaultValue={defaultValue}
                labelId="demo-simple-outlined-label"
                value={value}
                onChange={onChangeValue}>
                {children}
            </Select>
        </FormControl>
    )
}
