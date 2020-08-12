import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import RegisterForm from '../../Components/RegisterForm';
import Footer from '../../Components/Footer';

const RegisterPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <RegisterForm />
            <Header />
            <Footer />
        </PageLayout>
    );
};


export default RegisterPage;