import React, { useState, useEffect } from 'react';

import InputField from './InputField';

function SignIn ({setDataForm}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setDataForm({
            'username': username,
            'password': password
        })
    }, [username, password]);

    return (
        <div>
            <InputField field="Nom d'utilisateur" isPassWord={false} setData={setUsername}/>
            <InputField field="Mot de passe" isPassWord={true} setData={setPassword}/>
        </div>
    );
}

function SignUp ({setDataForm}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setDataForm({
            'username': username,
            'password': password,
            'confirPassword': confirmPassword
        })
    }, [username, password, confirmPassword]);

    return (
        <div>
            <InputField field="Nom d'utilisateur" isPassWord={false} setData={setUsername}/>
            <InputField field="Mot de passe" isPassWord={true} setData={setPassword}/>
            <InputField field="Veuillez répeter votre mot de passe" isPassWord={true} setData={setConfirmPassword}/>
        </div>
    );
}

export { SignUp, SignIn };