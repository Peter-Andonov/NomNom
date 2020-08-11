import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import IngredientDetails from '../../Components/IngredientDetails';


const IngredientDetailsPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <IngredientDetails />
            <Header />
        </PageLayout>
    );
};

export default IngredientDetailsPage;