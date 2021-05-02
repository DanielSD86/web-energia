import React, { useState, useEffect } from "react";

import MenuApp from "./menu";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { IconButton, AppBar, Toolbar, Typography, Drawer, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const sistema_versao = "Energia v21.5.2.1";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawer: {
        width: "250px",
        flexShrink: 0,
    },
    drawerHeader: {
        width: "250px",
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: "100%"
    },
}));

export default function Main(props) {
    const [ empresa, setEmpresa ] = useState("");
    const [ openMenu, setOpenMenu ] = useState(false);
    const [ menus, setMenus ] = useState([]);
    const [ menuOpened, setMenuOpened ] = useState({});

    const classes = useStyles();

    const loadData = async () => {
        setMenus([
            { 
                id_menu: 1,
                id_menu_pai: null,
                acesso_site: "/projetos",
                nome: "Projetos"
            }
        ]);
        setEmpresa("Energia");
    }

    useEffect(() => {
        loadData();
    }, []);

    const onOpenMenu = (menu, menu_page) => {
        if (!menu_page)
            setMenuOpened({ ...menuOpened, ["m" + menu.id_menu]: !menuOpened["m" + menu.id_menu] });
        else 
            setOpenMenu(false);
    }

    const onCloseMenu = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        
        setOpenMenu(false);
    }

    return (
        <div id="main" className={classes.root}>
            <AppBar position="fixed" 
                className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpenMenu(true)}
                        edge="start"
                        className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        {empresa}
                    </Typography>                      
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={openMenu}
                onClose={onCloseMenu}>
                <div className={classes.drawerHeader}>
                    <Typography variant="h8">
                        {sistema_versao}
                    </Typography>
                    <IconButton onClick={() => setOpenMenu(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <MenuApp 
                    menus={menus}
                    menusOpened={menuOpened}
                    onOpenMenu={onOpenMenu}/>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                {props.children}    
            </main>           
        </div>
    )
}