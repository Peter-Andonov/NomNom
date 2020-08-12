import React from 'react';
import styled from 'styled-components';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import Submit from '../RegisterForm/Submit';


const Wrapper = styled.form`
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorMessage = styled.div`
    font-size: 1rem;
    color: red;
`;


const IngredientEditor = (props) => {

    return (
        <Wrapper onSubmit={props.action}>
            <h1>Create Ingredient</h1>
            <h3>Name</h3>
            <Input
                value={props.name}
                onChange={props.setName}
            />
            <h3>Cover Image</h3>
            <ImageSelector
                imageUrl={props.imageUrl}
                setImageUrl={props.setImageUrl}
            />
            <h3>Description</h3>
            <TextEditor
                editorState={props.editorState}
                setEditorState={props.setEditorState}
            />
            {props.error && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
            <Submit label={'Save Ingredient'} />
        </Wrapper>
    );
};


export default IngredientEditor;