import React from 'react';
import styled from 'styled-components';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';
import IngredientEditor from '../../Components/IngredientEditor';


export default function CreateIngredientPage() {

    const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <PageLayout>
            <HeaderImage />
            <IngredientEditor />
            <AdminHeader />
        </PageLayout>
    );
};