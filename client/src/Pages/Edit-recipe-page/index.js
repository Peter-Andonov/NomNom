import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import * as utils from '../../Utils/user';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import RecipeEditor from '../../Components/RecipeEditor';
import Footer from '../../Components/Footer';


const EditRecipePage = () => {

    const recipeId = useParams();
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


    useEffect(() => {
        Axios('http://localhost:5000/api/recipe', {
            method: 'GET',
            params: {
                id: recipeId.id
            }
        }).then((res) => {
            setTitle(res.data.title);

            const shortDescriptionContentState = convertFromRaw(JSON.parse(res.data.shortDescription));
            setShortDescriptionState(EditorState.createWithContent(shortDescriptionContentState));

            setCoverImageUrl(res.data.coverImageUrl);

            const stepsToCreateContentState = convertFromRaw(JSON.parse(res.data.stepsToCreate));
            setStepsState(EditorState.createWithContent(stepsToCreateContentState));

            setIngredientSections(res.data.ingredientSets);

            setPrepTime(res.data.prepTime);
            setCookTime(res.data.cookTime);
            setServes(res.data.serves);
            setDifficulty(res.data.difficulty);
        }).catch((err) => {
            console.log(err)
        });
    }, [recipeId.id]);

    const saveRecipe = async () => {

        const authToken = utils.getCookieByName('auth-token');

        const shortDescription = JSON.stringify(convertToRaw(shortDescriptionState.getCurrentContent()));
        const stepsToCreate = JSON.stringify(convertToRaw(stepsState.getCurrentContent()));
        
        const data = {
            id: recipeId.id,
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
            <RecipeEditor 
                pageTitle={'Edit recipe'}
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


export default EditRecipePage;