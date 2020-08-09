import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import styled from 'styled-components';
import { EditorState, convertToRaw } from 'draft-js';
import * as utils from '../../Utils/user';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import Submit from '../RegisterForm/Submit';


const Wrapper = styled.form`
    position: absolute;
    top: 30vh;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorMessage = styled.div`
    font-size: 1rem;
    color: red;
`;


const ArticleEditor = () => {

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
        <Wrapper onSubmit={saveArticle}>
            <h1>Create Article</h1>
            <h3>Title</h3>
            <Input
                value={title}
                onChange={setTitle}
            />
            <h3>Cover Image</h3>
            <ImageSelector
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                deleteToken={deleteToken}
                setDeleteToken={setDeleteToken}
            />
            <h3>Article Body</h3>
            <TextEditor
                editorState={editorState}
                setEditorState={setEditorState}
            />
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Submit label={'Save Article'} />
        </Wrapper>
    );
};


export default ArticleEditor;