import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import RecipeList from '../../Components/FlexLister';
import PageInfo from '../../Components/PageInfo';
import FlexLister from '../../Components/FlexLister';
import RecipeCard from '../../Components/RecipeCard';


const RecipesPage = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
            const res = await Axios.get('http://localhost:5000/api/recipe/all');
            setRecipes(res.data);
        }
        getRecipes();
    }, []);

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
            <PageInfo title='Recipes' />
            <FlexLister>
            {recipes.map((recipe) =>
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

export default RecipesPage;