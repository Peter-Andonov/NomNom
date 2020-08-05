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
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const ProfileEditor = () => {

    const userContext = useContext(UserContext);

    const [firstName, setFirstName] = useState(userContext.user.firstName);
    const [lastName, setLastName] = useState(userContext.user.lastName);
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [deleteToken, setDeleteToken] = useState('');


    const saveProfile = async (e) => {

        console.log(firstName, lastName, profilePicUrl)

        e.preventDefault();

        const id = userContext.user._id;

        const res = await Axios('http://localhost:5000/api/user', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': id
            }, data: {
                id: userContext.user._id,
                profilePicUrl,
                firstName,
                lastName
            }
        });

        userContext.logIn({
            _id: res.data._id,
            email: res.data.email,
            role: res.data.role,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            profilePicUrl: res.data.profilePicUrl
        });
    };

    return (
        <Wrapper>
            <h1>View Your Profile</h1>
            <Form onSubmit={saveProfile}>
                <h3>Profile picture</h3>
                <ImageSelector
                    imageUrl={profilePicUrl}
                    setImageUrl={setProfilePicUrl}
                    deleteToken={deleteToken}
                    setDeleteToken={setDeleteToken}
                />
                <Container>
                    <label>First name</label>
                    <Input
                        type='text'
                        value={firstName}
                        onChange={setFirstName}
                    />


                    <label>Last name</label>
                    <Input
                        type='text'
                        value={lastName}
                        onChange={setLastName}
                    />
                </Container>

                <button type='submit' >Save</button>
            </Form>
        </Wrapper>
    );
};


export default ProfileEditor;