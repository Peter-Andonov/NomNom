import React from 'react';
import styled from 'styled-components';
import RecipeCard from '../RecipeCard';
import PageInfo from '../PageInfo';

export default function RecipeList() {

    const Main = styled.main`
    margin: 1rem;
    padding: 1rem;
    `

    const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
    `

    return (
        <Main>
            <PageInfo />
            <Container>
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
            </Container>
        </Main>
    );
}