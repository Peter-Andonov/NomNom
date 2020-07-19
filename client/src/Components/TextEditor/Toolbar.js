import React from 'react';
import styled from 'styled-components';


export default function Toolbar(props) {

    function onBoldClick(e) {
        e.preventDefault();
        props.onBoldClick()
    }

    function onItalicClick(e) {
        e.preventDefault();
        props.onItalicClick()
    }

    function onUnderlineClick(e) {
        e.preventDefault();
        props.onUnderlineClick()
    }

    function onUlClick(e) {
        e.preventDefault();
        props.onUlClick()
    }

    function onOlClick(e) {
        e.preventDefault();
        props.onOlClick()
    }

    function onLinkClick(e) {
        e.preventDefault();
        props.onLinkClick()
    }

    return (
        <div>
            <button onClick={onBoldClick} >Bold</button>
            <button onClick={onItalicClick} >Italic</button>
            <button onClick={onUnderlineClick} >Underline</button>
            <button onClick={onUlClick} >UL</button>
            <button onClick={onOlClick} >OL</button>
            <button onClick={onLinkClick} >Link</button>
        </div>
    );
}