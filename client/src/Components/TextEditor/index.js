import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import styled from 'styled-components';
import Toolbar from './Toolbar';


export default function TextEditor(props) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const EditorContainer = styled.div`
    min-width: auto;
    min-height: 200px;
    background-color: white;
    border: 1px solid black;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    `

    const EditorWrapper = styled.div`
    width: 800px;
    `

    return (
        <EditorWrapper>
            <Toolbar
                editorState={editorState}
                setEditorState={setEditorState}
            />
            <EditorContainer>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                />
            </EditorContainer>
        </EditorWrapper>
    );
}