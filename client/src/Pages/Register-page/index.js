import React from 'react';
import styled from 'styled-components';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import RegisterForm from '../../Components/RegisterForm';

export default function RegisterPage() {

    const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
            <RegisterForm />
        </PageLayout>
    );
}