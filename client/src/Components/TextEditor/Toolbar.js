import React from 'react';
import styled from 'styled-components';
import { RichUtils } from 'draft-js';
import { inlineStyles, blockStyles } from './constants';
import ToolbarItem from './ToolbarItem';


export default function Toolbar(props) {

    const { editorState, setEditorState } = props;

    const applyInlineStyle = (style, e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    const applyBlockStyle = (style, e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, style));
    }

    const Wrapper = styled.div`
    position: relative;
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
                    name={inlineStyle.name}
                    onClick={(e) => applyInlineStyle(inlineStyle.style, e)}
                    icon={inlineStyle.icon} 
                    />
            })}
            {blockStyles.map((blockStyle) => {
                return <ToolbarItem
                    key={blockStyle.name}
                    name={blockStyle.name}
                    onClick={(e) => applyBlockStyle(blockStyle.style, e)}
                    icon={blockStyle.icon} 
                    text={blockStyle.text}
                    />
            })}
        </Wrapper>
    );
}