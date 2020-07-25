import React from 'react';
import styled from 'styled-components';
import StyledLink from './Link';

export default function DropdownMenu() {

    const Container = styled.div`
    position: absolute;
    top: 100px;
    width: auto;
    min-width: 175px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #333333;
    border: 1px solid #474a4d;
    border-radius: 5px;
    `

    return (
        <Container>
            <StyledLink to={'/admin'} text={'Admin'} />
            <StyledLink to={'/profile'} text={'Profile'} />
            <StyledLink to={'/logout'} text={'Logout'} />
        </Container>
    );
}