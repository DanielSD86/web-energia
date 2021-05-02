import React from 'react';

import formatUtils from "../../services/formatUtils";

import { TablePagination, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import "./styles.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    }
}));

export default function Grade(props) {
    const classes = useStyles();

    const renderHeader = () => {
        return (
            <tr key={0}>
                {props.metaData.map((title, i) => {
                    return (
                        <th className="header-fixed"
                            key={i}                             
                            style={{ minWidth: title.minWidth?title.minWidth:1 }}>
                            {title.label}
                        </th>
                    )})}
            </tr>
        );
    }

    const renderContent = () => {
        return (
            <>
                {props.dataSource.map((record, i) => {
                    return (
                        <tr key={i}>
                            {props.metaData.map((title, j) => {
                                if (title.render) {
                                    return (
                                        <td key={j} align={title.align?title.align:"left"}>
                                            {title.render(record)}
                                        </td>
                                    )
                                }

                                if (title.format) {
                                    switch (title.format) {
                                        case "datetime": 
                                            return (
                                                <td key={j} align={title.align?title.align:"left"}>
                                                    {formatUtils.formatDateTime(record[title.field])}
                                                </td>
                                            )  
                                        case "date": 
                                            return (
                                                <td key={j} align={title.align?title.align:"left"}>
                                                    {formatUtils.formatDate(record[title.field])}
                                                </td>
                                            )
                                        case "time": 
                                            return (
                                                <td key={j} align={title.align?title.align:"left"}>
                                                    {formatUtils.formatTime(record[title.field])}
                                                </td>
                                            )
                                        case "float": 
                                            return (
                                                <td key={j} className="col-number">
                                                    {formatUtils.formatValor(record[title.field], title.decimal || 2)}
                                                </td>
                                            )
                                        case "cnpjcpf": 
                                            return (
                                                <td key={j} align={title.align?title.align:"left"}>
                                                    {formatUtils.formatCPF_CNPJ(record[title.field])}
                                                </td>
                                            )
                                        default: 
                                            return (
                                                <td key={j} align={title.align?title.align:"left"}>
                                                    {record[title.field]}
                                                </td>
                                            )   
                                    }
                                }

                                return (
                                    <td key={j} align={title.align?title.align:"left"}>
                                        {record[title.field]}
                                    </td>
                                )                                
                            })}
                        </tr>
                    )})}
            </>
        );
    }

    return (
        <Paper className={classes.root}>
            <div className="table-card">
                <table>
                    {renderHeader()}
                    {renderContent()}
                </table>                    
            </div>
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