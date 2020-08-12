import React from 'react';
import styled from 'styled-components';
import facebookIcon from '../../Images/Icons/icons8-facebook.svg';
import twitterIcon from '../../Images/Icons/icons8-twitter.svg';
import instagramIcon from '../../Images/Icons/icons8-instagram.svg';


const Container = styled.footer`
    margin-top: 3rem;
    min-height: 10rem;
    width: 100%;
    background-color: rgb(51, 51, 51);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FooterText = styled.div`
    margin: 1rem;
    color: white;
`;

const FooterIcon = styled.img`
    margin: 0.5rem;
`;

const Copyright = styled.div`
    margin: 1rem;
    font-size: 1rem;
    color: white;
`;


const Footer = () => {

    return (
        <Container>
            <FooterText>Follow on social media</FooterText>
            <div>
                <a href='https://www.facebook.com/'>
                    <FooterIcon src={facebookIcon} />
                </a>
                <a href='https://twitter.com/'>
                    <FooterIcon src={twitterIcon} />
                </a>
                <a href='https://www.instagram.com/'>
                    <FooterIcon src={instagramIcon} />
                </a>
            </div>
            <Copyright>Copyright © 2020 NomNom. All rights reserved.</Copyright>
        </Container>
    );
};


export default Footer;