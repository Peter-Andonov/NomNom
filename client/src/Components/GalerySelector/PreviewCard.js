import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    margin: 1rem;
    height: 10rem;
    width: 15rem;
    min-height: 10rem;
    min-width: 15rem;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
    transition: 0.3s;
    border-radius: 10%;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 10%;
    object-fit: cover;
`;


export default function PreviewsCard(props) {

    return (
        <Wrapper key={props.index} >
            <Image src={props.imagePreview} />
        </Wrapper>
    );
}