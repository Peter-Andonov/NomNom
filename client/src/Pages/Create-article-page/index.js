import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import * as utils from '../../Utils/user';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import AdminHeader from '../../Components/AdminHeader';
import ArticleEditor from '../../Components/ArticleEditor';


const CreateArticlePage = () => {

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [deleteToken, setDeleteToken] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const saveArticle = async (e) => {

        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        const data = {
            title: title,
            imageUrl: imageUrl,
            body: body
        };

        Axios('http://localhost:5000/api/article', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, data: data
        }).then(() => {
            history.push('/admin');
        }).catch((err) => {
            setError(true);
            setErrorMessage('Something went wrong');
        });
    };

    return (
        <PageLayout>
            <HeaderImage />
            <ArticleEditor 
                pageTitle={'Create Article'}
                title={title}
                setTitle={setTitle}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                deleteToken={deleteToken}
                setDeleteToken={setDeleteToken}
                editorState={editorState}
                setEditorState={setEditorState}
                error={error}
                setError={setError}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                onSubmit={saveArticle}
            />
            <AdminHeader />
        </PageLayout>
    );
};


export default CreateArticlePage;