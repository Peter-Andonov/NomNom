import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import IngredientDetails from '../../Components/IngredientDetails';
import Footer from '../../Components/Footer';


const IngredientDetailsPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <IngredientDetails />
            <Header />
            <Footer />
        </PageLayout>
    );
};

export default IngredientDetailsPage;