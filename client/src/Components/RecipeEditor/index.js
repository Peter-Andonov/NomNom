import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import styled from 'styled-components';
import { EditorState, convertToRaw } from 'draft-js';
import * as utils from '../../Utils/user';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import IngredientsTable from './IngredientsTable';
import addIcon from '../../Images/Icons/add-24px.svg';
import removeIcon from '../../Images/Icons/remove-24px.svg';


const Wrapper = styled.div`
    position: absolute;
    top: 30vh;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ErrorMessage = styled.div`
    font-size: 1rem;
    color: red;
`;

const SectionIcon = styled.img`
    margin-left: 0.5rem;
    &:hover{
        cursor: pointer;
    }
`;

const StyledInput = styled.input`
    font-size: 1.2rem;
    width: 6.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 2px solid black;
`;

const StyledSelect = styled.select`
    font-size: 1.2rem;
    width: 7.8rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 2px solid black;
`;

const InfoLabel = styled.div`
    padding-left: 0.5rem;
    width: 12rem;
`;

const Button = styled.button`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-right: 1rem;
    padding-bottom: 0.5rem;
    background: rgb(255, 151, 23);
    border: none;
    border-radius: 20px;
    color: white;
    font-family: 'Sriracha', cursive;
    font-size: 1.5rem;
    &:focus {
        outline: none;
    };
    &:hover {
        cursor: pointer;
    };
`;


const RecipeEditor = () => {

    const [title, setTitle] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [deleteToken, setDeleteToken] = useState('');
    const [shortDescriptionState, setShortDescriptionState] = useState(EditorState.createEmpty());
    const [stepsState, setStepsState] = useState(EditorState.createEmpty());
    const [units, setUnits] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientSections, setIngredientSections] = useState([{
        id: 'section-0',
        name: '',
        quantities: [],
        units: [],
        ingredients: []
    }]);
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [serves, setServes] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();


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
            id: newIngredientSection,
            name: '',
            quantities: [],
            units: [],
            ingredients: []
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
            if (section.id === newSectionState.id) {
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
            setErrorMessage('Something went wrong');
        });
    };

    return (
        <Wrapper>
            <h1>Create Recipe</h1>
            <h3>Recipe Title</h3>
            <Input
                value={title}
                onChange={setTitle} />
            <h3>Cover Image</h3>
            <ImageSelector
                imageUrl={coverImageUrl}
                setImageUrl={setCoverImageUrl}
                deleteToken={deleteToken}
                setDeleteToken={setDeleteToken}
            />
            <h3>Short Description</h3>
            <TextEditor
                editorState={shortDescriptionState}
                setEditorState={setShortDescriptionState}
            />
            <h3>Steps to create</h3>
            <TextEditor
                editorState={stepsState}
                setEditorState={setStepsState}
            />
            <Container>
                <h3>Ingredient Sections</h3>
                <SectionIcon src={addIcon} onClick={addIngredientSection} />
                <SectionIcon src={removeIcon} onClick={removeIngredientSection} />
            </Container>
            <Container>
                {ingredientSections.map((section, idx) =>
                    <IngredientsTable
                        key={section.id}
                        units={units}
                        ingredients={ingredients}
                        sectionState={ingredientSections[idx]}
                        handleInput={handleInput}
                    />)}
            </Container>
            <h3>Additional recipe information</h3>
            <Column>
                <Container>
                    <InfoLabel>Time to prepare</InfoLabel>
                    <StyledInput
                        type='number'
                        value={prepTime}
                        onChange={(e) => setPrepTime(e.target.value)}
                    />
                    <InfoLabel>min</InfoLabel>
                </Container>
                <Container>
                    <InfoLabel>Time to cook</InfoLabel>
                    <StyledInput
                        type='number'
                        value={cookTime}
                        onChange={(e) => setCookTime(e.target.value)}
                    />
                    <InfoLabel>min</InfoLabel>
                </Container>
                <Container>
                    <InfoLabel>Serves</InfoLabel>
                    <StyledInput
                        type='number'
                        value={serves}
                        onChange={(e) => setServes(e.target.value)}
                    />
                    <InfoLabel>people</InfoLabel>
                </Container>
                <Container>
                    <InfoLabel>Difficulty</InfoLabel>
                    <StyledSelect defaultValue={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="" hidden >Difficulty</option>
                        <option value="easy" >Easy</option>
                        <option value="medium" >Medium</option>
                        <option value="hard" >Hard</option>
                    </StyledSelect>
                    <InfoLabel></InfoLabel>
                </Container>
            </Column>
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Button onClick={saveRecipe} >Save recipe</Button>
        </Wrapper>
    );
};


export default RecipeEditor;