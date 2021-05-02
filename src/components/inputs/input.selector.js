import React from "react";

import { FormControlLabel, Switch } from '@material-ui/core';

export default function InputSelector({ label, value, onChangeValue, ...rest }) {

    return (
        <FormControlLabel size="small"
            control={<Switch
                        checked={value}
                        onChange={onChangeValue}
                        color="primary"
                        {...rest}
                    />}
            label={label}
        />
    )
}