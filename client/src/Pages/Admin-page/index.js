import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import Dashboard from '../../Components/Dashboard';
import DashboardContainer from '../../Components/Dashboard/DashboardContainer';
import ListItem from '../../Components/Dashboard/ListItem';
import Pagination from '../../Components/Pagination';


const AdminPage = () => {

    const [recipes, setRecipes] = useState([]);
    const [totalRecipesCount, setTotalRecipesCount] = useState(0);
    const [currentRecipesPage, setCurrentRecipesPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [totalArticlesCount, setTotalArticlesCount] = useState(0);
    const [currentArticlesPage, setCurrentArticlesPage] = useState(1);

    const perPage = 5;
    const totalRecipePages = Math.ceil(totalRecipesCount / perPage);


    const changeRecipesPage = async (pageNumber) => {

        if (pageNumber < 1 || pageNumber > totalRecipePages) {
            return;
        }

        setCurrentRecipesPage(pageNumber);
    };

    useEffect(() => {
        const getRecipes = () => {
            Axios(`http://localhost:5000/api/recipe/all`, {
                method: "GET",
                params: {
                    sortCrit: 'usersLiked',
                    sortOrd: 'desc',
                    page: currentRecipesPage,
                    perPage: perPage
                }
            }).then((res) => {
                console.log(res.data)
                setRecipes(res.data.recipes);
                setTotalRecipesCount(res.data.totalRecipesCount);
            }).catch((err) => {
                console.log(err);
            });
        };
        getRecipes();
    }, [currentRecipesPage]);

    useEffect(() => {
        const getArticles = () => {
            Axios(`http://localhost:5000/api/article/all`, {
                method: "GET",
                params: {
                    sortCrit: 'comments',
                    sortOrd: 'desc',
                    page: currentArticlesPage,
                    perPage: perPage
                }
            }).then((res) => {
                console.log(res.data)
                setArticles(res.data.articles);
                setTotalArticlesCount(res.data.totalArticlesCount);
            }).catch((err) => {
                console.log(err);
            });
        };
        getArticles();
    }, [currentArticlesPage]);

    return (
        <PageLayout>
            <BannerImage />
            <Dashboard>
                <DashboardContainer
                    title={'Your most liked recipes'}
                >
                    {recipes && recipes.map((recipe) =>
                        <ListItem 
                        key={recipe._id}
                        src={recipe.coverImageUrl} 
                        title={recipe.title} 
                        metricValue={recipe.usersLiked.length}
                        metricLabel={'likes'}
                        />
                    )}
                    {totalRecipesCount > perPage ?
                        <Pagination
                            currentPage={currentRecipesPage}
                            totalPages={totalRecipePages}
                            changePage={changeRecipesPage}
                        /> : ''}
                </DashboardContainer>
                <DashboardContainer
                    title={'Your most discussed articles'}
                >
                {articles && articles.map((article) =>
                    <ListItem 
                    key={article._id}
                    src={article.imageUrl} 
                    title={article.title} 
                    metricValue={article.comments.length}
                    metricLabel={'comments'}
                    />
                )}
                </DashboardContainer>
            </Dashboard>
            <Header />
        </PageLayout>
    );
};


export default AdminPage;