import React, { useState } from "react";

import { getInicioMes, getFinalMes, getDecMes, getIncMes } from "../../services/date.services";

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { MenuItem, Menu, Divider } from "@material-ui/core";

const initialState = {
    mouseX: null,
    mouseY: null,
  };

export default function InputDate({ label, value, onChangeValue, ...rest }) {
    const [state, setState] = useState(initialState);

    const handleClick = event => {
        event.preventDefault();
        setState({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setState(initialState);
    };

    const handleDate = (opcao) => {
        const data = new Date();

        switch (opcao) {
            case 0:
                onChangeValue(data);
                break;
            case 1:
                data.setDate(data.getDate() - 1);
                onChangeValue(data);
                break;
            case 10:
                onChangeValue(getInicioMes(getDecMes(data)));
                break;
            case 11:
                onChangeValue(getFinalMes(getDecMes(data)));
                break;
            case 20:
                onChangeValue(getInicioMes(data));
                break;
            case 21:
                onChangeValue(getFinalMes(data));
                break;
            case 30:
                onChangeValue(getInicioMes(getIncMes(data)));
                break;
            case 31:
                onChangeValue(getFinalMes(getIncMes(data)));
                break;
            case 40:
                onChangeValue(new Date(data.getFullYear(), 0, 1));
                break;
            case 41:
                onChangeValue(new Date(data.getFullYear(), 11, 31));
                break;
            case 99:
                onChangeValue(null);
                break;
            default: break;
        }

        setState(initialState);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                onContextMenu={handleClick} style={{ cursor: 'context-menu' }}
                label={label}
                inputVariant="outlined"
                size="small"
                format="dd/MM/yyyy"
                value={value}
                onChange={onChangeValue}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                {...rest}
            />
            <Menu
                keepMounted
                open={state.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                state.mouseY !== null && state.mouseX !== null ? { top: state.mouseY, left: state.mouseX }: undefined
                }
            >
                <MenuItem onClick={() => handleDate(0)}>Hoje</MenuItem>
                <MenuItem onClick={() => handleDate(1)}>Ontem</MenuItem>
                <Divider />
                <MenuItem onClick={() => handleDate(10)}>Inicio do mês anterior</MenuItem>
                <MenuItem onClick={() => handleDate(11)}>Final do mês anterior</MenuItem>
                <Divider />
                <MenuItem onClick={() => handleDate(20)}>Inicio do mês</MenuItem>
                <MenuItem onClick={() => handleDate(21)}>Final do mês</MenuItem>
                <Divider />
                <MenuItem onClick={() => handleDate(30)}>Inicio do próximo mês</MenuItem>
                <MenuItem onClick={() => handleDate(31)}>Final do próximo mês</MenuItem>
                <Divider />
                <MenuItem onClick={() => handleDate(40)}>Início do ano</MenuItem>
                <MenuItem onClick={() => handleDate(41)}>Final do ano</MenuItem>
                <Divider />
                <MenuItem onClick={() => handleDate(99)}>Limpar</MenuItem>
            </Menu>
        </MuiPickersUtilsProvider>
    )
}
