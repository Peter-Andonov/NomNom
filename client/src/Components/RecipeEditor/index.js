import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { EditorState, convertToRaw } from 'draft-js';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import IngredientsTable from './IngredientsTable';


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


const RecipeEditor = () => {

    const [title, setTitle] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [deleteToken, setDeleteToken] = useState('');
    const [shortDescriptionState, setShortDescriptionState] = useState(EditorState.createEmpty());
    const [stepsState, setStepsState] = useState(EditorState.createEmpty());
    const [units, setUnits] = useState([]);
    const [ingredients, setIngredients] = useState([]);


    useEffect(() => {
        const getUnits = async () => {
            const res = await Axios.get('http://localhost:5000/api/unit/all');
            setUnits(res.data);
        }
        getUnits();
    }, [])

    useEffect(() => {
        const getIngredients = async () => {
            const res = await Axios.get('http://localhost:5000/api/ingredient/all');
            setIngredients(res.data);
        }
        getIngredients();
    }, [])

    return (
        <Wrapper>
            <h1>Create Recipe</h1>
            <h3>Add Recipe Title</h3>
            <Input
                value={title}
                onChange={setTitle} />
            <h3>Add Main Image</h3>
            <ImageSelector
                imageUrl={coverImageUrl}
                setImageUrl={setCoverImageUrl}
                deleteToken={deleteToken}
                setDeleteToken={setDeleteToken}
            />
            <h3>Add Short Description</h3>
            <TextEditor
                editorState={shortDescriptionState}
                setEditorState={setShortDescriptionState}
            />
            <h3>Add Steps to create</h3>
            <TextEditor
                editorState={stepsState}
                setEditorState={setStepsState}
            />
            <h3>Add Ingredients</h3>
            <IngredientsTable
                units={units}
                ingredients={ingredients}
            />
        </Wrapper>
    );
};


export default RecipeEditor;