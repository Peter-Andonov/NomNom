import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';


const PageNotFound = () => {

    return (
        <PageLayout>
            <BannerImage />
            <h1>404</h1>
            <h1>Page not Found</h1>
            <Header />
        </PageLayout>
    );
};

export default PageNotFound;