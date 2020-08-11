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


const EditRecipePage = () => {

    const recipeId = useParams();

    const [title, setTitle] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [shortDescriptionState, setShortDescriptionState] = useState(EditorState.createEmpty());
    const [stepsState, setStepsState] = useState(EditorState.createEmpty());
    const [units, setUnits] = useState([]);
    const [ingredients, setIngredients] = useState([]);
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

    const history = useHistory();

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

    useEffect(() => {
        const getUnits = async () => {
            const res = await Axios.get('http://localhost:5000/api/unit/all');
            setUnits(res.data);
        }
        getUnits();
    }, []);

    useEffect(() => {
        const getIngredients = async () => {
            const res = await Axios.get('http://localhost:5000/api/ingredient/all');
            setIngredients(res.data);
        }
        getIngredients();
    }, []);

    const addIngredientSection = () => {
        const newIngredientSection = `section-${ingredientSections.length}`;
        setIngredientSections([...ingredientSections, {
            _id: newIngredientSection,
            name: '',
            quantities: [''],
            units: [''],
            ingredients: ['']
        }]);
    };

    const removeIngredientSection = () => {

        if (ingredientSections.length === 1) {
            return;
        }

        //remove the last ingredient section from the state
        const newIngredientSections = [...ingredientSections];
        newIngredientSections.splice((newIngredientSections.length - 1), 1);
        setIngredientSections(newIngredientSections);
    };

    const handleInput = (newSectionState) => {
        const newIngredientSections = ingredientSections.map((section) => {
            if (section._id === newSectionState._id) {
                return newSectionState
            }
            return section;
        });
        setIngredientSections(newIngredientSections);
    };

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
                addIngredientSection={addIngredientSection}
                removeIngredientSection={removeIngredientSection}
                ingredientSections={ingredientSections}
                units={units}
                ingredients={ingredients}
                handleInput={handleInput}
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
        </PageLayout>
    );
};


export default EditRecipePage;