import React, { Component } from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import LoginForm from '../../Components/LoginForm';


class LoginPage extends Component {

    render() {
        return (
            <PageLayout>
                <HeaderImage />
                <Header />
                <LoginForm />
            </PageLayout>
        );
    };
};

export default LoginPage;