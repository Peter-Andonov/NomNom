import React from 'react';
import styled from 'styled-components';


const ToolbarItem = styled.img`
    color: white;
    margin: 0.5rem;
    height: 60%;
    &:hover {
        cursor: pointer;
    }
`;


const ToolbarStyle = (props) => {

    return (
        <ToolbarItem src={props.icon} onMouseDown={props.onClick} alt={props.name} />
    );
};

export default ToolbarStyle;