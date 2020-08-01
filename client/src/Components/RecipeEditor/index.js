import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { EditorState, convertToRaw } from 'draft-js';
import UserContext from '../../Context';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import IngredientsTable from './IngredientsTable';


const Wrapper = styled.div`
    padding-bottom: 10rem;
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
    align-items: center;
    justify-content: center;
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

    const user = useContext(UserContext);


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
        const newIngredientSections = ingredientSections.map((section) =>{
            if (section.id === newSectionState.id) {
                return newSectionState
            }
            return section;
        });
        setIngredientSections(newIngredientSections);
    };

    const saveRecipe = async () => {
        const shortDescription = convertToRaw(shortDescriptionState.getCurrentContent());
        const stepsToCreate = convertToRaw(stepsState.getCurrentContent());
        const data = {
            title,
            coverImageUrl,
            shortDescription,
            stepsToCreate,
            ingredientSections,
            prepTime,
            cookTime,
            createdBy: user._id
        }
        const res = await Axios.post('http://localhost:5000/api/recipe', data);

        console.log(res);
    };

    return (
        <Wrapper>
        {console.log(ingredientSections)}
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
            <Container>
                <h3>Ingredient Sections</h3>
                <button onClick={addIngredientSection} >Add section</button>
                <button onClick={removeIngredientSection} >Remove section</button>
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
            <h3>Add time measurements</h3>
            <Container>
            <input
                placeholder='Time to prepare'
                type='number'
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
            />
            <input
                placeholder='Time to cook'
                type='number'
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
            />
            </Container>
            <button onClick={saveRecipe} >Save recipe</button>
        </Wrapper>
    );
};


export default RecipeEditor;