import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledLink = styled(Link)`
    margin: 0.5rem;
    color: white;
    text-decoration: none;
    size: 0.8rem;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    }
`;


const NavLink = (props) => {

    return (
        <StyledLink to={props.to}>{props.text}</StyledLink>
    );
};


export default NavLink;