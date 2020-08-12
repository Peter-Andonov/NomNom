import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import Dashboard from '../../Components/Dashboard';
import DashboardContainer from '../../Components/Dashboard/DashboardContainer';
import ListItem from '../../Components/Dashboard/ListItem';
import ListEditable from '../../Components/Dashboard/ListEditable';
import Footer from '../../Components/Footer';


const AdminPage = () => {

    const [recipes, setRecipes] = useState([]);
    const [totalRecipesCount, setTotalRecipesCount] = useState(0);
    const [currentRecipesPage, setCurrentRecipesPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [totalArticlesCount, setTotalArticlesCount] = useState(0);
    const [currentArticlesPage, setCurrentArticlesPage] = useState(1);
    const [units, setUnits] = useState([]);
    const [totalUnitsCount, setTotalUnitsCount] = useState(0);
    const [currentUnitsPage, setCurrentUnitsPage] = useState(1);

    const perPage = 5;
    const totalRecipePages = Math.ceil(totalRecipesCount / perPage);
    const totalArticlePages = Math.ceil(totalArticlesCount / perPage);
    const totalUnitPages = Math.ceil(totalUnitsCount / perPage);


    useEffect(() => {
        Axios(`http://localhost:5000/api/recipe/all`, {
            method: "GET",
            params: {
                sortCrit: 'usersLiked',
                sortOrd: 'desc',
                page: currentRecipesPage,
                perPage: perPage
            }
        }).then((res) => {
            setRecipes(res.data.recipes);
            setTotalRecipesCount(res.data.totalRecipesCount);
        }).catch((err) => {
            console.log(err);
        });
    }, [currentRecipesPage]);

    useEffect(() => {
        Axios(`http://localhost:5000/api/article/all`, {
            method: "GET",
            params: {
                sortCrit: 'comments',
                sortOrd: 'desc',
                page: currentArticlesPage,
                perPage: perPage
            }
        }).then((res) => {
            setArticles(res.data.articles);
            setTotalArticlesCount(res.data.totalArticlesCount);
        }).catch((err) => {
            console.log(err);
        });
    }, [currentArticlesPage]);

    useEffect(() => {
        Axios(`http://localhost:5000/api/unit/all`, {
            method: "GET",
            params: {
                sortCrit: 'name',
                sortOrd: 'asc',
                page: currentUnitsPage,
                perPage: perPage
            }
        }).then((res) => {
            setUnits(res.data.units);
            setTotalUnitsCount(res.data.totalUnitsCount);
        }).catch((err) => {
            console.log(err);
        });
    }, [currentUnitsPage]);

    const changeRecipesPage = async (pageNumber) => {

        if (pageNumber < 1 || pageNumber > totalRecipePages) {
            return;
        }

        setCurrentRecipesPage(pageNumber);
    };

    const changeArticlesPage = async (pageNumber) => {

        if (pageNumber < 1 || pageNumber > totalArticlePages) {
            return;
        }

        setCurrentArticlesPage(pageNumber);
    };

    const changeUnitsPage = async (pageNumber) => {

        if (pageNumber < 1 || pageNumber > totalUnitPages) {
            return;
        }

        setCurrentUnitsPage(pageNumber);
    };

    return (
        <PageLayout>
            <BannerImage />
            <Dashboard>
                <DashboardContainer
                    title={'Your most liked recipes'}
                    perPage={perPage}
                    totalCount={totalRecipesCount}
                    currentPage={currentRecipesPage}
                    totalPages={totalRecipePages}
                    changePage={changeRecipesPage}
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
                </DashboardContainer>
                <DashboardContainer
                    title={'Your most discussed articles'}
                    perPage={perPage}
                    totalCount={totalArticlesCount}
                    currentPage={currentArticlesPage}
                    totalPages={totalArticlePages}
                    changePage={changeArticlesPage}
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
                <DashboardContainer
                    title={'Measurement units'}
                    perPage={perPage}
                    totalCount={totalUnitsCount}
                    currentPage={currentUnitsPage}
                    totalPages={totalUnitPages}
                    changePage={changeUnitsPage}
                >
                    {units && units.map((unit) =>
                        <ListEditable
                            key={unit._id}
                            id={unit._id}
                            title={unit.name}
                            entityType={'unit'}
                            entities={units}
                            stateUpdate={setUnits}
                        />
                    )}
                </DashboardContainer>
            </Dashboard>
            <Header />
            <Footer />
        </PageLayout>
    );
};


export default AdminPage;