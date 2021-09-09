import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'var(--white-color)',
    },
}));

function CircularLoader({ isSpinning, text='' }) {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={isSpinning}>
            <h3>{text}</h3>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default CircularLoader;