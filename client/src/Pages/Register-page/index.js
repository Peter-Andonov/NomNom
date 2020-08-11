import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import RegisterForm from '../../Components/RegisterForm';

const RegisterPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <Header />
            <RegisterForm />
        </PageLayout>
    );
};


export default RegisterPage;