import React from 'react';
import styled from 'styled-components';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import RecipeList from '../../Components/RecipeList';


export default function HomePage() {

    const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
            <RecipeList />
        </PageLayout>
    );
}