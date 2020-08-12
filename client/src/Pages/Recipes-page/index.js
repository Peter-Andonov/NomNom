import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import PageInfo from '../../Components/PageInfo';
import FlexLister from '../../Components/FlexLister';
import Pagination from '../../Components/Pagination';
import RecipeCard from '../../Components/RecipeCard';
import Search from '../../Components/Search';
import Footer from '../../Components/Footer';


const RecipesPage = () => {

    const [recipes, setRecipes] = useState([]);
    const [totalRecipes, setTotalRecipes] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const perPage = 10;
    const totalPages = Math.ceil(totalRecipes / perPage);

    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const getRecipes = () => {
        Axios(`http://localhost:5000/api/recipe/all`, {
            method: "GET",
            params: {
                search: search,
                sortCrit: 'createdAt',
                sortOrd: 'desc',
                page: currentPage,
                perPage: perPage
            }
        }).then((res) => {
            setRecipes(res.data.recipes);
            setTotalRecipes(res.data.totalRecipesCount);
        }).catch((err) => {
            console.log(err);
        });
    };

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
            <Search
                value={search}
                onChange={setSearch}
                onSearch={getRecipes}
            />
            <FlexLister>
                {recipes && recipes.map((recipe) =>
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
            <Footer />
        </PageLayout>
    );
};

export default RecipesPage;