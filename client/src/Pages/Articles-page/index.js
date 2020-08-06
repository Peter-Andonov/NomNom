import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import FlexLister from '../../Components/FlexLister';
import PageInfo from '../../Components/PageInfo';
import Pagination from '../../Components/Pagination';
import ArticleCard from '../../Components/ArticleCard';


const ArticlesPage = () => {

    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const perPage = 10;
    const totalPages = Math.ceil(totalArticles / perPage);

    useEffect(() => {
        const getArticles = async () => {
            const res = await Axios.get(`http://localhost:5000/api/article/all?page=${currentPage}&perPage=${perPage}`);
            setArticles(res.data.articles);
            setTotalArticles(res.data.totalArticlesCount);
        }
        getArticles();
    }, [currentPage]);

    const changePage = async (pageNumber) => {

        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }

        setCurrentPage(pageNumber);
    };

    return (
        <PageLayout>
            <HeaderImage />
            <PageInfo title='Articles' />
            <FlexLister>
                {articles.map((article) =>
                    <ArticleCard
                        key={article._id}
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