import React from 'react';
import { Editor } from 'draft-js';
import styled from 'styled-components';
import Toolbar from './Toolbar';


const EditorContainer = styled.div`
    min-width: auto;
    min-height: 200px;
    background-color: white;
    border: 1px solid black;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const EditorWrapper = styled.div`
    width: 800px;
`;


const TextEditor = (props) => {

    return (
        <EditorWrapper>
            <Toolbar
                editorState={props.editorState}
                setEditorState={props.setEditorState}
            />
            <EditorContainer>
                <Editor
                    editorState={props.editorState}
                    onChange={props.setEditorState}
                />
            </EditorContainer>
        </EditorWrapper>
    );
};


export default TextEditor;