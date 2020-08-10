import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-right: 1rem;
    padding-bottom: 0.5rem;
    background: rgb(255, 151, 23);
    border: none;
    border-radius: 20px;
    color: white;
    font-family: 'Sriracha', cursive;
    font-size: 1.5rem;
    &:focus {
        outline: none;
    };
    &:hover {
        cursor: pointer;
    };
`;

const Submit = (props) => {

    return (
        <Button type='submit'>{props.label}</Button>
    );
};

export default Submit;