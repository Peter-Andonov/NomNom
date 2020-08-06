import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
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
            const res = await Axios.get(`http://localhost:5000/api/recipe/all?page=${currentPage}&perPage=${perPage}`);
            setRecipes(res.data.recipes);
            setTotalRecipes(res.data.recipesCount);
        }
        getRecipes();
    }, []);

    const changePage = async (pageNumber) => {

        if(pageNumber < 1 || pageNumber > totalPages) {
            return;
        }

        const res = await Axios.get(`http://localhost:5000/api/recipe/all?page=${pageNumber}&perPage=${perPage}`);
        setRecipes(res.data.recipes);
        setCurrentPage(pageNumber);
    };

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
            {totalRecipes > 5 ?
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    changePage={changePage}
                /> : ''}
        </PageLayout>
    );
};

export default RecipesPage;