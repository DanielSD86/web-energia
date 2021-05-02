import React, { useState } from "react";

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function GradeOpcoes(props) {
    const [ anchorEl, setAnchorEl ] = useState(null);
    
    const opcoesOpen = Boolean(anchorEl);

    const handleClickOpcoes = (tipo) => {
        props.onClickOpcoes(props.record, tipo);
        setAnchorEl(false);
    }

    return (
        <>
            <IconButton
                size="small"
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}>
                <MoreVertIcon />
            </IconButton>
            <Menu 
                size="small"
                anchorEl={anchorEl}
                keepMounted
                open={opcoesOpen}
                onClose={() => setAnchorEl(null)}>
                {props.opcoes.map((opcao, index) => {
                    return (
                        <MenuItem key={index} onClick={() => handleClickOpcoes(opcao.tipo)}>
                            {opcao.label}
                        </MenuItem>        
                    )
                })}
            </Menu>
        </>
    )
}