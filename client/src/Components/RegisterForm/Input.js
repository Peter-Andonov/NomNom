import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.label`
    font-size: 1.8rem;
`;

const StyledInput = styled.input`
    font-size: 1.5rem;
    width: 60%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 2px solid black;
`;

const ErrorMessage = styled.div`
    font-size: 1rem;
    color: red;
`;

const Input = (props) => {

    const handleChange = (e) => {
        props.onChange(e.target.value);
    }

    return (
        <Wrapper>
            <Label htmlFor={props.id}>{props.label}</Label>
            <StyledInput
                id={props.id}
                data-testid={props.testId}
                type={props.type}
                value={props.value}
                onChange={handleChange}
                onBlur={props.onBlur}
            />
            {props.error && <ErrorMessage data-testid={`error-${props.testId}`} >{props.errorMessage}</ErrorMessage>}
        </Wrapper>
    );
};

export default Input;