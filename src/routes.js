import React from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Main } from "./components";
import Projetos from "./pages/projetos";

const useStyles = makeStyles((theme) => ({
    content: {
        heigth: "100px"
    }
}));

export default function Router() {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <Switch>                
                <Main className={classes.content}>
                    <Route exact path="/projetos" component={Projetos} />
                </Main>
            </Switch>
        </BrowserRouter>
    )
}
