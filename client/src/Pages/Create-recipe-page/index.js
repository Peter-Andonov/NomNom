import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';
import RecipeEditor from '../../Components/RecipeEditor';


const CreateRecipePage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <RecipeEditor />
            <AdminHeader />
        </PageLayout>
    );
};


export default CreateRecipePage;