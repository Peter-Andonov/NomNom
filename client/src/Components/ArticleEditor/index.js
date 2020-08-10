import React from 'react';
import styled from 'styled-components';
import TextEditor from '../TextEditor';
import ImageSelector from '../ImageSelector';
import Input from '../RegisterForm/Input';
import Submit from '../RegisterForm/Submit';


const Wrapper = styled.form`
    position: absolute;
    top: 30vh;
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


const ArticleEditor = (props) => {

    return (
        <Wrapper onSubmit={props.onSubmit}>
            <h1>Create Article</h1>
            <h3>Title</h3>
            <Input
                value={props.title}
                onChange={props.setTitle}
            />
            <h3>Cover Image</h3>
            <ImageSelector
                imageUrl={props.imageUrl}
                setImageUrl={props.setImageUrl}
                deleteToken={props.deleteToken}
                setDeleteToken={props.setDeleteToken}
            />
            <h3>Article Body</h3>
            <TextEditor
                editorState={props.editorState}
                setEditorState={props.setEditorState}
            />
            {props.error && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
            <Submit label={'Save Article'} />
        </Wrapper>
    );
};


export default ArticleEditor;