import React from "react";

import { Dialog, DialogTitle, DialogContent, Card, CardContent, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: 250,
      maxWidth: 500,
    },
  });

export default function ModalDetailsQuery({ title, data, openModal, onCloseModal }) { 
    const classes = useStyles();

    const handleCloseModal = () => {
        onCloseModal();
    }
    
    return (
        <Dialog
            fullWidth
            maxWidth={"md"}
            open={openModal}
            onClose={handleCloseModal}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Card>
                    <CardContent>
                        {data.map((record, index) => {
                            return (
                                <>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {record.display}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {record.value ?? "<Sem dados para exibição>"}
                                    </Typography>
                                </>
                            )    
                        })}
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}