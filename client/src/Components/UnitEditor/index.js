import React, { useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
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


const UnitEditor = () => {

    const [name, setName] = useState('');

    const saveUnit = async () => {

        const data = {
            name: name,
        };

        await Axios.post('http://localhost:5000/api/unit', data);

    };

    return (
        <Wrapper>
            <h1>Create Measurement Unit</h1>
            <Input
                value={name}
                onChange={setName}
            />
            <button onClick={saveUnit} >Save</button>
        </Wrapper>
    );
};


export default UnitEditor;