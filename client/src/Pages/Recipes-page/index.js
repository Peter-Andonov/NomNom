import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import PageInfo from '../../Components/PageInfo';
import FlexLister from '../../Components/FlexLister';
import Pagination from '../../Components/Pagination';
import RecipeCard from '../../Components/RecipeCard';


const RecipesPage = () => {

    const [recipes, setRecipes] = useState([]);
    const [totalRecipes, setTotalRecipes] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const perPage = 10;
    const totalPages = Math.ceil(totalRecipes / perPage);

    useEffect(() => {
        const getRecipes = async () => {
            const res = await Axios(`http://localhost:5000/api/recipe/all`, {
                method: "GET",    
                params: {
                    sortCrit: 'createdAt',
                    sortOrd: 'desc',
                    page: currentPage,
                    perPage: perPage
                }
            });
            setRecipes(res.data.recipes);
            setTotalRecipes(res.data.totalRecipesCount);
        }
        getRecipes();
    }, [currentPage]);

    const changePage = async (pageNumber) => {

        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }

        setCurrentPage(pageNumber);
    };

    return (
        <PageLayout>
            <BannerImage />
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
            {totalRecipes > perPage ?
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    changePage={changePage}
                /> : ''}
            <Header />
        </PageLayout>
    );
};

export default RecipesPage;