import React from 'react';
import styled from 'styled-components';


export default function ToolbarItem(props) {

    const ToolbarItem = styled.div`
    color: white;
    font: caption;
    font-size: 1.3rem;
    margin: 1rem;
    height: 60%;
    &:hover {
        cursor: pointer;
    }
    `;

    return (
        <ToolbarItem onMouseDown={props.onClick} >{props.text}
            {props.icon && <img src={props.icon} alt={props.name}/>}
        </ToolbarItem>
    );
}