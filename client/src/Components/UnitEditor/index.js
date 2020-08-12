import React from 'react';
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

const UnitEditor = (props) => {

    return (
        <Wrapper onSubmit={props.onSubmit}>
            <h1>Create Measurement Unit</h1>
            <Input
                value={props.name}
                onChange={props.setName}
            />
            {props.error && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
            <Submit label={'Save Unit'} />
        </Wrapper>
    );
};


export default UnitEditor;