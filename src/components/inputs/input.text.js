import React from "react";

import { TextField } from "@material-ui/core";

export default function InputText({ label, value, onChangeValue, ...rest }) {

    return (
        <TextField
            label={label} 
            fullWidth
            size="small"
            variant="outlined"
            value={value}
            onChange={onChangeValue}
            {...rest}
        />
    )
}
