import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import IngredientEditor from '../../Components/IngredientEditor';


const CreateIngredientPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <IngredientEditor />
            <Header />
        </PageLayout>
    );
};


export default CreateIngredientPage;