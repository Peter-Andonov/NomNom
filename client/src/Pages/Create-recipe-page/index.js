import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import * as utils from '../../Utils/user';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import RecipeEditor from '../../Components/RecipeEditor';
import Footer from '../../Components/Footer';


const CreateRecipePage = () => {

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [shortDescriptionState, setShortDescriptionState] = useState(EditorState.createEmpty());
    const [stepsState, setStepsState] = useState(EditorState.createEmpty());
    const [ingredientSections, setIngredientSections] = useState([{
        _id: 'section-0',
        name: '',
        quantities: [''],
        units: [''],
        ingredients: ['']
    }]);
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [serves, setServes] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const saveRecipe = async () => {

        const authToken = utils.getCookieByName('auth-token');

        const shortDescription = JSON.stringify(convertToRaw(shortDescriptionState.getCurrentContent()));
        const stepsToCreate = JSON.stringify(convertToRaw(stepsState.getCurrentContent()));

        const data = {
            title,
            coverImageUrl,
            shortDescription,
            stepsToCreate,
            ingredientSections,
            prepTime,
            cookTime,
            serves,
            difficulty,
        };

        Axios('http://localhost:5000/api/recipe', {
            method: 'POST',
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
            <RecipeEditor
                pageTitle={'Create recipe'}
                title={title}
                setTitle={setTitle}
                coverImageUrl={coverImageUrl}
                setCoverImageUrl={setCoverImageUrl}
                shortDescriptionState={shortDescriptionState}
                setShortDescriptionState={setShortDescriptionState}
                stepsState={stepsState}
                setStepsState={setStepsState}
                ingredientSections={ingredientSections}
                setIngredientSections={setIngredientSections}
                prepTime={prepTime}
                setPrepTime={setPrepTime}
                cookTime={cookTime}
                setCookTime={setCookTime}
                serves={serves}
                setServes={setServes}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                error={error}
                errorMessage={errorMessage}
                action={saveRecipe}
            />
            <Header />
            <Footer />
        </PageLayout>
    );
};


export default CreateRecipePage;