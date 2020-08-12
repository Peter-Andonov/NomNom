import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import ArticleDetails from '../../Components/ArticleDetails';
import Footer from '../../Components/Footer';


const ArticleDetailsPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <ArticleDetails />
            <Header />
            <Footer />
        </PageLayout>
    );
};

export default ArticleDetailsPage;