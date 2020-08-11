import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import UnitEditor from '../../Components/UnitEditor';


const CreateUnitPage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <UnitEditor />
            <Header />
        </PageLayout>
    );
};


export default CreateUnitPage;