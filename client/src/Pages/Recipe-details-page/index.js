import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import RecipeDetails from '../../Components/RecipeDetails';


const RecipeDetailsPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <RecipeDetails />
            <Header />
        </PageLayout>
    );
};

export default RecipeDetailsPage;