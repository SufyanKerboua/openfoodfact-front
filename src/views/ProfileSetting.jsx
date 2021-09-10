import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';

import '../styles/ProfileSetting.css'

import { apiConfig } from '../config/apiConfig';

function ProfileSetting ({token, setToken, setProfileView}) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [desc, setDesc] = useState('');

    const updateUser = () => {
        axios.patch(`${apiConfig.protocol}://${apiConfig.baseUrl}:${apiConfig.port}/user`, { user }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
            console.log({'res /product :': res});
            setToken(res.data.token);
            setUser(res.data.user);
            setUsername(res.data.user.username);
            setDesc(res.data.user.desc);
        }).catch(err => {
            alert('Couldn\'t update user...');
        })
    }

    const deleteUser = () => {
        axios.delete(`${apiConfig.protocol}://${apiConfig.baseUrl}:${apiConfig.port}/user`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
            setToken(false);
        }).catch(err => {
            alert('Couldn\'t delete user...');
        })
    }

    const deleteProducts = () => {
        axios.delete(`${apiConfig.protocol}://${apiConfig.baseUrl}:${apiConfig.port}/product`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
            setToken(res.data.token);
            setProfileView(false);
        }).catch(err => {
            alert('Couldn\'t delete all products...');
        })
    }

    useEffect(() => {
        updateUser();
    }, []);

    useEffect(() => {
        setUser({
            'username': username,
            'desc': desc,
        })
    }, [username, desc]);

    return user ? (
        <div id='profile-settings'>
            <h2>Profil</h2>
            <InputField field="Username" isPassWord={false} setData={setUsername} value={username}/>
            <TextAreaField field="Description" setData={setDesc} value={desc}/>
            <button className='update-btn' onClick={() => updateUser()}>Mettre à jour</button>
            <button className='delete-btn' onClick={() => deleteUser()}>Supprimer votre compte</button>
            <button className='delete-btn' onClick={() => deleteProducts()}>Supprimer tout vos produits</button>
        </div>
    ) : (
        <div>Nothing</div>
    )

}

export default ProfileSetting;