import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import IngredientsTable from './IngredientsTable';
import addIcon from '../../Images/Icons/add-24px.svg';
import removeIcon from '../../Images/Icons/remove-24px.svg';


const Wrapper = styled.div`
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    margin-top: 0.5rem;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: left;
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


const RecipeEditor = (props) => {

    const [allUnits, setAllUnits] = useState([]);
    const [allIngredients , setAllIngredients] = useState([]);


    useEffect(() => {
        Axios(`http://localhost:5000/api/ingredient/all`, {
            method: "GET",
            params: {
                sortCrit: 'name',
                sortOrd: 'asc'
            }
        }).then((res) => {
            setAllIngredients(res.data.ingredients);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        Axios(`http://localhost:5000/api/unit/all`, {
            method: "GET",
            params: {
                sortCrit: 'name',
                sortOrd: 'asc'
            }
        }).then((res) => {
            setAllUnits(res.data.units);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const addIngredientSection = () => {
        const newIngredientSection = `section-${props.ingredientSections.length}`;
        props.setIngredientSections([...props.ingredientSections, {
            _id: newIngredientSection,
            name: '',
            quantities: [''],
            units: [''],
            ingredients: ['']
        }]);
    };

    const removeIngredientSection = () => {

        if (props.ingredientSections.length === 1) {
            return;
        };

        //remove the last ingredient section from the state
        const newIngredientSections = [...props.ingredientSections];
        newIngredientSections.splice((newIngredientSections.length - 1), 1);
        props.setIngredientSections(newIngredientSections);
    };

    const addInputRow = (idx) => {
        const newState = [...props.ingredientSections];

        newState[idx].quantities.push('')
        newState[idx].units.push('')
        newState[idx].ingredients.push('')
        props.setIngredientSections(newState);
    };

    const removeInputRow = (idx) => {

        const newState = [...props.ingredientSections];

        if (newState[idx].ingredients.length <= 1) {
            return;
        };

        newState[idx].quantities.splice((newState[idx].quantities.length - 1), 1);
        newState[idx].units.splice((newState[idx].units.length - 1), 1);
        newState[idx].ingredients.splice((newState[idx].ingredients.length - 1), 1);

        props.setIngredientSections(newState);
    };

    const handleInput = (newSectionState) => {
        const newIngredientSections = props.ingredientSections.map((section) => {
            if (section._id === newSectionState._id) {
                return newSectionState
            }
            return section;
        });
        props.setIngredientSections(newIngredientSections);
    };

    return (
        <Wrapper>
            <h1>Create Recipe</h1>
            <h3>Recipe Title</h3>
            <Input
                value={props.title}
                onChange={props.setTitle} />
            <h3>Cover Image</h3>
            <ImageSelector
                imageUrl={props.coverImageUrl}
                setImageUrl={props.setCoverImageUrl}
            />
            <h3>Short Description</h3>
            <TextEditor
                editorState={props.shortDescriptionState}
                setEditorState={props.setShortDescriptionState}
            />
            <h3>Steps to create</h3>
            <TextEditor
                editorState={props.stepsState}
                setEditorState={props.setStepsState}
            />
            <Container>
                <h3>Ingredient Sections</h3>
                <SectionIcon src={addIcon} onClick={addIngredientSection} />
                <SectionIcon src={removeIcon} onClick={removeIngredientSection} />
            </Container>
            <Container>
                {props.ingredientSections && props.ingredientSections.map((section, idx) =>
                    <IngredientsTable
                        key={section._id}
                        idx={idx}
                        units={allUnits}
                        ingredients={allIngredients}
                        sectionState={props.ingredientSections[idx]}
                        handleInput={handleInput}
                        addInputRow={addInputRow}
                        removeInputRow={removeInputRow}
                    />)}
            </Container>
            <h3>Additional recipe information</h3>
            <Column>
                <Container>
                    <InfoLabel>Time to prepare</InfoLabel>
                    <StyledInput
                        type='number'
                        value={props.prepTime}
                        onChange={(e) => props.setPrepTime(e.target.value)}
                    />
                    <InfoLabel>min</InfoLabel>
                </Container>
                <Container>
                    <InfoLabel>Time to cook</InfoLabel>
                    <StyledInput
                        type='number'
                        value={props.cookTime}
                        onChange={(e) => props.setCookTime(e.target.value)}
                    />
                    <InfoLabel>min</InfoLabel>
                </Container>
                <Container>
                    <InfoLabel>Serves</InfoLabel>
                    <StyledInput
                        type='number'
                        value={props.serves}
                        onChange={(e) => props.setServes(e.target.value)}
                    />
                    <InfoLabel>people</InfoLabel>
                </Container>
                <Container>
                    <InfoLabel>Difficulty</InfoLabel>
                    <StyledSelect
                    value={props.difficulty}
                    onChange={(e) => props.setDifficulty(e.target.value)}>
                        <option value="" hidden >Difficulty</option>
                        <option value="easy" >Easy</option>
                        <option value="medium" >Medium</option>
                        <option value="hard" >Hard</option>
                    </StyledSelect>
                    <InfoLabel></InfoLabel>
                </Container>
            </Column>
            {props.error && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
            <Button onClick={props.action} >Save recipe</Button>
        </Wrapper>
    );
};


export default RecipeEditor;