import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import FlexLister from '../../Components/FlexLister';
import PageInfo from '../../Components/PageInfo';
import Pagination from '../../Components/Pagination';
import ArticleCard from '../../Components/ArticleCard';
import Search from '../../Components/Search';


const IngredientsPage = () => {

    const [ingredients, setIngredients] = useState([]);
    const [totalIngredients, setTotalIngredients] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const perPage = 10;
    const totalPages = Math.ceil(totalIngredients / perPage);

    const getIngredients = () => {
        Axios(`http://localhost:5000/api/ingredient/all`, {
            method: "GET",
            params: {
                search: search,
                page: currentPage,
                perPage: perPage,
                sortCrit: 'createdAt',
                sortOrd: 'desc'
            }
        }).then((res) => {
            setIngredients(res.data.ingredients);
            setTotalIngredients(res.data.totalIngredientsCount);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getIngredients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <PageInfo title='Ingredients' />
            <Search
                value={search}
                onChange={setSearch}
                onSearch={getIngredients}
            />
            <FlexLister>
                {ingredients && ingredients.map((ingredient) =>
                    <ArticleCard
                        key={ingredient._id}
                        entity={'ingredient'}
                        id={ingredient._id}
                        title={ingredient.name}
                        imageUrl={ingredient.imageUrl}
                    />)}
            </FlexLister>
            {totalIngredients > perPage ?
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    changePage={changePage}
                /> : ''}
            <Header />
        </PageLayout>
    );
};

export default IngredientsPage;