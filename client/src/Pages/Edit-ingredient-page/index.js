import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import * as utils from '../../Utils/user';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import IngredientEditor from '../../Components/IngredientEditor';


const EditIngredientPage = () => {

    const history = useHistory();
    const ingredientId = useParams();

    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        Axios('http://localhost:5000/api/ingredient', {
            method: 'GET',
            params: {
                id: ingredientId.id
            }
        }).then((res) => {
            setName(res.data.name);

            setImageUrl(res.data.imageUrl);

            const descriptionContentState = convertFromRaw(JSON.parse(res.data.description));
            setEditorState(EditorState.createWithContent(descriptionContentState));
        }).catch((err) => {
            console.log(err)
        });
    }, [ingredientId.id]);

    const saveIngredient = (e) => {

        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        const description = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        const data = {
            id: ingredientId.id,
            name: name,
            imageUrl: imageUrl,
            description: description
        };

        Axios('http://localhost:5000/api/ingredient', {
            method: 'PATCH',
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
            <BannerImage />
            <IngredientEditor
                name={name}
                setName={setName}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                editorState={editorState}
                setEditorState={setEditorState}
                error={error}
                setError={setError}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                action={saveIngredient}
            />
            <Header />
        </PageLayout>
    );
};


export default EditIngredientPage;