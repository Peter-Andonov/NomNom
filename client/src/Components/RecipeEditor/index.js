import React from 'react';
import styled from 'styled-components';
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
                deleteToken={props.deleteToken}
                setDeleteToken={props.setDeleteToken}
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
                <SectionIcon src={addIcon} onClick={props.addIngredientSection} />
                <SectionIcon src={removeIcon} onClick={props.removeIngredientSection} />
            </Container>
            <Container>
                {props.ingredientSections.map((section, idx) =>
                    <IngredientsTable
                        key={section._id}
                        units={props.units}
                        ingredients={props.ingredients}
                        sectionState={props.ingredientSections[idx]}
                        handleInput={props.handleInput}
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