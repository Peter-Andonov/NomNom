import React from 'react';
import styled from 'styled-components';
import PreviewCard from './PreviewCard';


const Wrapper = styled.div`
    margin: 2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
`;


export default function PreviewsList(props) {

    return (
        <Wrapper>
            {props.previews.map((preview, index) => {
                const imagePreview = URL.createObjectURL(preview)
                return <PreviewCard key={index} imagePreview={imagePreview}/>
            })}
        </Wrapper>
    );
}