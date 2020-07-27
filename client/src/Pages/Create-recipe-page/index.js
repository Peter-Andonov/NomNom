import React from 'react';
import styled from 'styled-components';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';
import RecipeEditor from '../../Components/RecipeEditor';


export default function CreateRecipePage() {

    const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <PageLayout>
            <HeaderImage />
            <RecipeEditor />
            <AdminHeader />
        </PageLayout>
    );
};