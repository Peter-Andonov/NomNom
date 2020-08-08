import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import PageInfo from '../../Components/PageInfo';
import FlexLister from '../../Components/FlexLister';
import ArticleCard from '../../Components/ArticleCard';
import RecipeCard from '../../Components/RecipeCard';


const HomePage = () => {

    const [recipes, setRecipes] = useState([]);
    const [articles, setArticles] = useState([]);


    const getLatestRecipes = async () => {
        const res = await Axios.get(`http://localhost:5000/api/recipe/all?perPage=5`);
        setRecipes(res.data.recipes);
    }

    const getLatestArticles = async () => {
        const res = await Axios.get(`http://localhost:5000/api/article/all?perPage=5`);
        setArticles(res.data.articles);
    }

    useEffect(() => {
        getLatestRecipes();
        getLatestArticles();
    }, []);

    return (
        <PageLayout>
            <HeaderImage />
            <PageInfo title='Latest Recipes' />
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
            <PageInfo title='Latest Articles' />
            <FlexLister>
                {articles.map((article) =>
                    <ArticleCard
                        key={article._id}
                        id={article._id}
                        title={article.title}
                        imageUrl={article.imageUrl}
                    />)}
            </FlexLister>
            <Header />
        </PageLayout>
    );
};

export default HomePage;