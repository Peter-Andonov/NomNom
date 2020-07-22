import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';
import Toolbar from './Toolbar';


export default function TextEditor(props) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const EditorContainer = styled.div`
    background-color: white;
    border: 1px solid black;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    `

    const EditorWrapper = styled.div`
    width: ${props => props.width ? props.width : 'auto'};
    height: ${props => props.height ? props.height : 'auto'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    `

    return (
        <EditorWrapper>
            <Toolbar
                width={props.width}
                height={props.height}
                editorState={editorState}
                setEditorState={setEditorState}
            />
            <EditorContainer>
                <Editor editorState={editorState} onChange={setEditorState} />
            </EditorContainer>
        </EditorWrapper>
    );
}