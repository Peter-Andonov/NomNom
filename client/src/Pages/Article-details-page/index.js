import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import ArticleDetails from '../../Components/ArticleDetails';


const ArticleDetailsPage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <ArticleDetails />
            <Header />
        </PageLayout>
    );
};

export default ArticleDetailsPage;