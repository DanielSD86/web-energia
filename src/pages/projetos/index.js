import React, { useState, useEffect } from "react";

import ApiService from "./ApiService";

import { Grade, PageControl, TabSheet, MsgError, GradeOpcoes, InputText, InputDate, } from "../../components";

import { Backdrop, CircularProgress, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import formatUtils from "../../services/formatUtils";
import CalcularProjetos from "./CalcularProjeto";
import Solucao from "./Solucao";

const useStyles = makeStyles((theme) => ({
    buttonSearch: {
        margin: theme.spacing(1, 1, 0, 0),
        float: "right"
    },
    textSearch: {
        margin: theme.spacing(0),
    },
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const initialFilter = {
    modulo_id: 0,
    potencia_less_equal: 0,
    potencia_more_equal: 0,
    dh_create_less_equal: new Date(),
    dh_create_more_equal: new Date(),
}

const opcoesTipo = [
    {   
        tipo: "detail",
        label: "Detalhes",
    }
];

export default function Projetos(props) {
    //Controle de state
    const [ tabIndex, setTabIndex ] = useState(0);
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ rowsCount, setRowsCount] = useState(0);    
    const [ condition, setCondition] = useState({ 
        rowsPage: 5, 
        currentPage: 0, 
        filter: initialFilter,
        orderBy: "dh_create-desc"
    });
    const [ filter, setFilter] = useState(initialFilter);
    const [ error, setError ] = useState({
        active: false,
        msg: null,
    });
    const [dataSolucao, setDataSolucao] = useState([]);
    const [openSolucao, setOpenSolucao] = useState(false);

    //Outras contasntes
    const classes = useStyles();
    const metaData = [
        {label: "Opções", 
            render: (record) => {
                return (<span>
                            <GradeOpcoes 
                                record={record} 
                                onClickOpcoes={handleClickOpcoes} 
                                opcoes={opcoesTipo}
                            />
                        </span>)
            }
        },
        { label: "Projeto", field: "id_projeto" },
        { label: "Modulo ID", field: "modulo_id" },
        { label: "Potência", field: "potencia", align: "right" },
        { label: "Dh.Registro", field: "dh_create", format: "datetime", minWidth: 160 },
        { label: "Inversor ID", render: (record) => { return renderInversor(record, "inversor_id"); } },
        { label: "Nome Inversor", render: (record) => { return renderInversor(record, "inversor_nome"); } },
        { label: "Potência Inversor", render: (record) => { return renderInversor(record, "inversor_potencia"); } },
        { label: "Qtd.Inversor", render: (record) => { return renderInversor(record, "quantidade_inversor"); } },
        { label: "Qtd.Môdulos p/Inversor", render: (record) => { return renderInversor(record, "quantidade_modulo_por_inversor"); } },
    ];

    const renderInversor = (record, field) => {
        const renderInversores = record.inversores.map((inversor) => {
            let value = inversor[field];

            if (field === "inversor_potencia") {
               value = formatUtils.formatValor(value, 1); 
            }

            return <div> {value} </div>
        });
        return <div>{renderInversores}</div>;
    }

    useEffect(() => {
        onLoadData();
    }, [condition]);

    const onLoadData = async () => {
        setLoading(true);

        const where = {};

        if (condition.filter) {
            if ((condition.filter.modulo_id) && (condition.filter.modulo_id > 0)) {
                where.modulo_id = condition.filter.modulo_id;
            }

            if ((condition.filter.potencia_less_equal) && (condition.filter.potencia_less_equal > 0)) {
                where.potencia_less_equal = condition.filter.potencia_less_equal;
            }

            if ((condition.filter.potencia_more_equal) && (condition.filter.potencia_more_equal > 0)) {
                where.potencia_more_equal = condition.filter.potencia_more_equal;
            }

            if (condition.filter.dh_create_more_equal && condition.filter.dh_create_more_equal !== null) {
                where.dh_create_more_equal = formatUtils.formatDateAnsi(condition.filter.dh_create_more_equal) + ' 00:00:00';
            }

            if (condition.filter.dh_create_less_equal && condition.filter.dh_create_less_equal !== null) {
                where.dh_create_less_equal = formatUtils.formatDateAnsi(condition.filter.dh_create_less_equal) + ' 23:59:59';
            }
        }        

        try {
            const response = await ApiService.GetAll(
                condition.currentPage + 1, 
                where,
                condition.rowsPage, 
                condition.orderBy
            );

            if (!response.status) {
                setError({ active: true, msg: response.message});
                return;
            }

            setData(response.data.rows);
            setRowsCount(response.data.infoRows.count);
        } finally {
            setLoading(false);
        }
    }
    
    const handleClickOpcoes = async (record, tipo) => {
        switch (tipo) {
            case "detail":
                onSetShowSolucao(await getSolucaoProjeto(record));
                break;
            default:
                break;
        }
    }

    const getSolucaoProjeto = async (solucao) => {
        const dataSolucao = [];

        for (const inversor of solucao.inversores) {
            for (let i = 1; i <= inversor.quantidade_inversor; i++) {
                dataSolucao.push({
                    id: inversor.inversor_id,
                    nome: inversor.inversor_nome,
                    potencia: inversor.inversor_potencia,
                    quantidade: inversor.quantidade_modulo_por_inversor,
                });
            }            
        }

        return dataSolucao;
    }

    const onSetShowSolucao = async (solucao) => {
        console.log(solucao);

        setDataSolucao(solucao);
        setOpenSolucao(true);
    } 

    return (
        <>
            <PageControl tabindex={tabIndex} onchangetab={(index) => setTabIndex(index)}>
                <TabSheet label="Projetos">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={2}>
                            <InputText
                                label="Potência Inicial"
                                type="number"
                                value={filter.potencia_more_equal}
                                onChangeValue={(e) => setFilter({ ...filter, potencia_more_equal: e.target.value, }) }
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <InputText
                                label="Potência Final"
                                type="number"
                                value={filter.potencia_less_equal}
                                onChangeValue={(e) => setFilter({ ...filter, potencia_less_equal: e.target.value, }) }
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <InputDate
                                label="Data inicial"
                                value={filter.dh_create_more_equal}
                                onChangeValue={(date) => setFilter({ ...filter, dh_create_more_equal: date, }) }
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <InputDate
                                label="Data final"
                                value={filter.dh_create_less_equal}
                                onChangeValue={(date) => setFilter({ ...filter, dh_create_less_equal: date, }) }
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <InputText
                                label="Modulo ID"
                                type="number"
                                value={filter.modulo_id}
                                onChangeValue={(e) => setFilter({ ...filter, modulo_id: e.target.value, }) }
                            />
                        </Grid>                    
                        <Grid item xs={12} sm={2}>
                            <Button 
                                variant="contained"
                                className={classes.buttonSearch}
                                size="small"
                                type="primary"
                                onClick={() => setCondition({ ...condition, filter, currentPage: 0})}>Pesquisar
                            </Button>
                        </Grid>
                    </Grid>
                    <Grade 
                        dataSource={data} 
                        metaData={metaData}
                        rowCount={rowsCount}
                        rowPage={condition.rowsPage}
                        currentPage={condition.currentPage}
                        onChangePage={(e, page) => setCondition({ ...condition, currentPage: page})}
                        onChangeRowPage={(e) => setCondition({ ...condition, rowsPage: e.target.value})}/>
                </TabSheet>
                <TabSheet label={"Calcular"}>
                    <CalcularProjetos 
                        onError={(messages) => setError({ active: true, msg: messages})} 
                        onSolucao={(solucao) => onSetShowSolucao(solucao)}
                        onLoading={(carregando) => setLoading(carregando)}/>
                </TabSheet>
            </PageControl>
            <Solucao
                data={dataSolucao}
                openModal={openSolucao}
                onCloseModal={() => setOpenSolucao(false)}
            />
            <MsgError error={error.active} errorMsg={error.msg} onclose={() => setError({ active: false, msg: null})}/>
            <Backdrop className={classes.loading} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}