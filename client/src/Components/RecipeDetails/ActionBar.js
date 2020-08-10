import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../Context';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const LikeBtn = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 12px 22px;
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
`;

const DislikeBtn = styled.button`
    background-color: red;
    border: none;
    color: white;
    padding: 12px 22px;
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
`;

const ActionBar = (props) => {

    const userContext = useContext(UserContext);

    const isLoggedIn = userContext.loggedIn;
    const isAdmin = userContext.user ? userContext.user.role === 'admin' : false;

    return (
        <Container>
            {isLoggedIn && !isAdmin && !props.userHasLiked && <LikeBtn onClick={props.addToFavorites} >Add to Favourites</LikeBtn>}
            {isLoggedIn && !isAdmin && props.userHasLiked && <DislikeBtn onClick={props.addToFavorites} >Remove from Favourites</DislikeBtn>}
        </Container>
    );
};


export default ActionBar;