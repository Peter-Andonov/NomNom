import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import * as utils from '../../Utils/user';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import RecipeList from '../../Components/FlexLister';
import PageInfo from '../../Components/PageInfo';
import FlexLister from '../../Components/FlexLister';
import RecipeCard from '../../Components/RecipeCard';


const FavouritesPage = () => {

    const [favouriteRecipes, setFavouriteRecipes] = useState([]);

    useEffect(() => {
        const getUserInfo = async () => {

            const token = utils.getCookieByName('auth-token');

            const res = await Axios('http://localhost:5000/api/user', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': token
            }
        });
            
            setFavouriteRecipes(res.data.favouriteRecipes);
        }
        getUserInfo();
    }, []);

    return (
        <PageLayout>
            <BannerImage />
            <Header />
            <PageInfo title='Your Favourite Recipes' />
            <FlexLister>
            {favouriteRecipes.map((recipe) =>
                <RecipeCard
                    key={recipe._id}
                    id={recipe._id}
                    title={recipe.title}
                    coverImageUrl={recipe.coverImageUrl}
                    prepTime={recipe.prepTime}
                    cookTime={recipe.cookTime}
                    serves={recipe.serves}
                    difficulty={recipe.difficulty}
                />)}
            </FlexLister>
            <RecipeList />
        </PageLayout>
    );
};

export default FavouritesPage;