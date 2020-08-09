import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import styled from 'styled-components';
import Input from '../RegisterForm/Input';
import Submit from '../RegisterForm/Submit';


const Wrapper = styled.form`
    position: absolute;
    top: 30vh;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorMessage = styled.div`
    font-size: 1rem;
    color: red;
`;

const UnitEditor = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const saveUnit = async (e) => {

        e.preventDefault();

        const data = {
            name: name,
        };

        Axios.post('http://localhost:5000/api/unit', data).then(() => {
            history.push('/admin');
        }).catch((err) => {
            setError(true);
            setErrorMessage('Something went wrong');
        });
    };

    return (
        <Wrapper onSubmit={saveUnit}>
            <h1>Create Measurement Unit</h1>
            <Input
                value={name}
                onChange={setName}
            />
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Submit label={'Save Unit'} />
        </Wrapper>
    );
};


export default UnitEditor;