import React from 'react';
import styled from 'styled-components';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';


export default function AdminPage() {

    const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <PageLayout>
            <HeaderImage />
            <AdminHeader />
        </PageLayout>
    );
};