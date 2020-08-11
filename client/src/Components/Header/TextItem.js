import React from 'react';
import styled from 'styled-components';


const Div = styled.div`
    margin-left: 1rem;
    margin-right: 1rem;
    color: white;
    size: 0.8rem;
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    }
`;


const TextItem = (props) => {
    return(
        <Div onClick={props.action}>{props.label}</Div>
    );
};


export default TextItem;