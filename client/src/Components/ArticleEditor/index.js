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


const ArticleEditor = () => {

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [deleteToken, setDeleteToken] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const user = useContext(UserContext);

    const saveArticle = async () => {

        const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        const data = {
            userId: user._id,
            title: title,
            imageUrl: imageUrl,
            body: body
        };

        const res = await Axios.post('http://localhost:5000/api/article', data);

        console.log(res)
    }

    return (
        <Wrapper>
            <h1>Create Article</h1>
            <h3>Add Article Title</h3>
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
            <h3>Add Article Body</h3>
            <TextEditor
                editorState={editorState}
                setEditorState={setEditorState}
            />
            <button onClick={saveArticle} >Save</button>
        </Wrapper>
    );
};


export default ArticleEditor;