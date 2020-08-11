import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../Context';
import TextItem from './TextItem';


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
    margin-right: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
`;


const ProfileNav = (props) => {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open)
    };

    const userContext = useContext(UserContext);
    const displayName = userContext.user.firstName ? `${userContext.user.firstName} ${userContext.user.lastName}` : userContext.user.email;
    const displayPicture = userContext.user.profilePicUrl || 'https://res.cloudinary.com/nomnomapp/image/upload/v1596641498/Images/x5svb4l6kwcyiinazfqt.png';
    
    return (
        <Container onClick={toggleOpen}>
            <Avatar src={displayPicture} alt='Avatar' />
            <TextItem label={displayName} />
            {open && props.children}
        </Container>
    );

};


export default ProfileNav;