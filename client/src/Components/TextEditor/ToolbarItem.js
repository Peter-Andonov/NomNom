import React from 'react';
import styled from 'styled-components';


export default function ToolbarItem(props) {

    const ToolbarItem = styled.img`
    margin: 1rem;
    height: 60%;
    &:hover {
        cursor: pointer;
    }
    `;

    return (
        <ToolbarItem onMouseDown={props.onClick} src={props.icon} />
    );
}