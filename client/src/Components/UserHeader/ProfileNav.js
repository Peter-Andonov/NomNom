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
    max-width: 4rem;
    max-height: 4rem;
    border-radius: 50%;
    object-fit: cover;
`;

const Text = styled.span`
    margin-left: 1rem;
`;


const ProfileNav = (props) => {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open)
    }

    const userContext = useContext(UserContext);
    const displayName = userContext.user.firstName ? `${userContext.user.firstName} ${userContext.user.lastName}` : userContext.user.email;
    const displayPicture = userContext.user.profilePicUrl || 'https://res.cloudinary.com/nomnomapp/image/upload/v1596641498/Images/x5svb4l6kwcyiinazfqt.png';
    
    return (
        <Container onClick={toggleOpen}>
            <Avatar src={displayPicture} alt='Avatar' />
            <Text>{displayName}</Text>
            {open && props.children}
        </Container>
    );

};


export default ProfileNav;