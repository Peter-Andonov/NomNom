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


const ArticleEditor = (props) => {

    return (
        <Wrapper onSubmit={props.onSubmit}>
            <h1>{props.pageTitle}</h1>
            <h3>Title</h3>
            <Input
                testId={'article-title-input'}
                value={props.title}
                onChange={props.setTitle}
            />
            <h3>Cover Image</h3>
            <ImageSelector
                imageUrl={props.imageUrl}
                setImageUrl={props.setImageUrl}
            />
            <h3>Article Body</h3>
            <TextEditor
                testId={'article-body'}
                editorState={props.editorState}
                setEditorState={props.setEditorState}
            />
            {props.error && <ErrorMessage data-testid="article-editor-error" >{props.errorMessage}</ErrorMessage>}
            <Submit
                testId={'article'}
                label={'Save Article'}
            />
        </Wrapper>
    );
};


export default ArticleEditor;