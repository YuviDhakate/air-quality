import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { APP } from '../../config/app.config';

const Header = () => {
    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <Typography variant='h6'>
                    {APP.TITLE}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;