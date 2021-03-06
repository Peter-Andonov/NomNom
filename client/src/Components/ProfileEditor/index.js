import React, { useState, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../Context';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import Submit from '../RegisterForm/Submit';


const Wrapper = styled.div`
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

const ErrorMessage = styled.div`
    font-size: 1rem;
    color: red;
`;


const ProfileEditor = () => {

    const userContext = useContext(UserContext);

    const [firstName, setFirstName] = useState(userContext.user.firstName);
    const [lastName, setLastName] = useState(userContext.user.lastName);
    const [profilePicUrl, setProfilePicUrl] = useState(userContext.user.profilePicUrl);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const saveProfile = (e) => {

        e.preventDefault();

        Axios('http://localhost:5000/api/user', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': userContext.user._id
            }, data: {
                id: userContext.user._id,
                profilePicUrl,
                firstName,
                lastName
            }
        }).then((res) => {
            userContext.logIn({
                _id: res.data._id,
                email: res.data.email,
                role: res.data.role,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                profilePicUrl: res.data.profilePicUrl,
                favouriteRecipes: res.data.favouriteRecipes
            });
        }).catch((err) => {
            setError(true);
            setErrorMessage(err.response.data.message);
        })

        
    };

    return (
        <Wrapper>
            <h1>View Your Profile</h1>
            <Form onSubmit={saveProfile}>
                <h3>Profile picture</h3>
                <ImageSelector
                    imageUrl={profilePicUrl}
                    setImageUrl={setProfilePicUrl}
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
                {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Submit label={"Save changes"} />
            </Form>
        </Wrapper>
    );
};


export default ProfileEditor;