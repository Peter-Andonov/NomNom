import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import "draft-js/dist/Draft.css";
import styled from 'styled-components';
import Toolbar from './Toolbar';
import LinkInput from './LinkInput';


export default function TextEditor() {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty()
    );
    const [showURLInput, setShowURLInput] = useState(false);
    const [URLvalue, setURLvalue] = useState('');


    function onBoldClick() {
        const nextState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
        setEditorState(nextState);
    }

    function onItalicClick() {
        const nextState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
        setEditorState(nextState);
    }

    function onUnderlineClick() {
        const nextState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
        setEditorState(nextState);
    }

    function onUlClick() {
        const nextState = RichUtils.toggleBlockType(editorState, 'unordered-list-item');
        setEditorState(nextState);
    }

    function onOlClick() {
        const nextState = RichUtils.toggleBlockType(editorState, 'ordered-list-item');
        setEditorState(nextState);
    }

    function onLinkClick() {
        setShowURLInput(true);
    }

    return (
        <div>
            <Toolbar
                onBoldClick={onBoldClick}
                onItalicClick={onItalicClick}
                onUnderlineClick={onUnderlineClick}
                onUlClick={onUlClick}
                onOlClick={onOlClick}
                onLinkClick={onLinkClick}
            />
            <Editor
                editorState={editorState}
                onChange={setEditorState}
            />
            {showURLInput ? <LinkInput /> : null}
        </div>
    );
}