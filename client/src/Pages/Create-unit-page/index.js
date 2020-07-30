import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';
import UnitEditor from '../../Components/UnitEditor';


const CreateUnitPage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <UnitEditor />
            <AdminHeader />
        </PageLayout>
    );
};


export default CreateUnitPage;