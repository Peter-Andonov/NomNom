import React from 'react';
import styled from 'styled-components';


export default function ToolbarItem(props) {

    const ToolbarItem = styled.img`
    color: white;
    margin: 0.5rem;
    height: 60%;
    &:hover {
        cursor: pointer;
    }
    `;

    return (
        <ToolbarItem src={props.icon} onMouseDown={props.onClick} alt={props.name} />
    );
}