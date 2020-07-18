import React from 'react';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import ImageSelector from '../../Components/ImageSelector';


export default function AdminPage() {
    return (
        <div>
            <HeaderImage />
            <Header />
            <ImageSelector />
        </div>
    );
}