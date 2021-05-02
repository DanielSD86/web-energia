import React, { useState, useEffect } from "react";

import { InputText, Grade } from "../../components";

import ApiService from "./ApiService";

import { Button, Checkbox, Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1, 1, 0, 0),
        float: "left"
    },
    buttonSelecao: {
        margin: theme.spacing(1, 1, 1, 0),
        float: "left"
    },
}));

const TIPO_PRODUTO_MODULO = "modulo";
const TIPO_PRODUTO_INVERSOR = "inversor";

export default function CalcularProjetos(props) {
    const [ data, setData ] = useState(ApiService.defaultValues);
    const [ produtos, setProdutos ] = useState([]);
    const classes = useStyles();

    const metaDataProdutos = [
        {label: "Utilizar", 
            render: (record) => {
                return (
                    <Checkbox
                        size="small"
                        checked={record.utilizar}
                        onChange={e => setUtilizarProduto(record.id, record.tipo, e.target.checked)}
                        color="primary"
                    />
                )}},
        { label: "ID", field: "id" },
        { label: "Nome", field: "nome" },
        { label: "Potência", field: "potencia", format: "float", decimal: 0, align: "right" },
        { label: "Tipo", field: "tipo" },
    ];

    useEffect(() => {
        loadProdutos();
    }, []);

    const loadProdutos = async () => {
        const response = await ApiService.getProdutos();
        if (!response.status) {
            onError(response.message);
            return;
        }

        const produtosLocal = response.data.rows.map((record) => {
            record.utilizar = false;
            return record;
        });

        setProdutos(produtosLocal);
    }

    const setUtilizarProduto = async(id, tipo, value) => {
        const produtosLocal = produtos.map((record) => {
            if ((record.id === id) && (record.tipo === tipo)) {
                record.utilizar = value;
                return record
            }
            return record;
        });

        setProdutos(produtosLocal);
    }

    const calcularProjeto = async() => {
        let validate = await ApiService.ValidateData(ApiService.projetosSchema, data);
        if (!validate.status) {
            onError(validate.message);
            return;
        }

        validate = validateProdutos();

        if (!validate.status) {
            onError(validate.message);
            return;
        }

        const dataApply = {
            produtos: validate.produtos,
            projeto: data,
        }

        const response = await ApiService.calcularProjeto(dataApply);
        
        if (!response.status) {
            onError(response.message);
            return;
        }

        //onClearRecord();
        props.onSolucao(response.data.solucao);
    }

    const validateProdutos = () => {
        let produtosUtilizar = produtos.filter((produto) => { return produto.utilizar });
        if (produtosUtilizar.length === 0) {
            return {
                status: false,
                message: "Nenhum produto marcado",
            }
        }

        let produtosCustom = produtosUtilizar.filter((produto) => { return produto.utilizar && produto.tipo === TIPO_PRODUTO_MODULO });
        if (produtosCustom.length === 0) {
            return {
                status: false,
                message: "Nenhum produto do tipo modulo foi marcado",
            }
        }

        produtosCustom = produtosUtilizar.filter((produto) => { return produto.utilizar && produto.tipo === TIPO_PRODUTO_INVERSOR });
        if (produtosCustom.length === 0) {
            return {
                status: false,
                message: "Nenhum produto do tipo inversor foi marcado",
            }
        }

        return {
            status: true,
            produtos: produtosUtilizar.map((produto) => {
                return {
                    id: produto.id,
                    nome: produto.nome,
                    potencia: produto.potencia,
                    tipo: produto.tipo,
                }
            })
        }
    }

    const onGravar = () => {
        calcularProjeto();
    }

    const onClearRecord = () => {
        setData(ApiService.defaultValues);
        onCheckProdutos(false);
    }

    const onError = (messages) => {
        props.onError(messages)
    }

    const onCheckProdutos = (utilizar) => {
        const produtosLocal = produtos.map((record) => {
            record.utilizar = utilizar;
            return record;
        });

        setProdutos(produtosLocal);
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={2}>
                    <InputText 
                        required
                        label="Potência (Watts)" 
                        value={data.potencia}
                        type="number"
                        onChangeValue={e => setData({ ...data, potencia: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <InputText 
                        required
                        label="Modulo ID" 
                        value={data.modulo_id}
                        type="number"
                        onChangeValue={e => setData({ ...data, modulo_id: e.target.value })}
                    />
                </Grid>
            </Grid>
            <div>
                <Grid item xs={12}>
                    <Button
                        size="small"
                        variant="contained"
                        className={classes.buttonSelecao}
                        color="secondary"
                        startIcon={<RadioButtonChecked />}
                        onClick={() => onCheckProdutos(true)}>Marcar todos
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        className={classes.buttonSelecao}
                        startIcon={<RadioButtonUnchecked />}
                        onClick={() => onCheckProdutos(false)}>Desmarcar todos
                    </Button>
                </Grid>
                <Grid container spacing={1}>
                    <Grade disablepagination 
                        dataSource={produtos} 
                        metaData={metaDataProdutos}
                    />
                </Grid>
            </div>
            <Grid item xs={12}>
                <Button
                    size="small"
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => onClearRecord()}>{props.id?"Cancelar":"Limpar tela"}
                </Button>
                <Button 
                    size="small"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => onGravar()}>Calcular Projeto
                </Button>
            </Grid>
        </>
    )
}