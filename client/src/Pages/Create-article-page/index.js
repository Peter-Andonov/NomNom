import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';
import ArticleEditor from '../../Components/ArticleEditor';


const CreateArticlePage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <ArticleEditor />
            <AdminHeader />
        </PageLayout>
    );
};


export default CreateArticlePage;