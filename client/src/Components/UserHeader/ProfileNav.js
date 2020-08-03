import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../Context';


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
`;

const Avatar = styled.img`
    height: 50%;
    max-height: 4rem;
    border-radius: 50%;
`;

const Text = styled.span`
    margin-left: 1rem;
`;


const ProfileNav = (props) => {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open)
        console.log(userContext)
    }

    const userContext = useContext(UserContext);

    return (
        <Container onClick={toggleOpen}>
            <Avatar src={userContext.user.profilePicUrl} alt='Avatar' />
            <Text>{userContext.user.email}</Text>
            {open && props.children}
        </Container>
    );

};

export default ProfileNav;