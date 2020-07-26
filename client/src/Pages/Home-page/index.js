import React, { Component } from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/Header';
import RecipeList from '../../Components/RecipeList';
import UserContext from '../../Context';


class HomePage extends Component {

    static contextType = UserContext;

    render() {
        return (
            <PageLayout>
                <HeaderImage />
                <Header />
                <RecipeList />
            </PageLayout>
        );
    };
};

export default HomePage;