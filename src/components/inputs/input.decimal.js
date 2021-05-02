import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

function NumberFormatCustom(props) {
    const { inputRef, onChange, symbol, decimal, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        decimalScale={decimal}
        isNumericString
        fixedDecimalScale
        thousandSeparator=','
        prefix={(symbol?symbol + " ":"")}
      />
    );
  }

export default function InputDecimal({ label, value, symbol, decimal, onChangeValue, ...rest }) {
    return (
        <TextField
            label={label}
            fullWidth
            size="small"
            variant="outlined"
            value={value}
            onChange={onChangeValue}
            InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: {
                  symbol: symbol,
                  decimal: decimal
                }
            }}
            {...rest}
        />
    )
}