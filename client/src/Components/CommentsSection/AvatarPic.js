import React from 'react';
import styled from 'styled-components';


const Avatar = styled.img`
    width: 4rem;
    height: 4rem;
    object-fit: cover;
`;

const AvatarPic = (props) => {
    return(<Avatar src={props.src} alt='Avatar' />);
};


export default AvatarPic;