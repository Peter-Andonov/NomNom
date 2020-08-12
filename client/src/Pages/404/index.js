import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';


const PageNotFound = () => {

    return (
        <PageLayout>
            <BannerImage />
            <h1>404</h1>
            <h1>Page not Found</h1>
            <Header />
            <Footer />
        </PageLayout>
    );
};

export default PageNotFound;