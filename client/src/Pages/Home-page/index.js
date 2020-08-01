import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import RecipeList from '../../Components/RecipeList';


const HomePage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
            <RecipeList />
        </PageLayout>
    );
};

export default HomePage;