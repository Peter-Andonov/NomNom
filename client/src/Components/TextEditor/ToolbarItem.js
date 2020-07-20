import React from 'react';
import styled from 'styled-components';


export default function ToolbarItem(props) {

    const Button = styled.img`
    border: 1px solid black;
    background-color: aqua;
    &:hover {
        background-color: transparent;
        cursor: pointer;
    }
    `;

    return (
        <Button onMouseDown={props.onClick} src={props.icon} />
    );
}