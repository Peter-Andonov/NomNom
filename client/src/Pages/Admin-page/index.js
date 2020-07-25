import React from 'react';
import styled from 'styled-components';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import TextEditor from '../../Components/TextEditor';
import ImageSelector from '../../Components/ImageSelector';


export default function AdminPage() {

    const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
            <TextEditor />
            <ImageSelector />
        </PageLayout>
    );
};