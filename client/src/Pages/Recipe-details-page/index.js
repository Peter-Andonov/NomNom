import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import RecipeDetails from '../../Components/RecipeDetails';


const RecipeDetailsPage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <RecipeDetails />
            <Header />
        </PageLayout>
    );
};

export default RecipeDetailsPage;