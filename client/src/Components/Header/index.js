import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileNav from './ProfileNav';
import Dropdown from './Dropdown';

export default function Header() {

    const Header = styled.header`
    top: 0;
    width: 100%;
    height: 100px;
    position: fixed;
    background-image: linear-gradient(rgba(0,0,0, .9),rgba(245,245,220, 0));
    display: flex;
    flex-direction: row;
    align-items: center;
    `;

    const Spacer = styled.div`
    flex: 1;
    `

    const StyledLink = styled(Link)`
    margin: 1rem;
    color: white;
    text-decoration: none;
    `

    return (
        <Header>
            <StyledLink to={'/'}>Home</StyledLink>
            <Spacer />
            <StyledLink to={'/login'}>Login</StyledLink>
            <StyledLink to={'/register'}>Register</StyledLink>
            <ProfileNav>
                <Dropdown />
            </ProfileNav>
        </Header>
    );
}