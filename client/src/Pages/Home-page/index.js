import React from 'react';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import RecipeList from '../../Components/RecipeList';


export default function HomePage() {
    return (
        <div>
            <HeaderImage />
            <Header />
            <RecipeList />
        </div>
    );
}