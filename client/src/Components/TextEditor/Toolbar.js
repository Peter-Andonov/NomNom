import React from 'react';
import styled from 'styled-components';
import { RichUtils } from 'draft-js';
import { inlineStyles, blockStyles } from './constants';
import ToolbarItem from './ToolbarItem';


export default function Toolbar(props) {

    const { editorState, setEditorState } = props

    const applyInlineStyle = (style, e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    const applyBlockStyle = (style, e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, style));
    }

    return (
        <div>
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
        </div>
    );
}