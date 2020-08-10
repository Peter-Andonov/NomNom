import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../Context';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const GreenBtn = styled.button`
    background-color: rgb(160, 184, 85);
    border-radius: 5px;
    border: none;
    color: white;
    padding: 12px 22px;
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
    &:hover {
        cursor: pointer;
    };
    &:focus {
        outline: none;
    };
`;

const RedBtn = styled.button`
    margin-left: 1.5rem;
    background-color: rgb(237, 88, 59);
    border-radius: 5px;
    border: none;
    color: white;
    padding: 12px 22px;
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
    &:hover {
        cursor: pointer;
    };
    &:focus {
        outline: none;
    };
`;

const ActionBar = (props) => {

    const userContext = useContext(UserContext);

    const isLoggedIn = userContext.loggedIn;
    const isAdmin = userContext.user ? userContext.user.role === 'admin' : false;

    return (
        <Container>
            {isLoggedIn && !isAdmin && !props.userHasLiked && <GreenBtn onClick={props.addToFavorites} >Add to Favourites</GreenBtn>}
            {isLoggedIn && !isAdmin && props.userHasLiked && <RedBtn onClick={props.removeFromFavorites} >Remove from Favourites</RedBtn>}
            {isLoggedIn && isAdmin && <GreenBtn onClick={props.editRecipe} >Edit Recipe</GreenBtn>}
            {isLoggedIn && isAdmin && <RedBtn onClick={props.deleteRecipe} >Delete Recipe</RedBtn>}
        </Container>
    );
};


export default ActionBar;