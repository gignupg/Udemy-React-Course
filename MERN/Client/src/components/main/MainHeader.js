import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { drawerWidth } from '../../values/defaults';
import { Button } from '@material-ui/core';
import authContext from '../../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

const MainHeader = ({ mobileOpen, setMobileOpen }) => {

    const { user, setToken, setUser } = useContext(authContext)

    const classes = useStyles();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutHandler = () => {
        setToken("")
        setUser(null)
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography style={{ flexGrow: 1 }} variant="body1" noWrap>
                    Hi <span style={{ fontWeight: "bold" }}>{user.name}</span>
                </Typography>
                <Button onClick={logoutHandler} style={{ color: "white"}}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default MainHeader;