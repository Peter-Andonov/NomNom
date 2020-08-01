import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import RegisterForm from '../../Components/RegisterForm';

const RegisterPage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
            <RegisterForm />
        </PageLayout>
    );
};


export default RegisterPage;