import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import IngredientSection from './IngredientSection';


const Wrapper = styled.div`
    padding: 5rem;
    position: absolute;
    top: 30vh;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: left;
`;

const Aside = styled.aside`
    flex: 1;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Main = styled.main`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: left;
`;

const RecipeDetails = () => {

    const recipeId = useParams();

    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState(EditorState.createEmpty());
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [stepsToCreate, setStepsToCreate] = useState(EditorState.createEmpty());
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const getRecipe = async () => {

            const res = await Axios.get('http://localhost:5000/api/recipe', {
                params: {
                    id: recipeId.id
                }
            });

            setTitle(res.data.title);
            console.log(res.data)

            const shortDescriptionContentState = convertFromRaw(JSON.parse(res.data.shortDescription));
            setShortDescription(EditorState.createWithContent(shortDescriptionContentState));

            setCoverImageUrl(res.data.coverImageUrl);

            const stepsToCreateContentState = convertFromRaw(JSON.parse(res.data.stepsToCreate));
            setStepsToCreate(EditorState.createWithContent(stepsToCreateContentState));

            setIngredients(res.data.ingredientSets);
        };
        getRecipe();
    }, []);

    return (
        <Wrapper>
            <h1>{title}</h1>
            <Editor editorState={shortDescription} readOnly={true} />
            <Container>
                <Aside>
                    <h3>Ingredients</h3>
                    {ingredients.map((ingredientSet) =>
                        <IngredientSection
                            key={ingredientSet._id}
                            name={ingredientSet.name}
                            quantitiesArr={ingredientSet.quantities}
                            unitsArr={ingredientSet.units}
                            ingredientsArr={ingredientSet.ingredients}
                        />)}
                </Aside>
                <Main>
                    <h3>How to prepare</h3>
                    <img src={coverImageUrl} alt='Recipe' />
                    <Editor editorState={stepsToCreate} readOnly={true} />
                </Main>
            </Container>
        </Wrapper>
    );
};


export default RecipeDetails;