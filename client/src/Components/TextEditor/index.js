import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import "draft-js/dist/Draft.css";
import styled from 'styled-components';
import Toolbar from './Toolbar';
import URLInput from './URLInput';


export default function TextEditor() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showURLInput, setShowURLInput] = useState(false);
    const [URLvalue, setURLvalue] = useState('');

    const EditorContainer = styled.div`
    width: 800px;
    height: 400px;
    background-color: white;
    min-height: 400px;
    min-width: 800px;
    border: 1px solid black;
    border-radius: 2px;
    `

    const EditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    `

    return (
        <EditorWrapper>
            <Toolbar
                editorState={editorState}
                setEditorState={setEditorState}
            />
            <EditorContainer>
                <Editor editorState={editorState} onChange={setEditorState} />
            </EditorContainer>
        </EditorWrapper>
    );
}