import React from "react";

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Grade } from "../../components";

export default function Solucao({ data, openModal, onCloseModal }) {
    const handleCloseModal = () => {
        onCloseModal();
    }

    const metaDataSolucao = [
        { label: "ID", field: "id" },
        { label: "Nome", field: "nome" },
        { label: "Potência", field: "potencia", format: "float", decimal: 0, align: "right" },
        { label: "Qtd Modulos", field: "quantidade", align: "right" },
    ];
    
    return (
        <Dialog
            fullWidth
            maxWidth={"md"}
            open={openModal}
            onClose={handleCloseModal}>
            <DialogTitle>{"Solução Projeto - Inversores"}</DialogTitle>
            <DialogContent>
                <Grade 
                     disablepagination 
                     dataSource={data} 
                     metaData={metaDataSolucao}
                />
            </DialogContent>
        </Dialog>
    );
}