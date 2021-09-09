import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import Autocomplete from '../components/autocomplete/Autocomplete';

import '../styles/ProfileSetting.css'

import { apiConfig } from '../config/apiConfig';

function ProfileSetting ({token, setToken, setProfileView}) {
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState(['aze', 'qsocq', 'dsqssq', 'okokok', 'cbncb']);
    const [category, setCategory] = useState('');
    const [username, setUsername] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);

    const updateUser = () => {
        axios.patch(`${apiConfig.protocol}://${apiConfig.baseUrl}:${apiConfig.port}/user`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(res => {
              console.log({'res /product :': res});
              setUser(res.data.user);
          }).catch(err => {
              alert('Couldn\'t fetch all products...');
          })
    }

    useEffect(() => {
        updateUser();
    }, []);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setDesc(user.desc);
            setImage(user.image);
        }
    }, [user]);

    const filterSuggestions = value => {
        return categories.filter(suggestion =>
            suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
    };
    const displaySuggestionInList = suggestion => suggestion;
    const displaySuggestionInInput = suggestion => suggestion;
    const getCurrentSuggestion = suggestion => setCategory(suggestion);

    return user ? (
        <div id='profile-settings'>
            <h2>Profil</h2>
            <InputField field="Username" isPassWord={false} setData={setUsername} value={user.username}/>
            <TextAreaField field="Description" setData={setDesc} value={user.desc}/>
            <img src={image} alt={username} />
            <Autocomplete
                placeHolder='Donnée'
                suggestions={categories}
                filterSuggestions={filterSuggestions}
                displaySuggestionInList={displaySuggestionInList}
                displaySuggestionInInput={displaySuggestionInInput}
                getCurrentSuggestion={getCurrentSuggestion}
            />
            <button className='update-btn' onClick={() => updateUser()}>Mettre à jour</button>
        </div>
    ) : (
        <div>Nothing</div>
    )

}

export default ProfileSetting;