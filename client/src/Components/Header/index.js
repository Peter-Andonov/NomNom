import React from 'react';
import styled from 'styled-components';
import ProfileNav from './ProfileNav';
import Dropdown from './Dropdown';
import StyledLink from './Link';

export default function Header() {

    const Header = styled.header`
    top: 0;
    width: 100%;
    height: 100px;
    position: fixed;
    background-image: linear-gradient(rgba(0,0,0, .9),rgba(245,245,220, 0));
    `;

    const Navigation = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    `

    const Spacer = styled.div`
    flex: 1;
    `

    return (
        <Header>
            <Navigation>
                <StyledLink to={'/'} text={'Home'} />
                <StyledLink to={'/recipes'} text={'Recipes'} />
                <StyledLink to={'/articles'} text={'Articles'} />
                <Spacer />
                <StyledLink to={'/login'} text={'Login'} />
                <StyledLink to={'/register'} text={'Register'} />
                <ProfileNav>
                    <Dropdown />
                </ProfileNav>
            </Navigation>
        </Header>
    );
}