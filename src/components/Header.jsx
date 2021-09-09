import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

import '../styles/Header.css'

const useStyles = makeStyles((theme) => ({
    profileIcon: {
      color: 'var(--theme-color)',
      fontSize: 50,
      "&:hover": {
          color: 'var(--theme-color-lighter)',
          cursor: 'pointer',
      }
    },
    exitIcon: {
        color: 'var(--theme-color)',
        fontSize: 50,
        "&:hover": {
            color: 'var(--theme-color-lighter)',
            cursor: 'pointer',
        }
      },
}));

function Header({setToken, setProfileView, profileView}) {
    const classes = useStyles();

    const disconnectUser = () => {
        setToken(null);
    }

    return (
        <div id='header'>
            <div className='h-container'>
                <h1>CRUD OpenFoodFact App</h1>

                <div className='h-settings'>
                    {
                        profileView?
                            <ExitToAppIcon className={classes.exitIcon} onClick={() => setProfileView(false)} />
                        :
                            <PersonIcon className={classes.profileIcon} onClick={() => setProfileView(true)} />
                    }
                    <button onClick={() => disconnectUser()}> Déconnexion </button>
                </div>
            </div>
        </div>
    )
}

export default Header;