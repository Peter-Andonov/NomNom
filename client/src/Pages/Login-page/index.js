import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import LoginForm from '../../Components/LoginForm';


const LoginPage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
            <LoginForm />
        </PageLayout>
    );
};

export default LoginPage;