import React from 'react';
import styled from 'styled-components';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import LoginForm from '../../Components/LoginForm';


export default function LoginPage() {

    const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
            <LoginForm />
        </PageLayout>
    );
}