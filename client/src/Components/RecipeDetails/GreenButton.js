import React from 'react';
import styled from 'styled-components';


const GreenBtn = styled.button`
    background-color: rgb(160, 184, 85);
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

const GreenButton = (props) => {

    return (
        <GreenBtn
            data-testid={props.testId}
            onClick={props.action} >{props.label}</GreenBtn>
    );
};


export default GreenButton;