import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { useParams } from 'react-router';
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import * as utils from '../../Utils/user';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import ArticleEditor from '../../Components/ArticleEditor';
import Footer from '../../Components/Footer';


const EditArticlePage = () => {

    const articleId = useParams();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        Axios('http://localhost:5000/api/article', {
            method: 'GET',
            params: {
                id: articleId.id
            }
        }).then((res) => {
            setTitle(res.data.title);

            const bodyContentState = convertFromRaw(JSON.parse(res.data.body));
            setEditorState(EditorState.createWithContent(bodyContentState));
        }).catch((err) => {
            setError(true);
            setErrorMessage('There was an error while loading article data');
        });
    }, [articleId.id]);

    const saveArticle = async (e) => {

        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        const data = {
            id: articleId.id,
            title: title,
            imageUrl: imageUrl,
            body: body
        };

        Axios('http://localhost:5000/api/article', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, data: data
        }).then(() => {
            history.push('/admin');
        }).catch((err) => {
            setError(true);
            setErrorMessage(err.response.data.message);
        });
    };

    return (
        <PageLayout>
            <BannerImage />
            <ArticleEditor 
                pageTitle={'Edit Article'}
                title={title}
                setTitle={setTitle}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                editorState={editorState}
                setEditorState={setEditorState}
                error={error}
                setError={setError}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                onSubmit={saveArticle}
            />
            <Header />
            <Footer />
        </PageLayout>
    );
};


export default EditArticlePage;