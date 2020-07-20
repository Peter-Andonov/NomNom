import React, { useState } from 'react';
import styled from 'styled-components';


export default function URLInput(props) {

    const [URLvalue, setURLvalue] = useState('');

    function updateValue(e) {
        setURLvalue(e.target.value);
    }

    function onURLFormAccept() {
        props.onURLFormAccept(URLvalue);
    }

    return (
        <div>
            <input value={URLvalue} onChange={updateValue} type={'text'} />
            <button onClick={onURLFormAccept}>OK</button>
            <button onClick={props.onURLFormCancel}>Cancel</button>
        </div>
    );
}