import React, { useState, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { EditorState, convertToRaw } from 'draft-js';
import UserContext from '../../Context';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';


const Wrapper = styled.div`
    position: absolute;
    padding-bottom: 5rem;
    top: 30vh;
    background-color: white;
    height: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const IngredientEditor = () => {

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [deleteToken, setDeleteToken] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const user = useContext(UserContext);

    const printState = () => {
        console.log(user);
    }

    const saveIngredient = async () => {

        const description = convertToRaw(editorState.getCurrentContent());

        const data = {
            userId: user._id,
            name: title,
            imageUrl: imageUrl,
            description: description
        };

        await Axios.post('http://localhost:5000/api/ingredient', data);
    }

    return (
        <Wrapper>
            <h1>Create Ingredient</h1>
            <h3>Add Ingredient Title</h3>
            <Input
                value={title}
                onChange={setTitle}
            />
            <h3>Add Cover Image</h3>
            <ImageSelector
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                deleteToken={deleteToken}
                setDeleteToken={setDeleteToken}
            />
            <h3>Add Description</h3>
            <TextEditor
                editorState={editorState}
                setEditorState={setEditorState}
            />
            <button onClick={printState} >print state</button>
            <button onClick={saveIngredient} >Save</button>
        </Wrapper>
    );
};


export default IngredientEditor;