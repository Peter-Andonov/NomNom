import React from 'react';
import styled from 'styled-components';
import background from '../../Images/background.jpg';


const Container = styled.div`
    height: 50vh;
    min-height: 10rem;
    width: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(245, 245, 220, 1));
`;

    const Image = styled.img`
    max-height: 100%;
    width: 100%;
    max-width: 100%;
    object-position: top;
    object-fit: cover;
    opacity: 0.8;
`;


const HeaderImage = () => {

    return(
        <Container>
            <Image src={background} />
        </Container>
    );
};


export default HeaderImage;