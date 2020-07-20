import React from 'react';
import styled from 'styled-components';
import { RichUtils } from 'draft-js';
import { inlineStyles } from './constants';
import ToolbarItem from './ToolbarItem';


export default function Toolbar(props) {

    const { editorState, setEditorState } = props

    const applyStyle = (style, e) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    return (
        <div>
            {inlineStyles.map((inlineStyle) => {
                return <ToolbarItem
                key={inlineStyle.name}
                onClick={(e) => applyStyle(inlineStyle.style, e)} 
                icon={inlineStyle.icon} />
            })}
        </div>
    );
}