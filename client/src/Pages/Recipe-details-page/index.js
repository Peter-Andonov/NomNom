import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import RecipeDetails from '../../Components/RecipeDetails';
import Footer from '../../Components/Footer';


const RecipeDetailsPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <RecipeDetails />
            <Header />
            <Footer />
        </PageLayout>
    );
};

export default RecipeDetailsPage;