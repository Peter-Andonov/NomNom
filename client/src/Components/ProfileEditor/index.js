import React, { useState, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../Context';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';


const Wrapper = styled.div`
    position: absolute;
    padding-bottom: 5rem;
    top: 30vh;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const ProfileEditor = () => {

    const userContext = useContext(UserContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [deleteToken, setDeleteToken] = useState('');


    const saveProfile = async (e) => {

        e.preventDefault();

        const id = userContext.user._id;

        const res = await Axios('http://localhost:5000/api/user', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': id
            },
            data: {
                id: userContext.user._id,
                profilePicUrl,
                firstName,
                lastName
            }
        });
    };

    return (
        <Wrapper>
            <h1>Profile</h1>
            <form onSubmit={saveProfile}>
                <h3>Profile picture</h3>
                <ImageSelector
                    imageUrl={profilePicUrl}
                    setImageUrl={setProfilePicUrl}
                    deleteToken={deleteToken}
                    setDeleteToken={setDeleteToken}
                />
                <Input
                    type='text'
                    value={firstName}
                    onChange={setFirstName}
                />
                <Input
                    type='text'
                    value={lastName}
                    onChange={setLastName}
                />
                <button type='submit' >Save</button>
            </form>
        </Wrapper>
    );
};


export default ProfileEditor;