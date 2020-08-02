import React, { useState, useEffect }from 'react';
import Axios from 'axios';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import Header from '../../Components/UserHeader';
import FlexLister from '../../Components/FlexLister';
import PageInfo from '../../Components/PageInfo';
import ArticleCard from '../../Components/ArticleCard';


const ArticlesPage = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            const res = await Axios.get('http://localhost:5000/api/article/all');
            setArticles(res.data);
        }
        getArticles();
    }, []);

    return (
        <PageLayout>
            <HeaderImage />
            <Header />
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
        </PageLayout>
    );
};

export default ArticlesPage;