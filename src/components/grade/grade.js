import React from 'react';

import formatUtils from "../../services/formatUtils";

import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, TablePagination, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    tableContainer: {
        margin: theme.spacing(1, 0, 0, 0),        
    }
}));

export default function Grade(props) {
    const classes = useStyles();

    const renderHeader = () => {
        return (
            <TableRow key={0}>
                {props.metaData.map((title, i) => {
                    return (
                        <TableCell 
                            key={i} 
                            align={title.align?title.align:"left"}
                            style={{ minWidth: title.minWidth?title.minWidth:1 }}>
                            {title.label}
                        </TableCell>
                    )})}
            </TableRow>
        );
    }

    const renderContent = () => {
        return (
            <TableBody>
                {props.dataSource.map((record, i) => {
                    return (
                        <TableRow hover key={i}>
                            {props.metaData.map((title, j) => {
                                if (title.render) {
                                    return (
                                        <TableCell key={j} align={title.align?title.align:"left"}>
                                            {title.render(record)}
                                        </TableCell>
                                    )
                                }

                                if (title.format) {
                                    switch (title.format) {
                                        case "datetime": 
                                            return (
                                                <TableCell key={j} align={title.align?title.align:"left"}>
                                                    {formatUtils.formatDateTime(record[title.field])}
                                                </TableCell>
                                            )  
                                        case "date": 
                                            return (
                                                <TableCell key={j} align={title.align?title.align:"left"}>
                                                    {formatUtils.formatDate(record[title.field])}
                                                </TableCell>
                                            )
                                        case "time": 
                                            return (
                                                <TableCell key={j} align={title.align?title.align:"left"}>
                                                    {formatUtils.formatTime(record[title.field])}
                                                </TableCell>
                                            )
                                        case "float": 
                                            return (
                                                <TableCell key={j} align={"right"}>
                                                    {formatUtils.formatValor(record[title.field], title.decimal || 2)}
                                                </TableCell>
                                            )
                                        case "cnpjcpf": 
                                            return (
                                                <TableCell key={j} align={title.align?title.align:"left"}>
                                                    {formatUtils.formatCPF_CNPJ(record[title.field])}
                                                </TableCell>
                                            )
                                        default: 
                                            return (
                                                <TableCell key={j} align={title.align?title.align:"left"}>
                                                    {record[title.field]}
                                                </TableCell>
                                            )   
                                    }
                                }

                                return (
                                    <TableCell key={j} align={title.align?title.align:"left"}>
                                        {record[title.field]}
                                    </TableCell>
                                )                                
                            })}
                        </TableRow>
                    )})}
            </TableBody>
        );
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.tableContainer} aria-label="a dense table">
                <Table stickyHeader className={classes.table} aria-label="simple table" size="small">
                    <TableHead>
                        {renderHeader()}
                    </TableHead>
                    {renderContent()}
                </Table>                    
            </TableContainer>
            {props.disablepagination?"":
            <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={props.rowCount}
                    rowsPerPage={props.rowPage}
                    page={props.currentPage}
                    onChangePage={props.onChangePage}
                    onChangeRowsPerPage={props.onChangeRowPage}
                    labelRowsPerPage="Linhas por página"
                />}
        </Paper>
    )
}