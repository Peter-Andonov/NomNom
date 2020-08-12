import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import LoginForm from '../../Components/LoginForm';
import Footer from '../../Components/Footer';


const LoginPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <LoginForm />
            <Header />
            <Footer />
        </PageLayout>
    );
};

export default LoginPage;