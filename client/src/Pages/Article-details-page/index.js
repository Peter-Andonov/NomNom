import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import ArticleDetails from '../../Components/ArticleDetails';


const ArticleDetailsPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <ArticleDetails />
            <Header />
        </PageLayout>
    );
};

export default ArticleDetailsPage;