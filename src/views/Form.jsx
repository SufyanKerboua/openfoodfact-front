import React, { useState } from 'react';

import axios from 'axios';

import { SignUp, SignIn } from '../components/Sign';
import CircularLoader from '../components/CircularLoader';

import { apiConfig } from '../config/apiConfig';

import '../styles/Form.css'

function Form ({setToken}) {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [dataForm, setDataForm] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const switchSignView = () => {
        isSigningUp ? setIsSigningUp(false) : setIsSigningUp(true);
    }

    const checkUserData = ({username, password, confirPassword = undefined}) => {
        if (confirPassword === undefined && (username === '' || password === '')) {
            return undefined;
        } else if (confirPassword === '' || username === '' || password === '') {
            return undefined;
        }
        return { username, password };
    }

    const connectUser = () => {
        // setIsSpinning(true);
        const dataUser = checkUserData(dataForm);
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}:${apiConfig.port}/user`;
        if (dataUser !== undefined && dataForm.confirPassword === undefined) {
            axios.get(url, { params: {...dataUser} })
            .then(res => {
              setIsSpinning(false);
              setToken(res.data.token);
            }).catch(err => {
              setIsSpinning(false);
              alert('Invalid Login or Password');
            })
        } else if (dataUser !== undefined) {
            axios.post(url, dataUser)
            .then(res => {
              setIsSpinning(false);
              setToken(res.data.token);
            }).catch(err => {
              setIsSpinning(false);
              alert('Invalid Login or Password');
            })
        }
    }

    return (
        <div id='form'>
            <div className='card'>
                <div className='card-header'>
                    <h2>CRUD OpenFoodFact App</h2>
                    <h3>{ isSigningUp ? 'Inscription' : 'Connexion' }</h3>
                </div>
                <div className='card-container'>
                    <div className='card-fiels-container'>
                        { isSigningUp ? <SignUp setDataForm={setDataForm} /> : <SignIn setDataForm={setDataForm} /> }
                    </div>
                    <div className='card-access-section'>
                        <button className='login-btn' onClick={() => connectUser()}>
                            {isSigningUp ? 'S\'inscrire' : 'Se connecter'}
                        </button>
                        <CircularLoader isSpinning={isSpinning} />
                        <div>
                            <span>
                                {isSigningUp ? 'Déja membre ? ' : 'Pas encore membre ? '}
                            </span>
                            <span className='switch-sign-view' onClick={()=> switchSignView()} >
                                {isSigningUp ? 'Connectez' : 'Inscrivez'}-vous !
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;