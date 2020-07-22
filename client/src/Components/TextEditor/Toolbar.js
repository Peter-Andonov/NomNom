import React, { useState } from 'react';
import styled from 'styled-components';
import { RichUtils } from 'draft-js';
import { inlineStyles, blockStyles, enableLink } from './constants';
import ToolbarItem from './ToolbarItem';
import URLInput from './URLInput';


export default function Toolbar(props) {

    const { editorState, setEditorState } = props

    const [showURLInput, setShowURLInput] = useState(false);
    const [URLvalue, setURLvalue] = useState('');

    const applyInlineStyle = (style, e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    const applyBlockStyle = (style, e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, style));
    }

    const promptForUrlInput = (e) => {
        e.preventDefault();
        setShowURLInput(true);
    }

    const Wrapper = styled.div`
    width: ${props => props.width ? props.width : 'auto'};
    height: 50px;
    background-color: rgb(31, 57, 83);
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    `

    return (
        <Wrapper>
            {inlineStyles.map((inlineStyle) => {
                return <ToolbarItem
                    key={inlineStyle.name}
                    onClick={(e) => applyInlineStyle(inlineStyle.style, e)}
                    icon={inlineStyle.icon} />
            })}
            {blockStyles.map((blockStyle) => {
                return <ToolbarItem
                    key={blockStyle.name}
                    onClick={(e) => applyBlockStyle(blockStyle.style, e)}
                    icon={blockStyle.icon} />
            })}
            <ToolbarItem
                key={enableLink.name}
                onClick={(e) => promptForUrlInput(e)}
                icon={enableLink.icon}
            />
            {showURLInput && <URLInput />}
        </Wrapper>
    );
}