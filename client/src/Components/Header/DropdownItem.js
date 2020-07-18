import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function DropdownItem(props) {

    const StyledLink = styled(Link)`
    margin: 0.5rem;
    color: white;
    text-decoration: none;
    size: 0.8rem;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    }
    `

    return (
        <StyledLink to={props.url}>{props.text}</StyledLink>
    );
}