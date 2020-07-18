import React from 'react';
import styled from 'styled-components';
import DropdownItem from './DropdownItem';

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
            <DropdownItem url={'/admin'} text={'Admin'}/>
            <DropdownItem url={'/profile'} text={'Profile'} />
            <DropdownItem url={'/logout'} text={'Logout'} />
        </Container>
    );
}