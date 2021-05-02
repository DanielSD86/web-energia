import React from "react";

import { Link } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper,
    },
    nested1: {
        paddingLeft: theme.spacing(4),
    },
    nested2: {
        paddingLeft: theme.spacing(6),
    },
    nested3: {
        paddingLeft: theme.spacing(8),
    },
}));

export default function MenuApp({ menus, menusOpened, onOpenMenu }) {
    const classes = useStyles();

    const renderSubMenu = (menu, nivel) => {
        let className = undefined;

        switch (nivel) {
            case 1: 
                className = classes.nested1;
                break;
            case 2: 
                className = classes.nested2;
                break;
            case 3: 
                className = classes.nested3;
                break;
            default: 
                className = "";
                break;
        }

        return (
            <>
                <ListItem 
                    button 
                    onClick={() => onOpenMenu(menu, false)} 
                    className={className}>
                    <ListItemText>
                        {menu.nome}
                    </ListItemText>
                    {menusOpened["m" + menu.id_menu] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={menusOpened["m" + menu.id_menu]} timeout="auto" unmountOnExit>
                    <List component="div">
                        {menus.map((submenu) => {
                            if (submenu.id_menu_pai === menu.id_menu) { 
                                if (submenu.acesso_site !== null)
                                    return renderMenuItem(submenu, nivel + 1)
                                else 
                                    return renderSubMenu(submenu, nivel + 1)
                            }

                            return "";
                        })}
                    </List>
                </Collapse>
            </>
        )
    }

    const renderMenuItem = (menu, nivel) => {
        let className = undefined;

        switch (nivel) {
            case 1: 
                className = classes.nested1;
                break;
            case 2: 
                className = classes.nested2;
                break;
            case 3: 
                className = classes.nested3;
                break;
            default:
                className = undefined;
        }

        return (
            <ListItem button className={className}>
                <ListItemText>
                    <Link to={menu.acesso_site} onClick={() => onOpenMenu(menu, true)}>{menu.nome}</Link>
                </ListItemText>
            </ListItem>
        )
    }

    const renderMenus = () => {
        return (
            menus.map((menu) => {
                if (menu.id_menu_pai === null) { 
                    if (menu.acesso_site !== null)
                        return renderMenuItem(menu, 0);
                    else 
                        return renderSubMenu(menu, 0);
                }
        
                return "";
            })    
        )
    }

    return (
        <List component="nav"
            className={classes.root}
            aria-labelledby="nested-list-subheader">
            <ListItem button>
                <ListItemText>
                    <Link to={"/"}>Home</Link>
                </ListItemText>                    
            </ListItem>
            {renderMenus()}
        </List>
    )
}