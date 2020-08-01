import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';
import IngredientEditor from '../../Components/IngredientEditor';


const CreateIngredientPage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <IngredientEditor />
            <AdminHeader />
        </PageLayout>
    );
};


export default CreateIngredientPage;