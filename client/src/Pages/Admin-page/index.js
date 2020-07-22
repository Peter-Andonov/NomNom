import React from 'react';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import TextEditor from '../../Components/TextEditor';
import ImageSelector from '../../Components/ImageSelector';


export default function AdminPage() {
    return (
        <div>
            <HeaderImage />
            <Header />
            <TextEditor height='600px' width='300px'/>
            <ImageSelector />
        </div>
    );
}