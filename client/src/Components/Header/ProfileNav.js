import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../Images/avatar.jpg';


export default function ProfileNav(props) {

    const [open, setOpen] = useState(false);

    const Container = styled.div`
    margin: 1rem;
    color: white;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
    `

    const Avatar = styled.img`
    height: 50%;
    max-height: 4rem;
    border-radius: 50%;
    `

    const Text = styled.span`
    margin-left: 1rem;
    `

    return (
        <Container onClick={() => setOpen(!open)}>
            <Avatar src={avatar} alt='Avatar' />
            <Text>Test user</Text>
            {open && props.children}
        </Container>
    );
}