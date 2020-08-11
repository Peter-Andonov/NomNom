import React from 'react';
import styled from 'styled-components';


const RedBtn = styled.button`
    margin-left: 1.5rem;
    background-color: rgb(237, 88, 59);
    border-radius: 5px;
    border: none;
    color: white;
    padding: 12px 22px;
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
    &:hover {
        cursor: pointer;
    };
    &:focus {
        outline: none;
    };
`;

const RedButton = (props) => {

    return(
        <RedBtn onClick={props.action} >{props.label}</RedBtn>
    );
};


export default RedButton;