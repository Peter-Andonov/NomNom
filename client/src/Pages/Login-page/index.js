import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import LoginForm from '../../Components/LoginForm';


const LoginPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <Header />
            <LoginForm />
        </PageLayout>
    );
};

export default LoginPage;