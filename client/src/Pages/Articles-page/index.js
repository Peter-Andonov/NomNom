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


const ArticlesPage = () => {

    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const perPage = 10;
    const totalPages = Math.ceil(totalArticles / perPage);

    const getArticles = () => {
        Axios(`http://localhost:5000/api/article/all`, {
            method: "GET",
            params: {
                search: search,
                page: currentPage,
                perPage: perPage,
                sortCrit: 'createdAt',
                sortOrd: 'desc'
            }
        }).then((res) => {
            setArticles(res.data.articles);
            setTotalArticles(res.data.totalArticlesCount);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getArticles();
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
            <PageInfo title='Articles' />
            <Search
                value={search}
                onChange={setSearch}
                onSearch={getArticles}
            />
            <FlexLister>
                {articles && articles.map((article) =>
                    <ArticleCard
                        key={article._id}
                        entity={'article'}
                        id={article._id}
                        title={article.title}
                        imageUrl={article.imageUrl}
                    />)}
            </FlexLister>
            {totalArticles > perPage ?
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    changePage={changePage}
                /> : ''}
            <Header />
        </PageLayout>
    );
};

export default ArticlesPage;