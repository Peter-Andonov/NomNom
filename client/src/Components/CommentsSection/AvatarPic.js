import React from 'react';
import styled from 'styled-components';


const Avatar = styled.img`
    height: 50%;
    max-width: 4rem;
    max-height: 4rem;
    object-fit: cover;
`;

const AvatarPic = (props) => {
    return(<Avatar src={props.src} alt='Avatar' />);
};


export default AvatarPic;