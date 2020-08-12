import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import * as utils from '../../Utils/user';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import IngredientEditor from '../../Components/IngredientEditor';
import Footer from '../../Components/Footer';


const CreateIngredientPage = () => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const saveIngredient = (e) => {

        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        const description = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        const data = {
            name: name,
            imageUrl: imageUrl,
            description: description
        };

        Axios('http://localhost:5000/api/ingredient', {
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
            <Footer />
        </PageLayout>
    );
};


export default CreateIngredientPage;